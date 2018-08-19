import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FurnitureModel } from '../models/furniture.model';
import { FurnitureService } from '../services/furniture.service';

@Component({
  selector: 'app-edit-furniture',
  templateUrl: './edit-furniture.component.html',
  styleUrls: ['./edit-furniture.component.css']
})
export class EditFurnitureComponent implements OnInit {
  furnitureModel: FurnitureModel;

  constructor(
    private route: ActivatedRoute,
    private furnitureService: FurnitureService,
    private router: Router
  ) {}

  ngOnInit() {
    this.furnitureService
      .getFurnitureById(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.furnitureModel = data;
      });
  }

  // Admin guard
  edit() {
    this.furnitureService
      .editFurnitureById(this.furnitureModel.id, this.furnitureModel)
      .subscribe(res => {
        this.router.navigate(['/furniture/all']);
      });
  }
}
