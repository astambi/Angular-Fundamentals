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
  bindingModel: FurnitureModel;

  constructor(
    private route: ActivatedRoute,
    private furnitureService: FurnitureService,
    private router: Router
  ) {}

  ngOnInit() {
    this.furnitureService
      .getFurnitureById(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.bindingModel = data;
      });
  }

  edit() {
    this.furnitureService
      .editFurnitureById(this.bindingModel.id, this.bindingModel)
      .subscribe(res => {
        this.router.navigate(['/furniture/all']);
      });
  }
}
