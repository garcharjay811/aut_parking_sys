import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, Form} from '@angular/forms'
import { ActivatedRoute, ParamMap } from "@angular/router"
import { Subscription } from 'rxjs'

import { AuthService } from '../../auth/auth.service'
import { Sport } from '../adminDashboard.model'
import { AdminDashboardService } from '../adminDashboard.service'

@Component({
  selector: 'app-dashboard-group',
  templateUrl: './addGroup.component.html',
  styleUrls: ['./addGroup.component.css']
})
export class addGroupComponent implements OnInit, OnDestroy {
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
            group_name: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
            }),
            sport_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            group_winner: new FormControl(null, { validators: [Validators.required] }),
        });
        }

        onAddGroup(){
                if (this.form.invalid) {
                    return
                }
                this.isLoading = true
                this.adminDashbaordService.addGroup(
                    this.form.value.group_name,
                    this.form.value.sport_name,
                    this.form.value.group_winner
                );
        }

        ngOnDestroy() {
            this.authStatusSub.unsubscribe()
        }

}