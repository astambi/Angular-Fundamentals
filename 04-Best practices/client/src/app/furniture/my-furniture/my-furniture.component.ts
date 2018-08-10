import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { FurnitureModel } from '../models/furniture.model';
import { FurnitureService } from '../services/furniture.service';

@Component({
  selector: 'app-my-furniture',
  templateUrl: './my-furniture.component.html',
  styleUrls: ['./my-furniture.component.css']
})
export class MyFurnitureComponent implements OnInit {
  furnitures: Observable<FurnitureModel[]>;
  pageSize: number = 3;
  currentPage: number = 1;

  constructor(
    private furnitureService: FurnitureService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.furnitures = this.furnitureService.getMyFurniture();
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

      this.router.navigate(['/furniture/all']);
    });
  }
}
