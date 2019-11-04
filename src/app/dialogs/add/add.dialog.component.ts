import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {ServiceRequest, yelpResponse, businesses} from '../../models/issue';
import { _finally } from 'rxjs/operator/finally';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})


export class AddDialogComponent {
business : businesses;
businessArray :businesses[]=[];
serviceData : yelpResponse;
autoTicks = false;
disabled = false;
invert = false;
max = 1000;
min = 0;
showTicks = false;
step = 1;
thumbLabel = true;
value = 0;
vertical = false;
loading : Boolean =false;
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dataService: DataService) {      
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  Search(index:number,radius :number =10000){

    this.dataService.getYelpResponse(radius,this.data.serviceRequest.consumer.lat,this.data.serviceRequest.consumer.long,this.data.serviceRequest.appliance.applianceName).subscribe(data  => {
      this.serviceData =data;
    },
    err => {
      console.log(err);
    },
    ()=>{
    }
    );
  
  }
  // public confirmAdd(): void {
  //   this.dataService.addIssue(this.data);
  // }


}
