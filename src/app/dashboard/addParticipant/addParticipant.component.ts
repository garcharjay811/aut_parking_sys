import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, Form} from '@angular/forms'
import { ActivatedRoute, ParamMap } from "@angular/router"
import { Subscription } from 'rxjs'

import { AuthService } from '../../auth/auth.service'
import { Participant } from '../adminDashboard.model'
import { AdminDashboardService } from '../adminDashboard.service'
import { Sport, Institute } from '../adminDashboard.model'

@Component({
  selector: 'app-dashboard-participant',
  templateUrl: './addParticipant.component.html',
  styleUrls: ['./addParticipant.component.css']
})
export class addParticipantComponent implements OnInit, OnDestroy {
    allSports: Sport[] = [];
    allInstitutes: Institute[] = [];
    participant: Participant
    isLoading = false
    form: FormGroup
    private mode = 'create'
    private authStatusSub: Subscription
      constructor(
          private adminDashbaordService: AdminDashboardService,
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
            roll_id: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            name: new FormControl(null, { validators: [Validators.required] }),
            inst_name: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
              }),
            sport_name: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)]
              }),
            phone: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
              })
          });
          this.adminDashbaordService.getSports().subscribe(requests => {
            this.allSports = requests.Sports;
            this.isLoading = false
          });
          this.adminDashbaordService.getInstitutes().subscribe(requests => {
            this.allInstitutes = requests.Institutes;
            this.isLoading = false
          });
        }

        onAddParticipant() {
            if (this.form.invalid) {
                return
            }
            this.isLoading = true
            this.adminDashbaordService.addParticipant(
                this.form.value.roll_id,
                this.form.value.name,
                this.form.value.inst_name,
                this.form.value.sport_name,
                this.form.value.phone,
            );
            this.form.reset();
        }

        ngOnDestroy() {
            this.authStatusSub.unsubscribe()
        }

}