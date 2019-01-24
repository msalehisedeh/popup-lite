import { Component, Input, Output, ViewChild, EventEmitter, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntoPipeModule } from '@sedeh/into-pipes';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class FlexiblePreviewBoxComponent {
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
        if (this.largeImage && this.effects.zoomOnHover && event.target.nodeName === 'IMG') ;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class FlexiblePreviewBoxModule {
}
FlexiblePreviewBoxModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    IntoPipeModule
                ],
                declarations: [
                    FlexiblePreviewBoxComponent
                ],
                exports: [
                    FlexiblePreviewBoxComponent
                ],
                entryComponents: [],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { FlexiblePreviewBoxComponent, FlexiblePreviewBoxModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtZmxleGlibGUtcHJldmlldy1ib3guanMubWFwIiwic291cmNlcyI6WyJuZzovL0BzZWRlaC9mbGV4aWJsZS1wcmV2aWV3LWJveC9zcmMvYXBwL2ZsZXhpYmxlLXByZXZpZXctYm94L2NvbXBvbmVudHMvZmxleGlibGUtcHJldmlldy1ib3guY29tcG9uZW50LnRzIiwibmc6Ly9Ac2VkZWgvZmxleGlibGUtcHJldmlldy1ib3gvc3JjL2FwcC9mbGV4aWJsZS1wcmV2aWV3LWJveC9mbGV4aWJsZS1wcmV2aWV3LWJveC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIE9uSW5pdCxcclxuICBPbkNoYW5nZXMsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdmbGV4aWJsZS1wcmV2aWV3LWJveCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2ZsZXhpYmxlLXByZXZpZXctYm94LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9mbGV4aWJsZS1wcmV2aWV3LWJveC5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVQcmV2aWV3Qm94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIFxyXG4gIGFib3ZlRGF0YSA9IFtdO1xyXG4gIGJlbG93RGF0YSA9IFtdO1xyXG4gIFxyXG4gIEBWaWV3Q2hpbGQoXCJsYXJnZUltYWdlXCIpXHJcblx0cHJpdmF0ZSBsYXJnZUltYWdlOiBFbGVtZW50UmVmO1xyXG5cclxuICBAT3V0cHV0KFwib25zZWxlY3RcIilcclxuICBvbnNlbGVjdD0gbmV3IEV2ZW50RW1pdHRlcigpXHJcblxyXG4gIEBJbnB1dChcIml0ZW1cIilcclxuICBpdGVtOiBhbnk7XHJcblxyXG4gIEBJbnB1dChcInZpZXdwb3J0XCIpXHJcbiAgdmlld3BvcnQ6IGFueTtcclxuICBcclxuICBASW5wdXQoXCJtZXRhZGF0YVwiKVxyXG4gIG1ldGFkYXRhOiBhbnlbXTtcclxuXHJcbiAgQElucHV0KFwiZWZmZWN0c1wiKVxyXG4gIGVmZmVjdHM6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHQgIFxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICBpZiAodGhpcy5tZXRhZGF0YSkge1xyXG4gICAgICB0aGlzLm1ldGFkYXRhLm1hcCAoIChkYXRhKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEucG9zaXRpb24gPT09ICdhYm92ZScpIHtcclxuICAgICAgICAgIHRoaXMuYWJvdmVEYXRhLnB1c2goZGF0YSk7XHJcbiAgICAgICAgfWVsc2UgaWYgKGRhdGEucG9zaXRpb24gPT09ICdiZWxvdycpIHtcclxuICAgICAgICAgIHRoaXMuYmVsb3dEYXRhLnB1c2goZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlcykge1xyXG5cclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXRlbVZhbHVlKGl0ZW0sIGhwYXRoKSB7XHJcblx0XHRsZXQgc3ViaXRlbSA9IGl0ZW07XHJcblx0XHRocGF0aC5tYXAoIChzdWJrZXkpID0+IHtcclxuXHRcdFx0aWYgKHN1Yml0ZW0pIHtcclxuXHRcdFx0XHRzdWJpdGVtID0gc3ViaXRlbVtzdWJrZXldO1xyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIHN1Yml0ZW0gPT09IHVuZGVmaW5lZCB8fCBzdWJpdGVtID09PSBudWxsIHx8IHN1Yml0ZW0gPT09IFwibnVsbFwiID8gXCJcIiA6IFN0cmluZyhzdWJpdGVtKTtcclxuXHR9XHJcblxyXG4gIHJvd0NvbnRlbnQocm93KSB7XHJcbiAgICBsZXQgY29udGVudCA9IHRoaXMuaXRlbVZhbHVlKHRoaXMuaXRlbSwgcm93LmtleS5zcGxpdChcIi5cIikpO1xyXG4gICAgcmV0dXJuIChjb250ZW50ICE9PSB1bmRlZmluZWQgJiYgY29udGVudCAhPSBudWxsKSA/IGNvbnRlbnQgOiAnJztcclxuICB9XHJcblxyXG4gIGhvdmVyT3ZlcihldmVudCkge1xyXG5cdFx0aWYgKHRoaXMubGFyZ2VJbWFnZSAmJiB0aGlzLmVmZmVjdHMuem9vbU9uSG92ZXIgJiYgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSAnSU1HJykge1xyXG5cclxuICAgIH1cclxuXHR9XHJcblx0aG92ZXJPdXQoZXZlbnQpIHtcclxuXHRcdGlmICh0aGlzLmxhcmdlSW1hZ2UpIHtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IFwiLTEwMDAwcHhcIjtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IFwiLTEwMDAwcHhcIjtcclxuXHRcdH1cclxuXHR9XHJcblx0aG92ZXJWaWV3UG9ydChldmVudCkge1xyXG5cdFx0aWYgKHRoaXMubGFyZ2VJbWFnZSAmJiB0aGlzLmVmZmVjdHMuem9vbU9uSG92ZXIpIHtcclxuXHRcdFx0dGhpcy5sYXJnZUltYWdlLm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IC1ldmVudC5sYXllclkgKyBcInB4XCI7XHJcblx0XHRcdHRoaXMubGFyZ2VJbWFnZS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSAtZXZlbnQubGF5ZXJYICsgXCJweFwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbiAga2V5dXAoZXZlbnQpIHtcclxuICAgIGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcclxuXHJcbiAgICBpZiAoY29kZSA9PT0gMTMpIHtcclxuICAgICAgZXZlbnQudGFyZ2V0LmNsaWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNlbGVjdEl0ZW0oZXZlbnQpIHtcclxuICAgIHRoaXMub25zZWxlY3QuZW1pdCh7XHJcbiAgICAgIGl0ZW06IHRoaXMuaXRlbSxcclxuICAgICAgc2VsZWN0ZWQ6IHRydWUsXHJcbiAgICAgIGFjdGlvbjogXCJyZWRpcmVjdFwiXHJcbiAgICB9KTtcclxuICB9XHJcbiAgdmlkZW9QbGF5ZWQodHJhY2tpbmdUaW1lKSB7IFxyXG4gIH1cclxuICB2aWRlb1BhdXNlZCh0cmFja2luZ1RpbWUpIHtcclxuXHJcbiAgfVxyXG4gIHZpZGVvRW5kZWQodHJhY2tpbmdUaW1lKSB7XHJcblxyXG4gIH1cclxuICBvbkNvbXBvbmVudENoYW5nZShldmVudCkge1xyXG4gICAgdGhpcy5vbnNlbGVjdC5lbWl0KGV2ZW50KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgSW50b1BpcGVNb2R1bGUgfSBmcm9tICdAc2VkZWgvaW50by1waXBlcyc7XHJcblxyXG5pbXBvcnQgeyBGbGV4aWJsZVByZXZpZXdCb3hDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZmxleGlibGUtcHJldmlldy1ib3guY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgSW50b1BpcGVNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgRmxleGlibGVQcmV2aWV3Qm94Q29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBGbGV4aWJsZVByZXZpZXdCb3hDb21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgRmxleGlibGVQcmV2aWV3Qm94TW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBO0lBdUNFO3lCQXJCWSxFQUFFO3lCQUNGLEVBQUU7d0JBTUosSUFBSSxZQUFZLEVBQUU7S0FlM0I7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFHLENBQUMsSUFBSTtnQkFDdkIsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtvQkFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNCO3FCQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMzQjthQUNGLENBQUMsQ0FBQTtTQUNIO0tBQ0Y7Ozs7O0lBRUQsV0FBVyxDQUFDLE9BQU87S0FFbEI7Ozs7OztJQUVPLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSzs7UUFDN0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxHQUFHLENBQUUsQ0FBQyxNQUFNO1lBQ2pCLElBQUksT0FBTyxFQUFFO2dCQUNaLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDMUI7U0FDRCxDQUFDLENBQUE7UUFDRixPQUFPLE9BQU8sS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssTUFBTSxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7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