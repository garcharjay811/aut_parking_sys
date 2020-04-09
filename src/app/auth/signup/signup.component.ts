import { Component, OnInit, OnDestroy } from '@angular/core'
import { NgForm, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'

import { AuthService } from '../auth.service'

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false
  private authStatusSub: Subscription
  public emailControl: FormControl = new FormControl('', [Validators.required])
  public passwordControl: FormControl = new FormControl('', [Validators.required])
  public firstControl: FormControl = new FormControl('', [Validators.required])
  public lastControl: FormControl = new FormControl('', [Validators.required])
  public contactControl: FormControl = new FormControl('', [Validators.required, Validators.min(1111111111), Validators.max(9999999999)])
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false
      }
    )
  }

  onSignup() {
    this.isLoading = true
    const signupRequest = {
      firstName: this.firstControl.value,
      lastName: this.lastControl.value,
      email: this.emailControl.value,
      password: this.passwordControl.value,
      contactNumber: this.contactControl.value
    }
    this.authService.createUser(this.emailControl.value, this.passwordControl.value,
      this.firstControl.value, this.lastControl.value, this.contactControl.value)
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe()
  }
}
