import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

import { environment } from '../../../../environments/environment';

import { CourseCreateModel } from '../../models/input-models/courses/course-create.input.model';
import { CourseViewModel } from '../../models/view-models/courses/course.view.model';

import { AuthService } from '../authentication/auth.service';
import { UserService } from '../users/user.service';
import { UserViewModel } from '../../models/view-models/users/user.view.model';

const dbUrl = environment.firebase.databaseURL;
const users = 'users';
const courses = 'courses';
const students = 'students';
const feedbacks = 'feedbacks';
const studentCourses = 'studentCourses';
const trainerCourses = 'trainerCourses';
const json = '.json';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private db: firebase.database.Database;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.db = firebase.database();
  }

  create(courseCreateModel: CourseCreateModel) {
    courseCreateModel.students = []; // not created in firebase

    // // create course without id in the course data
    // return this.http.post(coursesCollectionUrl, courseCreateModel); // observable

    // Create new course id
    const id = this.db
      .ref()
      .child(courses)
      .push().key;

    // Add id to course data
    const updates = {};
    updates[`/${courses}/${id}`] = { id, ...courseCreateModel };

    const { trainers } = courseCreateModel;
    for (const trainerId of trainers) {
      updates[`${users}/${trainerId}/${trainerCourses}/${id}`] = true;
    }

    // Update trainers
    return this.db.ref().update(updates); // promise
  }

  getAll(): Observable<CourseViewModel[]> {
    const url = `${dbUrl}/${courses}${json}`;
    return this.http.get(url).pipe(map((res: Response) => Object.values(res)));
  }

  getById(id: string): Observable<CourseViewModel> {
    const url = `${dbUrl}/${courses}/${id}${json}`;
    return this.http.get<CourseViewModel>(url);
  }

  edit(id: string, courseCreateModel: CourseCreateModel) {
    const { trainers } = courseCreateModel;
    const updates = {};

    // Remove course from all prev trainers
    this.getById(id).subscribe(course => {
      const prevTrainers = course.trainers;

      if (prevTrainers) {
        for (const prevTrainerId of prevTrainers) {
          if (trainers.indexOf(prevTrainerId) == -1) {
            updates[`${users}/${prevTrainerId}/${trainerCourses}/${id}`] = null;
          }
        }
      }

      // Add course to new trainers
      for (const trainerId of trainers) {
        updates[`${users}/${trainerId}/${trainerCourses}/${id}`] = true;
      }

      // Update trainers
      this.db.ref().update(updates);
    });

    // Update course
    const url = `${dbUrl}/${courses}${json}`;
    return this.http.patch(url, {
      [id]: courseCreateModel
    });
  }

  delete(id: string) {
    this.removeCourseReferences(id);

    const url = `${dbUrl}/${courses}/${id}${json}`;
    return this.http.delete(url);
  }

  removeCourseReferences(id: string) {
    this.getById(id).subscribe(data => {
      const courseTrainers = data.trainers; // NB! student[]
      const courseStudents = Object.keys(data.students); // {student: true}
      const courseFeedbacks = Object.keys(data.feedbacks); // {feedbacks: true}
      console.log(courseTrainers);
      console.log(courseStudents);
      console.log(courseFeedbacks);

      const updates = {};

      // Remove Course Trainers
      for (const userId of courseTrainers) {
        updates[`${users}/${userId}/${trainerCourses}/${id}`] = null;
      }

      // Remove Course Students
      for (const userId of courseStudents) {
        updates[`${users}/${userId}/${studentCourses}/${id}`] = null;

        // Remove Course Feedbacks
        for (const feedbackId of courseFeedbacks) {
          updates[`${feedbacks}/${feedbackId}`] = null;
          updates[`${users}/${userId}/${feedbacks}/${feedbackId}`] = null;
        }
      }

      // // Remove Course
      // updates[`${courses}/${id}`] = null;

      console.log(updates);
      this.db.ref().update(updates);
    });
  }

  enrollInCourse(courseId: string) {
    const userId = this.authService.getCurrentUser().uid;

    const updates = {};
    updates[`${users}/${userId}/${studentCourses}/${courseId}`] = true;
    updates[`${courses}/${courseId}/${students}/${userId}`] = true;

    return this.db.ref().update(updates);
  }

  cancelCourseEnrollment(courseId: string) {
    const userId = this.authService.getCurrentUser().uid;

    const updates = {};
    updates[`${users}/${userId}/${studentCourses}/${courseId}`] = null;
    updates[`${courses}/${courseId}/${students}/${userId}`] = null;

    return this.db.ref().update(updates);
  }

  isEnrolledInCourse(courseId: string): Observable<any> {
    const userId = this.authService.getCurrentUser().uid;
    const url = `${dbUrl}/${users}/${userId}/${studentCourses}/${courseId}${json}`;
    return this.http.get(url);
  }

  getStudentCourses(userId: string): Array<CourseViewModel> {
    const courses: Array<CourseViewModel> = [];

    this.userService.getById(userId).subscribe((userData: UserViewModel) => {
      if (userData.studentCourses) {
        const courseIds = Object.keys(userData.studentCourses);
        for (const id of courseIds) {
          this.getById(id).subscribe(course => {
            if (course) {
              courses.push(course);
            }
          });
        }
      }
    });

    return courses;
  }

  getTrainerCourses(userId: string): Array<CourseViewModel> {
    const courses: Array<CourseViewModel> = [];

    this.userService.getById(userId).subscribe((userData: UserViewModel) => {
      if (userData.trainerCourses) {
        const courseIds = Object.keys(userData.trainerCourses);
        for (const id of courseIds) {
          this.getById(id).subscribe(course => {
            if (course) {
              courses.push(course);
            }
          });
        }
      }
    });

    return courses;
  }

  removeFromViewList(courseId: string, studentCourses: Array<CourseViewModel>) {
    // Remove course from list of student courses => auto update user-profile component
    for (let index = 0; index < studentCourses.length; index++) {
      const course = studentCourses[index];
      if (course.id === courseId) {
        studentCourses.splice(index, 1);
        break;
      }
    }
  }
}
