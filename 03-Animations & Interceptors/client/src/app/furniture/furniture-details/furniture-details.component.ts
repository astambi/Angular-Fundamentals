import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { FurnitureModel } from '../models/furniture.model';
import { FurnitureService } from '../services/furniture.service';

@Component({
  selector: 'app-furniture-details',
  templateUrl: './furniture-details.component.html',
  styleUrls: ['./furniture-details.component.css']
})
export class FurnitureDetailsComponent implements OnInit {
  // furniture: FurnitureModel;
  furniture: Observable<FurnitureModel>;
  id: string;

  constructor(
    private furnitureService: FurnitureService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    // this.furnitureService
    //   .getFurnitureDetailsById(this.id)
    //   .subscribe(data => (this.furniture = data));

    this.furniture = this.furnitureService.getFurnitureDetailsById(this.id);
  }
}
