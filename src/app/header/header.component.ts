import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false
  private authListenerSubs: Subscription
  private userTypeStatusSub: Subscription
  userType = 'customer'
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
      })
    this.userType = this.authService.getUserType()
    this.userTypeStatusSub = this.authService
    .getUserTypeStatusListener()
    .subscribe(listener => {
      this.userType = this.authService.getUserType()
    })
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe()
  }
}
