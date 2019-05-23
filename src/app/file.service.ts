import { Injectable } from '@angular/core';

import { FileData } from './file-data';

import { find } from 'lodash';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  // application state
  files: Array<FileData> = [];

  // get a specific file from application state
  getFile(fileName: string): Observable<FileData> {
    const file = find(this.files, ['name', fileName]);
    return of(file);
  }

  // get all the files from application state
  getFiles(): Observable<Array<FileData>> {
    return of(this.files);
  }

  // add a specific file to application state
  addFile(file: FileData): Observable<Array<FileData>> {
    this.files = [...this.files, file];
    return of(this.files);
  }

  // delete a specific file from application state
  deleteFile(file: FileData): Observable<Array<FileData>> {
    this.files = this.files.filter(item => !find([file], item));
    return of(this.files);
  }
}
