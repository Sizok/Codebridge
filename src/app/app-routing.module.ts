import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SpaBodyComponent} from '../spa/spa-body/spa-body.component';
import { SpaFullPostComponent } from '../spa/spa-full-post/spa-full-post.component';
import { ErrorPageComponent } from '../spa/error-page/error-page.component';

const routes: Routes = [
  {path: '', component: SpaBodyComponent, pathMatch: 'full'},
  {path: 'fulltext', component: SpaFullPostComponent},
  {path: '**', component: ErrorPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
