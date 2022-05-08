import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'spa-post',
  templateUrl: './spa-posts.component.html',
  styleUrls: ['./spa-posts.component.sass']
})
export class SpaPostComponent implements OnInit {
  @Input() post: any;
  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  goToFullText(value:string): void {
    this._router.navigate(['fulltext', {id: this.post.id}]);
  }

}
