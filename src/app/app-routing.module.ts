import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteInfoComponent } from './site-info/site-info.component';

const routes: Routes = [
  { path: 'site-info', component: SiteInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
