import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { Router } from '@angular/router'

import { environment } from '../../environments/environment'
import { ProjectRequest } from './projectRequest.model'

const BACKEND_URL = environment.apiUrl + '/projectRequests/'

@Injectable({ providedIn: 'root' })
export class ProjectRequestsService {
  private projectRequests: ProjectRequest[] = []
  private projectRequestsUpdated = new Subject<{ projectRequests: ProjectRequest[]}>()

  constructor(private http: HttpClient, private router: Router) {}

  getProjectRequests() {
    return this.http.get(BACKEND_URL).pipe(map((response: any) => response), catchError((err) => { throw err }))

    // .get<{ message: string; projectRequests: any; }>(
    //     BACKEND_URL
    //   )
    //   .pipe(
    //     map(projectRequestData => {
    //       return {
    //         projectRequests: projectRequestData.projectRequests.map(projectRequest => {
    //           return {
    //             title: projectRequest.title,
    //             content: projectRequest.content,
    //             id: projectRequest._id,
    //             imagePath: projectRequest.imagePath,
    //             creator: projectRequest.creator
    //           }
    //         })
    //       }
    //     })
    //   )
    //   .subscribe(transformedProjectRequestData => {
    //     this.projectRequests = transformedProjectRequestData.projectRequests
    //     this.projectRequestsUpdated.next({
    //       projectRequests: [...this.projectRequests]
    //     })
    //   })
  }

  getProjectRequestsByUserId() {
    return this.http.get(BACKEND_URL + 'byUserId/').pipe(map((response: any) => response), catchError((err) => { throw err }))
  }

  getProjectRequestUpdateListener() {
    return this.projectRequestsUpdated.asObservable()
  }

  getProjectRequest(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      description: string;
      image: string;
      deadline: string;
      cost_capping: number;
      customer_id: number;
    }>(BACKEND_URL + id)
  }

  addProjectRequest(title: string, description: string, image: File, deadline: string, cost_capping: number) {
    const projectRequestData = new FormData()
    projectRequestData.append('title', title)
    projectRequestData.append('description', description)
    projectRequestData.append('image', image, title)
    projectRequestData.append('deadline', deadline)
    projectRequestData.append('cost_capping', cost_capping.toString())
    this.http
      .post<{ message: string; projectRequest: ProjectRequest }>(
        BACKEND_URL,
        projectRequestData
      )
      .subscribe(responseData => {
        this.router.navigate(['/'])
      })
  }

  updateProjectRequest(id: string, title: string, description: string, image: File | string, deadline: string, cost_capping: number) {
    let projectRequestData: ProjectRequest | FormData
    if (typeof image === 'object') {
      projectRequestData = new FormData()
      projectRequestData.append('id', id)
      projectRequestData.append('title', title)
      projectRequestData.append('description', description)
      projectRequestData.append('image', image, title)
      projectRequestData.append('deadline', deadline)
      projectRequestData.append('cost_capping', cost_capping.toString())
    } else {
      projectRequestData = {
        id: id,
        title: title,
        description: description,
        image: image,
        deadline: deadline,
        cost_capping: cost_capping,
        customer_id: null
      }
    }
    this.http
      .put(BACKEND_URL + id, projectRequestData)
      .subscribe(response => {
        this.router.navigate(['/'])
      })
  }

  deleteProjectRequest(projectRequestId: string) {
    return this.http.delete(BACKEND_URL + projectRequestId)
  }
}
