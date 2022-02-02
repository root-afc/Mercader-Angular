import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClothingService} from "../../services/clothing.service";
import {skuValidatorOnCreate} from "../../validators/skuValidators";
import {Clothing} from "../../models/clothing.model";
import {NgxSpinnerService} from "ngx-spinner";
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  files: File[] = [];
  minDate: Date;
  formClothing: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, private fb: FormBuilder, private clothingService: ClothingService,
              private spinner: NgxSpinnerService) {
    dialogRef.disableClose = true;
    this.formClothing = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      SKU: ['', [Validators.required], [skuValidatorOnCreate(clothingService)]],
      salePrice: ['', [Validators.required]],
      offerPrice: [''],
      offerEndDate: ['']
    });
    this.minDate = new Date();
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.files = this.files.slice(0, 3);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  async uploadFileAndSubmit() {
    if (this.formClothing.invalid) {
      return;
    }
    this.spinner.show();
    let arrImages: Awaited<string>[] = await Promise.all(
      this.files.map((async file => {
        return await this.clothingService.uploadFile(file);
      }))
    );
    this.submit(arrImages);
  }
  async submit(arr: string[]) {
    const formDateControl = this.formClothing.controls['offerEndDate'];
    if (formDateControl.value instanceof Date) {
      formDateControl.setValue(formDateControl.value.getTime());
    }
    let obj: Clothing = this.formClothing.value;
    obj.images = arr;
    await this.clothingService.pushData(obj);
    this.spinner.hide();
    this.dialogRef.close();
  }
}


