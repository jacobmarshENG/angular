import { Component, OnInit } from '@angular/core';
import { SharedService } from './../services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public allusers : any;
  constructor(private share : SharedService ) { }

  ngOnInit() {
    this.share.getDataToService('allusers')
      .subscribe(
        (res:any) => {
          try {
            if(res.status){
              this.allusers = res.data;
            }else{
              console.log('error to getting data');
            }
          } catch (e) {
            console.log('Success Exception DashboardComponent sharedService' + e);
          }
        },
        err => {
          try {
            console.log('Error :' + err);
          } catch (e) {
            console.log('Error Exception DashboardComponent sharedService ' + e);
          }
        }
      );
  }
  changeStatus(val){
    console.log(val);
  }
}
