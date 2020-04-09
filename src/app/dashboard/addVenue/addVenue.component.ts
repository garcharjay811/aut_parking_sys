import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, Form} from '@angular/forms'
import { ActivatedRoute, ParamMap } from "@angular/router"
import { Subscription } from 'rxjs'

import { AuthService } from '../../auth/auth.service'
import { Venue } from '../adminDashboard.model'
import { AdminDashboardService } from '../adminDashboard.service'

@Component({
  selector: 'app-dashboard-venue',
  templateUrl: './addVenue.component.html',
  styleUrls: ['./addVenue.component.css']
})
export class addVenueComponent implements OnInit, OnDestroy {
    venue: Venue
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
            venue_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            address: new FormControl(null, { validators: [Validators.required] }),
        });
        }

        onAddVenue() {
            if (this.form.invalid) {
                return
            }
            this.isLoading = true
            this.adminDashbaordService.addVenue(
                this.form.value.venue_name,
                this.form.value.address
            );
            this.form.reset();
        }

        ngOnDestroy() {
            this.authStatusSub.unsubscribe()
        }

}