import { Component, OnInit, Input } from '@angular/core';

import { UserViewModel } from '../../../core/models/view-models/users/user.view.model';

@Component({
  selector: 'app-user-info-listing',
  templateUrl: './user-info-listing.component.html',
  styleUrls: ['./user-info-listing.component.css']
})
export class UserInfoListingComponent implements OnInit {
  @Input('user')
  user: UserViewModel;

  ngOnInit() {}
}
