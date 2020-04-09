import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { AngularMaterialModule } from '../angular-material.module'
import { AuthRoutingModule } from './auth-routing.module'
import { MatInputModule, MatFormFieldModule } from '@angular/material'

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
]
})
export class AuthModule {}
