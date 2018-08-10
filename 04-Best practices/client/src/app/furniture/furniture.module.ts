import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { NgxPaginationModule } from 'ngx-pagination';
import { FurnitureRoutingModule } from './furniture-routing.module';

import { furnitureComponents } from '.';
import { FurnitureService } from './services/furniture.service';

@NgModule({
  declarations: [...furnitureComponents],
  imports: [
    CommonModule, // async pipe
    FormsModule,
    CustomFormsModule, // custom validations
    FurnitureRoutingModule, // lazy loading
    NgxPaginationModule // pagination
  ],
  providers: [FurnitureService]
})
export class FurnitureModule {}
