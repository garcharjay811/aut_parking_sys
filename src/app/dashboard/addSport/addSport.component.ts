import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, Form} from '@angular/forms'
import { ActivatedRoute, ParamMap } from "@angular/router"
import { Subscription } from 'rxjs'

import { AuthService } from '../../auth/auth.service'
import { Sport } from '../adminDashboard.model'
import { AdminDashboardService } from '../adminDashboard.service'

@Component({
  selector: 'app-dashboard-sport',
  templateUrl: './addSport.component.html',
  styleUrls: ['./addSport.component.css']
})
export class addSportComponent implements OnInit, OnDestroy {
    sport: Sport
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
            sport_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            sport_type: new FormControl(null, { validators: [Validators.required] }),
        });
        }

        onAddSport() {
            if (this.form.invalid) {
                return
            }
            this.isLoading = true
            this.adminDashbaordService.addSport(
                this.form.value.sport_name,
                this.form.value.sport_type
            );
            this.form.reset();
        }

        ngOnDestroy() {
            this.authStatusSub.unsubscribe()
        }

}