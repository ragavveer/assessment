import { FileService } from './../file.service';
import { FileData } from './../file-data';
import { Component } from '@angular/core';

import * as csvToJson from 'csvtojson';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent {
  files: Array<FileData> = [];

  constructor(private fileService: FileService) {
    this.fileService.getFiles().subscribe(result => (this.files = [...result]));
  }

  // adding the file to the application state
  addFile(file: FileData) {
    this.fileService
      .addFile(file)
      .subscribe(result => (this.files = [...result]));
  }

  // deleting the file from application state
  deleteFile(file: FileData) {
    this.fileService
      .deleteFile(file)
      .subscribe(result => (this.files = [...result]));
  }

  // Processing the file after the upload
  handleFile(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const name = file.name;
        let headers = (reader.result as string).split('\n')[0].split(',');
        headers = headers.map(header => header.replace(/\"/g, '').trim());
        csvToJson()
          .fromString(reader.result as string)
          .then((data: Array<any>) => {
            this.addFile({
              name,
              headers,
              data
            });
          });
      };
      reader.readAsBinaryString(file);
    }
  }
}
