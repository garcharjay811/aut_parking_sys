import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, Form} from '@angular/forms'
import { ActivatedRoute, ParamMap, Router } from "@angular/router"
import { Subscription } from 'rxjs'

import { AuthService } from '../auth/auth.service'
import { AdminDashboardService } from './adminDashboard.service';
import { Sport, Institute, TeamMatch, Referee, Venue } from './adminDashboard.model'

@Component({
  selector: 'app-dashboard',
  templateUrl: './adminDashboard.component.html',
  styleUrls: ['./adminDashboard.component.css']
})
export class adminDashboardComponent implements OnInit, OnDestroy {
    isLoading = false
    authStatusSub: Subscription
    allInstitutes: Institute[] = []
    allSports: Sport[] = [];
    allVenues: Venue[] = [];
    allReferees: Referee[] = [];
    allGroups = ['League A', 'League B', 'League C', 'League D', 'Final'];
    instituteControl: FormArray;
    isTrue: boolean = false;
    sport_form: FormGroup;
    participant_form: FormGroup;
    form: FormGroup;
    referee_form: FormGroup;
    inst_form: FormGroup;
    TeamMatch_form: FormGroup;
    allTeamMatches: TeamMatch[] = []
    TeamMatchData: TeamMatch[] = [];
    i=0;
    Winners : Array<String[]> = [];
  
      constructor(
          public route: ActivatedRoute,
          private authService: AuthService,
          private adminDashbaordService: AdminDashboardService,
          private router: Router,
          private formBuilder: FormBuilder
        ) {}
      
        ngOnInit() {
          this.authStatusSub = this.authService
            .getAuthStatusListener()
            .subscribe(authStatus => {
              this.isLoading = false
            });

          this.TeamMatch_form = new FormGroup({
            institute1: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            institute2: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            sport_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            group_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            venue_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            date: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            referee_id: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            winner: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            })
          })

          this.adminDashbaordService.getSports().subscribe(requests => {
            this.allSports = requests.Sports;
            this.isLoading = false
          });
          this.adminDashbaordService.getInstitutes().subscribe(requests => {
            this.allInstitutes = requests.Institutes;
            this.isLoading = false
          });
          this.adminDashbaordService.getReferees().subscribe(requests => {
            this.allReferees = requests.Referees;
            this.isLoading = false
          });
          this.adminDashbaordService.getVenues().subscribe(requests => {
            this.allVenues = requests.Venues;
            this.isLoading = false
          });

          this.sport_form = new FormGroup({
            sport_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
              }),
            sport_type: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            })
          })

          this.participant_form = new FormGroup({
            roll_id: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            inst_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            sport_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            phone: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
            })
          })

          this.referee_form = new FormGroup({
            referee_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            sport_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            phone: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(10),  Validators.maxLength(10)]
            })
          })

          this.form = new FormGroup({
            instituteControl: this.formBuilder.array([
              this.createInstituteField(),
            ]),
            sport_name: new FormControl(null, {
            validators: [Validators.required, Validators.minLength(3)]
            }),
            group_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
              })
          })

          this.inst_form = new FormGroup({
            inst_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            address: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            so_name: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(3)]
            }),
            phone: new FormControl(null, {
              validators: [Validators.required, Validators.minLength(10),  Validators.maxLength(10)]
            })
          })

          // Get Team Matches
          this.adminDashbaordService.getTeamMatches().subscribe(teamMatchData => {
            // this.TeamMatchData = {
            //   institute1: teamMatchData.institute1,
            //   institute2: teamMatchData.institute2,
            //   sport_name: teamMatchData.sport_name,
            //   group_name: teamMatchData.group_name,
            //   venue_name: teamMatchData.venue_name,
            //   date: teamMatchData.date,
            //   referee_id: teamMatchData.referee_id,
            //   winner: teamMatchData.winner
            // };

            // this.TeamMatch_form.setValue({
            //   institute1: teamMatchData.institute1,
            //   institute2: teamMatchData.institute2,
            //   sport_name: teamMatchData.sport_name,
            //   group_name: teamMatchData.group_name
            // })

            teamMatchData.TeamMatches.map(Match => {
              console.log(Match)
              this.TeamMatchData[this.i] = {
                match_id: Match.match_id,
                institute1 : Match.institute1,
                institute2 : Match.institute2,
                sport_name : Match.sport_name,
                group_name : Match.group_name,
                venue_name: Match.venue_name,
                date: Match.date,
                referee_id: Match.referee_id,
                winner: Match.winner
              }
              this.Winners[this.i] = [Match.institute1, Match.institute2];

              this.i = this.i + 1;
            })

            this.TeamMatch_form.setValue({
                institute1: this.TeamMatchData[0] ? this.TeamMatchData[0].institute1 : null,
                institute2: this.TeamMatchData[0].institute2  ? this.TeamMatchData[0].institute2 : null,
                sport_name: this.TeamMatchData[0].sport_name  ? this.TeamMatchData[0].sport_name : null,
                group_name: this.TeamMatchData[0].group_name  ? this.TeamMatchData[0].group_name : null,
                venue_name: this.TeamMatchData[0].venue_name  ? this.TeamMatchData[0].venue_name : null,
                date: this.TeamMatchData[0].date  ? this.TeamMatchData[0].date : null,
                referee_id: this.TeamMatchData[0].referee_id  ? this.TeamMatchData[0].referee_id : null,
                winner: this.TeamMatchData[0].winner  ? this.TeamMatchData[0].winner : null
              })
          })

        }

        createInstituteField(): FormGroup {
          return this.formBuilder.group({
            institute: new FormControl('', { validators: [Validators.required] })
          })
        }
      
        addInstitute(): void {
          this.instituteControl = this.form.get('instituteControl') as FormArray
          this.instituteControl.push(this.createInstituteField())
        }
      
        removeInstitute(index) {
          this.instituteControl = this.form.get('instituteControl') as FormArray
          this.instituteControl.removeAt(index)
        }

        onAddGroupAndPopulate(){
          if (this.form.invalid) {
            return
        }
          this.adminDashbaordService.populateGroup(
            this.instituteControl.value,
            this.form.value.sport_name,
            this.form.value.group_name
          );

          this.form.reset();
        }

        onAddInstitute() {
          if (this.inst_form.invalid) {
              return
          }
          this.isLoading = true;
        this.adminDashbaordService.addInstituteAndSO(
          this.inst_form.value.inst_name,
          this.inst_form.value.address,
          this.inst_form.value.so_name,
          this.inst_form.value.phone
        );
          this.inst_form.reset();
      }

      onUpdateMatch(index) {
        console.log("HI");
        this.adminDashbaordService.updateTeamMatches(
          this.TeamMatchData[index].referee_id = this.TeamMatch_form.value.referee_id,
          this.TeamMatchData[index].venue_name = this.TeamMatch_form.value.venue_name,
          this.TeamMatchData[index].date = this.TeamMatch_form.value.date,
          this.TeamMatchData[index].winner = this.TeamMatch_form.value.winner,
          this.TeamMatchData[index].match_id,
          this.TeamMatchData[index].institute1,
          this.TeamMatchData[index].institute2,
          this.TeamMatchData[index].sport_name,
          this.TeamMatchData[index].group_name,
        )
        this.TeamMatch_form.reset();
      }

        ngOnDestroy() {
            this.authStatusSub.unsubscribe()
        }

}
