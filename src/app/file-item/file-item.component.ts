import { Router } from '@angular/router';
import { FileData } from './../file-data';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss']
})
export class FileItemComponent {
  @Input() file: FileData;
  @Output() deleteFile: EventEmitter<FileData> = new EventEmitter<FileData>();
  constructor(private router: Router) {}

  // deleting the file from application state
  delete() {
    this.deleteFile.emit(this.file);
  }

  openFile() {
    if (this.file) {
      this.router.navigate(['', this.file.name]);
    }
  }
}
