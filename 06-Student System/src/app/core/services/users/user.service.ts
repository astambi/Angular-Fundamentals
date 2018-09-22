import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

import { UserViewModel } from '../../models/view-models/users/user.view.model';
import { AuthService } from '../authentication/auth.service';

import dbConstants from '../../constants/database-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private db: firebase.database.Database;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.db = firebase.database();
  }

  getAll(): Observable<UserViewModel[]> {
    const url = `${dbConstants.dbUrl}/${dbConstants.users}${dbConstants.json}`;
    return this.http.get(url).pipe(map((res: Response) => Object.values(res)));
  }

  getById(id: string): Observable<UserViewModel> {
    const url = `${dbConstants.dbUrl}/${dbConstants.users}/${id}${
      dbConstants.json
    }`;
    return this.http.get<UserViewModel>(url);
  }

  getMultipleByIds(userIds: string[]): UserViewModel[] {
    const users = [];

    for (const id of userIds) {
      this.getById(id).subscribe(user => users.push(user));
    }

    return users;
  }
}
