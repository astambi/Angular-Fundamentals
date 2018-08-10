import { Component, OnInit } from '@angular/core';

import { CreateFurnitureModel } from '../models/create-furniture.model';
import { FurnitureService } from '../services/furniture.service';

@Component({
  selector: 'app-create-furniture',
  templateUrl: './create-furniture.component.html',
  styleUrls: ['./create-furniture.component.css']
})
export class CreateFurnitureComponent implements OnInit {
  bindingModel: CreateFurnitureModel; // name != 'model'

  constructor(private furnitureService: FurnitureService) {
    this.bindingModel = new CreateFurnitureModel('', '', 2018, '', 0, '');
  }

  ngOnInit() {}

  create() {
    this.furnitureService
      .createFurniture(this.bindingModel)
      .subscribe(console.log);
  }
}
