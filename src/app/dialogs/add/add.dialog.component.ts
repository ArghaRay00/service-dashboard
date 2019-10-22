import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';
import {FormControl, Validators} from '@angular/forms';
import {ServiceRequest} from '../../models/issue';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add/add.dialog.html',
  styleUrls: ['../../dialogs/add/add.dialog.css']
})


export class AddDialogComponent {
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
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ServiceRequest,
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

  Search(){
    this.dataService.getYelpResponse().subscribe(data => {
      console.log(data)
    });
  }
  // public confirmAdd(): void {
  //   this.dataService.addIssue(this.data);
  // }


}
