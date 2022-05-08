import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {SpaBodyComponent} from './spa-body/spa-body.component';
import {SpaPostComponent} from './spa-posts/spa-posts.component';
import { SpaFullPostComponent } from './spa-full-post/spa-full-post.component';
import { ErrorPageComponent } from './error-page/error-page.component';

import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    SpaBodyComponent,
    SpaPostComponent,
    SpaFullPostComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  exports: [
    SpaBodyComponent,
    ErrorPageComponent
  ]
})
export class SpaModule { }
