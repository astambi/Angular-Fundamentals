import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

import { environment } from '../../../../environments/environment';
import { CourseCreateModel } from '../../models/input-models/courses/course-create.input.model';
import { UserService } from '../users/user.service';
import { Observable } from 'rxjs';
import { CourseViewModel } from '../../models/view-models/courses/course.view.model';

const dbUrl = environment.firebase.databaseURL;
const coursesCollection = 'courses';
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
    let updates = {};
    updates[`/${coursesCollection}/${id}`] = {
      id,
      ...courseCreateModel
    };

    // Update course
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
    return this.http.patch(coursesCollectionUrl, {
      [id]: courseCreateModel // patch {id: body}
    });
  }

  delete(id: string) {
    const courseUrl = courseByIdUrl(id);
    return this.http.delete(courseUrl);
  }
}
