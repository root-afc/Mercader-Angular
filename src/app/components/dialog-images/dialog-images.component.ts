import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Clothing} from "../../models/clothing.model";

@Component({
  selector: 'app-dialog-images',
  templateUrl: './dialog-images.component.html',
  styleUrls: ['./dialog-images.component.css']
})
export class DialogImagesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogImagesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Clothing) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
