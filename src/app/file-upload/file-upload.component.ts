import { Component, Output, EventEmitter } from '@angular/core';
import { FileWarningBottomsheetComponent } from './../file-warning-bottomsheet/file-warning-bottomsheet.component';

import { UploadEvent, FileSystemFileEntry } from 'ngx-file-drop';

import * as csvToJson from 'csvtojson';

import { FileData } from './../file-data';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Output() addFile: EventEmitter<FileData> = new EventEmitter<FileData>();

  constructor(private bottomSheet: MatBottomSheet) {}

  // handle dropped files processing
  dropped(event: UploadEvent) {
    for (const droppedFile of event.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        if (!fileEntry.name.toLowerCase().includes('.csv')) {
          // warning for files other than csv
          this.bottomSheet.open(FileWarningBottomsheetComponent);
        } else {
          fileEntry.file((file: File) => {
            this.readFile(file);
          });
        }
      }
    }
  }

  // handle fileOver the drag and drop component
  fileOver(event) {}

  // handle fileLeave the drag and drop component
  fileLeave(event) {}

  // file processing after dragged.
  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const name = file.name;
      let headers = (reader.result as string).split('\n')[0].split(',');
      headers = headers.map(header => header.replace(/\"/g, '').trim());
      csvToJson()
        .fromString(reader.result as string)
        .then((data: Array<any>) => {
          this.saveFileData({
            name,
            headers,
            data
          });
        });
    };
    reader.readAsText(file);
  }

  // saving the file into application state
  saveFileData(file: FileData) {
    this.addFile.emit(file);
  }
}
