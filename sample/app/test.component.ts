import { Component } from '@angular/core';

import { PopupLiteService, PopupLiteContentComponent } from '@sedeh/popup-lite';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestModalComponent implements PopupLiteContentComponent {
 
  data: any;
  id!: string;
  pageTitle = "Component";

  constructor(private popService: PopupLiteService) {
  }
 
  popupTitle(id: any) {
    return this.pageTitle + ' ' + id;
  }

  cancel() {
    this.popService.cancel(this.id, {issue: "none"});
  }
  confirm() {
    this.popService.confirm(this.id, {issue: "none"});
  }
}
