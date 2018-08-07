import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FurnitureService } from '../services/furniture.service';
import { FurnitureModel } from '../models/furniture.model';

@Component({
  selector: 'app-all-furniture',
  templateUrl: './all-furniture.component.html',
  styleUrls: ['./all-furniture.component.css']
})
export class AllFurnitureComponent implements OnInit {
  // furnitures: FurnitureModel[];
  furnitures: Observable<FurnitureModel[]>;

  constructor(private furnitureService: FurnitureService) {}

  ngOnInit() {
    this.furnitures = this.furnitureService.getAllFurniture();
    // .subscribe(data => {
    //   console.log(data);
    //   this.furnitures = data;
    // });
  }
}
