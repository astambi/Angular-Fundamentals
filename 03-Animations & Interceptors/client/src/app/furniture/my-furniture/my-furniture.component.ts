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

  constructor(
    private furnitureService: FurnitureService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.furnitures = this.furnitureService.getMyFurniture();
  }

  deleteItem(id: string) {
    this.furnitureService.deleteFurnitureById(id).subscribe(res => {
      // console.log(res);

      // Error Notification
      if (!res['success']) {
        this.toastr.error(res['message'], 'Error');
      }

      this.router.navigate(['/furniture/all']);
    });
  }
}
