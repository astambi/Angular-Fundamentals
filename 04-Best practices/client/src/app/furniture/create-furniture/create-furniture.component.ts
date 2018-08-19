import { Component, OnInit } from '@angular/core';

import { CreateFurnitureModel } from '../models/create-furniture.model';
import { FurnitureService } from '../services/furniture.service';

@Component({
  selector: 'app-create-furniture',
  templateUrl: './create-furniture.component.html',
  styleUrls: ['./create-furniture.component.css']
})
export class CreateFurnitureComponent implements OnInit {
  furnitureModel: CreateFurnitureModel; // name != 'model'

  constructor(private furnitureService: FurnitureService) {
    this.furnitureModel = new CreateFurnitureModel('', '', 2018, '', 0, '');
  }

  ngOnInit() {}

  create() {
    this.furnitureService
      .createFurniture(this.furnitureModel)
      .subscribe(console.log);
  }
}
