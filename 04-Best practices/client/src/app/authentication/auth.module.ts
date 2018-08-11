import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { authComponents } from '.';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';

@NgModule({
  declarations: [...authComponents],
  imports: [FormsModule],
  providers: [AuthService, NotificationService]
})
export class AuthModule {}
