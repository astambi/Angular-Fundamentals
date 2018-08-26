import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

const dbUrl = environment.firebase.databaseURL;
const usersCollection = 'users';
const jsonExt = '.json';
const usersCollectionUrl = `${dbUrl}/${usersCollection}${jsonExt}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http
      .get(usersCollectionUrl)
      .pipe(map((res: Response) => Object.values(res)));
  }
}
