import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, Form} from '@angular/forms'
import { ActivatedRoute, ParamMap } from "@angular/router"
import { Subscription } from 'rxjs'

import { AuthService } from '../../auth/auth.service'
import { InstituteAndSO } from '../adminDashboard.model'
import { AdminDashboardService } from '../adminDashboard.service'

@Component({
  selector: 'app-dashboard-institute',
  templateUrl: './addInstitute.component.html',
  styleUrls: ['./addInstitute.component.css']
})
export class addInstituteComponent implements OnInit, OnDestroy {
    isLoading = false
    form: FormGroup
    private mode = 'create'
    private authStatusSub: Subscription
      constructor(
          public adminDashbaordService: AdminDashboardService,
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
            inst_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            address: new FormControl(null, { validators: [Validators.required] }),
            so_name: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
              }),
            phone: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
              })
          });
        }

        onAddInstitute() {
            if (this.form.invalid) {
                return
            }
            this.isLoading = true;
          this.adminDashbaordService.addInstituteAndSO(
            this.form.value.inst_name,
            this.form.value.address,
            this.form.value.so_name,
            this.form.value.phone
          );
            this.form.reset();
        }

        ngOnDestroy() {
            this.authStatusSub.unsubscribe()
        }

}