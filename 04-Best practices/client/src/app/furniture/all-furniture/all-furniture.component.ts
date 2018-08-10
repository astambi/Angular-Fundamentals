import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { FurnitureService } from '../services/furniture.service';
import { FurnitureModel } from '../models/furniture.model';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.css']
})
export class AllFurnitureComponent implements OnInit {
  // furnitures: FurnitureModel[];
  furnitures: Observable<FurnitureModel[]>;
  pageSize: number = 3;
  currentPage: number = 1;

  constructor(
    private furnitureService: FurnitureService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.furnitures = this.furnitureService.getAllFurniture();
    // .subscribe(data => {
    //   console.log(data);
    //   this.furnitures = data;
    // });
  }

  changePage(targetPage) {
    this.currentPage = targetPage;
  }

  deleteItem(id: string) {
    this.furnitureService.getFurnitureById(id).subscribe(res => {
      if (res.id) {
        // Furniture exists
        this.furnitureService.deleteFurnitureById(id).subscribe();
      } else if (!res['success']) {
        // Error Notification
        this.toastr.error(res['message'], 'Error');
      }

      // Update content
      this.furnitures = this.furnitureService.getAllFurniture();

      this.router.navigate(['/furniture/all']);
    });
  }
}
