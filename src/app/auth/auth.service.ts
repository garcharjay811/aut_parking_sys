import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import * as jwt_decode from 'jwt-decode'
import { environment } from '../../environments/environment'
import { AuthData } from './auth-data.model'

const BACKEND_URL = environment.apiUrl + '/adminLogin/'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false
  private token: string
  private tokenTimer: any
  private emailId: string
  private authStatusListener = new Subject<boolean>()
  private userTypeStatusListener = new Subject<boolean>()
  private userType
  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token
  }

  getIsAuth() {
    return this.isAuthenticated
  }

  getUserId() {
    return this.emailId
  }

  getUserType() {
    return this.userType
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  getUserTypeStatusListener() {
    return this.userTypeStatusListener.asObservable()
  }

  createUser(email: string, password: string, firstName: string, lastName: string, contactNumber: number) {
    const authData: AuthData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      contactNumber: contactNumber
     }
    this.http.post(BACKEND_URL + 'signup', authData).subscribe(
      () => {
        this.router.navigate(['/'])
      },
      error => {
        this.authStatusListener.next(false)
        this.userTypeStatusListener.next(false)
      }
    )
  }

  login(email: string, password: string) {
    const authData = { email: email, password: password }
    this.http
      .post<{ token: string; expiresIn: number; emailId: string }>(
        BACKEND_URL + 'login',
        authData
      )
      .subscribe(
        response => {
          const token = response.token
          this.token = token
          if (token) {
            const expiresInDuration = response.expiresIn
            this.setAuthTimer(expiresInDuration)
            this.isAuthenticated = true
            this.userTypeCheck(token)
            this.emailId = response.emailId
            this.authStatusListener.next(true)
            const now = new Date()
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            )
            // console.log(expirationDate)
            this.saveAuthData(token, expirationDate, this.emailId)
            this.router.navigate(['/dashboard'])
          }
        },
        error => {
          console.log(error);
          this.authStatusListener.next(false)
          this.userTypeStatusListener.next(false)
        }
      )
  }

  userTypeCheck(token) {
    const payload = jwt_decode(token)
    if (payload) {
      this.userType = payload.userType
      this.userTypeStatusListener.next(true)
    }
  }

  autoAuthUser() {
    const authInformation = this.getAuthData()
    if (!authInformation) {
      return
    }
    const now = new Date()
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime()
    if (expiresIn > 0) {
      this.token = authInformation.token
      this.isAuthenticated = true
      this.emailId = authInformation.userId
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true)
      this.userTypeCheck(this.token)
    }
  }

  logout() {
    this.token = null
    this.isAuthenticated = false
    this.authStatusListener.next(false)
    this.userTypeStatusListener.next(false)
    this.emailId = null
    clearTimeout(this.tokenTimer)
    this.clearAuthData()
    this.router.navigate(['/'])
  }

  private setAuthTimer(duration: number) {
    // console.log('Setting timer: ' + duration)
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000)
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token)
    localStorage.setItem('expiration', expirationDate.toISOString())
    localStorage.setItem('userId', userId)
  }

  private clearAuthData() {
    localStorage.removeItem('token')
    localStorage.removeItem('expiration')
    localStorage.removeItem('userId')
  }

  private getAuthData() {
    const token = localStorage.getItem('token')
    const expirationDate = localStorage.getItem('expiration')
    const userId = localStorage.getItem('userId')
    if (!token || !expirationDate) {
      return
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}
