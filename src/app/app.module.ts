import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {MaterialExampleModule} from "../material.module";
import { TableComponent } from './components/table/table.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {MatNativeDateModule} from "@angular/material/core";
import { environment } from '../environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import { DialogComponent } from './components/dialog/dialog.component';
import {AlphanumericDirective} from "./directives/alphanumeric.directive";
import {DecimalNumberDirective} from "./directives/decimalnumber.directive";
import {NumberDirective} from "./directives/numbersonly.directive";
import { DialogEditComponent } from './components/dialog-edit/dialog-edit.component';
import {NgxDropzoneModule} from "ngx-dropzone";
import {NgxSpinnerModule} from "ngx-spinner";
import { DialogImagesComponent } from './components/dialog-images/dialog-images.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    DialogComponent,
    AlphanumericDirective,
    DecimalNumberDirective,
    NumberDirective,
    DialogEditComponent,
    DialogImagesComponent
  ],
  imports: [
    NgxSpinnerModule,
    NgxDropzoneModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
