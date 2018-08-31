import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseViewModel } from '../../../core/models/view-models/courses/course.view.model';
import { UserViewModel } from '../../../core/models/view-models/users/user.view.model';

import { AuthService } from '../../../core/services/authentication/auth.service';
import { CourseService } from '../../../core/services/courses/course.service';
import { NotificationService } from '../../../core/services/notifications/notification.service';

const courseCancelEnrollmentMsg = 'Course enrollment cancelled';
const coursesAllPath = '/courses/all';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: UserViewModel = null;
  studentCourses: Array<CourseViewModel> = [];
  trainerCourses: Array<CourseViewModel> = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private courseService: CourseService,
    private notificationService: NotificationService
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
  }

  cancelEnrollment(courseId: string) {
    this.courseService
      .cancelCourseEnrollment(courseId)
      .then(data => {
        console.log(data);
        this.notificationService.successMsg(courseCancelEnrollmentMsg);

        // Remove course from list of student courses
        for (let index = 0; index < this.studentCourses.length; index++) {
          const course = this.studentCourses[index];
          if (course.id === courseId) {
            this.studentCourses.splice(index, 1);
            break;
          }
        }
      })
      .catch(error => {
        console.log(error);
        this.notificationService.errorMsg(error.error.error);
      });
  }
}
