import { Component, OnInit } from '@angular/core';

import { UserViewModel } from '../../../core/models/view-models/users/user.view.model';
import { AuthService } from '../../../core/services/authentication/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: UserViewModel = null;

  constructor(private authService: AuthService) {}

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
    const roles = this.authService.roles;

    this.user = new UserViewModel(uid, email, displayName, roles);
  }
}
