import { Component, ViewContainerRef, ComponentFactoryResolver, Renderer, HostListener, ViewChild, ElementRef, Injectable, Injector, ApplicationRef, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@sedeh/drag-enabled';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
            /** @type {?} */
            let ne = this.el.querySelector('.popup-lite');
            /** @type {?} */
            let root = this.el.parentElement;
            this.renderer.setElementStyle(ne, 'left', ((root.getBoundingClientRect().width - ne.getBoundingClientRect().width) / 2) + "px");
        }
    }
    /**
     * @param {?} node
     * @param {?} target
     * @return {?}
     */
    calcMaxHeight(node, target) {
        /** @type {?} */
        let list = node.childNodes;
        /** @type {?} */
        let max = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i].nodeName.toLowerCase() === target) {
                list = list[i].childNodes;
                for (let i = 0; i < list.length; i++) {
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
        /** @type {?} */
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        /** @type {?} */
        const componentRef = this.content.createComponent(componentFactory);
        /** @type {?} */
        const instance = (/** @type {?} */ (componentRef.instance));
        instance.data = data;
        instance.id = config.id;
        if (instance.popupTitle) {
            config.popupTitle = instance.popupTitle.bind(instance);
        }
        else {
            config.popupTitle = (id) => id;
        }
        if (config) {
            /** @type {?} */
            const list = Object.keys(config);
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
        /** @type {?} */
        const code = event.which;
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
            /** @type {?} */
            let ne = this.el.querySelector('.resize-corner');
            /** @type {?} */
            let wn = this.el.querySelector('.popup-lite');
            /** @type {?} */
            let bd = this.el.querySelector('.modal-body');
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
            /** @type {?} */
            let ne = this.el.querySelector('.resize-corner');
            /** @type {?} */
            let bd = this.el.querySelector('.modal-body');
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
            /** @type {?} */
            const wr = event.medium.getBoundingClientRect();
            /** @type {?} */
            const width = (event.clientX - event.offset.x) - wr.left;
            /** @type {?} */
            const height = (event.clientY - event.offset.y) - wr.top;
            /** @type {?} */
            let hd = this.el.querySelector('.modal-header');
            /** @type {?} */
            let ft = this.el.querySelector('.modal-footer');
            /** @type {?} */
            let bd = this.el.querySelector('.modal-body');
            /** @type {?} */
            let fth = ft.getBoundingClientRect().height;
            /** @type {?} */
            let hdh = hd.getBoundingClientRect().height;
            /** @type {?} */
            let h = height - hdh - fth - 2;
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
            /** @type {?} */
            const wr = event.medium.getBoundingClientRect();
            /** @type {?} */
            const width = (event.clientX - event.offset.x) - wr.left;
            /** @type {?} */
            const height = (event.clientY - event.offset.y) - wr.top;
            if (width > 200 && height > 60) {
                /** @type {?} */
                let hd = this.el.querySelector('.modal-header');
                /** @type {?} */
                let ft = this.el.querySelector('.modal-footer');
                /** @type {?} */
                let bd = this.el.querySelector('.modal-body');
                /** @type {?} */
                let fth = ft.getBoundingClientRect().height;
                /** @type {?} */
                let hdh = hd.getBoundingClientRect().height;
                /** @type {?} */
                let h = height - hdh - fth - 2;
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
                template: "<div class=\"popup-lite-overlay\" #overlay\n\t(click)=\"closeOverlay()\"\n\t[style.display]=\"config.overlay ? 'block' : 'none'\"></div>\n<div #modalWondow \n\tclass=\"popup-lite\" \n\ttabindex=\"0\"\n\t[style.minWidth]=\"config.minWidth\"\n\t[style.maxWidth]=\"config.maxWidth\"\n\t[style.display]=\"config.isOpening ? 'block' : 'none'\" \n\t[style.position]=\"config.fixed ? 'fixed':'absolute'\"\n\t[style.top]=\"config.top.length ? config.top : ''\"\n\t[style.height]=\"config.height\"\n\t[style.zIndex]=\"config.zIndex\"\n\t[class.fade-in]=\"config.isOpen\" \n\t[class.maximized]=\"config.maximized\"\n\t[class.pinned]=\"config.pinned\"\n\t[style.z-index]=\"config.selected ? 105 : 100\"\n\t(keyup)=\"keyUp($event)\"\n\t(focus)=\"selected($event)\"\n\t(click)=\"selected($event)\">\n\t\t<div class=\"controls\">\n\t\t\t<a *ngIf=\"config.pinable\"\n\t\t\t\tclass=\"pin\" tabindex=\"0\" \n\t\t\t\t(click)=\"pinModal($event)\">\n\t\t\t\t<span *ngIf=\"!config.pinned\" class=\"fa fw fa-unlock\" aria-hidden=\"true\"></span>\n\t\t\t\t<span *ngIf=\"config.pinned\" class=\"fa fw fa-lock\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Pin</span>\n\t\t\t</a><a *ngIf=\"config.minimize\"\n\t\t\t\tclass=\"minify\" tabindex=\"0\" \n\t\t\t\t(click)=\"minimizeModal($event)\" \n\t\t\t\t[class.clicked]=\"config.minimized\">\n\t\t\t\t<span class=\"fa fw fa-window-minimize\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Minimize</span>\n\t\t\t</a><a *ngIf=\"config.maximize\"\n\t\t\t\tclass=\"maxify\" tabindex=\"0\" \n\t\t\t\t(click)=\"maximizeModal($event)\" \n\t\t\t\t[class.clicked]=\"config.maximized\">\n\t\t\t\t<span class=\"fa fw fa-window-maximize\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Maximize</span>\n\t\t\t</a><a *ngIf=\"config.close\"\n\t\t\t\tclass=\"close\" tabindex=\"0\" \n\t\t\t\t(click)=\"onClose($event)\">\n\t\t\t\t<span class=\"fa fw fa-window-close\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Close</span>\n\t\t\t</a>\n\t\t</div>\n\t\t<a *ngIf=\"config.resizable\"\n\t\t\t#resizer\n\t\t\tclass=\"resize-corner\" \n\t\t\ttabindex=\"0\" \n\t\t\t[medium]=\"modalWondow\"\n\t\t\t[dragInDocument]=\"resizeEnabled.bind(this)\"\n\t\t\t(onDragStart)=\"onResizeStart($event)\"\n\t\t\t(onDrag)=\"onResizeProgress($event)\"\n\t\t\t(onDragEnd)=\"onResizeEnd($event)\">\n\t\t\t<span class=\"fa fw fa-ellipsis-h\" aria-hidden=\"true\"></span>\n\t\t\t<span class=\"off-screen\">Resize</span>\n\t\t</a>\n\t\t<div *ngIf=\"config.header\"\n\t\t\t#dragHeader\n\t\t\tclass=\"modal-header\" \n\t\t\t[id]=\"config.id\"\n\t\t\t[style.cursor]=\"(config.dragable && !config.pinned) ? 'all-scroll':'default'\"\n\t\t\t[class.pinned]=\"config.pinned\"\n\t\t\t[class.minified]=\"config.minimized\"\n\t\t\t[medium]=\"modalWondow\"\n\t\t\t[dragInDocument]=\"dragEnabled.bind(this)\"\n\t\t\t(onDragStart)=\"onDragStart($event)\"\n\t\t\t(onDrag)=\"onDrag($event)\"\n\t\t\t(onDragEnd)=\"onDragEnd($event)\"\n\t\t\t(dblclick)=\"maximizeModal($event)\">\n\t\t\t<span *ngIf=\"config.headerIcon\" [class]=\"'icon ' + config.headerIcon\"></span>\n\t\t\t<span *ngIf=\"config.idOnHeader\" class=\"header-title\" [class.padded]=\"config.headerIcon ? true:null\" [textContent]=\"config.popupTitle(config.id)\"></span>\n\t\t</div>\n\t\t  <div class=\"modal-body\"\n\t\t     [class.minimized]=\"config.minimized\"\n\t\t     [style.minHeight]=\"config.minBodyHeight\"\n\t\t\t [style.maxHeight]=\"config.maxBodyHeight\">\n\t\t\t <ng-template  #content></ng-template>\n\t\t  </div>\n\t      <div class=\"modal-footer\" *ngIf=\"config.footer\"\n\t\t  \t\t[class.minimized]=\"config.minimized\">\n\t         <ng-content select=\"[modal-footer]\"></ng-content>\n\t\t  </div>\n\t    </div>",
                styles: [":host .centered{text-align:center;margin:0 auto}:host .popup-lite h2{font-size:.8em;margin:0}:host .popup-lite-overlay{position:absolute;background-color:rgba(44,44,44,.44);width:100%;height:100%;top:0;left:0;z-index:104}:host .popup-lite{box-sizing:border-box;position:absolute;top:100px;left:100px;border-radius:6px;padding:0;z-index:100;background-color:transparent;min-width:300px;-ms-box-shadow:0 3px 9px rgba(0,0,0,.5);-o-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);opacity:0;transition:opacity .25s ease-in-out}:host .popup-lite .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .popup-lite.fade-in{opacity:1;transition:opacity .25s ease-in-out}:host .popup-lite .controls{position:absolute;top:0;right:2px;border:1px solid #eee;background-color:#fff;border-radius:2px;border-top:0;z-index:2}:host .popup-lite .controls a{text-align:center;border:1px solid #999;box-sizing:border-box;border-radius:0 0 2px 2px;border-top:0;display:inline-block;width:21px;height:21px}:host .popup-lite .controls a span{display:inline-block}:host .popup-lite .controls a.close{cursor:pointer}:host .popup-lite .controls a.close:hover{color:red}:host .popup-lite .controls a.minify{cursor:pointer}:host .popup-lite .controls a.minify.clicked,:host .popup-lite .controls a.minify:hover{color:red}:host .popup-lite .controls a.pin{cursor:pointer}:host .popup-lite .controls a.pin.clicked,:host .popup-lite .controls a.pin:hover{color:red}:host .popup-lite .controls a.maxify{cursor:pointer}:host .popup-lite .controls a.maxify.clicked,:host .popup-lite .controls a.maxify:hover{color:red}:host .popup-lite a{text-align:center;border:1px solid #999;box-sizing:border-box;border-radius:2px}:host .popup-lite a.resize-corner{position:absolute;height:5px;bottom:12px;right:4px;width:13px;border:0;cursor:se-resize}:host .popup-lite a.resize-corner:hover{color:red}:host .popup-lite .modal-header{background-color:#fff;box-sizing:border-box;border-radius:2px 2px 0 0;min-width:100%;min-height:24px;padding:5px 10px}:host .popup-lite .modal-header .icon{position:absolute;left:5px;top:3px}:host .popup-lite .modal-header .header-title{position:absolute;top:0;left:0;padding:2px 5px;box-sizing:border-box;font-size:.9rem}:host .popup-lite .modal-header .header-title.padded{left:15px}:host .popup-lite .modal-body{background-color:#fff;box-sizing:border-box;padding:10px;overflow-y:auto}:host .popup-lite .modal-footer{background-color:#fff;box-sizing:border-box;border-radius:0 0 2px 2px;min-width:100%;min-height:20px;padding:5px 10px}:host .popup-lite .modal-footer .right{text-align:right}:host .header-off{border-top-left-radius:2px;border-top-right-radius:5px}:host .footer-off{border-bottom-right-radius:5px;border-bottom-left-radius:2px}:host .minimized{padding-top:0!important;padding-bottom:0!important;min-height:0!important}:host .maximized{top:0!important;left:0!important;min-width:100%!important;min-height:100%!important}:host .maximized .modal-footer,:host .maximized .modal-header{width:100%}:host .maximized .modal-body{min-width:100%;min-height:95vh}:host .minimized{min-height:0!important;height:0!important}:host .minified{border-radius:6px!important}:host .popup-lite.maximized{height:inherit!important;min-height:inherit!important}:host .pinned{border:1px dotted red}:host .block-key-events{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}"]
            }] }
];
/** @nocollapse */
PopupLiteComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: Renderer }
];
PopupLiteComponent.propDecorators = {
    content: [{ type: ViewChild, args: ["content", { read: ViewContainerRef },] }],
    modalWondow: [{ type: ViewChild, args: ["modalWondow", { read: ViewContainerRef },] }],
    resizer: [{ type: ViewChild, args: ["resizer", { read: ViewContainerRef },] }],
    dragHeader: [{ type: ViewChild, args: ["dragHeader", { read: ViewContainerRef },] }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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
        /** @type {?} */
        const ref = this.componentFactoryResolver
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
        /** @type {?} */
        const ref = this.componentRef[id];
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
        /** @type {?} */
        const list = Object.keys(this.componentRef);
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
        /** @type {?} */
        const ref = this.createPopupLiteComponent();
        /** @type {?} */
        const instance = (/** @type {?} */ (ref.instance));
        /** @type {?} */
        const localConfig = {
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
            /** @type {?} */
            const list = Object.keys(config);
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
        /** @type {?} */
        const ref = this.createPopupLiteComponent();
        /** @type {?} */
        const instance = (/** @type {?} */ (ref.instance));
        /** @type {?} */
        const localConfig = {
            overlay: true,
            close: true,
            closeOnOverlay: true,
            header: true,
            footer: true,
            centered: true
        };
        if (config) {
            /** @type {?} */
            const list = Object.keys(config);
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
        /** @type {?} */
        const ref = this.createPopupLiteComponent();
        /** @type {?} */
        const instance = (/** @type {?} */ (ref.instance));
        /** @type {?} */
        const localConfig = {
            overlay: true,
            close: true,
            closeOnOverlay: true,
            header: true,
            footer: true,
            centered: true
        };
        if (config) {
            /** @type {?} */
            const list = Object.keys(config);
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
        /** @type {?} */
        const info = {
            id: id,
            confirmed: true
        };
        if (data) {
            /** @type {?} */
            const list = Object.keys(data);
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
        /** @type {?} */
        const info = {
            id: id,
            confirmed: true
        };
        if (data) {
            /** @type {?} */
            const list = Object.keys(data);
            list.map((key) => {
                info[key] = data[key];
            });
        }
        this.popedOut(id, { id: id, confirmed: false });
    }
}
PopupLiteService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PopupLiteService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
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

export { PopupLiteComponent, PopupLiteService, PopupLiteModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtcG9wdXAtbGl0ZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHNlZGVoL3BvcHVwLWxpdGUvc3JjL2FwcC9wb3B1cC1saXRlL2NvbXBvbmVudHMvcG9wdXAtbGl0ZS5jb21wb25lbnQudHMiLCJuZzovL0BzZWRlaC9wb3B1cC1saXRlL3NyYy9hcHAvcG9wdXAtbGl0ZS9pbmplY3RhYmxlcy9wb3B1cC1saXRlLnNlcnZpY2UudHMiLCJuZzovL0BzZWRlaC9wb3B1cC1saXRlL3NyYy9hcHAvcG9wdXAtbGl0ZS9wb3B1cC1saXRlLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7XG5cdENvbXBvbmVudCxcblx0Q29tcG9uZW50RmFjdG9yeSwgXG5cdFJlZmxlY3RpdmVJbmplY3Rvcixcblx0Vmlld0NvbnRhaW5lclJlZixcblx0Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuXHRJbnB1dCxcblx0T3V0cHV0LFxuXHRSZW5kZXJlcixcblx0SG9zdExpc3RlbmVyLFxuXHRFdmVudEVtaXR0ZXIsXG5cdEluamVjdGFibGUsXG5cdFZpZXdDaGlsZCxcblx0RWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgRHJhZ0V2ZW50IH0gZnJvbSAnQHNlZGVoL2RyYWctZW5hYmxlZCc7XG5cbmltcG9ydCB7IFBvcHVwTGl0ZVNlcnZpY2UgfSBmcm9tICcuLi9pbmplY3RhYmxlcy9wb3B1cC1saXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9wdXBMaXRlQ29udGVudENvbXBvbmVudCwgV2luZG93TGl0ZVNlbGVjdGlvbiwgUG9wdXBMaXRlT3B0aW9ucywgV2luZG93T3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvcG9wdXAtbGl0ZS5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjoncG9wdXAtbGl0ZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BvcHVwLWxpdGUuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9wb3B1cC1saXRlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUG9wdXBMaXRlQ29tcG9uZW50IHtcblx0cHJpdmF0ZSBlbDpIVE1MRWxlbWVudDtcblx0cHJpdmF0ZSBleHRyYWNsYXNzZXMgPSBcIlwiO1xuXHRwcml2YXRlIHNlbGVjdG9yOiBXaW5kb3dMaXRlU2VsZWN0aW9uO1xuXG5cdEBWaWV3Q2hpbGQoXCJjb250ZW50XCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgXG5cdGNvbnRlbnQ6IFZpZXdDb250YWluZXJSZWY7XG5cblx0QFZpZXdDaGlsZChcIm1vZGFsV29uZG93XCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgXG5cdG1vZGFsV29uZG93OiBWaWV3Q29udGFpbmVyUmVmO1xuXHRcblx0QFZpZXdDaGlsZChcInJlc2l6ZXJcIiwge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBcblx0cmVzaXplcjogVmlld0NvbnRhaW5lclJlZjtcblx0XG5cdEBWaWV3Q2hpbGQoXCJkcmFnSGVhZGVyXCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgXG5cdGRyYWdIZWFkZXI6IFZpZXdDb250YWluZXJSZWY7XG5cdFxuXHRASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcblx0b25SZXNpemUoZXZlbnQ6YW55KSB7XG5cdFx0aWYodGhpcy5jb25maWcuY2VudGVyZWQgJiYgIXRoaXMuY29uZmlnLnBpbm5lZCl7XG5cdFx0XHRsZXQgbmUgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1saXRlJyk7XG5cdFx0XHRsZXQgcm9vdDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShuZSwgJ2xlZnQnLCAoKHJvb3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgtbmUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpLzIpICsgXCJweFwiKTtcblx0XHR9XG5cdH1cblxuXHRjb25maWc6IFdpbmRvd09wdGlvbnMgPXtcblx0XHRpZDonJyxcblx0XHRjbG9zZTogZmFsc2UsXG5cdFx0b3ZlcmxheTogZmFsc2UsXG5cdFx0Y2xvc2VPbk92ZXJsYXk6IGZhbHNlLFxuXHRcdG1pbmltaXplOiBmYWxzZSxcblx0XHRtYXhpbWl6ZTogZmFsc2UsXG5cdFx0ZHJhZ2FibGU6ZmFsc2UsXG5cdFx0cmVzaXphYmxlOmZhbHNlLFxuXHRcdGNlbnRlcmVkOiBmYWxzZSxcblx0XHRmaXhlZDogZmFsc2UsXG5cdFx0cGluYWJsZTpmYWxzZSxcblxuXHRcdGhlaWdodDonJyxcblx0XHR3aWR0aDonJyxcblx0XHRtYXhCb2R5SGVpZ2h0OicnLFxuXHRcdG1pbkJvZHlIZWlnaHQ6JycsXG5cdFx0bWluV2lkdGg6JycsXG5cdFx0bWF4V2lkdGg6JycsXG5cdFx0YWRqdXN0SGVpZ2h0OmZhbHNlLFxuXHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0aXNPcGVuaW5nOmZhbHNlLFxuXHRcdG1pbmltaXplZDpmYWxzZSxcblx0XHRtYXhpbWl6ZWQ6ZmFsc2UsXG5cdFx0cGlubmVkOmZhbHNlLFxuXHRcdHpJbmRleDoxMDAsXG5cdFx0dG9wOiAnJ1xuXHR9XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0ZWw6IEVsZW1lbnRSZWYsIFxuXHRcdHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG5cdFx0cHJpdmF0ZSByZW5kZXJlcjpSZW5kZXJlcikge1xuXHRcdHRoaXMuZWwgPSBlbC5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuXHRwcml2YXRlIGNhbGNNYXhIZWlnaHQobm9kZTphbnksIHRhcmdldDpzdHJpbmcpe1xuXHRcdGxldCBsaXN0ID0gbm9kZS5jaGlsZE5vZGVzO1xuXHRcdGxldCBtYXggPSAwO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0ICAgaWYobGlzdFtpXS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT09dGFyZ2V0KXtcblx0XHRcdCAgIGxpc3QgPSBsaXN0W2ldLmNoaWxkTm9kZXM7XG5cdFx0XHQgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0ICAgaWYobGlzdFtpXS5ub2RlVHlwZT09PTEpe1xuXHRcdFx0XHRcdCAgIG1heCArPSAobGlzdFtpXS5jbGllbnRIZWlnaHQrbGlzdFtpXS5vZmZzZXRIZWlnaHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHQgICB9XG4gICAgICAgIH1cbiAgICBcdHJldHVybiBtYXg7XG5cdH1cblxuXHRpbml0KGNvbXBvbmVudCwgZGF0YSwgY29uZmlnOiBQb3B1cExpdGVPcHRpb25zLCBzZWxlY3RvcjogV2luZG93TGl0ZVNlbGVjdGlvbikge1xuXHRcdGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuXHRcdGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuY29udGVudC5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cdFx0Y29uc3QgaW5zdGFuY2UgPSAoPFBvcHVwTGl0ZUNvbnRlbnRDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKTtcblx0XHRpbnN0YW5jZS5kYXRhID0gZGF0YTtcblx0XHRpbnN0YW5jZS5pZCA9IGNvbmZpZy5pZDtcblxuXHRcdGlmKGluc3RhbmNlLnBvcHVwVGl0bGUpIHtcblx0XHRcdGNvbmZpZy5wb3B1cFRpdGxlID0gaW5zdGFuY2UucG9wdXBUaXRsZS5iaW5kKGluc3RhbmNlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uZmlnLnBvcHVwVGl0bGUgPSAoaWQpID0+IGlkO1xuXHRcdH1cblx0XHRcblx0XHRpZiAoY29uZmlnKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoY29uZmlnKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0dGhpcy5jb25maWdba2V5XSA9IGNvbmZpZ1trZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0dGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuXG5cdFx0dGhpcy5kaXNwbGF5KGNvbmZpZyk7XG5cdH1cblx0XHRcblx0cHVibGljIGRpc3BsYXkocHJvcHM6V2luZG93T3B0aW9ucyl7XG5cdFx0dGhpcy5jb25maWcubWF4Qm9keUhlaWdodCA9IHByb3BzICYmIHByb3BzLm1heEhlaWdodCA/IHByb3BzLm1heEhlaWdodDonJztcblx0XHQgdGhpcy5jb25maWcubWluV2lkdGggPSBwcm9wcyAmJiBwcm9wcy5taW5XaWR0aCA/IHByb3BzLm1pbldpZHRoOicnO1xuXHRcdCB0aGlzLmNvbmZpZy5tYXhXaWR0aCA9IHByb3BzICYmIHByb3BzLm1heFdpZHRoID8gcHJvcHMubWF4V2lkdGg6Jyc7XG5cdFx0IHRoaXMuY29uZmlnLnRvcCA9IHByb3BzICYmIHByb3BzLnRvcCA/IHByb3BzLnRvcCA6ICcnO1xuXHRcdCB0aGlzLmNvbmZpZy5pc09wZW5pbmcgPSB0cnVlO1xuXHRcdCB0aGlzLmNvbmZpZy5hZGp1c3RIZWlnaHQgPSBwcm9wcyAmJiBwcm9wcy5hZGp1c3RIZWlnaHQgPyBwcm9wcy5hZGp1c3RIZWlnaHQgOiBmYWxzZTtcblx0XHQgdGhpcy5leHRyYWNsYXNzZXMgPSB0aGlzLmNvbmZpZy5oZWFkZXIgPyBcIlwiOlwiaGVhZGVyLW9mZiBcIjtcblx0XHQgdGhpcy5leHRyYWNsYXNzZXMgKz0gdGhpcy5jb25maWcuZm9vdGVyID8gXCJcIjpcImZvb3Rlci1vZmYgXCI7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMub25SZXNpemUobnVsbCk7XG5cdFx0XHR0aGlzLmNvbmZpZy5pc09wZW4gPSB0cnVlO1xuXHRcdH0uYmluZCh0aGlzKSwxMCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0a2V5VXAoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcblxuXHRcdGlmIChjb2RlID09PSAxMykge1xuXHRcdFx0ZXZlbnQudGFyZ2V0LmNsaWNrKCk7XG5cdFx0fVx0XHRcblx0fVxuXHRjbG9zZU92ZXJsYXkoKXtcblx0XHRpZiAodGhpcy5jb25maWcuY2xvc2VPbk92ZXJsYXkpIHtcblx0XHR0aGlzLmNsb3NlTW9kYWwobnVsbCwgeyBpZDogdGhpcy5jb25maWcuaWQsIGNvbmZpcm1lZDogZmFsc2UgfSk7XG5cdFx0fVxuXHR9XG5cdG9uQ2xvc2UoZXZlbnQpIHtcblx0XHR0aGlzLmNsb3NlTW9kYWwoZXZlbnQsIHsgaWQ6IHRoaXMuY29uZmlnLmlkLCBjb25maXJtZWQ6IGZhbHNlIH0pO1xuXHR9XG5cdGNsb3NlTW9kYWwoJGV2ZW50OmFueSwgcmVzdWx0KXtcblx0XHR0aGlzLmNvbmZpZy5pc09wZW5pbmcgPSBmYWxzZTtcblx0XHR0aGlzLmNvbmZpZy5vdmVybGF5ID0gZmFsc2U7XG5cdFx0dGhpcy5jb25maWcuaXNPcGVuID0gZmFsc2U7XG5cdFx0dGhpcy5zZWxlY3Rvci5wb3BlZE91dCh0aGlzLmNvbmZpZy5pZCwgcmVzdWx0KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRtaW5pbWl6ZU1vZGFsKCRldmVudDphbnkpe1xuXHRcdHRoaXMuY29uZmlnLm1pbmltaXplZCA9ICF0aGlzLmNvbmZpZy5taW5pbWl6ZWQ7XG5cdFx0aWYodGhpcy5jb25maWcucmVzaXphYmxlKXtcblx0XHQgIGxldCBuZTphbnkgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5yZXNpemUtY29ybmVyJyk7XG5cdFx0ICBsZXQgd246YW55ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtbGl0ZScpO1xuXHRcdCAgbGV0IGJkOmFueSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHQgIGlmKCF0aGlzLmNvbmZpZy5taW5pbWl6ZWQpe2JkLnN0eWxlLmhlaWdodD1iZC5nZXRBdHRyaWJ1dGUoXCJvaFwiKTtiZC5zdHlsZS5tYXhIZWlnaHQ9IFwiaW5oZXJpdFwiO31cblx0XHQgIGVsc2Uge1xuXHRcdCAgYmQuc3R5bGUuaGVpZ2h0ID0gXCIwXCI7XG5cdFx0ICB3bi5zdHlsZS5oZWlnaHQ9XCJpbmhlcml0XCJcblx0XHQgIH1cblx0XHQgIG5lLnN0eWxlLmRpc3BsYXk9ICh0aGlzLmNvbmZpZy5taW5pbWl6ZWQgfHwgdGhpcy5jb25maWcubWF4aW1pemVkKSA/ICdub25lJzonYmxvY2snO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0bWF4aW1pemVNb2RhbCgkZXZlbnQ6YW55KXtcblx0XHR0aGlzLmNvbmZpZy5tYXhpbWl6ZWQgPSAhdGhpcy5jb25maWcubWF4aW1pemVkO1xuXHRcdGlmKHRoaXMuY29uZmlnLnJlc2l6YWJsZSl7XG5cdFx0ICBsZXQgbmU6YW55ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcucmVzaXplLWNvcm5lcicpO1xuXHRcdCAgbGV0IGJkOmFueSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHQgIGlmKGJkLmdldEF0dHJpYnV0ZShcIm9oXCIpKXtiZC5zdHlsZS5oZWlnaHQ9YmQuZ2V0QXR0cmlidXRlKFwib2hcIik7fVxuXHRcdCAgbmUuc3R5bGUuZGlzcGxheT0gKHRoaXMuY29uZmlnLm1pbmltaXplZCB8fCB0aGlzLmNvbmZpZy5tYXhpbWl6ZWQpID8gJ25vbmUnOidibG9jayc7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRzZWxlY3RlZCgkZXZlbnQ6IGFueSl7XG5cdFx0dGhpcy5zZWxlY3Rvci5zZXRTZWxlY3RlZCh0aGlzLmNvbmZpZy5pZCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cGluTW9kYWwoJGV2ZW50OmFueSl7XG5cdFx0dGhpcy5jb25maWcucGlubmVkID0gIXRoaXMuY29uZmlnLnBpbm5lZDtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRkcmFnRW5hYmxlZChldmVudDogRHJhZ0V2ZW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnLmRyYWdhYmxlICYmICF0aGlzLmNvbmZpZy5waW5uZWQ7XG5cdH1cblx0b25EcmFnU3RhcnQoZXZlbnQ6IERyYWdFdmVudCl7XG5cdH1cblx0b25EcmFnKGV2ZW50OiBEcmFnRXZlbnQpe1xuXHRcdGlmKGV2ZW50Lm5vZGUgPT09IHRoaXMuZHJhZ0hlYWRlci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ2xlZnQnLCAoZXZlbnQuY2xpZW50WC1ldmVudC5vZmZzZXQueCkrXCJweFwiKTtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ3RvcCcsIChldmVudC5jbGllbnRZLWV2ZW50Lm9mZnNldC55KStcInB4XCIpO1xuXHRcdH1cblx0fVxuXHRvbkRyYWdFbmQoZXZlbnQ6IERyYWdFdmVudCl7XG5cdFx0aWYoZXZlbnQubm9kZSA9PT0gdGhpcy5kcmFnSGVhZGVyLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnbGVmdCcsIChldmVudC5jbGllbnRYLWV2ZW50Lm9mZnNldC54KStcInB4XCIpO1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAndG9wJywgKGV2ZW50LmNsaWVudFktZXZlbnQub2Zmc2V0LnkpK1wicHhcIik7XG5cdFx0fVxuXHR9XG5cblx0cmVzaXplRW5hYmxlZChldmVudDogRHJhZ0V2ZW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnLnJlc2l6YWJsZTtcblx0fVxuXHRvblJlc2l6ZVN0YXJ0KGV2ZW50OiBEcmFnRXZlbnQpe1xuXHR9XG5cdG9uUmVzaXplUHJvZ3Jlc3MoZXZlbnQ6IERyYWdFdmVudCl7XG5cdFx0aWYoZXZlbnQubm9kZSA9PT0gdGhpcy5yZXNpemVyLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0Y29uc3Qgd3IgPSBldmVudC5tZWRpdW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRjb25zdCB3aWR0aCA9ICAoZXZlbnQuY2xpZW50WC1ldmVudC5vZmZzZXQueCkgLSB3ci5sZWZ0O1xuXHRcdFx0Y29uc3QgaGVpZ2h0ID0gKGV2ZW50LmNsaWVudFktZXZlbnQub2Zmc2V0LnkpIC0gd3IudG9wO1xuXHRcdFx0bGV0IGhkID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtaGVhZGVyJyk7XG5cdFx0XHRsZXQgZnQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1mb290ZXInKTtcblx0XHRcdGxldCBiZCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHRcdGxldCBmdGg9IGZ0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdGxldCBoZGg9IGhkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdGxldCBoID0gaGVpZ2h0IC0gaGRoIC0gZnRoIC0yO1xuXG5cdFx0XHRpZih3aWR0aD4yMDAgJiYgaGVpZ2h0PjYwKXtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnd2lkdGgnLCB3aWR0aCtcInB4XCIpO1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICdoZWlnaHQnLCBoZWlnaHQrXCJweFwiKTtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoYmQsICdoZWlnaHQnLCBoK1wicHhcIik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdG9uUmVzaXplRW5kKGV2ZW50OiBEcmFnRXZlbnQpe1xuXHRcdGlmKGV2ZW50Lm5vZGUgPT09IHRoaXMucmVzaXplci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdGNvbnN0IHdyID0gZXZlbnQubWVkaXVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0Y29uc3Qgd2lkdGggPSAgKGV2ZW50LmNsaWVudFgtZXZlbnQub2Zmc2V0LngpIC0gd3IubGVmdDtcblx0XHRcdGNvbnN0IGhlaWdodCA9IChldmVudC5jbGllbnRZLWV2ZW50Lm9mZnNldC55KSAtIHdyLnRvcDtcblxuXHRcdFx0aWYod2lkdGg+MjAwICYmIGhlaWdodD42MCl7XG5cdFx0XHRcdGxldCBoZCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWhlYWRlcicpO1xuXHRcdFx0XHRsZXQgZnQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1mb290ZXInKTtcblx0XHRcdFx0bGV0IGJkID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuXHRcdFx0XHRsZXQgZnRoPSBmdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHRcdGxldCBoZGg9IGhkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdFx0bGV0IGggPSBoZWlnaHQgLSBoZGggLSBmdGggLTI7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ3dpZHRoJywgd2lkdGgrXCJweFwiKTtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnaGVpZ2h0JywgaGVpZ2h0K1wicHhcIik7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGJkLCAnaGVpZ2h0JywgaCtcInB4XCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIiwiXG5pbXBvcnQge1xuICAgIEluamVjdGFibGUsXG4gICAgSW5qZWN0b3IsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIEVtYmVkZGVkVmlld1JlZixcbiAgICBBcHBsaWNhdGlvblJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFBvcHVwTGl0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcG9wdXAtbGl0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wdXBMaXRlT3B0aW9ucywgV2luZG93T3B0aW9ucywgV2luZG93TGl0ZVNlbGVjdGlvbiwgV2luZG93TGl0ZVNlcnZpY2UgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3BvcHVwLWxpdGUuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBvcHVwTGl0ZVNlcnZpY2UgaW1wbGVtZW50cyBXaW5kb3dMaXRlU2VydmljZSwgV2luZG93TGl0ZVNlbGVjdGlvbiB7XG5cdHByaXZhdGUgIGNvbXBvbmVudFJlZiA9IHt9O1xuXHRwcml2YXRlICBkb21FbGVtO1xuXHRwcml2YXRlIHN0YXR1cyA9IFtdO1xuXHQvLyBwcml2YXRlIHdpbmRvd3NMaXN0OiBQb3B1cExpdGVDb21wb25lbnRbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXG4gICkgeyB9XG5cblx0cHJpdmF0ZSBjcmVhdGVQb3B1cExpdGVDb21wb25lbnQoKSB7XG5cdFx0Y29uc3QgcmVmID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcblx0XHRcdC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShQb3B1cExpdGVDb21wb25lbnQpXG5cdFx0XHQuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG5cdFx0dGhpcy5hcHBSZWYuYXR0YWNoVmlldyhyZWYuaG9zdFZpZXcpO1xuXG5cdFx0dGhpcy5kb21FbGVtID0gKHJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pilcblx0XHRcdC5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG5cblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbSk7XG5cblx0XHRyZXR1cm4gcmVmO1xuXHR9XG4gIFxuXHRwb3BlZE91dChpZCwgcmVzdWx0OiBhbnkpIHtcblx0XHRjb25zdCByZWYgPSB0aGlzLmNvbXBvbmVudFJlZltpZF07XG5cdFx0XG5cdFx0dGhpcy5hcHBSZWYuZGV0YWNoVmlldyhyZWYuaG9zdFZpZXcpO1xuXHRcdHJlZi5kZXN0cm95KCk7XG5cblx0XHRkZWxldGUgdGhpcy5jb21wb25lbnRSZWZbaWRdO1xuXG5cdFx0dGhpcy5zdGF0dXNbaWRdLm5leHQocmVzdWx0KTtcblx0XHRkZWxldGUgdGhpcy5zdGF0dXNbaWRdO1xuXHR9XG5cdHNldFNlbGVjdGVkKGlkKXtcblx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXModGhpcy5jb21wb25lbnRSZWYpO1xuXG5cdFx0bGlzdC5tYXAoKHJlZik9PiB7XG5cdFx0XHQoPFBvcHVwTGl0ZUNvbXBvbmVudD50aGlzLmNvbXBvbmVudFJlZltyZWZdLmluc3RhbmNlKS5jb25maWcuc2VsZWN0ZWQgPSBmYWxzZTtcblx0XHR9KTtcblx0XHQoPFBvcHVwTGl0ZUNvbXBvbmVudD50aGlzLmNvbXBvbmVudFJlZltpZF0uaW5zdGFuY2UpLmNvbmZpZy5zZWxlY3RlZCA9IHRydWU7XG5cdH1cblxuXHRvcGVuV2luZG93KGNvbXBvbmVudDogYW55LCBpZDogc3RyaW5nLCBkYXRhPzogYW55LCBjb25maWc/OiBQb3B1cExpdGVPcHRpb25zKTogT2JzZXJ2YWJsZTxhbnk+e1xuXHRcdGNvbnN0IHJlZiA9IHRoaXMuY3JlYXRlUG9wdXBMaXRlQ29tcG9uZW50KCk7XG5cdFx0Y29uc3QgaW5zdGFuY2UgPSAoPFBvcHVwTGl0ZUNvbXBvbmVudD5yZWYuaW5zdGFuY2UpO1xuXHRcdGNvbnN0IGxvY2FsQ29uZmlnOiBXaW5kb3dPcHRpb25zID0ge1xuXHRcdFx0Y2xvc2U6IHRydWUsXG5cdFx0XHRtaW5pbWl6ZTogdHJ1ZSxcblx0XHRcdG1heGltaXplOiB0cnVlLFxuXHRcdFx0cmVzaXphYmxlOnRydWUsXG5cdFx0XHRoZWFkZXI6IHRydWUsXG5cdFx0XHRmb290ZXI6IHRydWUsXG5cdFx0XHRkcmFnYWJsZTp0cnVlLFxuXHRcdFx0cGluYWJsZTp0cnVlLFxuXHRcdFx0aWRPbkhlYWRlcjogdHJ1ZSxcblx0XHRcdGNlbnRlcmVkOiB0cnVlXG5cdFx0fTtcblx0XHRpZiAoY29uZmlnKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoY29uZmlnKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0bG9jYWxDb25maWdba2V5XSA9IGNvbmZpZ1trZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0bG9jYWxDb25maWcuaWQgPSBpZCA/IGlkIDogJycrbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cblx0XHR0aGlzLmNvbXBvbmVudFJlZltsb2NhbENvbmZpZy5pZF0gPSByZWY7XG5cdFx0dGhpcy5zdGF0dXNbbG9jYWxDb25maWcuaWRdID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG5cdFx0aW5zdGFuY2UuaW5pdChjb21wb25lbnQsIGRhdGEsIGxvY2FsQ29uZmlnLCB0aGlzKTtcblx0XHR0aGlzLnNldFNlbGVjdGVkKGxvY2FsQ29uZmlnLmlkKTtcblxuXHRcdHJldHVybiB0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF07XG5cdH1cblxuXHRvcGVuTW9kYWwoY29tcG9uZW50OiBhbnksIGlkOiBzdHJpbmcsIGRhdGE/OiBhbnksIGNvbmZpZz86IFBvcHVwTGl0ZU9wdGlvbnMpOiBPYnNlcnZhYmxlPGFueT57XG5cdFx0Y29uc3QgcmVmID0gdGhpcy5jcmVhdGVQb3B1cExpdGVDb21wb25lbnQoKTtcblx0XHRjb25zdCBpbnN0YW5jZSA9ICg8UG9wdXBMaXRlQ29tcG9uZW50PnJlZi5pbnN0YW5jZSk7XG5cdFx0Y29uc3QgbG9jYWxDb25maWc6IFdpbmRvd09wdGlvbnMgPSB7XG5cdFx0XHRvdmVybGF5OiB0cnVlLFxuXHRcdFx0Y2xvc2U6IHRydWUsXG5cdFx0XHRjbG9zZU9uT3ZlcmxheTogdHJ1ZSxcblx0XHRcdGhlYWRlcjogdHJ1ZSxcblx0XHRcdGZvb3RlcjogdHJ1ZSxcblx0XHRcdGNlbnRlcmVkOiB0cnVlXG5cdFx0fTtcblxuXHRcdGlmIChjb25maWcpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhjb25maWcpO1xuXHRcdFx0bGlzdC5tYXAoKGtleSkgPT4ge1xuXHRcdFx0XHRsb2NhbENvbmZpZ1trZXldID0gY29uZmlnW2tleV07XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRsb2NhbENvbmZpZy5pZCA9IGlkID8gaWQgOiAnJytuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuXHRcdHRoaXMuY29tcG9uZW50UmVmW2xvY2FsQ29uZmlnLmlkXSA9IHJlZjtcblx0XHR0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF0gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cblx0XHRpbnN0YW5jZS5pbml0KGNvbXBvbmVudCwgZGF0YSwgbG9jYWxDb25maWcsIHRoaXMpO1xuXHRcdHRoaXMuc2V0U2VsZWN0ZWQobG9jYWxDb25maWcuaWQpO1xuXG5cdFx0cmV0dXJuIHRoaXMuc3RhdHVzW2xvY2FsQ29uZmlnLmlkXTtcblx0fVxuXG5cdG9wZW5EaWFsb2coY29tcG9uZW50OiBhbnksIGlkOiBzdHJpbmcsIGRhdGE/OiBhbnksIGNvbmZpZz86IFBvcHVwTGl0ZU9wdGlvbnMpOiBPYnNlcnZhYmxlPGFueT57XG5cdFx0Y29uc3QgcmVmID0gdGhpcy5jcmVhdGVQb3B1cExpdGVDb21wb25lbnQoKTtcblx0XHRjb25zdCBpbnN0YW5jZSA9ICg8UG9wdXBMaXRlQ29tcG9uZW50PnJlZi5pbnN0YW5jZSk7XG5cdFx0Y29uc3QgbG9jYWxDb25maWc6IFdpbmRvd09wdGlvbnMgPSB7XG5cdFx0XHRvdmVybGF5OiB0cnVlLFxuXHRcdFx0Y2xvc2U6IHRydWUsXG5cdFx0XHRjbG9zZU9uT3ZlcmxheTogdHJ1ZSxcblx0XHRcdGhlYWRlcjogdHJ1ZSxcblx0XHRcdGZvb3RlcjogdHJ1ZSxcblx0XHRcdGNlbnRlcmVkOiB0cnVlXG5cdFx0fTtcblx0XHRpZiAoY29uZmlnKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoY29uZmlnKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0bG9jYWxDb25maWdba2V5XSA9IGNvbmZpZ1trZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0bG9jYWxDb25maWcuaWQgPSBpZCA/IGlkIDogJycrbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cblx0XHR0aGlzLmNvbXBvbmVudFJlZltsb2NhbENvbmZpZy5pZF0gPSByZWY7XG5cdFx0dGhpcy5zdGF0dXNbbG9jYWxDb25maWcuaWRdID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG5cdFx0aW5zdGFuY2UuaW5pdChjb21wb25lbnQsIGRhdGEsIGxvY2FsQ29uZmlnLCB0aGlzKTtcblx0XHR0aGlzLnNldFNlbGVjdGVkKGxvY2FsQ29uZmlnLmlkKTtcblxuXHRcdHJldHVybiB0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF07XG5cdH1cblxuXHRjb25maXJtKGlkLCBkYXRhOiB7fSkge1xuXHRcdGNvbnN0IGluZm8gPSB7IFxuXHRcdFx0aWQ6IGlkLCBcblx0XHRcdGNvbmZpcm1lZDogdHJ1ZSBcblx0XHR9O1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoZGF0YSk7XG5cdFx0XHRsaXN0Lm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRcdGluZm9ba2V5XSA9IGRhdGFba2V5XTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdHRoaXMucG9wZWRPdXQoaWQsIGluZm8pO1xuXHR9XG5cdGNhbmNlbChpZCwgZGF0YToge30pIHtcblx0XHRjb25zdCBpbmZvID0geyBcblx0XHRcdGlkOiBpZCwgXG5cdFx0XHRjb25maXJtZWQ6IHRydWUgXG5cdFx0fTtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKGRhdGEpO1xuXHRcdFx0bGlzdC5tYXAoKGtleSkgPT4ge1xuXHRcdFx0XHRpbmZvW2tleV0gPSBkYXRhW2tleV07XG5cdFx0XHR9KVxuXHRcdH1cblx0XHR0aGlzLnBvcGVkT3V0KGlkLCB7IGlkOiBpZCwgY29uZmlybWVkOiBmYWxzZSB9KTtcblx0fVxuXG59IiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFBvcHVwTGl0ZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wb3B1cC1saXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBvcHVwTGl0ZVNlcnZpY2UgfSBmcm9tICcuL2luamVjdGFibGVzL3BvcHVwLWxpdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQHNlZGVoL2RyYWctZW5hYmxlZCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIERyYWdEcm9wTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFBvcHVwTGl0ZUNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgUG9wdXBMaXRlQ29tcG9uZW50XHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIFBvcHVwTGl0ZUNvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBQb3B1cExpdGVTZXJ2aWNlXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBQb3B1cExpdGVNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7Ozs7SUFnRkMsWUFDQyxFQUFjLEVBQ04sMEJBQ0E7UUFEQSw2QkFBd0IsR0FBeEIsd0JBQXdCO1FBQ3hCLGFBQVEsR0FBUixRQUFROzRCQXhETSxFQUFFO3NCQXdCRjtZQUN0QixFQUFFLEVBQUMsRUFBRTtZQUNMLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLEtBQUs7WUFDZCxjQUFjLEVBQUUsS0FBSztZQUNyQixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFDLEtBQUs7WUFDZCxTQUFTLEVBQUMsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUMsS0FBSztZQUViLE1BQU0sRUFBQyxFQUFFO1lBQ1QsS0FBSyxFQUFDLEVBQUU7WUFDUixhQUFhLEVBQUMsRUFBRTtZQUNoQixhQUFhLEVBQUMsRUFBRTtZQUNoQixRQUFRLEVBQUMsRUFBRTtZQUNYLFFBQVEsRUFBQyxFQUFFO1lBQ1gsWUFBWSxFQUFDLEtBQUs7WUFDbEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUMsS0FBSztZQUNmLFNBQVMsRUFBQyxLQUFLO1lBQ2YsU0FBUyxFQUFDLEtBQUs7WUFDZixNQUFNLEVBQUMsS0FBSztZQUNaLE1BQU0sRUFBQyxHQUFHO1lBQ1YsR0FBRyxFQUFFLEVBQUU7U0FDUDtRQU1BLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztLQUN4Qjs7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