import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-info-listing',
  templateUrl: './user-info-listing.component.html',
  styleUrls: ['./user-info-listing.component.css']
})
export class UserInfoListingComponent implements OnInit {
  @Input('user')
  user: any;

  ngOnInit() {}
}
