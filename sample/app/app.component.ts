import { Component } from '@angular/core';

import { PopupLiteService } from '@sedeh/popup-lite';
import { TestModalComponent } from './test.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Popup Lite';
  myDataSet = {name: "masoud"};
  events: any[] = [];
  counter = 0;

  constructor(private popService: PopupLiteService) {
  }
 
  modalBox() {
    this.popService.openModal(TestModalComponent, "myModal" + this.counter++, this.myDataSet, {idOnHeader: true, headerIcon: "fa fa-lock"}).subscribe( 
      (success)=>{
        this.events.push(success);
      },
      (fail) => {
        this.events.push(fail);
      });
  }

  freeBox() {
    this.popService.openWindow(TestModalComponent, "myWindow" + this.counter++, this.myDataSet).subscribe( 
      (success)=>{
        this.events.push(success);
      },
      (fail) => {
        this.events.push(fail);
      });
  }

  dialogBox() {
    this.popService.openDialog(TestModalComponent, "myID" + this.counter++, this.myDataSet).subscribe( 
        (success)=>{
          this.events.push(success);
        },
        (fail) => {
          this.events.push(fail);
        });
    }

}
