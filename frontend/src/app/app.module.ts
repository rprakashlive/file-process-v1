import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileProcessComponent } from './user/file-process/file-process.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { FileViewerComponent } from './user/file-viewer/file-viewer.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    AppComponent,
    FileProcessComponent,
    FileViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxFileDropModule,
    NgxJsonViewerModule,
    NgxSpinnerModule,
    PaginationModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
