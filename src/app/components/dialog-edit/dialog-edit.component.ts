import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Clothing} from "../../models/clothing.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClothingService} from "../../services/clothing.service";
import {skuValidatorOnEdit} from "../../validators/skuValidators";
import {NgxSpinnerService} from "ngx-spinner";
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})
export class DialogEditComponent implements OnInit {
  minDate: Date;
  formClothing: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Clothing, private fb: FormBuilder, private clothingService: ClothingService,
              private spinner: NgxSpinnerService) {
    dialogRef.disableClose = true;
    this.minDate = new Date();
    this.formClothing = this.fb.group({
      key: [data.key],
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      SKU: [data.SKU, [Validators.required], [skuValidatorOnEdit(clothingService, data)]],
      salePrice: [data.salePrice, Validators.required],
      offerPrice: [data.offerPrice],
      offerEndDate: [data.offerEndDate],
      images: [data.images]
    });
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async submit() {
    if (this.formClothing.invalid) {
      return;
    } else {
      const formDateControl = this.formClothing.controls['offerEndDate'];
      if (formDateControl.value instanceof Date) {
        formDateControl.setValue(formDateControl.value.getTime());
      }
      let formClothingVal = this.formClothing.value;
      let object: any = {
        name: formClothingVal.name,
        description: formClothingVal.description,
        SKU: formClothingVal.SKU,
        salePrice: formClothingVal.salePrice,
        offerPrice: formClothingVal.offerPrice,
        offerEndDate: formClothingVal.offerEndDate,
        images: formClothingVal.images
      };
      this.spinner.show();
      await this.clothingService.editData(formClothingVal.key, object).then(() => {
        this.spinner.hide();
        this.dialogRef.close();
      });
    }
  }
}
