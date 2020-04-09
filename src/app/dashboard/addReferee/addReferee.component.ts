import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, Form} from '@angular/forms'
import { ActivatedRoute, ParamMap } from "@angular/router"
import { Subscription } from 'rxjs'

import { AuthService } from '../../auth/auth.service'
import { Referee } from '../adminDashboard.model'
import { AdminDashboardService } from '../adminDashboard.service'
import { Sport } from '../adminDashboard.model'

@Component({
  selector: 'app-dashboard-referee',
  templateUrl: './addReferee.component.html',
  styleUrls: ['./addReferee.component.css']
})
export class addRefereeComponent implements OnInit, OnDestroy {
    referee: Referee
    allSports: Sport[] = [];
    isLoading = false
    form: FormGroup
    private mode = 'create'
    private authStatusSub: Subscription
      constructor(
          public adminDashbaordService: AdminDashboardService,
          public route: ActivatedRoute,
          private adminService: AdminDashboardService,
          private authService: AuthService
        ) {}
      
        ngOnInit() {
          this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(authStatus => {
              this.isLoading = false
            })
          this.form = new FormGroup({
            referee_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            sport_name: new FormControl(null, { validators: [Validators.required] }),
            phone: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)] })
            });
        this.adminService.getSports().subscribe(requests => {
          this.allSports = requests.Sports;
          this.isLoading = false
        });
        }

        onAddReferee() {
            if (this.form.invalid) {
                return
            }
            this.isLoading = true
            this.adminDashbaordService.addReferee(
                this.form.value.referee_name,
                this.form.value.sport_name,
                this.form.value.phone
            );
            this.form.reset();
        }

        ngOnDestroy() {
            this.authStatusSub.unsubscribe()
        }

}

// import { Component, OnInit, OnDestroy } from '@angular/core'
// import { NgForm, FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms'
// import { Subscription } from 'rxjs'
// import { ActivatedRoute, ParamMap } from '@angular/router'
// import { AuthService } from '../auth/auth.service'

// @Component({
//   templateUrl: './assign-developer.component.html',
//   styleUrls: ['./assign-developer.component.css']
// })
// export class AssignDeveloperComponent implements OnInit {
//   constructor(public route: ActivatedRoute, private authService: AuthService, private formBuilder: FormBuilder ) {}
//   projectId
//   developers = []
//   isLoading = false
//   form: FormGroup
//   developerControl: FormArray
//   ngOnInit() {
//     this.isLoading = true
//     this.authService.getDevelopers().subscribe(developers => {
//         this.developers = developers.users
//         this.isLoading = false
//         console.log(this.developers)
//     })
//     this.route.paramMap.subscribe((paramMap: ParamMap) => {
//         if (paramMap.has('id')) {
//             this.projectId = paramMap.get('id')
//             console.log(this.projectId)
//         } else {
//             console.log('Route not permitted')
//         }
//     })
//     this.form = new FormGroup({
//       developerControl: this.formBuilder.array([
//         this.createDeveloperField()
//       ])
//     })
//   }

//   createDeveloperField(): FormGroup {
//     return this.formBuilder.group({
//       developer: new FormControl('', { validators: [Validators.required] })
//     })
//   }

//   addDeveloper(): void {
//     this.developerControl = this.form.get('developerControl') as FormArray
//     this.developerControl.push(this.createDeveloperField())
//   }

//   removeDeveloper(index) {
//     this.developerControl = this.form.get('developerControl') as FormArray
//     this.developerControl.removeAt(index)
//   }

//   onAssign() {
//     console.log(this.form.value.developerControl)
//   }
// }