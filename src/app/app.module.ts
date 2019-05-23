import { RouterModule, Route } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatBottomSheetModule
} from '@angular/material';

import { FileDropModule } from 'ngx-file-drop';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileItemComponent } from './file-item/file-item.component';
import { FilesComponent } from './files/files.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileDetailComponent } from './file-detail/file-detail.component';
import { FileWarningBottomsheetComponent } from './file-warning-bottomsheet/file-warning-bottomsheet.component';

const routes: Array<Route> = [
  { path: '', pathMatch: 'full', component: FilesComponent },
  { path: ':name', component: FileDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FileItemComponent,
    FilesComponent,
    FileUploadComponent,
    FileDetailComponent,
    FileWarningBottomsheetComponent
  ],
  imports: [
    BrowserModule,
    FileDropModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatBottomSheetModule
  ],
  providers: [],
  entryComponents: [FileWarningBottomsheetComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
