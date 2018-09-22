import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-roles-listing',
  templateUrl: './user-roles-listing.component.html',
  styleUrls: ['./user-roles-listing.component.css']
})
export class UserRolesListingComponent implements OnInit {
  @Input('roles')
  roles: string[];

  constructor() {}

  ngOnInit() {}
}
