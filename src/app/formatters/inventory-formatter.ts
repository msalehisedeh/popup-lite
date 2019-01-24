import { Component, Output, EventEmitter } from '@angular/core';
import { PipeComponent } from '@sedeh/into-pipes';
 
@Component({
    selector: 'inventory-component',
    template: `
      <span class='label' [textContent]="title"></span>
      <span [textContent]="source"></span>
    `,
    styles: [
        `
        .label {
          font-weight: bold;
          margin-right: 5px;
        }
        `
    ]
})
export class CustomInventoryComponent implements PipeComponent {
    source: any;
    name: string;
    title: string;
    id: string;
 
    @Output("onIntoComponentChange")
    onIntoComponentChange = new EventEmitter();
 
    transform(source: any, item:any, args: any[]) {
      const n = (typeof source === 'number') ? source : parseInt(source);

      if (n > 0) {
        this.title = "In Stock Items: "
      } else if (n < 1) {
        this.title = "Pre Orders: "
      }
      this.source = Math.abs(n);
  }
}