import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { Router } from '@angular/router'

import { environment } from '../../environments/environment'
import { Participant, Sport, Referee, Group, TeamMatch, Venue, InstituteAndSO, Populate, Institute} from './adminDashboard.model'

const BACKEND_URL = environment.apiUrl + '/admin'

@Injectable({ providedIn: 'root' })
export class AdminDashboardService {

  constructor(private http: HttpClient, private router: Router) {}

  getInstitutes() {
    return this.http.get(BACKEND_URL + '/getInstitutes').pipe(map((response: any) => response), catchError((err) => { throw err }))
  }

  getReferees() {
    return this.http.get(BACKEND_URL + '/getReferees').pipe(map((response: any) => response), catchError((err) => { throw err }))
  }

  getVenues() {
    return this.http.get(BACKEND_URL + '/getVenues').pipe(map((response: any) => response), catchError((err) => { throw err }))
  }

  getSports() {
    return this.http.get(BACKEND_URL + '/getSports').pipe(map((response: any) => response), catchError((err) => { throw err }))
  }

  getGroups() {
    return this.http.get(BACKEND_URL + '/getGroups').pipe(map((response: any) => response), catchError((err) => { throw err }))
  }

  getParticipants() {
    return this.http.get(BACKEND_URL + '/getPaticipants').pipe(map((response: any) => response), catchError((err) => { throw err }))
  }

  getInstituteByName() {
    return this.http.get(BACKEND_URL + '/getInstituteByName').pipe(map((response: any) => response), catchError((err) => { throw err }))
  }

  getTeamMatches() {
    return this.http.get(BACKEND_URL + '/getTeamMatches').pipe(map((response: any) => response), catchError((err) => { throw err }))
  }

  updateTeamMatches(referee_id: Number, venue_name: string, winner: string, date: string, match_id: Number,
                    institute1: string, institute2: string, sport_name: string, group_name: string) {
    console.log("banchod");
    this.http
      .post<{ message: string; updateTeamMatches: TeamMatch }>(
        BACKEND_URL + '/updateTeamMatch/' + match_id,
        {
            "referee_id": referee_id,
            "venue_name": venue_name,
            "winner": winner,
            "institute1": institute1,
            "institute2": institute2,
            "sport_name": sport_name,
            "date": date,
            "match_id": match_id,
            "group_name": group_name
        }
      )
      .subscribe(responseData => {
        alert('Successfully updated Match');
        this.router.navigate(['/dashboard'])
      })
  }

  populateGroup(inst_name: Array<string>, sport_name: string, group_name: string){
    this.http
      .post<{ message: string; addGroupAndPopulateGroup: Populate }>(
        BACKEND_URL + '/PopulateGroup',
        {
            "inst_name": inst_name,
            "group_name": group_name,
            "sport_name": sport_name
        }
      )
      .subscribe(responseData => {
        alert('Successfully added Group and Populated Group');
        this.router.navigate(['/dashboard'])
      })
  }

  addInstituteAndSO(inst_name: string, address: string, so_name: string, phone: Number) {
    this.http
      .post<{ message: string; institute: InstituteAndSO }>(
        BACKEND_URL + '/addInstituteAndSO',
        {
            "inst_name": inst_name,
            "address": address,
            "so_name": so_name,
            "phone": phone.toString()
        }
      )
      .subscribe(responseData => {
        alert('Successfully added Institute and Sport Officer');
        this.router.navigate(['/dashboard'])
      })
  }

  addSport(sport_name: string, sport_type: string) {
    const sportData = new FormData();
    sportData.append('sport_name', sport_name);
    sportData.append('sport_type', sport_type);
    this.http
      .post<{ message: string; sport: Sport }>(
        BACKEND_URL + '/addSport',
        {
            "sport_name": sport_name,
            "sport_type": sport_type
        }
      )
      .subscribe(responseData => {
        alert('Successfully added Sport');
        this.router.navigate(['/dashboard'])
      });
  }

  addParticipant(roll_id: string, name: string, inst_name: string, sport_name: string, phone: Number) {
    const participantData = new FormData()
    participantData.append('roll_id', roll_id)
    participantData.append('name', name)
    participantData.append('inst_name', inst_name)
    participantData.append("sport_name", sport_name)
    participantData.append('phone', phone.toString())
    this.http
      .post<{ message: string; participant: Participant }>(
        BACKEND_URL + '/addParticipant',
        {
            "roll_id": roll_id,
            "name": name,
            "inst_name": inst_name,
            "sport_name": sport_name,
            "phone": phone.toString()

        }
      )
      .subscribe(responseData => {
        alert('Successfully added Participant');
        this.router.navigate(['/dashboard'])
      })
  }

  addReferee(referee_name: string, sport_name: string, phone: Number) {
    const refereeData = new FormData()
    refereeData.append('referee_name', referee_name)
    refereeData.append("sport_name", sport_name)
    refereeData.append('phone', phone.toString())
    this.http
      .post<{ message: string; referee: Referee }>(
        BACKEND_URL + '/addReferee',
        {
            "referee_name": referee_name,
            "sport_name": sport_name,
            "phone": phone
        }
      )
      .subscribe(responseData => {
        alert('Successfully added Referee');
        this.router.navigate(['/dashboard'])
      })
  }

  addTeamMatch(match_id: Number, institute1: string, institute2: string,
               sport_name: string, group_name: string, venue_name: string, date: Date,
               referee_id: Number, winner: string) {
    const teamMatchData = new FormData()
    teamMatchData.append('match_id', match_id.toString())
    teamMatchData.append('institute1', institute1)
    teamMatchData.append("institute2", institute2)
    teamMatchData.append("group_name", group_name)
    teamMatchData.append('sport_name', sport_name)
    teamMatchData.append('venue_name', venue_name)
    teamMatchData.append('date', date.toString())
    teamMatchData.append('referee', referee_id.toString())
    teamMatchData.append('winner', winner)
    this.http
      .post<{ message: string; teamMatch: TeamMatch }>(
        BACKEND_URL + '/addTeamMatch',
        {
            "match_id": match_id.toString(),
            "institute1": institute1,
            "institute2": institute2,
            "group_name": group_name,
            "sport_name": sport_name,
            "venue_name": venue_name,
            "date": date.toString(),
            "referee_id": referee_id.toString(),
            "winner": winner
        }
      )
      .subscribe(responseData => {
        this.router.navigate(['/'])
      })
  }

  addGroup(group_winner: string, sport_name: string, group_name: string) {
    const groupData = new FormData()
    groupData.append('sport_name', sport_name)
    groupData.append("group_name", group_name)
    groupData.append('group_winner', group_winner)
    this.http
      .post<{ message: string; group: Group }>(
        BACKEND_URL + '/addGroup',
        {
            "sport_name": sport_name,
            "group_name": group_name,
            "group_winner": group_winner
        }
      )
      .subscribe(responseData => {
        this.router.navigate(['/'])
      })
  }

  addVenue(venue_name: string, address: string) {
    const venueData = new FormData()
    venueData.append('venue_name', venue_name)
    venueData.append('address', address)
    this.http
      .post<{ message: string; venue: Venue }>(
        BACKEND_URL + '/addVenue',
        {
            "venue_name": venue_name,
            "address": address
        }
      )
      .subscribe(responseData => {
        alert('Successfully added Venue');
        this.router.navigate(['/dashboard'])
      })
  }

}