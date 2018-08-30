import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

import { environment } from '../../../../environments/environment';
import { UserViewModel } from '../../models/view-models/users/user.view.model';
import { AuthService } from '../authentication/auth.service';

const dbUrl = environment.firebase.databaseURL;
const usersCollection = 'users';
const coursesCollection = 'courses';
const studentsCollection = 'students';
const studentCoursesCollection = 'studentCourses';
const jsonExt = '.json';
const usersCollectionUrl = `${dbUrl}/${usersCollection}${jsonExt}`;
const userByIdUrl = (id: string) =>
  `${dbUrl}/${usersCollection}/${id}${jsonExt}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private db: firebase.database.Database;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.db = firebase.database();
  }

  getAll(): Observable<UserViewModel[]> {
    return this.http
      .get(usersCollectionUrl)
      .pipe(map((res: Response) => Object.values(res)));
  }

  getById(id: string): Observable<UserViewModel> {
    const userUrl = userByIdUrl(id);
    return this.http.get<UserViewModel>(userUrl);
  }

  getUsersByIds(userIds: string[]): UserViewModel[] {
    const users = [];

    for (const id of userIds) {
      this.getById(id).subscribe(user => {
        users.push(user);
      });
    }

    return users;
  }

  enrollInCourseById(courseId: string) {
    const userId = this.authService.getCurrentUser().uid;

    const updates = {};
    // users/uid/studentCourses/courseId = true
    updates[
      `${usersCollection}/${userId}/${studentCoursesCollection}/${courseId}`
    ] = true;
    //courses/courseId/students/uid = true
    updates[
      `${coursesCollection}/${courseId}/${studentsCollection}/${userId}`
    ] = true;

    return this.db.ref().update(updates);
  }

  cancelEnrollment(courseId: string) {
    const userId = this.authService.getCurrentUser().uid;

    const updates = {};
    // users/uid/studentCourses/courseId = null
    updates[
      `${usersCollection}/${userId}/${studentCoursesCollection}/${courseId}`
    ] = null;
    //courses/courseId/students/uid = null
    updates[
      `${coursesCollection}/${courseId}/${studentsCollection}/${userId}`
    ] = null;

    return this.db.ref().update(updates);
  }

  isEnrolledInCourse(courseId: string): Observable<any> {
    const userId = this.authService.getCurrentUser().uid;
    return this.http.get(
      `${dbUrl}/${usersCollection}/${userId}/${studentCoursesCollection}/${courseId}${jsonExt}`
    );
  }
}
