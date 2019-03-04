import { Component, OnInit } from '@angular/core';
import { SharedService } from './../services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public allusers : any;
  public msg : any;
  public success  = false;
  public showModal = false;

  constructor(private share : SharedService ) { }

  ngOnInit() {
   this.getAllUserData();
  }

  getAllUserData(){
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

  clickMethod(name: string, id) {
    const body = {
      id: id
    };
    if(confirm("Are you sure to delete "+name)) {
      this.share.postDataToService('delete',body)
      .subscribe(
        (res:any) => {
          try {
            if(res.status){
              this.success = true;
              this.msg = res.msg;
              setTimeout(() => { this.success = false; }, 2500);
              this.getAllUserData();
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
  }
  
}
