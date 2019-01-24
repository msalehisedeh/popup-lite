/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
var FlexiblePreviewBoxComponent = /** @class */ (function () {
    function FlexiblePreviewBoxComponent() {
        this.aboveData = [];
        this.belowData = [];
        this.onselect = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.metadata) {
            this.metadata.map(function (data) {
                if (data.position === 'above') {
                    _this.aboveData.push(data);
                }
                else if (data.position === 'below') {
                    _this.belowData.push(data);
                }
            });
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
    };
    /**
     * @param {?} item
     * @param {?} hpath
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.itemValue = /**
     * @param {?} item
     * @param {?} hpath
     * @return {?}
     */
    function (item, hpath) {
        /** @type {?} */
        var subitem = item;
        hpath.map(function (subkey) {
            if (subitem) {
                subitem = subitem[subkey];
            }
        });
        return subitem === undefined || subitem === null || subitem === "null" ? "" : String(subitem);
    };
    /**
     * @param {?} row
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.rowContent = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        /** @type {?} */
        var content = this.itemValue(this.item, row.key.split("."));
        return (content !== undefined && content != null) ? content : '';
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.hoverOver = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.largeImage && this.effects.zoomOnHover && event.target.nodeName === 'IMG') {
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.hoverOut = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.largeImage) {
            this.largeImage.nativeElement.style.opacity = 0;
            this.largeImage.nativeElement.style.top = "-10000px";
            this.largeImage.nativeElement.style.left = "-10000px";
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.hoverViewPort = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.largeImage && this.effects.zoomOnHover) {
            this.largeImage.nativeElement.style.opacity = 1;
            this.largeImage.nativeElement.style.top = -event.layerY + "px";
            this.largeImage.nativeElement.style.left = -event.layerX + "px";
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.keyup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var code = event.which;
        if (code === 13) {
            event.target.click();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.selectItem = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onselect.emit({
            item: this.item,
            selected: true,
            action: "redirect"
        });
    };
    /**
     * @param {?} trackingTime
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.videoPlayed = /**
     * @param {?} trackingTime
     * @return {?}
     */
    function (trackingTime) {
    };
    /**
     * @param {?} trackingTime
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.videoPaused = /**
     * @param {?} trackingTime
     * @return {?}
     */
    function (trackingTime) {
    };
    /**
     * @param {?} trackingTime
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.videoEnded = /**
     * @param {?} trackingTime
     * @return {?}
     */
    function (trackingTime) {
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FlexiblePreviewBoxComponent.prototype.onComponentChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.onselect.emit(event);
    };
    FlexiblePreviewBoxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'flexible-preview-box',
                    template: "<div class=\"above-viewport\" [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of aboveData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\">\r\n        <span class=\"label\" [class.off-screen]=\"row.hidelabel\" [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" [intoName]=\"row.value\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>\r\n<div \r\n    class=\"viewport\" \r\n    tabindex=\"0\"\r\n    [title]=\"item.name\"\r\n    [style.width]=\"effects.width + 'px'\" \r\n    [style.height]=\"effects.height + 'px'\"\r\n    (keyup)=\"keyup($event)\"\r\n    (click)=\"selectItem($event)\"\r\n    (mouseout)=\"hoverOut($event)\"\r\n    (mouseover)=\"hoverOver($event)\"\r\n    (mousemove)=\"hoverViewPort($event)\">\r\n    <img  class=\"content\" \r\n            [src]=\"viewport.src.small\" \r\n            *ngIf=\"viewport.type === 'image'\" />\r\n    <img  class=\"hover\" #largeImage\r\n            [style.width]=\"(effects.width*2) + 'px'\"\r\n            [style.height]=\"(effects.height*2) + 'px'\"\r\n            [src]=\"viewport.src.large\" \r\n            *ngIf=\"effects.zoomOnHover\" />\r\n    <video  \r\n        class=\"content\" #video\r\n        [style.width]=\"effects.width + 'px'\" \r\n        [style.height]=\"effects.height + 'px'\"\r\n        (play)=\"videoPlayed(video.currentTime)\"\r\n        (pause)=\"videoPaused(video.currentTime)\"\r\n        (ended)=\"videoEnded(video.currentTime)\"\r\n        *ngIf=\"viewport.type === 'video'\" controls>\r\n        <source [src]=\"viewport.src.mp4\" type=\"video/mp4\">\r\n        <source [src]=\"viewport.src.webm\" type=\"video/webm\">\r\n        <source [src]=\"viewport.src.egg\" type=\"video/ogg\">\r\n    </video>\r\n</div>\r\n<div class=\"below-viewport\" [style.max-width]=\"effects.width ? (effects.width + 'px') : 'auto'\">\r\n    <div *ngFor=\"let row of belowData; let i = index\" \r\n        class=\"box-row\"\r\n        [style.margin-top]=\"row.spacing ? (row.spacing + 'px') : '0'\"\r\n        [class.left]=\"row.side === 'left'\"\r\n        [class.right]=\"row.side === 'right'\"\r\n        [class.center]=\"row.side === 'center'\"\r\n        [class.emphasize]=\"row.emphasize\"\r\n        [class.side-by-side]=\"row.sidebyside\">\r\n        <span class=\"label\" [class.off-screen]=\"row.hidelabel\" [textContent]=\"row.value\"></span>\r\n        <span class=\"value\" [intoName]=\"row.value\"\r\n            [intoId]=\"row.key + '-' + i\"\r\n            [into]=\"row.format\"\r\n            [intoData]=\"item\"\r\n            [rawContent]=\"rowContent(row)\"\r\n            [onComponentChange]=\"onComponentChange.bind(this)\"></span>\r\n    </div>\r\n    <div class=\"clearblock\"></div>\r\n</div>",
                    styles: [":host{background-color:#fff;border:1px solid #ced4da;box-sizing:border-box;display:table;min-height:50px;padding:0;border-radius:5px;margin:5px}:host ::ng-deep .rating{color:red}:host .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .box-row{display:flex;width:100%}:host .box-row .label{float:left;font-weight:700;margin-right:5px}:host .box-row .value{float:left}:host .box-row.left{text-align:left}:host .box-row.right .label{font-weight:700;flex:1;text-align:right}:host .box-row.center{width:inherit;display:table;margin:auto}:host .box-row.emphasize{font-weight:700;font-size:1.8rem}:host .box-row.side-by-side{max-width:250px;width:inherit;display:table;float:right;margin:0 5px}:host .above-viewport{padding:5px;box-sizing:border-box}:host .viewport{border-color:purple;box-sizing:border-box;border-top:1px solid #bcd;border-bottom:1px solid #bcd;min-height:150px;overflow:hidden;position:relative;margin:0 auto;box-sizing:border-box;cursor:pointer}:host .viewport img.content{margin:auto;display:table}:host .viewport video.content{margin:auto;display:table}:host .viewport .hover{position:absolute;background-color:#fff;top:-10000px;left:-10000px;opacity:0;pointer-events:none}:host .viewport:hover{border-color:purple}:host .below-viewport{padding:5px;box-sizing:border-box}.clearblock{clear:both;display:block;width:100%;height:0;padding:0;margin:0}:host:focus{border-color:#0ba}:host:hover{border-color:purple;box-shadow:1px 1px 11px purple}"]
                }] }
    ];
    /** @nocollapse */
    FlexiblePreviewBoxComponent.ctorParameters = function () { return []; };
    FlexiblePreviewBoxComponent.propDecorators = {
        largeImage: [{ type: ViewChild, args: ["largeImage",] }],
        onselect: [{ type: Output, args: ["onselect",] }],
        item: [{ type: Input, args: ["item",] }],
        viewport: [{ type: Input, args: ["viewport",] }],
        metadata: [{ type: Input, args: ["metadata",] }],
        effects: [{ type: Input, args: ["effects",] }]
    };
    return FlexiblePreviewBoxComponent;
}());
export { FlexiblePreviewBoxComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxleGlibGUtcHJldmlldy1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL2ZsZXhpYmxlLXByZXZpZXctYm94LyIsInNvdXJjZXMiOlsic3JjL2FwcC9mbGV4aWJsZS1wcmV2aWV3LWJveC9jb21wb25lbnRzL2ZsZXhpYmxlLXByZXZpZXctYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFHVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDOztJQThCckI7eUJBckJZLEVBQUU7eUJBQ0YsRUFBRTt3QkFNSixJQUFJLFlBQVksRUFBRTtLQWUzQjs7OztJQUVELDhDQUFROzs7SUFBUjtRQUFBLGlCQVVDO1FBVEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUcsVUFBQyxJQUFJO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQzlCLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMzQjtnQkFBQSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDM0I7YUFDRixDQUFDLENBQUE7U0FDSDtLQUNGOzs7OztJQUVELGlEQUFXOzs7O0lBQVgsVUFBWSxPQUFPO0tBRWxCOzs7Ozs7SUFFTywrQ0FBUzs7Ozs7Y0FBQyxJQUFJLEVBQUUsS0FBSzs7UUFDN0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxH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RCx1REFBaUI7Ozs7SUFBakIsVUFBa0IsS0FBSztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMzQjs7Z0JBMUdGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyw4d0dBQW9EOztpQkFFckQ7Ozs7OzZCQU1FLFNBQVMsU0FBQyxZQUFZOzJCQUd0QixNQUFNLFNBQUMsVUFBVTt1QkFHakIsS0FBSyxTQUFDLE1BQU07MkJBR1osS0FBSyxTQUFDLFVBQVU7MkJBR2hCLEtBQUssU0FBQyxVQUFVOzBCQUdoQixLQUFLLFNBQUMsU0FBUzs7c0NBckNsQjs7U0FpQmEsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdmbGV4aWJsZS1wcmV2aWV3LWJveCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLXByZXZpZXctYm94LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9mbGV4aWJsZS1wcmV2aWV3LWJveC5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVQcmV2aWV3Qm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIFxyXG4gIGFib3ZlRGF0YSA9IFtdO1xyXG4gIGJlbG93RGF0YSA9IFtdO1xyXG4gIFxyXG4gIEBWaWV3Q2hpbGQoXCJsYXJnZUltYWdlXCIpXHJcblx0cHJpdmF0ZSBsYXJnZUltYWdlOiBFbGVtZW50UmVmO1xyXG5cclxuICBAT3V0cHV0KFwib25zZWxlY3RcIilcclxuICBvbnNlbGVjdD0gbmV3IEV2ZW50RW1pdHRlcigpXHJcblxyXG4gIEBJbnB1dChcIml0ZW1cIilcclxuICBpdGVtOiBhbnk7XHJcblxyXG4gIEBJbnB1dChcInZpZXdwb3J0XCIpXHJcbiAgdmlld3BvcnQ6IGFueTtcclxuICBcclxuICBASW5wdXQoXCJtZXRhZGF0YVwiKVxyXG4gIG1ldGFkYXRhOiBhbnlbXTtcclxuXHJcbiAgQElucHV0KFwiZWZmZWN0c1wiKVxyXG4gIGVmZmVjdHM6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHQgIFxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5tZXRhZGF0YSkge1xyXG4gICAgICB0aGlzLm1ldGFkYXRhLm1hcCAoIChkYXRhKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEucG9zaXRpb24gPT09ICdhYm92ZScpIHtcclxuICAgICAgICAgIHRoaXMuYWJvdmVEYXRhLnB1c2goZGF0YSk7XHJcbiAgICAgICAgfWVsc2UgaWYgKGRhdGEucG9zaXRpb24gPT09ICdiZWxvdycpIHtcclxuICAgICAgICAgIHRoaXMuYmVsb3dEYXRhLnB1c2goZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXRlbVZhbHVlKGl0ZW0sIGhwYXRoKSB7XHJcblx0XHRsZXQgc3ViaXRlbSA9IGl0ZW07XHJcblx0XHRocGF0aC5tYXAoIChzdWJrZXkpID0+IHtcclxuXHRcdFx0aWYgKHN1Yml0ZW0pIHtcclxuXHRcdFx0XHRzdWJpdGVtID0gc3ViaXRlbVtzdWJrZXldO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIHN1Yml0ZW0gPT09IHVuZGVmaW5lZCB8fCBzdWJpdGVtID09PSBudWxsIHx8IHN1Yml0ZW0gPT09IFwibnVsbFwiID8gXCJcIiA6IFN0cmluZyhzdWJpdGVtKTtcclxuXHR9XHJcblxyXG4gIHJvd0NvbnRlbnQocm93KSB7XHJcbiAgICBsZXQgY29udGVudCA9IHRoaXMuaXRlbVZhbHVlKHRoaXMuaXRlbSwgcm93LmtleS5zcGxpdChcIi5cIikpO1xyXG4gICAgcmV0dXJuIChjb250ZW50ICE9PSB1bmRlZmluZWQgJiYgY29udGVudCAhPSBudWxsKSA/IGNvbnRlbnQgOiAnJztcclxuICB9XHJcblxyXG4gIGhvdmVyT3ZlcihldmVudCkge1xyXG5cdFx0aWYgKHRoaXMubGFyZ2VJbWFnZSAmJiB0aGlzLmVmZmVjdHMuem9vbU9uSG92ZXIgJiYgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnSU1HJykge1xyXG5cclxuICAgIH1cclxuXHR9XHJcblx0aG92ZXJPdXQoZXZlbnQpIHtcclxuXHRcdGlmICh0aGlzLmxhcmdlSW1hZ2UpIHtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IFwiLTEwMDAwcHhcIjtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IFwiLTEwMDAwcHhcIjtcclxuXHRcdH1cclxuXHR9XHJcblx0aG92ZXJWaWV3UG9ydChldmVudCkge1xyXG5cdFx0aWYgKHRoaXMubGFyZ2VJbWFnZSAmJiB0aGlzLmVmZmVjdHMuem9vbU9uSG92ZXIpIHtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IC1ldmVudC5sYXllclkgKyBcInB4XCI7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSAtZXZlbnQubGF5ZXJYICsgXCJweFwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAga2V5dXAoZXZlbnQpIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHJcbiAgICBpZiAoY29kZSA9PT0gMTMpIHtcclxuICAgICAgZXZlbnQudGFyZ2V0LmNsaWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNlbGVjdEl0ZW0oZXZlbnQpIHtcclxuICAgIHRoaXMub25zZWxlY3QuZW1pdCh7XHJcbiAgICAgIGl0ZW06IHRoaXMuaXRlbSxcclxuICAgICAgc2VsZWN0ZWQ6IHRydWUsXHJcbiAgICAgIGFjdGlvbjogXCJyZWRpcmVjdFwiXHJcbiAgICB9KTtcclxuICB9XHJcbiAgdmlkZW9QbGF5ZWQodHJhY2tpbmdUaW1lKSB7IFxyXG4gIH1cclxuICB2aWRlb1BhdXNlZCh0cmFja2luZ1RpbWUpIHtcclxuXHJcbiAgfVxyXG4gIHZpZGVvRW5kZWQodHJhY2tpbmdUaW1lKSB7XHJcblxyXG4gIH1cclxuICBvbkNvbXBvbmVudENoYW5nZShldmVudCkge1xyXG4gICAgdGhpcy5vbnNlbGVjdC5lbWl0KGV2ZW50KTtcclxuICB9XHJcbn1cclxuIl19