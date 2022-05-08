import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import {HttpsService} from '../Services/https.service'
import {SortResolveService} from '../Services/sort-resolve.service'
import {fromEvent} from 'rxjs';
import {map, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'spa-body',
  templateUrl: './spa-body.component.html',
  styleUrls: ['./spa-body.component.sass']
})

export class SpaBodyComponent implements AfterViewInit {
  @ViewChild("search") search: ElementRef;
  stream$: any;
  data: Record<string, any>[] = [];
  key: string = '';
  progress: boolean = false;
  constructor(public httpsService: HttpsService, public sortResolveService: SortResolveService) {

   }
  ngOnInit() {
    this.data = this.sortResolveService.getData();
    this.key = this.sortResolveService.getKey();
  }

  ngAfterViewInit(): void {
    this.stream$ = fromEvent(this.search.nativeElement, 'input').pipe(
      map(e => e['target'].value),
      debounceTime(1000),
      distinctUntilChanged(),
      tap(()=>{this.progress = true}),
      tap((value) => this.sortResolveService.setKey(value)),
      switchMap((value) => this.httpsService.getValue(value as string)),
      map((value) => this.sortResolveService.sortAndSarchKeyArr(value)),
      tap(()=>{this.progress = false})
    ).subscribe(val=> {
      this.data = val;
    })
    if(this.key)this.search.nativeElement.value = this.key;
  }



  ngOnDestroy(): void {
    this.stream$.unsubscribe();
  }

}
