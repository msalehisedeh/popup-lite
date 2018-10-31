import { Component, ViewContainerRef, ComponentFactoryResolver, Renderer, HostListener, ViewChild, ElementRef, Injectable, Injector, ApplicationRef, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DragDropModule } from 'drag-enabled';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PopupLiteComponent = /** @class */ (function () {
    function PopupLiteComponent(el, componentFactoryResolver, renderer) {
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
    PopupLiteComponent.prototype.onResize = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.config.centered && !this.config.pinned) {
            /** @type {?} */
            var ne = this.el.querySelector('.popup-lite');
            /** @type {?} */
            var root = this.el.parentElement;
            this.renderer.setElementStyle(ne, 'left', ((root.getBoundingClientRect().width - ne.getBoundingClientRect().width) / 2) + "px");
        }
    };
    /**
     * @param {?} node
     * @param {?} target
     * @return {?}
     */
    PopupLiteComponent.prototype.calcMaxHeight = /**
     * @param {?} node
     * @param {?} target
     * @return {?}
     */
    function (node, target) {
        /** @type {?} */
        var list = node.childNodes;
        /** @type {?} */
        var max = 0;
        for (var i = 0; i < list.length; i++) {
            if (list[i].nodeName.toLowerCase() === target) {
                list = list[i].childNodes;
                for (var i_1 = 0; i_1 < list.length; i_1++) {
                    if (list[i_1].nodeType === 1) {
                        max += (list[i_1].clientHeight + list[i_1].offsetHeight);
                    }
                }
                break;
            }
        }
        return max;
    };
    /**
     * @param {?} component
     * @param {?} data
     * @param {?} config
     * @param {?} selector
     * @return {?}
     */
    PopupLiteComponent.prototype.init = /**
     * @param {?} component
     * @param {?} data
     * @param {?} config
     * @param {?} selector
     * @return {?}
     */
    function (component, data, config, selector) {
        var _this = this;
        /** @type {?} */
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        /** @type {?} */
        var componentRef = this.content.createComponent(componentFactory);
        /** @type {?} */
        var instance = (/** @type {?} */ (componentRef.instance));
        instance.data = data;
        instance.id = config.id;
        if (instance.popupTitle) {
            config.popupTitle = instance.popupTitle.bind(instance);
        }
        else {
            config.popupTitle = function (id) { return id; };
        }
        if (config) {
            /** @type {?} */
            var list = Object.keys(config);
            list.map(function (key) {
                _this.config[key] = config[key];
            });
        }
        this.selector = selector;
        this.display(config);
    };
    /**
     * @param {?} props
     * @return {?}
     */
    PopupLiteComponent.prototype.display = /**
     * @param {?} props
     * @return {?}
     */
    function (props) {
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PopupLiteComponent.prototype.keyUp = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        /** @type {?} */
        var code = event.which;
        if (code === 13) {
            event.target.click();
        }
    };
    /**
     * @return {?}
     */
    PopupLiteComponent.prototype.closeOverlay = /**
     * @return {?}
     */
    function () {
        if (this.config.closeOnOverlay) {
            this.closeModal(null, { id: this.config.id, confirmed: false });
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PopupLiteComponent.prototype.onClose = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.closeModal(event, { id: this.config.id, confirmed: false });
    };
    /**
     * @param {?} $event
     * @param {?} result
     * @return {?}
     */
    PopupLiteComponent.prototype.closeModal = /**
     * @param {?} $event
     * @param {?} result
     * @return {?}
     */
    function ($event, result) {
        this.config.isOpening = false;
        this.config.overlay = false;
        this.config.isOpen = false;
        this.selector.popedOut(this.config.id, result);
        return false;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    PopupLiteComponent.prototype.minimizeModal = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.config.minimized = !this.config.minimized;
        if (this.config.resizable) {
            /** @type {?} */
            var ne = this.el.querySelector('.resize-corner');
            /** @type {?} */
            var wn = this.el.querySelector('.popup-lite');
            /** @type {?} */
            var bd = this.el.querySelector('.modal-body');
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
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    PopupLiteComponent.prototype.maximizeModal = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.config.maximized = !this.config.maximized;
        if (this.config.resizable) {
            /** @type {?} */
            var ne = this.el.querySelector('.resize-corner');
            /** @type {?} */
            var bd = this.el.querySelector('.modal-body');
            if (bd.getAttribute("oh")) {
                bd.style.height = bd.getAttribute("oh");
            }
            ne.style.display = (this.config.minimized || this.config.maximized) ? 'none' : 'block';
        }
        return false;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    PopupLiteComponent.prototype.selected = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.selector.setSelected(this.config.id);
        return true;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    PopupLiteComponent.prototype.pinModal = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.config.pinned = !this.config.pinned;
        return false;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PopupLiteComponent.prototype.dragEnabled = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this.config.dragable && !this.config.pinned;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PopupLiteComponent.prototype.onDragStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PopupLiteComponent.prototype.onDrag = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.node === this.dragHeader.element.nativeElement) {
            this.renderer.setElementStyle(event.medium, 'left', (event.clientX - event.offset.x) + "px");
            this.renderer.setElementStyle(event.medium, 'top', (event.clientY - event.offset.y) + "px");
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PopupLiteComponent.prototype.onDragEnd = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.node === this.dragHeader.element.nativeElement) {
            this.renderer.setElementStyle(event.medium, 'left', (event.clientX - event.offset.x) + "px");
            this.renderer.setElementStyle(event.medium, 'top', (event.clientY - event.offset.y) + "px");
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PopupLiteComponent.prototype.resizeEnabled = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return this.config.resizable;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PopupLiteComponent.prototype.onResizeStart = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PopupLiteComponent.prototype.onResizeProgress = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.node === this.resizer.element.nativeElement) {
            /** @type {?} */
            var wr = event.medium.getBoundingClientRect();
            /** @type {?} */
            var width = (event.clientX - event.offset.x) - wr.left;
            /** @type {?} */
            var height = (event.clientY - event.offset.y) - wr.top;
            /** @type {?} */
            var hd = this.el.querySelector('.modal-header');
            /** @type {?} */
            var ft = this.el.querySelector('.modal-footer');
            /** @type {?} */
            var bd = this.el.querySelector('.modal-body');
            /** @type {?} */
            var fth = ft.getBoundingClientRect().height;
            /** @type {?} */
            var hdh = hd.getBoundingClientRect().height;
            /** @type {?} */
            var h = height - hdh - fth - 2;
            if (width > 200 && height > 60) {
                this.renderer.setElementStyle(event.medium, 'width', width + "px");
                this.renderer.setElementStyle(event.medium, 'height', height + "px");
                this.renderer.setElementStyle(bd, 'height', h + "px");
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PopupLiteComponent.prototype.onResizeEnd = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.node === this.resizer.element.nativeElement) {
            /** @type {?} */
            var wr = event.medium.getBoundingClientRect();
            /** @type {?} */
            var width = (event.clientX - event.offset.x) - wr.left;
            /** @type {?} */
            var height = (event.clientY - event.offset.y) - wr.top;
            if (width > 200 && height > 60) {
                /** @type {?} */
                var hd = this.el.querySelector('.modal-header');
                /** @type {?} */
                var ft = this.el.querySelector('.modal-footer');
                /** @type {?} */
                var bd = this.el.querySelector('.modal-body');
                /** @type {?} */
                var fth = ft.getBoundingClientRect().height;
                /** @type {?} */
                var hdh = hd.getBoundingClientRect().height;
                /** @type {?} */
                var h = height - hdh - fth - 2;
                this.renderer.setElementStyle(event.medium, 'width', width + "px");
                this.renderer.setElementStyle(event.medium, 'height', height + "px");
                this.renderer.setElementStyle(bd, 'height', h + "px");
            }
        }
    };
    PopupLiteComponent.decorators = [
        { type: Component, args: [{
                    selector: 'popup-lite',
                    template: "<div class=\"popup-lite-overlay\" #overlay\n\t(click)=\"closeOverlay()\"\n\t[style.display]=\"config.overlay ? 'block' : 'none'\"></div>\n<div #modalWondow \n\tclass=\"popup-lite\" \n\ttabindex=\"0\"\n\t[style.minWidth]=\"config.minWidth\"\n\t[style.maxWidth]=\"config.maxWidth\"\n\t[style.display]=\"config.isOpening ? 'block' : 'none'\" \n\t[style.position]=\"config.fixed ? 'fixed':'absolute'\"\n\t[style.top]=\"config.top.length ? config.top : ''\"\n\t[style.height]=\"config.height\"\n\t[style.zIndex]=\"config.zIndex\"\n\t[class.fade-in]=\"config.isOpen\" \n\t[class.maximized]=\"config.maximized\"\n\t[class.pinned]=\"config.pinned\"\n\t[style.z-index]=\"config.selected ? 105 : 100\"\n\t(keyup)=\"keyUp($event)\"\n\t(focus)=\"selected($event)\"\n\t(click)=\"selected($event)\">\n\t\t<div class=\"controls\">\n\t\t\t<a *ngIf=\"config.pinable\"\n\t\t\t\tclass=\"pin\" tabindex=\"0\" \n\t\t\t\t(click)=\"pinModal($event)\">\n\t\t\t\t<span *ngIf=\"!config.pinned\" class=\"fa fw fa-unlock\" aria-hidden=\"true\"></span>\n\t\t\t\t<span *ngIf=\"config.pinned\" class=\"fa fw fa-lock\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Pin</span>\n\t\t\t</a><a *ngIf=\"config.minimize\"\n\t\t\t\tclass=\"minify\" tabindex=\"0\" \n\t\t\t\t(click)=\"minimizeModal($event)\" \n\t\t\t\t[class.clicked]=\"config.minimized\">\n\t\t\t\t<span class=\"fa fw fa-window-minimize\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Minimize</span>\n\t\t\t</a><a *ngIf=\"config.maximize\"\n\t\t\t\tclass=\"maxify\" tabindex=\"0\" \n\t\t\t\t(click)=\"maximizeModal($event)\" \n\t\t\t\t[class.clicked]=\"config.maximized\">\n\t\t\t\t<span class=\"fa fw fa-window-maximize\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Maximize</span>\n\t\t\t</a><a *ngIf=\"config.close\"\n\t\t\t\tclass=\"close\" tabindex=\"0\" \n\t\t\t\t(click)=\"onClose($event)\">\n\t\t\t\t<span class=\"fa fw fa-window-close\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Close</span>\n\t\t\t</a>\n\t\t</div>\n\t\t<a *ngIf=\"config.resizable\"\n\t\t\t#resizer\n\t\t\tclass=\"resize-corner\" \n\t\t\ttabindex=\"0\" \n\t\t\t[medium]=\"modalWondow\"\n\t\t\t[dragInDocument]=\"resizeEnabled.bind(this)\"\n\t\t\t(onDragStart)=\"onResizeStart($event)\"\n\t\t\t(onDrag)=\"onResizeProgress($event)\"\n\t\t\t(onDragEnd)=\"onResizeEnd($event)\">\n\t\t\t<span class=\"fa fw fa-ellipsis-h\" aria-hidden=\"true\"></span>\n\t\t\t<span class=\"off-screen\">Resize</span>\n\t\t</a>\n\t\t<div *ngIf=\"config.header\"\n\t\t\t#dragHeader\n\t\t\tclass=\"modal-header\" \n\t\t\t[id]=\"config.id\"\n\t\t\t[style.cursor]=\"(config.dragable && !config.pinned) ? 'all-scroll':'default'\"\n\t\t\t[class.pinned]=\"config.pinned\"\n\t\t\t[class.minified]=\"config.minimized\"\n\t\t\t[medium]=\"modalWondow\"\n\t\t\t[dragInDocument]=\"dragEnabled.bind(this)\"\n\t\t\t(onDragStart)=\"onDragStart($event)\"\n\t\t\t(onDrag)=\"onDrag($event)\"\n\t\t\t(onDragEnd)=\"onDragEnd($event)\"\n\t\t\t(dblclick)=\"maximizeModal($event)\">\n\t\t\t<span *ngIf=\"config.headerIcon\" [class]=\"'icon ' + config.headerIcon\"></span>\n\t\t\t<span *ngIf=\"config.idOnHeader\" class=\"header-title\" [class.padded]=\"config.headerIcon ? true:null\" [textContent]=\"config.popupTitle(config.id)\"></span>\n\t\t</div>\n\t\t  <div class=\"modal-body\"\n\t\t     [class.minimized]=\"config.minimized\"\n\t\t     [style.minHeight]=\"config.minBodyHeight\"\n\t\t\t [style.maxHeight]=\"config.maxBodyHeight\">\n\t\t\t <ng-template  #content></ng-template>\n\t\t  </div>\n\t      <div class=\"modal-footer\" *ngIf=\"config.footer\"\n\t\t  \t\t[class.minimized]=\"config.minimized\">\n\t         <ng-content select=\"[modal-footer]\"></ng-content>\n\t\t  </div>\n\t    </div>",
                    styles: [":host .centered{text-align:center;margin:0 auto}:host .popup-lite h2{font-size:.8em;margin:0}:host .popup-lite-overlay{position:absolute;background-color:rgba(44,44,44,.44);width:100%;height:100%;top:0;left:0;z-index:104}:host .popup-lite{box-sizing:border-box;position:absolute;top:100px;left:100px;border-radius:6px;padding:0;z-index:100;background-color:transparent;min-width:300px;-ms-box-shadow:0 3px 9px rgba(0,0,0,.5);-o-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);opacity:0;transition:opacity .25s ease-in-out}:host .popup-lite .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .popup-lite.fade-in{opacity:1;transition:opacity .25s ease-in-out}:host .popup-lite .controls{position:absolute;top:0;right:2px;border:1px solid #eee;background-color:#fff;border-radius:2px;border-top:0;z-index:2}:host .popup-lite .controls a{text-align:center;border:1px solid #999;box-sizing:border-box;border-radius:0 0 2px 2px;border-top:0;display:inline-block;width:21px;height:21px}:host .popup-lite .controls a span{display:inline-block}:host .popup-lite .controls a.close{cursor:pointer}:host .popup-lite .controls a.close:hover{color:red}:host .popup-lite .controls a.minify{cursor:pointer}:host .popup-lite .controls a.minify.clicked,:host .popup-lite .controls a.minify:hover{color:red}:host .popup-lite .controls a.pin{cursor:pointer}:host .popup-lite .controls a.pin.clicked,:host .popup-lite .controls a.pin:hover{color:red}:host .popup-lite .controls a.maxify{cursor:pointer}:host .popup-lite .controls a.maxify.clicked,:host .popup-lite .controls a.maxify:hover{color:red}:host .popup-lite a{text-align:center;border:1px solid #999;box-sizing:border-box;border-radius:2px}:host .popup-lite a.resize-corner{position:absolute;height:5px;bottom:12px;right:4px;width:13px;border:0;cursor:se-resize}:host .popup-lite a.resize-corner:hover{color:red}:host .popup-lite .modal-header{background-color:#fff;box-sizing:border-box;border-radius:2px 2px 0 0;min-width:100%;min-height:24px;padding:5px 10px}:host .popup-lite .modal-header .icon{position:absolute;left:5px;top:3px}:host .popup-lite .modal-header .header-title{position:absolute;top:0;left:0;padding:2px 5px;box-sizing:border-box;font-size:.9rem}:host .popup-lite .modal-header .header-title.padded{left:15px}:host .popup-lite .modal-body{background-color:#fff;box-sizing:border-box;padding:10px;overflow-y:auto}:host .popup-lite .modal-footer{background-color:#fff;box-sizing:border-box;border-radius:0 0 2px 2px;min-width:100%;min-height:20px;padding:5px 10px}:host .popup-lite .modal-footer .right{text-align:right}:host .header-off{border-top-left-radius:2px;border-top-right-radius:5px}:host .footer-off{border-bottom-right-radius:5px;border-bottom-left-radius:2px}:host .minimized{padding-top:0!important;padding-bottom:0!important;min-height:0!important}:host .maximized{top:0!important;left:0!important;min-width:100%!important;min-height:100%!important}:host .maximized .modal-footer,:host .maximized .modal-header{width:100%}:host .maximized .modal-body{min-width:100%;min-height:95vh}:host .minimized{min-height:0!important;height:0!important}:host .minified{border-radius:6px!important}:host .popup-lite.maximized{height:inherit!important;min-height:inherit!important}:host .pinned{border:1px dotted red}:host .block-key-events{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}"]
                }] }
    ];
    /** @nocollapse */
    PopupLiteComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ComponentFactoryResolver },
        { type: Renderer }
    ]; };
    PopupLiteComponent.propDecorators = {
        content: [{ type: ViewChild, args: ["content", { read: ViewContainerRef },] }],
        modalWondow: [{ type: ViewChild, args: ["modalWondow", { read: ViewContainerRef },] }],
        resizer: [{ type: ViewChild, args: ["resizer", { read: ViewContainerRef },] }],
        dragHeader: [{ type: ViewChild, args: ["dragHeader", { read: ViewContainerRef },] }],
        onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
    };
    return PopupLiteComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PopupLiteService = /** @class */ (function () {
    // private windowsList: PopupLiteComponent[] = [];
    function PopupLiteService(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.componentRef = {};
        this.status = [];
    }
    /**
     * @return {?}
     */
    PopupLiteService.prototype.createPopupLiteComponent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var ref = this.componentFactoryResolver
            .resolveComponentFactory(PopupLiteComponent)
            .create(this.injector);
        this.appRef.attachView(ref.hostView);
        this.domElem = /** @type {?} */ ((/** @type {?} */ (ref.hostView))
            .rootNodes[0]);
        document.body.appendChild(this.domElem);
        return ref;
    };
    /**
     * @param {?} id
     * @param {?} result
     * @return {?}
     */
    PopupLiteService.prototype.popedOut = /**
     * @param {?} id
     * @param {?} result
     * @return {?}
     */
    function (id, result) {
        /** @type {?} */
        var ref = this.componentRef[id];
        this.appRef.detachView(ref.hostView);
        ref.destroy();
        delete this.componentRef[id];
        this.status[id].next(result);
        delete this.status[id];
    };
    /**
     * @param {?} id
     * @return {?}
     */
    PopupLiteService.prototype.setSelected = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        /** @type {?} */
        var list = Object.keys(this.componentRef);
        list.map(function (ref) {
            (/** @type {?} */ (_this.componentRef[ref].instance)).config.selected = false;
        });
        (/** @type {?} */ (this.componentRef[id].instance)).config.selected = true;
    };
    /**
     * @param {?} component
     * @param {?} id
     * @param {?=} data
     * @param {?=} config
     * @return {?}
     */
    PopupLiteService.prototype.openWindow = /**
     * @param {?} component
     * @param {?} id
     * @param {?=} data
     * @param {?=} config
     * @return {?}
     */
    function (component, id, data, config) {
        /** @type {?} */
        var ref = this.createPopupLiteComponent();
        /** @type {?} */
        var instance = (/** @type {?} */ (ref.instance));
        /** @type {?} */
        var localConfig = {
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
            var list = Object.keys(config);
            list.map(function (key) {
                localConfig[key] = config[key];
            });
        }
        localConfig.id = id ? id : '' + new Date().getTime();
        this.componentRef[localConfig.id] = ref;
        this.status[localConfig.id] = new Subject();
        instance.init(component, data, localConfig, this);
        this.setSelected(localConfig.id);
        return this.status[localConfig.id];
    };
    /**
     * @param {?} component
     * @param {?} id
     * @param {?=} data
     * @param {?=} config
     * @return {?}
     */
    PopupLiteService.prototype.openModal = /**
     * @param {?} component
     * @param {?} id
     * @param {?=} data
     * @param {?=} config
     * @return {?}
     */
    function (component, id, data, config) {
        /** @type {?} */
        var ref = this.createPopupLiteComponent();
        /** @type {?} */
        var instance = (/** @type {?} */ (ref.instance));
        /** @type {?} */
        var localConfig = {
            overlay: true,
            close: true,
            closeOnOverlay: true,
            header: true,
            footer: true,
            centered: true
        };
        if (config) {
            /** @type {?} */
            var list = Object.keys(config);
            list.map(function (key) {
                localConfig[key] = config[key];
            });
        }
        localConfig.id = id ? id : '' + new Date().getTime();
        this.componentRef[localConfig.id] = ref;
        this.status[localConfig.id] = new Subject();
        instance.init(component, data, localConfig, this);
        this.setSelected(localConfig.id);
        return this.status[localConfig.id];
    };
    /**
     * @param {?} component
     * @param {?} id
     * @param {?=} data
     * @param {?=} config
     * @return {?}
     */
    PopupLiteService.prototype.openDialog = /**
     * @param {?} component
     * @param {?} id
     * @param {?=} data
     * @param {?=} config
     * @return {?}
     */
    function (component, id, data, config) {
        /** @type {?} */
        var ref = this.createPopupLiteComponent();
        /** @type {?} */
        var instance = (/** @type {?} */ (ref.instance));
        /** @type {?} */
        var localConfig = {
            overlay: true,
            close: true,
            closeOnOverlay: true,
            header: true,
            footer: true,
            centered: true
        };
        if (config) {
            /** @type {?} */
            var list = Object.keys(config);
            list.map(function (key) {
                localConfig[key] = config[key];
            });
        }
        localConfig.id = id ? id : '' + new Date().getTime();
        this.componentRef[localConfig.id] = ref;
        this.status[localConfig.id] = new Subject();
        instance.init(component, data, localConfig, this);
        this.setSelected(localConfig.id);
        return this.status[localConfig.id];
    };
    /**
     * @param {?} id
     * @param {?} data
     * @return {?}
     */
    PopupLiteService.prototype.confirm = /**
     * @param {?} id
     * @param {?} data
     * @return {?}
     */
    function (id, data) {
        /** @type {?} */
        var info = {
            id: id,
            confirmed: true
        };
        if (data) {
            /** @type {?} */
            var list = Object.keys(data);
            list.map(function (key) {
                info[key] = data[key];
            });
        }
        this.popedOut(id, info);
    };
    /**
     * @param {?} id
     * @param {?} data
     * @return {?}
     */
    PopupLiteService.prototype.cancel = /**
     * @param {?} id
     * @param {?} data
     * @return {?}
     */
    function (id, data) {
        /** @type {?} */
        var info = {
            id: id,
            confirmed: true
        };
        if (data) {
            /** @type {?} */
            var list = Object.keys(data);
            list.map(function (key) {
                info[key] = data[key];
            });
        }
        this.popedOut(id, { id: id, confirmed: false });
    };
    PopupLiteService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PopupLiteService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: ApplicationRef },
        { type: Injector }
    ]; };
    return PopupLiteService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PopupLiteModule = /** @class */ (function () {
    function PopupLiteModule() {
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
    return PopupLiteModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { PopupLiteComponent, PopupLiteService, PopupLiteModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbGl0ZS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vcG9wdXAtbGl0ZS9zcmMvYXBwL3BvcHVwLWxpdGUvY29tcG9uZW50cy9wb3B1cC1saXRlLmNvbXBvbmVudC50cyIsIm5nOi8vcG9wdXAtbGl0ZS9zcmMvYXBwL3BvcHVwLWxpdGUvaW5qZWN0YWJsZXMvcG9wdXAtbGl0ZS5zZXJ2aWNlLnRzIiwibmc6Ly9wb3B1cC1saXRlL3NyYy9hcHAvcG9wdXAtbGl0ZS9wb3B1cC1saXRlLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7XG5cdENvbXBvbmVudCxcblx0Q29tcG9uZW50RmFjdG9yeSwgXG5cdFJlZmxlY3RpdmVJbmplY3Rvcixcblx0Vmlld0NvbnRhaW5lclJlZixcblx0Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuXHRJbnB1dCxcblx0T3V0cHV0LFxuXHRSZW5kZXJlcixcblx0SG9zdExpc3RlbmVyLFxuXHRFdmVudEVtaXR0ZXIsXG5cdEluamVjdGFibGUsXG5cdFZpZXdDaGlsZCxcblx0RWxlbWVudFJlZn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcblxuaW1wb3J0IHsgRHJhZ0V2ZW50IH0gZnJvbSAnZHJhZy1lbmFibGVkJztcblxuaW1wb3J0IHsgUG9wdXBMaXRlU2VydmljZSB9IGZyb20gJy4uL2luamVjdGFibGVzL3BvcHVwLWxpdGUuc2VydmljZSc7XG5pbXBvcnQgeyBQb3B1cExpdGVDb250ZW50Q29tcG9uZW50LCBXaW5kb3dMaXRlU2VsZWN0aW9uLCBQb3B1cExpdGVPcHRpb25zLCBXaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9wb3B1cC1saXRlLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOidwb3B1cC1saXRlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcG9wdXAtbGl0ZS5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3BvcHVwLWxpdGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQb3B1cExpdGVDb21wb25lbnQge1xuXHRwcml2YXRlIGVsOkhUTUxFbGVtZW50O1xuXHRwcml2YXRlIGV4dHJhY2xhc3NlcyA9IFwiXCI7XG5cdHByaXZhdGUgc2VsZWN0b3I6IFdpbmRvd0xpdGVTZWxlY3Rpb247XG5cblx0QFZpZXdDaGlsZChcImNvbnRlbnRcIiwge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBcblx0Y29udGVudDogVmlld0NvbnRhaW5lclJlZjtcblxuXHRAVmlld0NoaWxkKFwibW9kYWxXb25kb3dcIiwge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBcblx0bW9kYWxXb25kb3c6IFZpZXdDb250YWluZXJSZWY7XG5cdFxuXHRAVmlld0NoaWxkKFwicmVzaXplclwiLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIFxuXHRyZXNpemVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXHRcblx0QFZpZXdDaGlsZChcImRyYWdIZWFkZXJcIiwge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBcblx0ZHJhZ0hlYWRlcjogVmlld0NvbnRhaW5lclJlZjtcblx0XG5cdEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuXHRvblJlc2l6ZShldmVudDphbnkpIHtcblx0XHRpZih0aGlzLmNvbmZpZy5jZW50ZXJlZCAmJiAhdGhpcy5jb25maWcucGlubmVkKXtcblx0XHRcdGxldCBuZSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLnBvcHVwLWxpdGUnKTtcblx0XHRcdGxldCByb290OiBIVE1MRWxlbWVudCA9IHRoaXMuZWwucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKG5lLCAnbGVmdCcsICgocm9vdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aC1uZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkvMikgKyBcInB4XCIpO1xuXHRcdH1cblx0fVxuXG5cdGNvbmZpZzogV2luZG93T3B0aW9ucyA9e1xuXHRcdGlkOicnLFxuXHRcdGNsb3NlOiBmYWxzZSxcblx0XHRvdmVybGF5OiBmYWxzZSxcblx0XHRjbG9zZU9uT3ZlcmxheTogZmFsc2UsXG5cdFx0bWluaW1pemU6IGZhbHNlLFxuXHRcdG1heGltaXplOiBmYWxzZSxcblx0XHRkcmFnYWJsZTpmYWxzZSxcblx0XHRyZXNpemFibGU6ZmFsc2UsXG5cdFx0Y2VudGVyZWQ6IGZhbHNlLFxuXHRcdGZpeGVkOiBmYWxzZSxcblx0XHRwaW5hYmxlOmZhbHNlLFxuXG5cdFx0aGVpZ2h0OicnLFxuXHRcdHdpZHRoOicnLFxuXHRcdG1heEJvZHlIZWlnaHQ6JycsXG5cdFx0bWluQm9keUhlaWdodDonJyxcblx0XHRtaW5XaWR0aDonJyxcblx0XHRtYXhXaWR0aDonJyxcblx0XHRhZGp1c3RIZWlnaHQ6ZmFsc2UsXG5cdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRpc09wZW5pbmc6ZmFsc2UsXG5cdFx0bWluaW1pemVkOmZhbHNlLFxuXHRcdG1heGltaXplZDpmYWxzZSxcblx0XHRwaW5uZWQ6ZmFsc2UsXG5cdFx0ekluZGV4OjEwMCxcblx0XHR0b3A6ICcnXG5cdH1cblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRlbDogRWxlbWVudFJlZiwgXG5cdFx0cHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcblx0XHRwcml2YXRlIHJlbmRlcmVyOlJlbmRlcmVyKSB7XG5cdFx0dGhpcy5lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG5cdHByaXZhdGUgY2FsY01heEhlaWdodChub2RlOmFueSwgdGFyZ2V0OnN0cmluZyl7XG5cdFx0bGV0IGxpc3QgPSBub2RlLmNoaWxkTm9kZXM7XG5cdFx0bGV0IG1heCA9IDA7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHQgICBpZihsaXN0W2ldLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk9PT10YXJnZXQpe1xuXHRcdFx0ICAgbGlzdCA9IGxpc3RbaV0uY2hpbGROb2Rlcztcblx0XHRcdCAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHQgICBpZihsaXN0W2ldLm5vZGVUeXBlPT09MSl7XG5cdFx0XHRcdFx0ICAgbWF4ICs9IChsaXN0W2ldLmNsaWVudEhlaWdodCtsaXN0W2ldLm9mZnNldEhlaWdodCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdCAgIH1cbiAgICAgICAgfVxuICAgIFx0cmV0dXJuIG1heDtcblx0fVxuXG5cdGluaXQoY29tcG9uZW50LCBkYXRhLCBjb25maWc6IFBvcHVwTGl0ZU9wdGlvbnMsIHNlbGVjdG9yOiBXaW5kb3dMaXRlU2VsZWN0aW9uKSB7XG5cdFx0Y29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XG5cdFx0Y29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5jb250ZW50LmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblx0XHRjb25zdCBpbnN0YW5jZSA9ICg8UG9wdXBMaXRlQ29udGVudENvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2UpO1xuXHRcdGluc3RhbmNlLmRhdGEgPSBkYXRhO1xuXHRcdGluc3RhbmNlLmlkID0gY29uZmlnLmlkO1xuXG5cdFx0aWYoaW5zdGFuY2UucG9wdXBUaXRsZSkge1xuXHRcdFx0Y29uZmlnLnBvcHVwVGl0bGUgPSBpbnN0YW5jZS5wb3B1cFRpdGxlLmJpbmQoaW5zdGFuY2UpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25maWcucG9wdXBUaXRsZSA9IChpZCkgPT4gaWQ7XG5cdFx0fVxuXHRcdFxuXHRcdGlmIChjb25maWcpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhjb25maWcpO1xuXHRcdFx0bGlzdC5tYXAoKGtleSkgPT4ge1xuXHRcdFx0XHR0aGlzLmNvbmZpZ1trZXldID0gY29uZmlnW2tleV07XG5cdFx0XHR9KVxuXHRcdH1cblx0XHR0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG5cblx0XHR0aGlzLmRpc3BsYXkoY29uZmlnKTtcblx0fVxuXHRcdFxuXHRwdWJsaWMgZGlzcGxheShwcm9wczpXaW5kb3dPcHRpb25zKXtcblx0XHR0aGlzLmNvbmZpZy5tYXhCb2R5SGVpZ2h0ID0gcHJvcHMgJiYgcHJvcHMubWF4SGVpZ2h0ID8gcHJvcHMubWF4SGVpZ2h0OicnO1xuXHRcdCB0aGlzLmNvbmZpZy5taW5XaWR0aCA9IHByb3BzICYmIHByb3BzLm1pbldpZHRoID8gcHJvcHMubWluV2lkdGg6Jyc7XG5cdFx0IHRoaXMuY29uZmlnLm1heFdpZHRoID0gcHJvcHMgJiYgcHJvcHMubWF4V2lkdGggPyBwcm9wcy5tYXhXaWR0aDonJztcblx0XHQgdGhpcy5jb25maWcudG9wID0gcHJvcHMgJiYgcHJvcHMudG9wID8gcHJvcHMudG9wIDogJyc7XG5cdFx0IHRoaXMuY29uZmlnLmlzT3BlbmluZyA9IHRydWU7XG5cdFx0IHRoaXMuY29uZmlnLmFkanVzdEhlaWdodCA9IHByb3BzICYmIHByb3BzLmFkanVzdEhlaWdodCA/IHByb3BzLmFkanVzdEhlaWdodCA6IGZhbHNlO1xuXHRcdCB0aGlzLmV4dHJhY2xhc3NlcyA9IHRoaXMuY29uZmlnLmhlYWRlciA/IFwiXCI6XCJoZWFkZXItb2ZmIFwiO1xuXHRcdCB0aGlzLmV4dHJhY2xhc3NlcyArPSB0aGlzLmNvbmZpZy5mb290ZXIgPyBcIlwiOlwiZm9vdGVyLW9mZiBcIjtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5vblJlc2l6ZShudWxsKTtcblx0XHRcdHRoaXMuY29uZmlnLmlzT3BlbiA9IHRydWU7XG5cdFx0fS5iaW5kKHRoaXMpLDEwKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRrZXlVcChldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xuXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XG5cdFx0XHRldmVudC50YXJnZXQuY2xpY2soKTtcblx0XHR9XHRcdFxuXHR9XG5cdGNsb3NlT3ZlcmxheSgpe1xuXHRcdGlmICh0aGlzLmNvbmZpZy5jbG9zZU9uT3ZlcmxheSkge1xuXHRcdHRoaXMuY2xvc2VNb2RhbChudWxsLCB7IGlkOiB0aGlzLmNvbmZpZy5pZCwgY29uZmlybWVkOiBmYWxzZSB9KTtcblx0XHR9XG5cdH1cblx0b25DbG9zZShldmVudCkge1xuXHRcdHRoaXMuY2xvc2VNb2RhbChldmVudCwgeyBpZDogdGhpcy5jb25maWcuaWQsIGNvbmZpcm1lZDogZmFsc2UgfSk7XG5cdH1cblx0Y2xvc2VNb2RhbCgkZXZlbnQ6YW55LCByZXN1bHQpe1xuXHRcdHRoaXMuY29uZmlnLmlzT3BlbmluZyA9IGZhbHNlO1xuXHRcdHRoaXMuY29uZmlnLm92ZXJsYXkgPSBmYWxzZTtcblx0XHR0aGlzLmNvbmZpZy5pc09wZW4gPSBmYWxzZTtcblx0XHR0aGlzLnNlbGVjdG9yLnBvcGVkT3V0KHRoaXMuY29uZmlnLmlkLCByZXN1bHQpO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdG1pbmltaXplTW9kYWwoJGV2ZW50OmFueSl7XG5cdFx0dGhpcy5jb25maWcubWluaW1pemVkID0gIXRoaXMuY29uZmlnLm1pbmltaXplZDtcblx0XHRpZih0aGlzLmNvbmZpZy5yZXNpemFibGUpe1xuXHRcdCAgbGV0IG5lOmFueSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLnJlc2l6ZS1jb3JuZXInKTtcblx0XHQgIGxldCB3bjphbnkgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1saXRlJyk7XG5cdFx0ICBsZXQgYmQ6YW55ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuXHRcdCAgaWYoIXRoaXMuY29uZmlnLm1pbmltaXplZCl7YmQuc3R5bGUuaGVpZ2h0PWJkLmdldEF0dHJpYnV0ZShcIm9oXCIpO2JkLnN0eWxlLm1heEhlaWdodD0gXCJpbmhlcml0XCI7fVxuXHRcdCAgZWxzZSB7XG5cdFx0ICBiZC5zdHlsZS5oZWlnaHQgPSBcIjBcIjtcblx0XHQgIHduLnN0eWxlLmhlaWdodD1cImluaGVyaXRcIlxuXHRcdCAgfVxuXHRcdCAgbmUuc3R5bGUuZGlzcGxheT0gKHRoaXMuY29uZmlnLm1pbmltaXplZCB8fCB0aGlzLmNvbmZpZy5tYXhpbWl6ZWQpID8gJ25vbmUnOidibG9jayc7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRtYXhpbWl6ZU1vZGFsKCRldmVudDphbnkpe1xuXHRcdHRoaXMuY29uZmlnLm1heGltaXplZCA9ICF0aGlzLmNvbmZpZy5tYXhpbWl6ZWQ7XG5cdFx0aWYodGhpcy5jb25maWcucmVzaXphYmxlKXtcblx0XHQgIGxldCBuZTphbnkgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5yZXNpemUtY29ybmVyJyk7XG5cdFx0ICBsZXQgYmQ6YW55ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuXHRcdCAgaWYoYmQuZ2V0QXR0cmlidXRlKFwib2hcIikpe2JkLnN0eWxlLmhlaWdodD1iZC5nZXRBdHRyaWJ1dGUoXCJvaFwiKTt9XG5cdFx0ICBuZS5zdHlsZS5kaXNwbGF5PSAodGhpcy5jb25maWcubWluaW1pemVkIHx8IHRoaXMuY29uZmlnLm1heGltaXplZCkgPyAnbm9uZSc6J2Jsb2NrJztcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHNlbGVjdGVkKCRldmVudDogYW55KXtcblx0XHR0aGlzLnNlbGVjdG9yLnNldFNlbGVjdGVkKHRoaXMuY29uZmlnLmlkKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRwaW5Nb2RhbCgkZXZlbnQ6YW55KXtcblx0XHR0aGlzLmNvbmZpZy5waW5uZWQgPSAhdGhpcy5jb25maWcucGlubmVkO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGRyYWdFbmFibGVkKGV2ZW50OiBEcmFnRXZlbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25maWcuZHJhZ2FibGUgJiYgIXRoaXMuY29uZmlnLnBpbm5lZDtcblx0fVxuXHRvbkRyYWdTdGFydChldmVudDogRHJhZ0V2ZW50KXtcblx0fVxuXHRvbkRyYWcoZXZlbnQ6IERyYWdFdmVudCl7XG5cdFx0aWYoZXZlbnQubm9kZSA9PT0gdGhpcy5kcmFnSGVhZGVyLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnbGVmdCcsIChldmVudC5jbGllbnRYLWV2ZW50Lm9mZnNldC54KStcInB4XCIpO1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAndG9wJywgKGV2ZW50LmNsaWVudFktZXZlbnQub2Zmc2V0LnkpK1wicHhcIik7XG5cdFx0fVxuXHR9XG5cdG9uRHJhZ0VuZChldmVudDogRHJhZ0V2ZW50KXtcblx0XHRpZihldmVudC5ub2RlID09PSB0aGlzLmRyYWdIZWFkZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICdsZWZ0JywgKGV2ZW50LmNsaWVudFgtZXZlbnQub2Zmc2V0LngpK1wicHhcIik7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICd0b3AnLCAoZXZlbnQuY2xpZW50WS1ldmVudC5vZmZzZXQueSkrXCJweFwiKTtcblx0XHR9XG5cdH1cblxuXHRyZXNpemVFbmFibGVkKGV2ZW50OiBEcmFnRXZlbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25maWcucmVzaXphYmxlO1xuXHR9XG5cdG9uUmVzaXplU3RhcnQoZXZlbnQ6IERyYWdFdmVudCl7XG5cdH1cblx0b25SZXNpemVQcm9ncmVzcyhldmVudDogRHJhZ0V2ZW50KXtcblx0XHRpZihldmVudC5ub2RlID09PSB0aGlzLnJlc2l6ZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHRjb25zdCB3ciA9IGV2ZW50Lm1lZGl1bS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGNvbnN0IHdpZHRoID0gIChldmVudC5jbGllbnRYLWV2ZW50Lm9mZnNldC54KSAtIHdyLmxlZnQ7XG5cdFx0XHRjb25zdCBoZWlnaHQgPSAoZXZlbnQuY2xpZW50WS1ldmVudC5vZmZzZXQueSkgLSB3ci50b3A7XG5cdFx0XHRsZXQgaGQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1oZWFkZXInKTtcblx0XHRcdGxldCBmdCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWZvb3RlcicpO1xuXHRcdFx0bGV0IGJkID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuXHRcdFx0bGV0IGZ0aD0gZnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXHRcdFx0bGV0IGhkaD0gaGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXHRcdFx0bGV0IGggPSBoZWlnaHQgLSBoZGggLSBmdGggLTI7XG5cblx0XHRcdGlmKHdpZHRoPjIwMCAmJiBoZWlnaHQ+NjApe1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICd3aWR0aCcsIHdpZHRoK1wicHhcIik7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ2hlaWdodCcsIGhlaWdodCtcInB4XCIpO1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShiZCwgJ2hlaWdodCcsIGgrXCJweFwiKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0b25SZXNpemVFbmQoZXZlbnQ6IERyYWdFdmVudCl7XG5cdFx0aWYoZXZlbnQubm9kZSA9PT0gdGhpcy5yZXNpemVyLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0Y29uc3Qgd3IgPSBldmVudC5tZWRpdW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRjb25zdCB3aWR0aCA9ICAoZXZlbnQuY2xpZW50WC1ldmVudC5vZmZzZXQueCkgLSB3ci5sZWZ0O1xuXHRcdFx0Y29uc3QgaGVpZ2h0ID0gKGV2ZW50LmNsaWVudFktZXZlbnQub2Zmc2V0LnkpIC0gd3IudG9wO1xuXG5cdFx0XHRpZih3aWR0aD4yMDAgJiYgaGVpZ2h0PjYwKXtcblx0XHRcdFx0bGV0IGhkID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtaGVhZGVyJyk7XG5cdFx0XHRcdGxldCBmdCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWZvb3RlcicpO1xuXHRcdFx0XHRsZXQgYmQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1ib2R5Jyk7XG5cdFx0XHRcdGxldCBmdGg9IGZ0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdFx0bGV0IGhkaD0gaGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXHRcdFx0XHRsZXQgaCA9IGhlaWdodCAtIGhkaCAtIGZ0aCAtMjtcblx0XHRcdFx0XHRcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnd2lkdGgnLCB3aWR0aCtcInB4XCIpO1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICdoZWlnaHQnLCBoZWlnaHQrXCJweFwiKTtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoYmQsICdoZWlnaHQnLCBoK1wicHhcIik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iLCJcbmltcG9ydCB7XG4gICAgSW5qZWN0YWJsZSxcbiAgICBJbmplY3RvcixcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgRW1iZWRkZWRWaWV3UmVmLFxuICAgIEFwcGxpY2F0aW9uUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUG9wdXBMaXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9wb3B1cC1saXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQb3B1cExpdGVPcHRpb25zLCBXaW5kb3dPcHRpb25zLCBXaW5kb3dMaXRlU2VsZWN0aW9uLCBXaW5kb3dMaXRlU2VydmljZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcG9wdXAtbGl0ZS5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUG9wdXBMaXRlU2VydmljZSBpbXBsZW1lbnRzIFdpbmRvd0xpdGVTZXJ2aWNlLCBXaW5kb3dMaXRlU2VsZWN0aW9uIHtcblx0cHJpdmF0ZSAgY29tcG9uZW50UmVmID0ge307XG5cdHByaXZhdGUgIGRvbUVsZW07XG5cdHByaXZhdGUgc3RhdHVzID0gW107XG5cdC8vIHByaXZhdGUgd2luZG93c0xpc3Q6IFBvcHVwTGl0ZUNvbXBvbmVudFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3JcbiAgKSB7IH1cblxuXHRwcml2YXRlIGNyZWF0ZVBvcHVwTGl0ZUNvbXBvbmVudCgpIHtcblx0XHRjb25zdCByZWYgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuXHRcdFx0LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFBvcHVwTGl0ZUNvbXBvbmVudClcblx0XHRcdC5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG5cblx0XHR0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KHJlZi5ob3N0Vmlldyk7XG5cblx0XHR0aGlzLmRvbUVsZW0gPSAocmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KVxuXHRcdFx0LnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcblxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5kb21FbGVtKTtcblxuXHRcdHJldHVybiByZWY7XG5cdH1cbiAgXG5cdHBvcGVkT3V0KGlkLCByZXN1bHQ6IGFueSkge1xuXHRcdGNvbnN0IHJlZiA9IHRoaXMuY29tcG9uZW50UmVmW2lkXTtcblx0XHRcblx0XHR0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KHJlZi5ob3N0Vmlldyk7XG5cdFx0cmVmLmRlc3Ryb3koKTtcblxuXHRcdGRlbGV0ZSB0aGlzLmNvbXBvbmVudFJlZltpZF07XG5cblx0XHR0aGlzLnN0YXR1c1tpZF0ubmV4dChyZXN1bHQpO1xuXHRcdGRlbGV0ZSB0aGlzLnN0YXR1c1tpZF07XG5cdH1cblx0c2V0U2VsZWN0ZWQoaWQpe1xuXHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudFJlZik7XG5cblx0XHRsaXN0Lm1hcCgocmVmKT0+IHtcblx0XHRcdCg8UG9wdXBMaXRlQ29tcG9uZW50PnRoaXMuY29tcG9uZW50UmVmW3JlZl0uaW5zdGFuY2UpLmNvbmZpZy5zZWxlY3RlZCA9IGZhbHNlO1xuXHRcdH0pO1xuXHRcdCg8UG9wdXBMaXRlQ29tcG9uZW50PnRoaXMuY29tcG9uZW50UmVmW2lkXS5pbnN0YW5jZSkuY29uZmlnLnNlbGVjdGVkID0gdHJ1ZTtcblx0fVxuXG5cdG9wZW5XaW5kb3coY29tcG9uZW50OiBhbnksIGlkOiBzdHJpbmcsIGRhdGE/OiBhbnksIGNvbmZpZz86IFBvcHVwTGl0ZU9wdGlvbnMpOiBPYnNlcnZhYmxlPGFueT57XG5cdFx0Y29uc3QgcmVmID0gdGhpcy5jcmVhdGVQb3B1cExpdGVDb21wb25lbnQoKTtcblx0XHRjb25zdCBpbnN0YW5jZSA9ICg8UG9wdXBMaXRlQ29tcG9uZW50PnJlZi5pbnN0YW5jZSk7XG5cdFx0Y29uc3QgbG9jYWxDb25maWc6IFdpbmRvd09wdGlvbnMgPSB7XG5cdFx0XHRjbG9zZTogdHJ1ZSxcblx0XHRcdG1pbmltaXplOiB0cnVlLFxuXHRcdFx0bWF4aW1pemU6IHRydWUsXG5cdFx0XHRyZXNpemFibGU6dHJ1ZSxcblx0XHRcdGhlYWRlcjogdHJ1ZSxcblx0XHRcdGZvb3RlcjogdHJ1ZSxcblx0XHRcdGRyYWdhYmxlOnRydWUsXG5cdFx0XHRwaW5hYmxlOnRydWUsXG5cdFx0XHRpZE9uSGVhZGVyOiB0cnVlLFxuXHRcdFx0Y2VudGVyZWQ6IHRydWVcblx0XHR9O1xuXHRcdGlmIChjb25maWcpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhjb25maWcpO1xuXHRcdFx0bGlzdC5tYXAoKGtleSkgPT4ge1xuXHRcdFx0XHRsb2NhbENvbmZpZ1trZXldID0gY29uZmlnW2tleV07XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRsb2NhbENvbmZpZy5pZCA9IGlkID8gaWQgOiAnJytuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuXHRcdHRoaXMuY29tcG9uZW50UmVmW2xvY2FsQ29uZmlnLmlkXSA9IHJlZjtcblx0XHR0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF0gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cblx0XHRpbnN0YW5jZS5pbml0KGNvbXBvbmVudCwgZGF0YSwgbG9jYWxDb25maWcsIHRoaXMpO1xuXHRcdHRoaXMuc2V0U2VsZWN0ZWQobG9jYWxDb25maWcuaWQpO1xuXG5cdFx0cmV0dXJuIHRoaXMuc3RhdHVzW2xvY2FsQ29uZmlnLmlkXTtcblx0fVxuXG5cdG9wZW5Nb2RhbChjb21wb25lbnQ6IGFueSwgaWQ6IHN0cmluZywgZGF0YT86IGFueSwgY29uZmlnPzogUG9wdXBMaXRlT3B0aW9ucyk6IE9ic2VydmFibGU8YW55Pntcblx0XHRjb25zdCByZWYgPSB0aGlzLmNyZWF0ZVBvcHVwTGl0ZUNvbXBvbmVudCgpO1xuXHRcdGNvbnN0IGluc3RhbmNlID0gKDxQb3B1cExpdGVDb21wb25lbnQ+cmVmLmluc3RhbmNlKTtcblx0XHRjb25zdCBsb2NhbENvbmZpZzogV2luZG93T3B0aW9ucyA9IHtcblx0XHRcdG92ZXJsYXk6IHRydWUsXG5cdFx0XHRjbG9zZTogdHJ1ZSxcblx0XHRcdGNsb3NlT25PdmVybGF5OiB0cnVlLFxuXHRcdFx0aGVhZGVyOiB0cnVlLFxuXHRcdFx0Zm9vdGVyOiB0cnVlLFxuXHRcdFx0Y2VudGVyZWQ6IHRydWVcblx0XHR9O1xuXG5cdFx0aWYgKGNvbmZpZykge1xuXHRcdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKGNvbmZpZyk7XG5cdFx0XHRsaXN0Lm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRcdGxvY2FsQ29uZmlnW2tleV0gPSBjb25maWdba2V5XTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGxvY2FsQ29uZmlnLmlkID0gaWQgPyBpZCA6ICcnK25ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG5cdFx0dGhpcy5jb21wb25lbnRSZWZbbG9jYWxDb25maWcuaWRdID0gcmVmO1xuXHRcdHRoaXMuc3RhdHVzW2xvY2FsQ29uZmlnLmlkXSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuXHRcdGluc3RhbmNlLmluaXQoY29tcG9uZW50LCBkYXRhLCBsb2NhbENvbmZpZywgdGhpcyk7XG5cdFx0dGhpcy5zZXRTZWxlY3RlZChsb2NhbENvbmZpZy5pZCk7XG5cblx0XHRyZXR1cm4gdGhpcy5zdGF0dXNbbG9jYWxDb25maWcuaWRdO1xuXHR9XG5cblx0b3BlbkRpYWxvZyhjb21wb25lbnQ6IGFueSwgaWQ6IHN0cmluZywgZGF0YT86IGFueSwgY29uZmlnPzogUG9wdXBMaXRlT3B0aW9ucyk6IE9ic2VydmFibGU8YW55Pntcblx0XHRjb25zdCByZWYgPSB0aGlzLmNyZWF0ZVBvcHVwTGl0ZUNvbXBvbmVudCgpO1xuXHRcdGNvbnN0IGluc3RhbmNlID0gKDxQb3B1cExpdGVDb21wb25lbnQ+cmVmLmluc3RhbmNlKTtcblx0XHRjb25zdCBsb2NhbENvbmZpZzogV2luZG93T3B0aW9ucyA9IHtcblx0XHRcdG92ZXJsYXk6IHRydWUsXG5cdFx0XHRjbG9zZTogdHJ1ZSxcblx0XHRcdGNsb3NlT25PdmVybGF5OiB0cnVlLFxuXHRcdFx0aGVhZGVyOiB0cnVlLFxuXHRcdFx0Zm9vdGVyOiB0cnVlLFxuXHRcdFx0Y2VudGVyZWQ6IHRydWVcblx0XHR9O1xuXHRcdGlmIChjb25maWcpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhjb25maWcpO1xuXHRcdFx0bGlzdC5tYXAoKGtleSkgPT4ge1xuXHRcdFx0XHRsb2NhbENvbmZpZ1trZXldID0gY29uZmlnW2tleV07XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRsb2NhbENvbmZpZy5pZCA9IGlkID8gaWQgOiAnJytuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuXHRcdHRoaXMuY29tcG9uZW50UmVmW2xvY2FsQ29uZmlnLmlkXSA9IHJlZjtcblx0XHR0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF0gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cblx0XHRpbnN0YW5jZS5pbml0KGNvbXBvbmVudCwgZGF0YSwgbG9jYWxDb25maWcsIHRoaXMpO1xuXHRcdHRoaXMuc2V0U2VsZWN0ZWQobG9jYWxDb25maWcuaWQpO1xuXG5cdFx0cmV0dXJuIHRoaXMuc3RhdHVzW2xvY2FsQ29uZmlnLmlkXTtcblx0fVxuXG5cdGNvbmZpcm0oaWQsIGRhdGE6IHt9KSB7XG5cdFx0Y29uc3QgaW5mbyA9IHsgXG5cdFx0XHRpZDogaWQsIFxuXHRcdFx0Y29uZmlybWVkOiB0cnVlIFxuXHRcdH07XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhkYXRhKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0aW5mb1trZXldID0gZGF0YVtrZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0dGhpcy5wb3BlZE91dChpZCwgaW5mbyk7XG5cdH1cblx0Y2FuY2VsKGlkLCBkYXRhOiB7fSkge1xuXHRcdGNvbnN0IGluZm8gPSB7IFxuXHRcdFx0aWQ6IGlkLCBcblx0XHRcdGNvbmZpcm1lZDogdHJ1ZSBcblx0XHR9O1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoZGF0YSk7XG5cdFx0XHRsaXN0Lm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRcdGluZm9ba2V5XSA9IGRhdGFba2V5XTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdHRoaXMucG9wZWRPdXQoaWQsIHsgaWQ6IGlkLCBjb25maXJtZWQ6IGZhbHNlIH0pO1xuXHR9XG5cbn0iLCJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgUG9wdXBMaXRlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3BvcHVwLWxpdGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUG9wdXBMaXRlU2VydmljZSB9IGZyb20gJy4vaW5qZWN0YWJsZXMvcG9wdXAtbGl0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdkcmFnLWVuYWJsZWQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBEcmFnRHJvcE1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBQb3B1cExpdGVDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFBvcHVwTGl0ZUNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBQb3B1cExpdGVDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgUG9wdXBMaXRlU2VydmljZVxyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUG9wdXBMaXRlTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTtJQWdGQyw0QkFDQyxFQUFjLEVBQ04sMEJBQ0E7UUFEQSw2QkFBd0IsR0FBeEIsd0JBQXdCO1FBQ3hCLGFBQVEsR0FBUixRQUFROzRCQXhETSxFQUFFO3NCQXdCRjtZQUN0QixFQUFFLEVBQUMsRUFBRTtZQUNMLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLEtBQUs7WUFDZCxjQUFjLEVBQUUsS0FBSztZQUNyQixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFDLEtBQUs7WUFDZCxTQUFTLEVBQUMsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUMsS0FBSztZQUViLE1BQU0sRUFBQyxFQUFFO1lBQ1QsS0FBSyxFQUFDLEVBQUU7WUFDUixhQUFhLEVBQUMsRUFBRTtZQUNoQixhQUFhLEVBQUMsRUFBRTtZQUNoQixRQUFRLEVBQUMsRUFBRTtZQUNYLFFBQVEsRUFBQyxFQUFFO1lBQ1gsWUFBWSxFQUFDLEtBQUs7WUFDbEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUMsS0FBSztZQUNmLFNBQVMsRUFBQyxLQUFLO1lBQ2YsU0FBUyxFQUFDLEtBQUs7WUFDZixNQUFNLEVBQUMsS0FBSztZQUNaLE1BQU0sRUFBQyxHQUFHO1lBQ1YsR0FBRyxFQUFFLEVBQUU7U0FDUDtRQU1BLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztLQUN4Qjs7Ozs7SUExQ0oscUNBQVE7Ozs7SUFEUixVQUNTLEtBQVM7UUFDakIsSUFBRyxJ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