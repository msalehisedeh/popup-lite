import { Component } from '@angular/core';

import { PopupLiteService } from './popup-lite/injectables/popup-lite.service';
import { PopupLiteContentComponent } from './popup-lite/interfaces/popup-lite.interface';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestModalComponent implements PopupLiteContentComponent {
 
  data: any;
  id: string;

  constructor(private popService: PopupLiteService) {
  }
 
  cancel() {
    this.popService.cancel(this.id, {issue: "none"});
  }
  confirm() {
    this.popService.confirm(this.id, {issue: "none"});
  }
}
