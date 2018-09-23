import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../core/services/authentication/auth.service';

@Component({
  selector: 'app-admin-create-course-button',
  templateUrl: './admin-create-course-button.component.html',
  styleUrls: ['./admin-create-course-button.component.css']
})
export class AdminCreateCourseButtonComponent implements OnInit {
  constructor(
    private authService: AuthService // in html
  ) {}

  ngOnInit() {}
}
