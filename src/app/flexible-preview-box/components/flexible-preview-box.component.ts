
import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'flexible-preview-box',
  templateUrl: './flexible-preview-box.component.html',
  styleUrls: ['./flexible-preview-box.component.scss'],
})
export class FlexiblePreviewBoxComponent implements OnInit, OnChanges {
  
  aboveData = [];
  belowData = [];
  
  @ViewChild("largeImage")
	private largeImage: ElementRef;

  @Output("onselect")
  onselect= new EventEmitter()

  @Input("item")
  item: any;

  @Input("viewport")
  viewport: any;
  
  @Input("metadata")
  metadata: any[];

  @Input("effects")
  effects: any;

  constructor() {	  
  }

  ngOnInit() {
    if (this.metadata) {
      this.metadata.map ( (data) => {
        if (data.position === 'above') {
          this.aboveData.push(data);
        }else if (data.position === 'below') {
          this.belowData.push(data);
        }
      })
    }
  }

  ngOnChanges(changes) {

  }

  private itemValue(item, hpath) {
		let subitem = item;
		hpath.map( (subkey) => {
			if (subitem) {
				subitem = subitem[subkey];
			}
		})
		return subitem === undefined || subitem === null || subitem === "null" ? "" : String(subitem);
	}

  rowContent(row) {
    let content = this.itemValue(this.item, row.key.split("."));
    return (content !== undefined && content != null) ? content : '';
  }

  hoverOver(event) {
		if (this.largeImage && this.effects.zoomOnHover && event.target.nodeName === 'IMG') {

    }
	}
	hoverOut(event) {
		if (this.largeImage) {
			this.largeImage.nativeElement.style.opacity = 0;
			this.largeImage.nativeElement.style.top = "-10000px";
			this.largeImage.nativeElement.style.left = "-10000px";
		}
	}
	hoverViewPort(event) {
		if (this.largeImage && this.effects.zoomOnHover) {
			this.largeImage.nativeElement.style.opacity = 1;
			this.largeImage.nativeElement.style.top = -event.layerY + "px";
			this.largeImage.nativeElement.style.left = -event.layerX + "px";
		}
	}

  keyup(event) {
    const code = event.which;

    if (code === 13) {
      event.target.click();
    }
  }
  selectItem(event) {
    this.onselect.emit({
      item: this.item,
      selected: true,
      action: "redirect"
    });
  }
  videoPlayed(trackingTime) { 
  }
  videoPaused(trackingTime) {

  }
  videoEnded(trackingTime) {

  }
  onComponentChange(event) {
    this.onselect.emit(event);
  }
}
