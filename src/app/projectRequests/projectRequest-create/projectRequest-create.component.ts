import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Subscription } from 'rxjs'

import { ProjectRequestsService } from '../projectRequests.service'
import { ProjectRequest } from '../projectRequest.model'
import { mimeType } from './mime-type.validator'
import { AuthService } from '../../auth/auth.service'

@Component({
  selector: 'app-project-request-create',
  templateUrl: './projectRequest-create.component.html',
  styleUrls: ['./projectRequest-create.component.css']
})
export class ProjectRequestCreateComponent implements OnInit, OnDestroy {
  enteredTitle = ''
  enteredContent = ''
  projectRequest: ProjectRequest
  isLoading = false
  form: FormGroup
  imagePreview: string
  private mode = 'create'
  private projectRequestId: string
  private authStatusSub: Subscription

  constructor(
    public projectRequestsService: ProjectRequestsService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false
      })
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      deadline: new FormControl(),
      cost_capping: new FormControl(0, { validators: [Validators.required] }),
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectRequestId')) {
        this.mode = 'edit'
        this.projectRequestId = paramMap.get('projectRequestId')
        this.isLoading = true
        this.projectRequestsService.getProjectRequest(this.projectRequestId).subscribe(projectRequestData => {
          // console.log('projectRequestData', projectRequestData)
          this.isLoading = false
          this.projectRequest = {
            id: projectRequestData._id,
            title: projectRequestData.title,
            description: projectRequestData.description,
            deadline: projectRequestData.deadline,
            image: projectRequestData.image,
            customer_id: projectRequestData.customer_id,
            cost_capping: projectRequestData.cost_capping
          }
          this.form.setValue({
            title: this.projectRequest.title,
            description: this.projectRequest.description,
            image: this.projectRequest.image,
            deadline: this.projectRequest.deadline,
            cost_capping: this.projectRequest.cost_capping
          })
        })
      } else {
        this.mode = 'create'
        this.projectRequestId = null
      }
    })
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({ image: file })
    this.form.get('image').updateValueAndValidity()
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = <string>reader.result
    }
    reader.readAsDataURL(file)
  }

  onSaveProjectRequest() {
    if (this.form.invalid) {
      return
    }
    this.isLoading = true
    if (this.mode === 'create') {
      this.projectRequestsService.addProjectRequest(
        this.form.value.title,
        this.form.value.description,
        this.form.value.image,
        this.form.value.deadline,
        this.form.value.cost_capping
      )
    } else {
      this.projectRequestsService.updateProjectRequest(
        this.projectRequestId,
        this.form.value.title,
        this.form.value.description,
        this.form.value.image,
        this.form.value.deadline,
        this.form.value.cost_capping
      )
    }
    this.form.reset()
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe()
  }
}
