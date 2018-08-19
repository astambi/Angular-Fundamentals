import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { FurnitureModel } from '../models/furniture.model';

import { AuthService } from '../../authentication/auth.service';
import { NotificationService } from '../../authentication/notification.service';
import { FurnitureService } from '../services/furniture.service';

@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.css']
})
export class AllFurnitureComponent implements OnInit {
  // furnitures: FurnitureModel[];
  furnitures$: Observable<FurnitureModel[]>;
  pageSize: number = 3;
  currentPage: number = 1;

  constructor(
    private furnitureService: FurnitureService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.furnitures$ = this.furnitureService.getAllFurniture();
  }

  changePage(targetPage) {
    this.currentPage = targetPage;
  }

  // Admin only
  deleteItem(id: string) {
    // Admin validation
    if (!this.authService.isAdmin()) {
      this.notificationService.adminRoleRequiredMsg();

      this.router.navigate(['/furniture/all']);
      return;
    }

    // Furniture id validation
    this.furnitureService.getFurnitureById(id).subscribe(res => {
      // Valid id
      if (res.id) {
        this.furnitureService.deleteFurnitureById(id).subscribe();
      } else if (!res['success']) {
        // Error Notification
        this.notificationService.errorMsg(res['message']);
      }

      // Update content
      this.furnitures$ = this.furnitureService.getAllFurniture();

      this.router.navigate(['/furniture/all']);
    });
  }
}
