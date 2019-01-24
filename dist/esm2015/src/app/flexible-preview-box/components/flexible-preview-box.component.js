/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
export class FlexiblePreviewBoxComponent {
    constructor() {
        this.aboveData = [];
        this.belowData = [];
        this.onselect = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.metadata) {
            this.metadata.map((data) => {
                if (data.position === 'above') {
                    this.aboveData.push(data);
                }
                else if (data.position === 'below') {
                    this.belowData.push(data);
                }
            });
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
    }
    /**
     * @param {?} item
     * @param {?} hpath
     * @return {?}
     */
    itemValue(item, hpath) {
        /** @type {?} */
        let subitem = item;
        hpath.map((subkey) => {
            if (subitem) {
                subitem = subitem[subkey];
            }
        });
        return subitem === undefined || subitem === null || subitem === "null" ? "" : String(subitem);
    }
    /**
     * @param {?} row
     * @return {?}
     */
    rowContent(row) {
        /** @type {?} */
        let content = this.itemValue(this.item, row.key.split("."));
        return (content !== undefined && content != null) ? content : '';
    }
    /**
     * @param {?} event
     * @return {?}
     */
    hoverOver(event) {
        if (this.largeImage && this.effects.zoomOnHover && event.target.nodeName === 'IMG') {
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    hoverOut(event) {
        if (this.largeImage) {
            this.largeImage.nativeElement.style.opacity = 0;
            this.largeImage.nativeElement.style.top = "-10000px";
            this.largeImage.nativeElement.style.left = "-10000px";
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    hoverViewPort(event) {
        if (this.largeImage && this.effects.zoomOnHover) {
            this.largeImage.nativeElement.style.opacity = 1;
            this.largeImage.nativeElement.style.top = -event.layerY + "px";
            this.largeImage.nativeElement.style.left = -event.layerX + "px";
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyup(event) {
        /** @type {?} */
        const code = event.which;
        if (code === 13) {
            event.target.click();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    selectItem(event) {
        this.onselect.emit({
            item: this.item,
            selected: true,
            action: "redirect"
        });
    }
    /**
     * @param {?} trackingTime
     * @return {?}
     */
    videoPlayed(trackingTime) {
    }
    /**
     * @param {?} trackingTime
     * @return {?}
     */
    videoPaused(trackingTime) {
    }
    /**
     * @param {?} trackingTime
     * @return {?}
     */
    videoEnded(trackingTime) {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onComponentChange(event) {
        this.onselect.emit(event);
    }
}
FlexiblePreviewBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'flexible-preview-box',
                template: "<div class=\"above-viewport\" [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of aboveData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\">\r\n        <span class=\"label\" [class.off-screen]=\"row.hidelabel\" [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" [intoName]=\"row.value\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>\r\n<div \r\n    class=\"viewport\" \r\n    tabindex=\"0\"\r\n    [title]=\"item.name\"\r\n    [style.width]=\"effects.width + 'px'\" \r\n    [style.height]=\"effects.height + 'px'\"\r\n    (keyup)=\"keyup($event)\"\r\n    (click)=\"selectItem($event)\"\r\n    (mouseout)=\"hoverOut($event)\"\r\n    (mouseover)=\"hoverOver($event)\"\r\n    (mousemove)=\"hoverViewPort($event)\">\r\n    <img  class=\"content\" \r\n            [src]=\"viewport.src.small\" \r\n            *ngIf=\"viewport.type === 'image'\" />\r\n    <img  class=\"hover\" #largeImage\r\n            [style.width]=\"(effects.width*2) + 'px'\"\r\n            [style.height]=\"(effects.height*2) + 'px'\"\r\n            [src]=\"viewport.src.large\" \r\n            *ngIf=\"effects.zoomOnHover\" />\r\n    <video  \r\n        class=\"content\" #video\r\n        [style.width]=\"effects.width + 'px'\" \r\n        [style.height]=\"effects.height + 'px'\"\r\n        (play)=\"videoPlayed(video.currentTime)\"\r\n        (pause)=\"videoPaused(video.currentTime)\"\r\n        (ended)=\"videoEnded(video.currentTime)\"\r\n        *ngIf=\"viewport.type === 'video'\" controls>\r\n        <source [src]=\"viewport.src.mp4\" type=\"video/mp4\">\r\n        <source [src]=\"viewport.src.webm\" type=\"video/webm\">\r\n        <source [src]=\"viewport.src.egg\" type=\"video/ogg\">\r\n    </video>\r\n</div>\r\n<div class=\"below-viewport\" [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of belowData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\">\r\n        <span class=\"label\" [class.off-screen]=\"row.hidelabel\" [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" [intoName]=\"row.value\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>",
                styles: [":host{background-color:#fff;border:1px solid #ced4da;box-sizing:border-box;display:table;min-height:50px;padding:0;border-radius:5px;margin:5px}:host ::ng-deep .rating{color:red}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .box-row{display:flex;width:100%}:host .box-row .label{float:left;font-weight:700;margin-right:5px}:host .box-row .value{float:left}:host .box-row.left{text-align:left}:host .box-row.right .label{font-weight:700;flex:1;text-align:right}:host .box-row.center{width:inherit;display:table;margin:auto}:host .box-row.emphasize{font-weight:700;font-size:1.8rem}:host .box-row.side-by-side{max-width:250px;width:inherit;display:table;float:right;margin:0 5px}:host .above-viewport{padding:5px;box-sizing:border-box}:host .viewport{border-color:purple;box-sizing:border-box;border-top:1px solid #bcd;border-bottom:1px solid #bcd;min-height:150px;overflow:hidden;position:relative;margin:0 auto;box-sizing:border-box;cursor:pointer}:host .viewport img.content{margin:auto;display:table}:host .viewport video.content{margin:auto;display:table}:host .viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}:host .viewport:hover{border-color:purple}:host .below-viewport{padding:5px;box-sizing:border-box}.clearblock{clear:both;display:block;width:100%;height:0;padding:0;margin:0}:host:focus{border-color:#0ba}:host:hover{border-color:purple;box-shadow:1px 1px 11px purple}"]
            }] }
];
/** @nocollapse */
FlexiblePreviewBoxComponent.ctorParameters = () => [];
FlexiblePreviewBoxComponent.propDecorators = {
    largeImage: [{ type: ViewChild, args: ["largeImage",] }],
    onselect: [{ type: Output, args: ["onselect",] }],
    item: [{ type: Input, args: ["item",] }],
    viewport: [{ type: Input, args: ["viewport",] }],
    metadata: [{ type: Input, args: ["metadata",] }],
    effects: [{ type: Input, args: ["effects",] }]
};
if (false) {
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.aboveData;
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.belowData;
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.largeImage;
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.onselect;
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.item;
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.viewport;
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.metadata;
    /** @type {?} */
    FlexiblePreviewBoxComponent.prototype.effects;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtcHJldmlldy1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZsZXhpYmxlLXByZXZpZXctYm94LyIsInNvdXJjZXMiOlsic3JjL2FwcC9mbGV4aWJsZS1wcmV2aWV3LWJveC9jb21wb25lbnRzL2ZsZXhpYmxlLXByZXZpZXctYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFHVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBT3ZCLE1BQU07SUF1Qko7eUJBckJZLEVBQUU7eUJBQ0YsRUFBRTt3QkFNSixJQUFJLFlBQVksRUFBRTtLQWUzQjs7OztJQUVELFFBQVE7UUFDTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMzQjtnQkFBQSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDM0I7YUFDRixDQUFDLENBQUE7U0FDSDtLQUNGOzs7OztJQUVELFdBQVcsQ0FBQyxPQUFPO0tBRWxCOzs7Ozs7SUFFTyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUs7O1FBQzdCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztRQUNuQixLQUFLLENBQUMsR0FBRyxDQUFFLENBQUMs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QUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsOHdHQUFvRDs7YUFFckQ7Ozs7O3lCQU1FLFNBQVMsU0FBQyxZQUFZO3VCQUd0QixNQUFNLFNBQUMsVUFBVTttQkFHakIsS0FBSyxTQUFDLE1BQU07dUJBR1osS0FBSyxTQUFDLFVBQVU7dUJBR2hCLEtBQUssU0FBQyxVQUFVO3NCQUdoQixLQUFLLFNBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBPbkluaXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIElucHV0LFxyXG4gIE91dHB1dCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZmxleGlibGUtcHJldmlldy1ib3gnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9mbGV4aWJsZS1wcmV2aWV3LWJveC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZmxleGlibGUtcHJldmlldy1ib3guY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEZsZXhpYmxlUHJldmlld0JveENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBcclxuICBhYm92ZURhdGEgPSBbXTtcclxuICBiZWxvd0RhdGEgPSBbXTtcclxuICBcclxuICBAVmlld0NoaWxkKFwibGFyZ2VJbWFnZVwiKVxyXG5cdHByaXZhdGUgbGFyZ2VJbWFnZTogRWxlbWVudFJlZjtcclxuXHJcbiAgQE91dHB1dChcIm9uc2VsZWN0XCIpXHJcbiAgb25zZWxlY3Q9IG5ldyBFdmVudEVtaXR0ZXIoKVxyXG5cclxuICBASW5wdXQoXCJpdGVtXCIpXHJcbiAgaXRlbTogYW55O1xyXG5cclxuICBASW5wdXQoXCJ2aWV3cG9ydFwiKVxyXG4gIHZpZXdwb3J0OiBhbnk7XHJcbiAgXHJcbiAgQElucHV0KFwibWV0YWRhdGFcIilcclxuICBtZXRhZGF0YTogYW55W107XHJcblxyXG4gIEBJbnB1dChcImVmZmVjdHNcIilcclxuICBlZmZlY3RzOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1x0ICBcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgaWYgKHRoaXMubWV0YWRhdGEpIHtcclxuICAgICAgdGhpcy5tZXRhZGF0YS5tYXAgKCAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhLnBvc2l0aW9uID09PSAnYWJvdmUnKSB7XHJcbiAgICAgICAgICB0aGlzLmFib3ZlRGF0YS5wdXNoKGRhdGEpO1xyXG4gICAgICAgIH1lbHNlIGlmIChkYXRhLnBvc2l0aW9uID09PSAnYmVsb3cnKSB7XHJcbiAgICAgICAgICB0aGlzLmJlbG93RGF0YS5wdXNoKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXMpIHtcclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGl0ZW1WYWx1ZShpdGVtLCBocGF0aCkge1xyXG5cdFx0bGV0IHN1Yml0ZW0gPSBpdGVtO1xyXG5cdFx0aHBhdGgubWFwKCAoc3Via2V5KSA9PiB7XHJcblx0XHRcdGlmIChzdWJpdGVtKSB7XHJcblx0XHRcdFx0c3ViaXRlbSA9IHN1Yml0ZW1bc3Via2V5XTtcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdHJldHVybiBzdWJpdGVtID09PSB1bmRlZmluZWQgfHwgc3ViaXRlbSA9PT0gbnVsbCB8fCBzdWJpdGVtID09PSBcIm51bGxcIiA/IFwiXCIgOiBTdHJpbmcoc3ViaXRlbSk7XHJcblx0fVxyXG5cclxuICByb3dDb250ZW50KHJvdykge1xyXG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLml0ZW1WYWx1ZSh0aGlzLml0ZW0sIHJvdy5rZXkuc3BsaXQoXCIuXCIpKTtcclxuICAgIHJldHVybiAoY29udGVudCAhPT0gdW5kZWZpbmVkICYmIGNvbnRlbnQgIT0gbnVsbCkgPyBjb250ZW50IDogJyc7XHJcbiAgfVxyXG5cclxuICBob3Zlck92ZXIoZXZlbnQpIHtcclxuXHRcdGlmICh0aGlzLmxhcmdlSW1hZ2UgJiYgdGhpcy5lZmZlY3RzLnpvb21PbkhvdmVyICYmIGV2ZW50LnRhcmdldC5ub2RlTmFtZSA9PT0gJ0lNRycpIHtcclxuXHJcbiAgICB9XHJcblx0fVxyXG5cdGhvdmVyT3V0KGV2ZW50KSB7XHJcblx0XHRpZiAodGhpcy5sYXJnZUltYWdlKSB7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBcIi0xMDAwMHB4XCI7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBcIi0xMDAwMHB4XCI7XHJcblx0XHR9XHJcblx0fVxyXG5cdGhvdmVyVmlld1BvcnQoZXZlbnQpIHtcclxuXHRcdGlmICh0aGlzLmxhcmdlSW1hZ2UgJiYgdGhpcy5lZmZlY3RzLnpvb21PbkhvdmVyKSB7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAxO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSAtZXZlbnQubGF5ZXJZICsgXCJweFwiO1xyXG5cdFx0XHR0aGlzLmxhcmdlSW1hZ2UubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gLWV2ZW50LmxheWVyWCArIFwicHhcIjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG4gIGtleXVwKGV2ZW50KSB7XHJcbiAgICBjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XHJcblxyXG4gICAgaWYgKGNvZGUgPT09IDEzKSB7XHJcbiAgICAgIGV2ZW50LnRhcmdldC5jbGljaygpO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZWxlY3RJdGVtKGV2ZW50KSB7XHJcbiAgICB0aGlzLm9uc2VsZWN0LmVtaXQoe1xyXG4gICAgICBpdGVtOiB0aGlzLml0ZW0sXHJcbiAgICAgIHNlbGVjdGVkOiB0cnVlLFxyXG4gICAgICBhY3Rpb246IFwicmVkaXJlY3RcIlxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHZpZGVvUGxheWVkKHRyYWNraW5nVGltZSkgeyBcclxuICB9XHJcbiAgdmlkZW9QYXVzZWQodHJhY2tpbmdUaW1lKSB7XHJcblxyXG4gIH1cclxuICB2aWRlb0VuZGVkKHRyYWNraW5nVGltZSkge1xyXG5cclxuICB9XHJcbiAgb25Db21wb25lbnRDaGFuZ2UoZXZlbnQpIHtcclxuICAgIHRoaXMub25zZWxlY3QuZW1pdChldmVudCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==