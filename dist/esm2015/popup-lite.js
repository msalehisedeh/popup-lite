import { Component, ViewContainerRef, ComponentFactoryResolver, Renderer, HostListener, ViewChild, ElementRef, Injectable, Injector, ApplicationRef, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'drag-enabled';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PopupLiteComponent {
    /**
     * @param {?} el
     * @param {?} componentFactoryResolver
     * @param {?} renderer
     */
    constructor(el, componentFactoryResolver, renderer) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.renderer = renderer;
        this.extraclasses = "";
        this.config = {
            id: '',
            close: false,
            overlay: false,
            closeOnOverlay: false,
            minimize: false,
            maximize: false,
            dragable: false,
            resizable: false,
            centered: false,
            fixed: false,
            pinable: false,
            height: '',
            width: '',
            maxBodyHeight: '',
            minBodyHeight: '',
            minWidth: '',
            maxWidth: '',
            adjustHeight: false,
            isOpen: false,
            isOpening: false,
            minimized: false,
            maximized: false,
            pinned: false,
            zIndex: 100,
            top: ''
        };
        this.el = el.nativeElement;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        if (this.config.centered && !this.config.pinned) {
            let /** @type {?} */ ne = this.el.querySelector('.popup-lite');
            let /** @type {?} */ root = this.el.parentElement;
            this.renderer.setElementStyle(ne, 'left', ((root.getBoundingClientRect().width - ne.getBoundingClientRect().width) / 2) + "px");
        }
    }
    /**
     * @param {?} node
     * @param {?} target
     * @return {?}
     */
    calcMaxHeight(node, target) {
        let /** @type {?} */ list = node.childNodes;
        let /** @type {?} */ max = 0;
        for (let /** @type {?} */ i = 0; i < list.length; i++) {
            if (list[i].nodeName.toLowerCase() === target) {
                list = list[i].childNodes;
                for (let /** @type {?} */ i = 0; i < list.length; i++) {
                    if (list[i].nodeType === 1) {
                        max += (list[i].clientHeight + list[i].offsetHeight);
                    }
                }
                break;
            }
        }
        return max;
    }
    /**
     * @param {?} component
     * @param {?} data
     * @param {?} config
     * @param {?} selector
     * @return {?}
     */
    init(component, data, config, selector) {
        const /** @type {?} */ componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const /** @type {?} */ componentRef = this.content.createComponent(componentFactory);
        const /** @type {?} */ instance = (/** @type {?} */ (componentRef.instance));
        instance.data = data;
        instance.id = config.id;
        if (instance.popupTitle) {
            config.popupTitle = instance.popupTitle.bind(instance);
        }
        else {
            config.popupTitle = (id) => id;
        }
        if (config) {
            const /** @type {?} */ list = Object.keys(config);
            list.map((key) => {
                this.config[key] = config[key];
            });
        }
        this.selector = selector;
        this.display(config);
    }
    /**
     * @param {?} props
     * @return {?}
     */
    display(props) {
        this.config.maxBodyHeight = props && props.maxHeight ? props.maxHeight : '';
        this.config.minWidth = props && props.minWidth ? props.minWidth : '';
        this.config.maxWidth = props && props.maxWidth ? props.maxWidth : '';
        this.config.top = props && props.top ? props.top : '';
        this.config.isOpening = true;
        this.config.adjustHeight = props && props.adjustHeight ? props.adjustHeight : false;
        this.extraclasses = this.config.header ? "" : "header-off ";
        this.extraclasses += this.config.footer ? "" : "footer-off ";
        setTimeout(function () {
            this.onResize(null);
            this.config.isOpen = true;
        }.bind(this), 10);
        return false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyUp(event) {
        event.preventDefault();
        const /** @type {?} */ code = event.which;
        if (code === 13) {
            event.target.click();
        }
    }
    /**
     * @return {?}
     */
    closeOverlay() {
        if (this.config.closeOnOverlay) {
            this.closeModal(null, { id: this.config.id, confirmed: false });
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClose(event) {
        this.closeModal(event, { id: this.config.id, confirmed: false });
    }
    /**
     * @param {?} $event
     * @param {?} result
     * @return {?}
     */
    closeModal($event, result) {
        this.config.isOpening = false;
        this.config.overlay = false;
        this.config.isOpen = false;
        this.selector.popedOut(this.config.id, result);
        return false;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    minimizeModal($event) {
        this.config.minimized = !this.config.minimized;
        if (this.config.resizable) {
            let /** @type {?} */ ne = this.el.querySelector('.resize-corner');
            let /** @type {?} */ wn = this.el.querySelector('.popup-lite');
            let /** @type {?} */ bd = this.el.querySelector('.modal-body');
            if (!this.config.minimized) {
                bd.style.height = bd.getAttribute("oh");
                bd.style.maxHeight = "inherit";
            }
            else {
                bd.style.height = "0";
                wn.style.height = "inherit";
            }
            ne.style.display = (this.config.minimized || this.config.maximized) ? 'none' : 'block';
        }
        return false;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    maximizeModal($event) {
        this.config.maximized = !this.config.maximized;
        if (this.config.resizable) {
            let /** @type {?} */ ne = this.el.querySelector('.resize-corner');
            let /** @type {?} */ bd = this.el.querySelector('.modal-body');
            if (bd.getAttribute("oh")) {
                bd.style.height = bd.getAttribute("oh");
            }
            ne.style.display = (this.config.minimized || this.config.maximized) ? 'none' : 'block';
        }
        return false;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    selected($event) {
        this.selector.setSelected(this.config.id);
        return true;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    pinModal($event) {
        this.config.pinned = !this.config.pinned;
        return false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dragEnabled(event) {
        return this.config.dragable && !this.config.pinned;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragStart(event) {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDrag(event) {
        if (event.node === this.dragHeader.element.nativeElement) {
            this.renderer.setElementStyle(event.medium, 'left', (event.clientX - event.offset.x) + "px");
            this.renderer.setElementStyle(event.medium, 'top', (event.clientY - event.offset.y) + "px");
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragEnd(event) {
        if (event.node === this.dragHeader.element.nativeElement) {
            this.renderer.setElementStyle(event.medium, 'left', (event.clientX - event.offset.x) + "px");
            this.renderer.setElementStyle(event.medium, 'top', (event.clientY - event.offset.y) + "px");
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    resizeEnabled(event) {
        return this.config.resizable;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResizeStart(event) {
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResizeProgress(event) {
        if (event.node === this.resizer.element.nativeElement) {
            const /** @type {?} */ wr = event.medium.getBoundingClientRect();
            const /** @type {?} */ width = (event.clientX - event.offset.x) - wr.left;
            const /** @type {?} */ height = (event.clientY - event.offset.y) - wr.top;
            let /** @type {?} */ hd = this.el.querySelector('.modal-header');
            let /** @type {?} */ ft = this.el.querySelector('.modal-footer');
            let /** @type {?} */ bd = this.el.querySelector('.modal-body');
            let /** @type {?} */ fth = ft.getBoundingClientRect().height;
            let /** @type {?} */ hdh = hd.getBoundingClientRect().height;
            let /** @type {?} */ h = height - hdh - fth - 2;
            if (width > 200 && height > 60) {
                this.renderer.setElementStyle(event.medium, 'width', width + "px");
                this.renderer.setElementStyle(event.medium, 'height', height + "px");
                this.renderer.setElementStyle(bd, 'height', h + "px");
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResizeEnd(event) {
        if (event.node === this.resizer.element.nativeElement) {
            const /** @type {?} */ wr = event.medium.getBoundingClientRect();
            const /** @type {?} */ width = (event.clientX - event.offset.x) - wr.left;
            const /** @type {?} */ height = (event.clientY - event.offset.y) - wr.top;
            if (width > 200 && height > 60) {
                let /** @type {?} */ hd = this.el.querySelector('.modal-header');
                let /** @type {?} */ ft = this.el.querySelector('.modal-footer');
                let /** @type {?} */ bd = this.el.querySelector('.modal-body');
                let /** @type {?} */ fth = ft.getBoundingClientRect().height;
                let /** @type {?} */ hdh = hd.getBoundingClientRect().height;
                let /** @type {?} */ h = height - hdh - fth - 2;
                this.renderer.setElementStyle(event.medium, 'width', width + "px");
                this.renderer.setElementStyle(event.medium, 'height', height + "px");
                this.renderer.setElementStyle(bd, 'height', h + "px");
            }
        }
    }
}
PopupLiteComponent.decorators = [
    { type: Component, args: [{
                selector: 'popup-lite',
                template: `<div class="popup-lite-overlay" #overlay
	(click)="closeOverlay()"
	[style.display]="config.overlay ? 'block' : 'none'"></div>
<div #modalWondow
	class="popup-lite"
	tabindex="0"
	[style.minWidth]="config.minWidth"
	[style.maxWidth]="config.maxWidth"
	[style.display]="config.isOpening ? 'block' : 'none'"
	[style.position]="config.fixed ? 'fixed':'absolute'"
	[style.top]="config.top.length ? config.top : ''"
	[style.height]="config.height"
	[style.zIndex]="config.zIndex"
	[class.fade-in]="config.isOpen"
	[class.maximized]="config.maximized"
	[class.pinned]="config.pinned"
	[style.z-index]="config.selected ? 105 : 100"
	(keyup)="keyUp($event)"
	(focus)="selected($event)"
	(click)="selected($event)">
		<div class="controls">
			<a *ngIf="config.pinable"
				class="pin" tabindex="0"
				(click)="pinModal($event)">
				<span *ngIf="!config.pinned" class="fa fw fa-unlock" aria-hidden="true"></span>
				<span *ngIf="config.pinned" class="fa fw fa-lock" aria-hidden="true"></span>
				<span class="off-screen">Pin</span>
			</a><a *ngIf="config.minimize"
				class="minify" tabindex="0"
				(click)="minimizeModal($event)"
				[class.clicked]="config.minimized">
				<span class="fa fw fa-window-minimize" aria-hidden="true"></span>
				<span class="off-screen">Minimize</span>
			</a><a *ngIf="config.maximize"
				class="maxify" tabindex="0"
				(click)="maximizeModal($event)"
				[class.clicked]="config.maximized">
				<span class="fa fw fa-window-maximize" aria-hidden="true"></span>
				<span class="off-screen">Maximize</span>
			</a><a *ngIf="config.close"
				class="close" tabindex="0"
				(click)="onClose($event)">
				<span class="fa fw fa-window-close" aria-hidden="true"></span>
				<span class="off-screen">Close</span>
			</a>
		</div>
		<a *ngIf="config.resizable"
			#resizer
			class="resize-corner"
			tabindex="0"
			[medium]="modalWondow"
			[dragInDocument]="resizeEnabled.bind(this)"
			(onDragStart)="onResizeStart($event)"
			(onDrag)="onResizeProgress($event)"
			(onDragEnd)="onResizeEnd($event)">
			<span class="fa fw fa-ellipsis-h" aria-hidden="true"></span>
			<span class="off-screen">Resize</span>
		</a>
		<div *ngIf="config.header"
			#dragHeader
			class="modal-header"
			[id]="config.id"
			[style.cursor]="(config.dragable && !config.pinned) ? 'all-scroll':'default'"
			[class.pinned]="config.pinned"
			[class.minified]="config.minimized"
			[medium]="modalWondow"
			[dragInDocument]="dragEnabled.bind(this)"
			(onDragStart)="onDragStart($event)"
			(onDrag)="onDrag($event)"
			(onDragEnd)="onDragEnd($event)"
			(dblclick)="maximizeModal($event)">
			<span *ngIf="config.headerIcon" [class]="'icon ' + config.headerIcon"></span>
			<span *ngIf="config.idOnHeader" class="header-title" [class.padded]="config.headerIcon ? true:null" [textContent]="config.popupTitle(config.id)"></span>
		</div>
		  <div class="modal-body"
		     [class.minimized]="config.minimized"
		     [style.minHeight]="config.minBodyHeight"
			 [style.maxHeight]="config.maxBodyHeight">
			 <ng-template  #content></ng-template>
		  </div>
	      <div class="modal-footer" *ngIf="config.footer"
		  		[class.minimized]="config.minimized">
	         <ng-content select="[modal-footer]"></ng-content>
		  </div>
	    </div>`,
                styles: [`:host .centered{text-align:center;margin:0 auto}:host .popup-lite h2{font-size:.8em;margin:0}:host .popup-lite-overlay{position:absolute;background-color:rgba(44,44,44,.44);width:100%;height:100%;top:0;left:0;z-index:104}:host .popup-lite{-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;top:100px;left:100px;border-radius:6px;padding:0;z-index:100;background-color:transparent;min-width:300px;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);-ms-box-shadow:0 3px 9px rgba(0,0,0,.5);-o-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);opacity:0;-webkit-transition:opacity .25s ease-in-out;transition:opacity .25s ease-in-out}:host .popup-lite .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .popup-lite.fade-in{opacity:1;-webkit-transition:opacity .25s ease-in-out;transition:opacity .25s ease-in-out}:host .popup-lite .controls{position:absolute;top:0;right:2px;border:1px solid #eee;background-color:#fff;border-radius:2px;border-top:0;z-index:2}:host .popup-lite .controls a{text-align:center;border:1px solid #999;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:0 0 2px 2px;border-top:0;display:inline-block;width:21px;height:21px}:host .popup-lite .controls a span{display:inline-block}:host .popup-lite .controls a.close{cursor:pointer}:host .popup-lite .controls a.close:hover{color:red}:host .popup-lite .controls a.minify{cursor:pointer}:host .popup-lite .controls a.minify.clicked,:host .popup-lite .controls a.minify:hover{color:red}:host .popup-lite .controls a.pin{cursor:pointer}:host .popup-lite .controls a.pin.clicked,:host .popup-lite .controls a.pin:hover{color:red}:host .popup-lite .controls a.maxify{cursor:pointer}:host .popup-lite .controls a.maxify.clicked,:host .popup-lite .controls a.maxify:hover{color:red}:host .popup-lite a{text-align:center;border:1px solid #999;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:2px}:host .popup-lite a.resize-corner{position:absolute;height:5px;bottom:12px;right:4px;width:13px;border:0;cursor:se-resize}:host .popup-lite a.resize-corner:hover{color:red}:host .popup-lite .modal-header{background-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:2px 2px 0 0;min-width:100%;min-height:24px;padding:5px 10px}:host .popup-lite .modal-header .icon{position:absolute;left:5px;top:3px}:host .popup-lite .modal-header .header-title{position:absolute;top:0;left:0;padding:2px 5px;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.9rem}:host .popup-lite .modal-header .header-title.padded{left:15px}:host .popup-lite .modal-body{background-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;padding:10px;overflow-y:auto}:host .popup-lite .modal-footer{background-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:0 0 2px 2px;min-width:100%;min-height:20px;padding:5px 10px}:host .popup-lite .modal-footer .right{text-align:right}:host .header-off{border-top-left-radius:2px;border-top-right-radius:5px}:host .footer-off{border-bottom-right-radius:5px;border-bottom-left-radius:2px}:host .minimized{padding-top:0!important;padding-bottom:0!important;min-height:0!important}:host .maximized{top:0!important;left:0!important;min-width:100%!important;min-height:100%!important}:host .maximized .modal-footer,:host .maximized .modal-header{width:100%}:host .maximized .modal-body{min-width:100%;min-height:95vh}:host .minimized{min-height:0!important;height:0!important}:host .minified{border-radius:6px!important}:host .popup-lite.maximized{height:inherit!important;min-height:inherit!important}:host .pinned{border:1px dotted red}:host .block-key-events{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}`]
            },] },
];
/** @nocollapse */
PopupLiteComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: ComponentFactoryResolver, },
    { type: Renderer, },
];
PopupLiteComponent.propDecorators = {
    "content": [{ type: ViewChild, args: ["content", { read: ViewContainerRef },] },],
    "modalWondow": [{ type: ViewChild, args: ["modalWondow", { read: ViewContainerRef },] },],
    "resizer": [{ type: ViewChild, args: ["resizer", { read: ViewContainerRef },] },],
    "dragHeader": [{ type: ViewChild, args: ["dragHeader", { read: ViewContainerRef },] },],
    "onResize": [{ type: HostListener, args: ['window:resize', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PopupLiteService {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} appRef
     * @param {?} injector
     */
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.componentRef = {};
        this.status = [];
    }
    /**
     * @return {?}
     */
    createPopupLiteComponent() {
        const /** @type {?} */ ref = this.componentFactoryResolver
            .resolveComponentFactory(PopupLiteComponent)
            .create(this.injector);
        this.appRef.attachView(ref.hostView);
        this.domElem = /** @type {?} */ ((/** @type {?} */ (ref.hostView))
            .rootNodes[0]);
        document.body.appendChild(this.domElem);
        return ref;
    }
    /**
     * @param {?} id
     * @param {?} result
     * @return {?}
     */
    popedOut(id, result) {
        const /** @type {?} */ ref = this.componentRef[id];
        this.appRef.detachView(ref.hostView);
        ref.destroy();
        delete this.componentRef[id];
        this.status[id].next(result);
        delete this.status[id];
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setSelected(id) {
        const /** @type {?} */ list = Object.keys(this.componentRef);
        list.map((ref) => {
            (/** @type {?} */ (this.componentRef[ref].instance)).config.selected = false;
        });
        (/** @type {?} */ (this.componentRef[id].instance)).config.selected = true;
    }
    /**
     * @param {?} component
     * @param {?} id
     * @param {?=} data
     * @param {?=} config
     * @return {?}
     */
    openWindow(component, id, data, config) {
        const /** @type {?} */ ref = this.createPopupLiteComponent();
        const /** @type {?} */ instance = (/** @type {?} */ (ref.instance));
        const /** @type {?} */ localConfig = {
            close: true,
            minimize: true,
            maximize: true,
            resizable: true,
            header: true,
            footer: true,
            dragable: true,
            pinable: true,
            idOnHeader: true,
            centered: true
        };
        if (config) {
            const /** @type {?} */ list = Object.keys(config);
            list.map((key) => {
                localConfig[key] = config[key];
            });
        }
        localConfig.id = id ? id : '' + new Date().getTime();
        this.componentRef[localConfig.id] = ref;
        this.status[localConfig.id] = new Subject();
        instance.init(component, data, localConfig, this);
        this.setSelected(localConfig.id);
        return this.status[localConfig.id];
    }
    /**
     * @param {?} component
     * @param {?} id
     * @param {?=} data
     * @param {?=} config
     * @return {?}
     */
    openModal(component, id, data, config) {
        const /** @type {?} */ ref = this.createPopupLiteComponent();
        const /** @type {?} */ instance = (/** @type {?} */ (ref.instance));
        const /** @type {?} */ localConfig = {
            overlay: true,
            close: true,
            closeOnOverlay: true,
            header: true,
            footer: true,
            centered: true
        };
        if (config) {
            const /** @type {?} */ list = Object.keys(config);
            list.map((key) => {
                localConfig[key] = config[key];
            });
        }
        localConfig.id = id ? id : '' + new Date().getTime();
        this.componentRef[localConfig.id] = ref;
        this.status[localConfig.id] = new Subject();
        instance.init(component, data, localConfig, this);
        this.setSelected(localConfig.id);
        return this.status[localConfig.id];
    }
    /**
     * @param {?} component
     * @param {?} id
     * @param {?=} data
     * @param {?=} config
     * @return {?}
     */
    openDialog(component, id, data, config) {
        const /** @type {?} */ ref = this.createPopupLiteComponent();
        const /** @type {?} */ instance = (/** @type {?} */ (ref.instance));
        const /** @type {?} */ localConfig = {
            overlay: true,
            close: true,
            closeOnOverlay: true,
            header: true,
            footer: true,
            centered: true
        };
        if (config) {
            const /** @type {?} */ list = Object.keys(config);
            list.map((key) => {
                localConfig[key] = config[key];
            });
        }
        localConfig.id = id ? id : '' + new Date().getTime();
        this.componentRef[localConfig.id] = ref;
        this.status[localConfig.id] = new Subject();
        instance.init(component, data, localConfig, this);
        this.setSelected(localConfig.id);
        return this.status[localConfig.id];
    }
    /**
     * @param {?} id
     * @param {?} data
     * @return {?}
     */
    confirm(id, data) {
        const /** @type {?} */ info = {
            id: id,
            confirmed: true
        };
        if (data) {
            const /** @type {?} */ list = Object.keys(data);
            list.map((key) => {
                info[key] = data[key];
            });
        }
        this.popedOut(id, info);
    }
    /**
     * @param {?} id
     * @param {?} data
     * @return {?}
     */
    cancel(id, data) {
        const /** @type {?} */ info = {
            id: id,
            confirmed: true
        };
        if (data) {
            const /** @type {?} */ list = Object.keys(data);
            list.map((key) => {
                info[key] = data[key];
            });
        }
        this.popedOut(id, { id: id, confirmed: false });
    }
}
PopupLiteService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
PopupLiteService.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
    { type: ApplicationRef, },
    { type: Injector, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PopupLiteModule {
}
PopupLiteModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    DragDropModule
                ],
                declarations: [
                    PopupLiteComponent
                ],
                exports: [
                    PopupLiteComponent
                ],
                entryComponents: [
                    PopupLiteComponent
                ],
                providers: [
                    PopupLiteService
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] },
];
/** @nocollapse */
PopupLiteModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { PopupLiteComponent, PopupLiteService, PopupLiteModule };
//# sourceMappingURL=popup-lite.js.map
