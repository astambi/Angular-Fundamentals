import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { UserViewModel } from '../../models/view-models/users/user.view.model';

const dbUrl = environment.firebase.databaseURL;
const usersCollection = 'users';
const jsonExt = '.json';
const usersCollectionUrl = `${dbUrl}/${usersCollection}${jsonExt}`;
const userByIdUrl = (id: string) =>
  `${dbUrl}/${usersCollection}/${id}${jsonExt}`;
1;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<UserViewModel[]> {
    return this.http
      .get(usersCollectionUrl)
      .pipe(map((res: Response) => Object.values(res)));
  }

  getById(id: string): Observable<UserViewModel> {
    const userUrl = userByIdUrl(id);
    return this.http.get<UserViewModel>(userUrl);
  }

  getUsersByIds(userIds: string[]): UserViewModel[] {
    const users = [];

    for (const id of userIds) {
      this.getById(id).subscribe(user => {
        users.push(user);
      });
    }

    return users;
  }
}
