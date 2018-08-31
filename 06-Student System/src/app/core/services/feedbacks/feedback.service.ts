import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { environment } from '../../../../environments/environment';

import { FeedbackCreateModel } from '../../models/input-models/feedbacks/feedback-create.input.model';

const dbUrl = environment.firebase.databaseURL;
const users = 'users';
const courses = 'courses';
const feedbacks = 'feedbacks';
const students = 'students';
const json = '.json';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private db: firebase.database.Database;

  constructor() {
    this.db = firebase.database();
  }

  create(feedbackCreateModel: FeedbackCreateModel) {
    // Create new feedback id
    const feedbackId = this.db
      .ref()
      .child(feedbacks)
      .push().key;

    // Add id to course data
    const { userId, courseId } = feedbackCreateModel;
    const feedbackData = { feedbackId, ...feedbackCreateModel };

    const updates = {};
    updates[`/${feedbacks}/${feedbackId}`] = feedbackData;
    updates[`/${users}/${userId}/${feedbacks}/${feedbackId}`] = courseId;
    updates[`/${courses}/${courseId}/${feedbacks}/${feedbackId}`] = userId;

    // Update feedbacks
    return this.db.ref().update(updates); // promise
  }
}
