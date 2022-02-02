import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {ClothingService} from "../services/clothing.service";
import {Clothing} from "../models/clothing.model";

  export function skuValidatorOnCreate(clothingService: ClothingService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> => {
      return new Promise((resolve => {
        clothingService.findSKU(control.value).then(x => {
          if (x != null) {
            control.markAsTouched();
            resolve({skuExists: true});
          } else {
            resolve(null);
          }
        });
      }));
    }
  }
export function skuValidatorOnEdit(clothingService: ClothingService, data: Clothing): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> => {
    return new Promise((resolve => {
      clothingService.findSKU(control.value).then(x => {
        if (x != null){
          if (control.value === data.SKU) {
            resolve(null);
          } else {
            control.markAsTouched();
            resolve({skuExists: true});
          }
        }
      });
    }));
  }
}
