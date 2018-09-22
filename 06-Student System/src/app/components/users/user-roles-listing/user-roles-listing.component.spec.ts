import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesListingComponent } from './user-roles-listing.component';

describe('UserRolesListingComponent', () => {
  let component: UserRolesListingComponent;
  let fixture: ComponentFixture<UserRolesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRolesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
