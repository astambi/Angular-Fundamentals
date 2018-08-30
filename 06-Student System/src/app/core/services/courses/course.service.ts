import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

import { environment } from '../../../../environments/environment';
import { CourseCreateModel } from '../../models/input-models/courses/course-create.input.model';
import { CourseViewModel } from '../../models/view-models/courses/course.view.model';
import { UserService } from '../users/user.service';

const dbUrl = environment.firebase.databaseURL;
const coursesCollection = 'courses';
const usersCollection = 'users';
const trainerCoursesCollection = 'trainerCourses';
const trainersCollection = 'trainerIds';
const jsonExt = '.json';
const coursesCollectionUrl = `${dbUrl}/${coursesCollection}${jsonExt}`;
const courseByIdUrl = (id: string) =>
  `${dbUrl}/${coursesCollection}/${id}${jsonExt}`;

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private db: firebase.database.Database;

  constructor(private http: HttpClient, private userService: UserService) {
    this.db = firebase.database();
  }

  create(courseCreateModel: CourseCreateModel) {
    courseCreateModel.students = []; // not created in firebase

    // // create course without id in the course data
    // return this.http.post(coursesCollectionUrl, courseCreateModel); // observable

    // Create new course id
    const id = this.db
      .ref()
      .child(coursesCollection)
      .push().key;

    // Add id to course data
    const updates = {};

    // courses/courseId = {courseDate}
    updates[`/${coursesCollection}/${id}`] = {
      id,
      ...courseCreateModel
    };

    // users/uid/trainerCourses/courseId = true
    const { trainerIds } = courseCreateModel;

    for (const trainerId of trainerIds) {
      updates[
        `${usersCollection}/${trainerId}/${trainerCoursesCollection}/${id}`
      ] = true;
    }

    // Update course & trainers
    return this.db.ref().update(updates); // promise
  }

  getAll(): Observable<CourseViewModel[]> {
    return this.http
      .get(coursesCollectionUrl)
      .pipe(map((res: Response) => Object.values(res)));
  }

  getById(id: string): Observable<CourseViewModel> {
    const courseUrl = courseByIdUrl(id);
    return this.http.get<CourseViewModel>(courseUrl);
  }

  edit(id: string, courseCreateModel: CourseCreateModel) {
    const { trainerIds } = courseCreateModel;
    const updates = {};

    // Remove course from all prev trainers
    this.getById(id).subscribe(data => {
      const prevTrainers = data.trainerIds;

      for (const prevTrainerId of prevTrainers) {
        if (trainerIds.indexOf(prevTrainerId) == -1) {
          updates[
            `${usersCollection}/${prevTrainerId}/${trainerCoursesCollection}/${id}`
          ] = null;
        }
      }

      // Add course to new trainers
      // users/uid/trainerCourses/courseId = true
      for (const trainerId of trainerIds) {
        updates[
          `${usersCollection}/${trainerId}/${trainerCoursesCollection}/${id}`
        ] = true;
      }

      // Update trainers
      this.db.ref().update(updates);
    });

    // Update course
    return this.http.patch(coursesCollectionUrl, {
      [id]: courseCreateModel // patch {id: body}
    });
  }

  delete(id: string) {
    // Remove course from all prev trainers
    this.getById(id).subscribe(data => {
      const updates = {};

      const prevTrainers = data.trainerIds;
      for (const prevTrainerId of prevTrainers) {
        updates[
          `${usersCollection}/${prevTrainerId}/${trainerCoursesCollection}/${id}`
        ] = null;
      }

      // Update trainers
      this.db.ref().update(updates);
    });

    // Delete course
    const courseUrl = courseByIdUrl(id);
    return this.http.delete(courseUrl);
  }
}
