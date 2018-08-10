import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CreateFurnitureModel } from '../models/create-furniture.model';
import { FurnitureModel } from '../models/furniture.model';
import { AuthService } from '../../authentication/auth.service';

const createFurnitureUrl = 'http://localhost:5000/furniture/create';
const allFurnitureUrl = 'http://localhost:5000/furniture/all';
const furnitureDetailsUrl = 'http://localhost:5000/furniture/details/'; // {id}
const myFurnitureUrl = 'http://localhost:5000/furniture/mine';
const deleteFurnitureUrl = 'http://localhost:5000/furniture/delete/'; // {id}
const furnitureByIdUrl = 'http://localhost:5000/furniture/'; // {id}
const editFurnitureUrl = 'http://localhost:5000/furniture/edit/'; // {id}

@Injectable()
// {
// providedIn: 'root' // module, no need to import the service in app.module
// }
export class FurnitureService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createFurniture(model: CreateFurnitureModel) {
    return this.http.post(createFurnitureUrl, model);
  }

  getAllFurniture() {
    return this.http.get<FurnitureModel[]>(allFurnitureUrl);
  }

  getFurnitureDetailsById(id: string) {
    return this.http.get<FurnitureModel>(furnitureDetailsUrl + id);
  }

  getMyFurniture() {
    return this.http.get<FurnitureModel[]>(myFurnitureUrl);
  }

  deleteFurnitureById(id: string) {
    return this.http.delete(deleteFurnitureUrl + id);
  }

  getFurnitureById(id: string) {
    return this.http.get<FurnitureModel>(furnitureByIdUrl + id);
  }

  editFurnitureById(id: string, body: FurnitureModel) {
    return this.http.put(editFurnitureUrl + id, body);
  }
}
