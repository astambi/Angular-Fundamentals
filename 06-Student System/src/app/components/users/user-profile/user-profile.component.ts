import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseViewModel } from '../../../core/models/view-models/courses/course.view.model';
import { FeedbackViewModel } from '../../../core/models/view-models/feedbacks/feedback.view.model';
import { UserViewModel } from '../../../core/models/view-models/users/user.view.model';

import { AuthService } from '../../../core/services/authentication/auth.service';
import { CourseService } from '../../../core/services/courses/course.service';
import { FeedbackService } from '../../../core/services/feedbacks/feedback.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: UserViewModel = null;
  trainerCourses: Array<CourseViewModel> = [];
  studentCourses: Array<CourseViewModel> = [];
  feedbacks: Array<FeedbackViewModel> = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private courseService: CourseService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit() {
    this.loadCurrentUserData();
  }

  loadCurrentUserData() {
    const currentUser = this.authService.getCurrentUser();

    // No logged in user
    if (!currentUser) {
      this.user = null;
      return;
    }

    // User Profile
    const { uid, email, displayName } = currentUser;

    // User Roles
    this.authService.getUserRoles();
    const roles: string[] = this.authService.roles;
    this.user = new UserViewModel(uid, email, displayName, roles);

    // Courses
    this.trainerCourses = this.courseService.getTrainerCourses(uid);
    this.studentCourses = this.courseService.getStudentCourses(uid);

    // Feedbacks
    this.feedbacks = this.feedbackService.getByUser(uid);
  }
}
