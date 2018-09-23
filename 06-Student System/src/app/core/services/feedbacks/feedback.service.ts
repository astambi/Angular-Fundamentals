import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

import { FeedbackCreateModel } from '../../models/input-models/feedbacks/feedback-create.input.model';
import { FeedbackViewModel } from '../../models/view-models/feedbacks/feedback.view.model';
import { UserViewModel } from '../../models/view-models/users/user.view.model';

import { AuthService } from '../authentication/auth.service';
import { UserService } from '../users/user.service';

import dbConstants from '../../constants/database-constants';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private db: firebase.database.Database;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.db = firebase.database();
  }

  create(feedbackCreateModel: FeedbackCreateModel) {
    // Create new feedback id
    const id = this.db
      .ref()
      .child(dbConstants.feedbacks)
      .push().key;

    // Add id to feedback data
    const feedbackData = {
      id,
      ...feedbackCreateModel
    };
    const { userId, courseId } = feedbackCreateModel;

    const updates = {};
    updates[`/${dbConstants.feedbacks}/${id}`] = feedbackData;
    updates[
      `/${dbConstants.users}/${userId}/${dbConstants.feedbacks}/${id}`
    ] = courseId;
    updates[
      `/${dbConstants.courses}/${courseId}/${dbConstants.feedbacks}/${id}`
    ] = userId;

    // Update feedbacks
    return this.db.ref().update(updates); // promise
  }

  delete(feedback: FeedbackViewModel): Promise<any> {
    const { id, courseId, userId } = feedback;

    // Admin or Owner only
    if (
      !(
        this.authService.isAdmin() ||
        this.authService.user.uid === feedback.userId
      )
    ) {
      return new Promise(
        (resolve: (res: boolean) => void, reject: (res: Error) => void) => {
          const error: Error = new Error(
            'User is not the feedback author or an admin'
          );
          reject(error);
        }
      );
    }

    const updates = {};
    updates[
      `${dbConstants.courses}/${courseId}/${dbConstants.feedbacks}/${id}`
    ] = null; // Remove feedback from courses
    updates[
      `${dbConstants.users}/${userId}/${dbConstants.feedbacks}/${id}`
    ] = null; // Remove feedback from users
    updates[`${dbConstants.feedbacks}/${id}`] = null; // Remove feedback

    console.log(updates);
    return this.db.ref().update(updates);
  }

  removeFromViewList(feedbackId: string, feedbacks: Array<FeedbackViewModel>) {
    // Remove feedback from user profile => auto update user-profile component
    for (let index = 0; index < feedbacks.length; index++) {
      const feedback = feedbacks[index];
      if (feedback.id === feedbackId) {
        feedbacks.splice(index, 1);
        break;
      }
    }
  }

  getById(id: string): Observable<FeedbackViewModel> {
    const url = `${dbConstants.dbUrl}/${dbConstants.feedbacks}/${id}${
      dbConstants.json
    }`;
    return this.http.get<FeedbackViewModel>(url);
  }

  getByCourse(courseId: string): Array<FeedbackViewModel> {
    const feedbacks: Array<FeedbackViewModel> = [];

    const courseFeedbacksUrl = `${dbConstants.dbUrl}/${
      dbConstants.courses
    }/${courseId}/${dbConstants.feedbacks}${dbConstants.json}`;

    this.http.get(courseFeedbacksUrl).subscribe(data => {
      // console.log(data);
      if (data === null) {
        return;
      }

      const feedbackIds = Object.keys(data);
      // console.log(feedbackIds);

      this.getFromIds(feedbackIds, feedbacks);
      // console.log(courseFeedbacks);
    });

    return feedbacks;
  }

  getByUser(userId: string): Array<FeedbackViewModel> {
    const userFeedbacksUrl = `${dbConstants.dbUrl}/${
      dbConstants.users
    }/${userId}/${dbConstants.feedbacks}${dbConstants.json}`;
    const feedbacks: Array<FeedbackViewModel> = [];

    this.http.get(userFeedbacksUrl).subscribe(data => {
      // console.log(data);
      if (data === null) {
        return;
      }

      const feedbackIds = Object.keys(data);
      // console.log(feedbackIds);

      this.getFromIds(feedbackIds, feedbacks);
      // console.log(feedbacks);
    });

    return feedbacks;
  }

  private getFromIds(feedbackIds: string[], feedbacks: any[]) {
    for (const feedbackId of feedbackIds) {
      const feedbackUrl = `${dbConstants.dbUrl}/${
        dbConstants.feedbacks
      }/${feedbackId}${dbConstants.json}`;

      this.http
        .get(feedbackUrl)
        .subscribe((feedbackData: FeedbackViewModel) => {
          // console.log(feedbackData);

          // User (author)
          const userId = feedbackData.userId;

          this.userService.getById(userId).subscribe((user: UserViewModel) => {
            // console.log(user);

            feedbacks.push({
              // courseName: null,
              userName: user.name,
              userEmail: user.email,
              ...feedbackData
            });
          });
        });
    }
  }
}
