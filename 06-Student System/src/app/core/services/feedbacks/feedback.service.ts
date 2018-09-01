import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';

import { environment } from '../../../../environments/environment';

import { FeedbackCreateModel } from '../../models/input-models/feedbacks/feedback-create.input.model';

import { UserService } from '../users/user.service';
import { UserViewModel } from '../../models/view-models/users/user.view.model';

const dbUrl = environment.firebase.databaseURL;
const users = 'users';
const courses = 'courses';
const feedbacks = 'feedbacks';
const json = '.json';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private db: firebase.database.Database;

  constructor(private http: HttpClient, private userService: UserService) {
    this.db = firebase.database();
  }

  create(feedbackCreateModel: FeedbackCreateModel) {
    // Create new feedback id
    const feedbackId = this.db
      .ref()
      .child(feedbacks)
      .push().key;

    // Add id to feedback data
    const feedbackData = { feedbackId, ...feedbackCreateModel };
    const { userId, courseId } = feedbackCreateModel;

    const updates = {};
    updates[`/${feedbacks}/${feedbackId}`] = feedbackData;
    updates[`/${users}/${userId}/${feedbacks}/${feedbackId}`] = courseId;
    updates[`/${courses}/${courseId}/${feedbacks}/${feedbackId}`] = userId;

    // Update feedbacks
    return this.db.ref().update(updates); // promise
  }

  getByCourse(courseId: string) {
    const courseFeedbacks = [];

    const courseFeedbacksUrl = `${dbUrl}/${courses}/${courseId}/${feedbacks}${json}`;

    this.http.get(courseFeedbacksUrl).subscribe(data => {
      // console.log(data);
      if (data === null) {
        return;
      }

      const feedbackIds = Object.keys(data);
      // console.log(feedbackIds);

      for (const feedbackId of feedbackIds) {
        const feedbackUrl = `${dbUrl}/${feedbacks}/${feedbackId}${json}`;
        this.http.get(feedbackUrl).subscribe((feedbackData: Object) => {
          // console.log(feedbackData);

          // User (author)
          const userId = feedbackData['userId'];
          this.userService.getById(userId).subscribe((user: UserViewModel) => {
            const { name, email } = user;
            courseFeedbacks.push({
              name,
              email,
              ...feedbackData
            });
          });
        });
      }

      // console.log(courseFeedbacks);
    });

    return courseFeedbacks;
  }

  getByUser(userId: string) {
    const url = `${dbUrl}/${users}/${userId}/${feedbacks}${json}`;
    return this.http.get<any>(url);
  }
}
