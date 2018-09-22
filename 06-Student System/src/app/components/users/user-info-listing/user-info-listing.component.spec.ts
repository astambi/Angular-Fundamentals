import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoListingComponent } from './user-info-listing.component';

describe('UserInfoListingComponent', () => {
  let component: UserInfoListingComponent;
  let fixture: ComponentFixture<UserInfoListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
