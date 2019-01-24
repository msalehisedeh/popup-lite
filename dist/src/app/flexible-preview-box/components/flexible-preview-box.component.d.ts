import { OnInit, OnChanges, EventEmitter } from '@angular/core';
export declare class FlexiblePreviewBoxComponent implements OnInit, OnChanges {
    aboveData: any[];
    belowData: any[];
    private largeImage;
    onselect: EventEmitter<{}>;
    item: any;
    viewport: any;
    metadata: any[];
    effects: any;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    private itemValue(item, hpath);
    rowContent(row: any): string;
    hoverOver(event: any): void;
    hoverOut(event: any): void;
    hoverViewPort(event: any): void;
    keyup(event: any): void;
    selectItem(event: any): void;
    videoPlayed(trackingTime: any): void;
    videoPaused(trackingTime: any): void;
    videoEnded(trackingTime: any): void;
    onComponentChange(event: any): void;
}
