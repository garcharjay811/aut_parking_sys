import { Component, OnInit, OnDestroy } from '@angular/core'
import { PageEvent } from '@angular/material'
import { Subscription } from 'rxjs'

import { ProjectRequest } from '../projectRequest.model'
import { ProjectRequestsService } from '../projectRequests.service'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-project-request-list',
  templateUrl: './projectRequest-list.component.html',
  styleUrls: ['./projectRequest-list.component.css']
})
export class ProjectRequestListComponent implements OnInit, OnDestroy {
  userType = 'customer'
  projectRequests: ProjectRequest[] = []
  isLoading = false
  totalProjectRequests = 0
  projectRequestsPerPage = 2
  currentPage = 1
  pageSizeOptions = [1, 2, 5, 10]
  userIsAuthenticated = false
  userId: string
  private authStatusSub: Subscription
  private userTypeStatusSub: Subscription

  constructor(
    public projectRequestsService: ProjectRequestsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true
    this.userId = this.authService.getUserId()
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated
        this.userId = this.authService.getUserId()
      })
    this.userType = this.authService.getUserType()
    this.userTypeStatusSub = this.authService
    .getUserTypeStatusListener()
    .subscribe(listener => {
      this.userType = this.authService.getUserType()
    })
    if (this.userType === 'admin') {
      this.projectRequestsService.getProjectRequests().subscribe(requests => {
        this.projectRequests = requests.ProjectRequests
        this.isLoading = false
      })
    } else if (this.userType === 'developer') {
      console.log('developer', this.userType)
    } else if (this.userType === 'projectManager') {
      this.projectRequestsService.getProjectRequests().subscribe(requests => {
        this.projectRequests = requests.ProjectRequests
        this.isLoading = false
      })
    } else {
      this.isLoading = false
    }
  }

  // onChangedPage(pageData: PageEvent) {
  //   this.isLoading = true
  //   this.currentPage = pageData.pageIndex + 1
  //   this.projectRequestsPerPage = pageData.pageSize
  //   this.projectRequestsService.getProjectRequests(this.projectRequestsPerPage, this.currentPage)
  // }

  // onDelete(projectRequestId: string) {
  //   this.isLoading = true
  //   this.projectRequestsService.deleteProjectRequest(projectRequestId).subscribe(() => {
  //     this.projectRequestsService.getProjectRequests()
  //   }, () => {
  //     this.isLoading = false
  //   })
  // }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe()
    this.userTypeStatusSub.unsubscribe()
  }
}
