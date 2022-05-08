import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {HttpsService} from '../Services/https.service'

@Component({
  selector: 'app-spa-full-post',
  templateUrl: './spa-full-post.component.html',
  styleUrls: ['./spa-full-post.component.sass']
})
export class SpaFullPostComponent implements OnInit {
  private name: any;
  data: any;
  constructor(private route: ActivatedRoute, private r:Router, private http: HttpsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((value)=>{
      this.name = value;
    });
    this.http.getFullPost(this.name.id).subscribe(
      (value)=>{
          this.data = value;
      }
    );

  }
  goToHome(){
    this.r.navigate(['']);
  }
}
