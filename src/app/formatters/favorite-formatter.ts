import { Component, Output, EventEmitter } from '@angular/core';
import { PipeComponent } from '@sedeh/into-pipes';
 
@Component({
    selector: 'favorite-component',
    template: `
      <a class="fa" tabindex="0" 
        (keyup)="keyup($event)" 
        (click)="toggle($event)" 
        [class.fa-heart]="selected" 
        [class.selected]="selected" 
        [class.fa-heart-o]="!selected"></a>
    `,
    styles: [
        `
        a {cursor: pointer;color:#888}
        a.selected {color:pink}
        `
    ]
})
export class CustomFavoriteComponent implements PipeComponent {
  source: string;
  item: any;
  name: string;
  selected = false;
  id: string;

  @Output("onIntoComponentChange")
  onIntoComponentChange = new EventEmitter();
 
  transform(source: any, item:any, args: any[]) {
      this.source = source;
      this.item = item;
      const existing = this.getItem(this.item.catalog_number);
      this.selected = (existing !== null);
  }
  keyup(event) {
    const code = event.which;

    if (code === 13) {
      event.target.click();
    }
  }
  private addItem(id) {
    const saved = localStorage.getItem("favorite-items");
    if (saved) {
      const savedItems = JSON.parse(saved);
      savedItems.push(id);
      localStorage.setItem("favorite-items", JSON.stringify(savedItems));
    } else {
      localStorage.setItem("favorite-items", JSON.stringify([id]));
    }
  }
  private removeItem(id) {
    const saved = localStorage.getItem("favorite-items");
    if (saved) {
      const savedItems = JSON.parse(saved);
      const i = savedItems.indexOf(id);

      savedItems.splice(i, 1);
      localStorage.setItem("favorite-items", JSON.stringify(savedItems));
    }
  }
  private getItem(id) {
    const saved = localStorage.getItem("favorite-items");
    let found = null;

    if (saved) {
      const savedItems: any[] = JSON.parse(saved);
      const i = savedItems.indexOf(id);

      found = i < 0 ? null : savedItems[i];
    }
    return found;
  }
  toggle(event) {
    this.selected = !this.selected;

    if (this.selected) {
      const existing = this.getItem(this.item.catalog_number);
      if (!existing) {
        this.addItem(this.item.catalog_number)
      }
    } else {
      this.removeItem(this.item.catalog_number);
    }
    this.onIntoComponentChange.emit({
      item: this.item,
      selected: this.selected,
      action: "favotite"
    });
  }
}