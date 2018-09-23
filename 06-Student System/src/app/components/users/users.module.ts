import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';
import { UsersRoutingModule } from './users-routing.module';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserCoursesListingComponent } from './user-courses-listing/user-courses-listing.component';
import { UserInfoListingComponent } from './user-info-listing/user-info-listing.component';
import { UserRolesListingComponent } from './user-roles-listing/user-roles-listing.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserCoursesListingComponent,
    UserInfoListingComponent,
    UserRolesListingComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FeedbacksModule // shared feedbacks
  ]
})
export class UsersModule {}
