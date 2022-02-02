import { Component, OnInit } from '@angular/core';
import { Clothing } from "../../models/clothing.model";
import { ClothingService } from "../../services/clothing.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../dialog/dialog.component";
import Swal from 'sweetalert2';
import { DialogEditComponent } from "../dialog-edit/dialog-edit.component";
import { DialogImagesComponent } from "../dialog-images/dialog-images.component";
import { MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  DATA: Clothing[] = [];

  constructor(private clothingService: ClothingService, public dialog: MatDialog) {
    this.clothingService.getData().subscribe((value: []) => {
      // @ts-ignore
      this.DATA = value.map((x: any) => {
        var date;
        if (x.data.offerEndDate > 0) {
          date = new Date(x.data.offerEndDate);
        }
        return {
          key: x.key, name: x.data.name, description: x.data.description,
          SKU: x.data.SKU, salePrice: x.data.salePrice,
          offerPrice: x.data.offerPrice, offerEndDate: date,
          images: x.data.images
        };
      });
    });
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  editDialog(i: Clothing): void {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '500px',
      data: i
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  delete(key: string) {
    Swal.fire({
      icon: 'question',
      title: '¿Are you sure you want to delete the item?',
      showConfirmButton: true,
      showCancelButton: true
    }).then((r) => {
      if (r.isConfirmed) {
        this.clothingService.deleteData(key).catch(err => console.log(err));
      }
    })
  }

  validDate(value: Clothing) {
    if (value.offerEndDate instanceof Date) {
      return true;
    } else {
      return false;
    }
  }

  imagesDialog(i: Clothing) {
    const dialogRef = this.dialog.open(DialogImagesComponent, {
      width: '500px',
      data: i
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
