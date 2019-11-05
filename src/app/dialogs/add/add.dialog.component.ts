import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {ServiceRequest, yelpResponse, businesses, yelpRequest} from '../../models/issue';
import { _finally } from 'rxjs/operator/finally';
import {DeleteDialogComponent} from '../delete/delete.dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})


export class AddDialogComponent implements OnInit {
business : businesses;
businessArray :businesses[]=[];
serviceData : yelpResponse;
autoTicks = false;
disabled = false;
invert = false;
max = 10000;
min = 500;
showTicks = false;
step = 1;
thumbLabel = true;
value = 500;
vertical = false;
loading : Boolean =false;
requestId : number =0;
yelpRequest :yelpRequest;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: DataService, public dialog: MatDialog,) {    
                this.requestId =data.id;
                this.yelpRequest =new yelpRequest();  
                this.yelpRequest.radius = 200;
                this.yelpRequest.lat = this.data.serviceRequest.consumer.lat;
                this.yelpRequest.long=this.data.serviceRequest.consumer.long
                this.yelpRequest.applianceName= this.data.serviceRequest.appliance.applianceName//Default
               }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
  // emppty stuff
  }
  ngOnInit() {
  this.Search(500); //Default Value
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  Search(value :number){
    this.yelpRequest.radius =value;
    this.dataService.getYelpResponse(this.yelpRequest.radius,this.yelpRequest.lat,this.yelpRequest.long,this.yelpRequest.applianceName).subscribe(data  => {
      console.log(JSON.stringify(this.yelpRequest));
      this.serviceData =data;
    },
    err => {
      console.log(err);
    },
    ()=>{
    }
    );
  
  }

assignServicePerson(data :any){
console.log(data);
    this.dataService.assignServicePerson( this.requestId,data.name,data.location.city,data.display_phone).subscribe(data=>{
      console.log('inside assignServicePerson='+data);
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        height: '50vh',
        width: '50vw'
      });
    }) 
  }
}
