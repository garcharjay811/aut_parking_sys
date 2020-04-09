import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard'
import { AboutComponent } from './about/about.component'
import { adminDashboardComponent } from './dashboard/adminDashboard.component'

const routes: Routes = [
  // { path: '', component: ProjectRequestListComponent },
  // { path: 'create', component: ProjectRequestCreateComponent, canActivate: [AuthGuard] },
  // { path: 'edit/:projectRequestId', component: ProjectRequestCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  // { path: 'about', component: AboutComponent},
  { path: 'dashboard', component: adminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard1', loadChildren: './dashboard/adminDashboard.module#AdminDashboardModule' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
