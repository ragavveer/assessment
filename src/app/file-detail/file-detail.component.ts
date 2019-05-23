import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormControl } from '@angular/forms';

import { FileService } from './../file.service';

import { switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.scss']
})
export class FileDetailComponent {
  searchCategory = new FormControl('');
  enableAdvanceSearch = false;
  dataSource: MatTableDataSource<{}>;
  dataSourceCopy: Array<{}>;
  displayedColumns: Array<string>;
  fileName: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService
  ) {
    this.route.paramMap
      .pipe(switchMap(params => this.fileService.getFile(params.get('name'))))
      .subscribe(result => {
        if (result) {
          this.fileName = result.name;
          this.displayedColumns = result.headers;
          this.searchCategory.setValue(this.displayedColumns[0]);
          this.dataSource = new MatTableDataSource(result.data);
          this.dataSourceCopy = result.data;
        }
      });
  }

  // navigate to home page
  goHome() {
    this.router.navigate(['']);
  }

  // performing filter in the file values
  filterFile(value: string) {
    if (!this.enableAdvanceSearch) { // total search
      this.dataSource.filter = value.trim().toLowerCase();
    } else { // field level search
      this.dataSource.data = this.dataSourceCopy.filter(item => {
        return (item[this.searchCategory.value] as string).toLowerCase().includes(value.toLowerCase());
      });
    }
  }

  // enable or disable the advance search
  handleToggle() {
    this.enableAdvanceSearch = !this.enableAdvanceSearch;
  }
}
