import { Component } from '@angular/core';

import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-file-warning-bottomsheet',
  templateUrl: './file-warning-bottomsheet.component.html',
  styleUrls: ['./file-warning-bottomsheet.component.scss']
})
export class FileWarningBottomsheetComponent {
  constructor(
    private bottomSheet: MatBottomSheetRef<FileWarningBottomsheetComponent>
  ) {
    setTimeout(() => this.dismiss(), 5000);
  }

  // dismissing the warning window
  dismiss() {
    this.bottomSheet.dismiss();
  }
}
