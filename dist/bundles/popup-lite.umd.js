(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common'), require('drag-enabled')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs', '@angular/common', 'drag-enabled'], factory) :
	(factory((global['popup-lite'] = {}),global.ng.core,global.rxjs,global.ng.common,global.dragEnabled));
}(this, (function (exports,core,rxjs,common,dragEnabled) { 'use strict';

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
    PopupLiteComponent.prototype.onResize = function (event) {
        if (this.config.centered && !this.config.pinned) {
            var ne = this.el.querySelector('.popup-lite');
            var root = this.el.parentElement;
            this.renderer.setElementStyle(ne, 'left', ((root.getBoundingClientRect().width - ne.getBoundingClientRect().width) / 2) + "px");
        }
    };
    PopupLiteComponent.prototype.calcMaxHeight = function (node, target) {
        var list = node.childNodes;
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
    PopupLiteComponent.prototype.init = function (component, data, config, selector) {
        var _this = this;
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        var componentRef = this.content.createComponent(componentFactory);
        var instance = ((componentRef.instance));
        instance.data = data;
        instance.id = config.id;
        if (instance.popupTitle) {
            config.popupTitle = instance.popupTitle.bind(instance);
        }
        else {
            config.popupTitle = function (id) { return id; };
        }
        if (config) {
            var list = Object.keys(config);
            list.map(function (key) {
                _this.config[key] = config[key];
            });
        }
        this.selector = selector;
        this.display(config);
    };
    PopupLiteComponent.prototype.display = function (props) {
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
    PopupLiteComponent.prototype.keyUp = function (event) {
        event.preventDefault();
        var code = event.which;
        if (code === 13) {
            event.target.click();
        }
    };
    PopupLiteComponent.prototype.closeOverlay = function () {
        if (this.config.closeOnOverlay) {
            this.closeModal(null, { id: this.config.id, confirmed: false });
        }
    };
    PopupLiteComponent.prototype.onClose = function (event) {
        this.closeModal(event, { id: this.config.id, confirmed: false });
    };
    PopupLiteComponent.prototype.closeModal = function ($event, result) {
        this.config.isOpening = false;
        this.config.overlay = false;
        this.config.isOpen = false;
        this.selector.popedOut(this.config.id, result);
        return false;
    };
    PopupLiteComponent.prototype.minimizeModal = function ($event) {
        this.config.minimized = !this.config.minimized;
        if (this.config.resizable) {
            var ne = this.el.querySelector('.resize-corner');
            var wn = this.el.querySelector('.popup-lite');
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
    PopupLiteComponent.prototype.maximizeModal = function ($event) {
        this.config.maximized = !this.config.maximized;
        if (this.config.resizable) {
            var ne = this.el.querySelector('.resize-corner');
            var bd = this.el.querySelector('.modal-body');
            if (bd.getAttribute("oh")) {
                bd.style.height = bd.getAttribute("oh");
            }
            ne.style.display = (this.config.minimized || this.config.maximized) ? 'none' : 'block';
        }
        return false;
    };
    PopupLiteComponent.prototype.selected = function ($event) {
        this.selector.setSelected(this.config.id);
        return true;
    };
    PopupLiteComponent.prototype.pinModal = function ($event) {
        this.config.pinned = !this.config.pinned;
        return false;
    };
    PopupLiteComponent.prototype.dragEnabled = function (event) {
        return this.config.dragable && !this.config.pinned;
    };
    PopupLiteComponent.prototype.onDragStart = function (event) {
    };
    PopupLiteComponent.prototype.onDrag = function (event) {
        if (event.node === this.dragHeader.element.nativeElement) {
            this.renderer.setElementStyle(event.medium, 'left', (event.clientX - event.offset.x) + "px");
            this.renderer.setElementStyle(event.medium, 'top', (event.clientY - event.offset.y) + "px");
        }
    };
    PopupLiteComponent.prototype.onDragEnd = function (event) {
        if (event.node === this.dragHeader.element.nativeElement) {
            this.renderer.setElementStyle(event.medium, 'left', (event.clientX - event.offset.x) + "px");
            this.renderer.setElementStyle(event.medium, 'top', (event.clientY - event.offset.y) + "px");
        }
    };
    PopupLiteComponent.prototype.resizeEnabled = function (event) {
        return this.config.resizable;
    };
    PopupLiteComponent.prototype.onResizeStart = function (event) {
    };
    PopupLiteComponent.prototype.onResizeProgress = function (event) {
        if (event.node === this.resizer.element.nativeElement) {
            var wr = event.medium.getBoundingClientRect();
            var width = (event.clientX - event.offset.x) - wr.left;
            var height = (event.clientY - event.offset.y) - wr.top;
            var hd = this.el.querySelector('.modal-header');
            var ft = this.el.querySelector('.modal-footer');
            var bd = this.el.querySelector('.modal-body');
            var fth = ft.getBoundingClientRect().height;
            var hdh = hd.getBoundingClientRect().height;
            var h = height - hdh - fth - 2;
            if (width > 200 && height > 60) {
                this.renderer.setElementStyle(event.medium, 'width', width + "px");
                this.renderer.setElementStyle(event.medium, 'height', height + "px");
                this.renderer.setElementStyle(bd, 'height', h + "px");
            }
        }
    };
    PopupLiteComponent.prototype.onResizeEnd = function (event) {
        if (event.node === this.resizer.element.nativeElement) {
            var wr = event.medium.getBoundingClientRect();
            var width = (event.clientX - event.offset.x) - wr.left;
            var height = (event.clientY - event.offset.y) - wr.top;
            if (width > 200 && height > 60) {
                var hd = this.el.querySelector('.modal-header');
                var ft = this.el.querySelector('.modal-footer');
                var bd = this.el.querySelector('.modal-body');
                var fth = ft.getBoundingClientRect().height;
                var hdh = hd.getBoundingClientRect().height;
                var h = height - hdh - fth - 2;
                this.renderer.setElementStyle(event.medium, 'width', width + "px");
                this.renderer.setElementStyle(event.medium, 'height', height + "px");
                this.renderer.setElementStyle(bd, 'height', h + "px");
            }
        }
    };
    return PopupLiteComponent;
}());
PopupLiteComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'popup-lite',
                template: "<div class=\"popup-lite-overlay\" #overlay\n\t(click)=\"closeOverlay()\"\n\t[style.display]=\"config.overlay ? 'block' : 'none'\"></div>\n<div #modalWondow\n\tclass=\"popup-lite\"\n\ttabindex=\"0\"\n\t[style.minWidth]=\"config.minWidth\"\n\t[style.maxWidth]=\"config.maxWidth\"\n\t[style.display]=\"config.isOpening ? 'block' : 'none'\"\n\t[style.position]=\"config.fixed ? 'fixed':'absolute'\"\n\t[style.top]=\"config.top.length ? config.top : ''\"\n\t[style.height]=\"config.height\"\n\t[style.zIndex]=\"config.zIndex\"\n\t[class.fade-in]=\"config.isOpen\"\n\t[class.maximized]=\"config.maximized\"\n\t[class.pinned]=\"config.pinned\"\n\t[style.z-index]=\"config.selected ? 105 : 100\"\n\t(keyup)=\"keyUp($event)\"\n\t(focus)=\"selected($event)\"\n\t(click)=\"selected($event)\">\n\t\t<div class=\"controls\">\n\t\t\t<a *ngIf=\"config.pinable\"\n\t\t\t\tclass=\"pin\" tabindex=\"0\"\n\t\t\t\t(click)=\"pinModal($event)\">\n\t\t\t\t<span *ngIf=\"!config.pinned\" class=\"fa fw fa-unlock\" aria-hidden=\"true\"></span>\n\t\t\t\t<span *ngIf=\"config.pinned\" class=\"fa fw fa-lock\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Pin</span>\n\t\t\t</a><a *ngIf=\"config.minimize\"\n\t\t\t\tclass=\"minify\" tabindex=\"0\"\n\t\t\t\t(click)=\"minimizeModal($event)\"\n\t\t\t\t[class.clicked]=\"config.minimized\">\n\t\t\t\t<span class=\"fa fw fa-window-minimize\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Minimize</span>\n\t\t\t</a><a *ngIf=\"config.maximize\"\n\t\t\t\tclass=\"maxify\" tabindex=\"0\"\n\t\t\t\t(click)=\"maximizeModal($event)\"\n\t\t\t\t[class.clicked]=\"config.maximized\">\n\t\t\t\t<span class=\"fa fw fa-window-maximize\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Maximize</span>\n\t\t\t</a><a *ngIf=\"config.close\"\n\t\t\t\tclass=\"close\" tabindex=\"0\"\n\t\t\t\t(click)=\"onClose($event)\">\n\t\t\t\t<span class=\"fa fw fa-window-close\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Close</span>\n\t\t\t</a>\n\t\t</div>\n\t\t<a *ngIf=\"config.resizable\"\n\t\t\t#resizer\n\t\t\tclass=\"resize-corner\"\n\t\t\ttabindex=\"0\"\n\t\t\t[medium]=\"modalWondow\"\n\t\t\t[dragInDocument]=\"resizeEnabled.bind(this)\"\n\t\t\t(onDragStart)=\"onResizeStart($event)\"\n\t\t\t(onDrag)=\"onResizeProgress($event)\"\n\t\t\t(onDragEnd)=\"onResizeEnd($event)\">\n\t\t\t<span class=\"fa fw fa-ellipsis-h\" aria-hidden=\"true\"></span>\n\t\t\t<span class=\"off-screen\">Resize</span>\n\t\t</a>\n\t\t<div *ngIf=\"config.header\"\n\t\t\t#dragHeader\n\t\t\tclass=\"modal-header\"\n\t\t\t[id]=\"config.id\"\n\t\t\t[style.cursor]=\"(config.dragable && !config.pinned) ? 'all-scroll':'default'\"\n\t\t\t[class.pinned]=\"config.pinned\"\n\t\t\t[class.minified]=\"config.minimized\"\n\t\t\t[medium]=\"modalWondow\"\n\t\t\t[dragInDocument]=\"dragEnabled.bind(this)\"\n\t\t\t(onDragStart)=\"onDragStart($event)\"\n\t\t\t(onDrag)=\"onDrag($event)\"\n\t\t\t(onDragEnd)=\"onDragEnd($event)\"\n\t\t\t(dblclick)=\"maximizeModal($event)\">\n\t\t\t<span *ngIf=\"config.headerIcon\" [class]=\"'icon ' + config.headerIcon\"></span>\n\t\t\t<span *ngIf=\"config.idOnHeader\" class=\"header-title\" [class.padded]=\"config.headerIcon ? true:null\" [textContent]=\"config.popupTitle(config.id)\"></span>\n\t\t</div>\n\t\t  <div class=\"modal-body\"\n\t\t     [class.minimized]=\"config.minimized\"\n\t\t     [style.minHeight]=\"config.minBodyHeight\"\n\t\t\t [style.maxHeight]=\"config.maxBodyHeight\">\n\t\t\t <ng-template  #content></ng-template>\n\t\t  </div>\n\t      <div class=\"modal-footer\" *ngIf=\"config.footer\"\n\t\t  \t\t[class.minimized]=\"config.minimized\">\n\t         <ng-content select=\"[modal-footer]\"></ng-content>\n\t\t  </div>\n\t    </div>",
                styles: [":host .centered{text-align:center;margin:0 auto}:host .popup-lite h2{font-size:.8em;margin:0}:host .popup-lite-overlay{position:absolute;background-color:rgba(44,44,44,.44);width:100%;height:100%;top:0;left:0;z-index:104}:host .popup-lite{-webkit-box-sizing:border-box;box-sizing:border-box;position:absolute;top:100px;left:100px;border-radius:6px;padding:0;z-index:100;background-color:transparent;min-width:300px;-webkit-box-shadow:0 3px 9px rgba(0,0,0,.5);-ms-box-shadow:0 3px 9px rgba(0,0,0,.5);-o-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);opacity:0;-webkit-transition:opacity .25s ease-in-out;transition:opacity .25s ease-in-out}:host .popup-lite .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .popup-lite.fade-in{opacity:1;-webkit-transition:opacity .25s ease-in-out;transition:opacity .25s ease-in-out}:host .popup-lite .controls{position:absolute;top:0;right:2px;border:1px solid #eee;background-color:#fff;border-radius:2px;border-top:0;z-index:2}:host .popup-lite .controls a{text-align:center;border:1px solid #999;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:0 0 2px 2px;border-top:0;display:inline-block;width:21px;height:21px}:host .popup-lite .controls a span{display:inline-block}:host .popup-lite .controls a.close{cursor:pointer}:host .popup-lite .controls a.close:hover{color:red}:host .popup-lite .controls a.minify{cursor:pointer}:host .popup-lite .controls a.minify.clicked,:host .popup-lite .controls a.minify:hover{color:red}:host .popup-lite .controls a.pin{cursor:pointer}:host .popup-lite .controls a.pin.clicked,:host .popup-lite .controls a.pin:hover{color:red}:host .popup-lite .controls a.maxify{cursor:pointer}:host .popup-lite .controls a.maxify.clicked,:host .popup-lite .controls a.maxify:hover{color:red}:host .popup-lite a{text-align:center;border:1px solid #999;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:2px}:host .popup-lite a.resize-corner{position:absolute;height:5px;bottom:12px;right:4px;width:13px;border:0;cursor:se-resize}:host .popup-lite a.resize-corner:hover{color:red}:host .popup-lite .modal-header{background-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:2px 2px 0 0;min-width:100%;min-height:24px;padding:5px 10px}:host .popup-lite .modal-header .icon{position:absolute;left:5px;top:3px}:host .popup-lite .modal-header .header-title{position:absolute;top:0;left:0;padding:2px 5px;-webkit-box-sizing:border-box;box-sizing:border-box;font-size:.9rem}:host .popup-lite .modal-header .header-title.padded{left:15px}:host .popup-lite .modal-body{background-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;padding:10px;overflow-y:auto}:host .popup-lite .modal-footer{background-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:0 0 2px 2px;min-width:100%;min-height:20px;padding:5px 10px}:host .popup-lite .modal-footer .right{text-align:right}:host .header-off{border-top-left-radius:2px;border-top-right-radius:5px}:host .footer-off{border-bottom-right-radius:5px;border-bottom-left-radius:2px}:host .minimized{padding-top:0!important;padding-bottom:0!important;min-height:0!important}:host .maximized{top:0!important;left:0!important;min-width:100%!important;min-height:100%!important}:host .maximized .modal-footer,:host .maximized .modal-header{width:100%}:host .maximized .modal-body{min-width:100%;min-height:95vh}:host .minimized{min-height:0!important;height:0!important}:host .minified{border-radius:6px!important}:host .popup-lite.maximized{height:inherit!important;min-height:inherit!important}:host .pinned{border:1px dotted red}:host .block-key-events{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}"]
            },] },
];
PopupLiteComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.ComponentFactoryResolver, },
    { type: core.Renderer, },
]; };
PopupLiteComponent.propDecorators = {
    "content": [{ type: core.ViewChild, args: ["content", { read: core.ViewContainerRef },] },],
    "modalWondow": [{ type: core.ViewChild, args: ["modalWondow", { read: core.ViewContainerRef },] },],
    "resizer": [{ type: core.ViewChild, args: ["resizer", { read: core.ViewContainerRef },] },],
    "dragHeader": [{ type: core.ViewChild, args: ["dragHeader", { read: core.ViewContainerRef },] },],
    "onResize": [{ type: core.HostListener, args: ['window:resize', ['$event'],] },],
};
var PopupLiteService = /** @class */ (function () {
    function PopupLiteService(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.componentRef = {};
        this.status = [];
    }
    PopupLiteService.prototype.createPopupLiteComponent = function () {
        var ref = this.componentFactoryResolver
            .resolveComponentFactory(PopupLiteComponent)
            .create(this.injector);
        this.appRef.attachView(ref.hostView);
        this.domElem = (((ref.hostView))
            .rootNodes[0]);
        document.body.appendChild(this.domElem);
        return ref;
    };
    PopupLiteService.prototype.popedOut = function (id, result) {
        var ref = this.componentRef[id];
        this.appRef.detachView(ref.hostView);
        ref.destroy();
        delete this.componentRef[id];
        this.status[id].next(result);
        delete this.status[id];
    };
    PopupLiteService.prototype.setSelected = function (id) {
        var _this = this;
        var list = Object.keys(this.componentRef);
        list.map(function (ref) {
            ((_this.componentRef[ref].instance)).config.selected = false;
        });
        ((this.componentRef[id].instance)).config.selected = true;
    };
    PopupLiteService.prototype.openWindow = function (component, id, data, config) {
        var ref = this.createPopupLiteComponent();
        var instance = ((ref.instance));
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
            var list = Object.keys(config);
            list.map(function (key) {
                localConfig[key] = config[key];
            });
        }
        localConfig.id = id ? id : '' + new Date().getTime();
        this.componentRef[localConfig.id] = ref;
        this.status[localConfig.id] = new rxjs.Subject();
        instance.init(component, data, localConfig, this);
        this.setSelected(localConfig.id);
        return this.status[localConfig.id];
    };
    PopupLiteService.prototype.openModal = function (component, id, data, config) {
        var ref = this.createPopupLiteComponent();
        var instance = ((ref.instance));
        var localConfig = {
            overlay: true,
            close: true,
            closeOnOverlay: true,
            header: true,
            footer: true,
            centered: true
        };
        if (config) {
            var list = Object.keys(config);
            list.map(function (key) {
                localConfig[key] = config[key];
            });
        }
        localConfig.id = id ? id : '' + new Date().getTime();
        this.componentRef[localConfig.id] = ref;
        this.status[localConfig.id] = new rxjs.Subject();
        instance.init(component, data, localConfig, this);
        this.setSelected(localConfig.id);
        return this.status[localConfig.id];
    };
    PopupLiteService.prototype.openDialog = function (component, id, data, config) {
        var ref = this.createPopupLiteComponent();
        var instance = ((ref.instance));
        var localConfig = {
            overlay: true,
            close: true,
            closeOnOverlay: true,
            header: true,
            footer: true,
            centered: true
        };
        if (config) {
            var list = Object.keys(config);
            list.map(function (key) {
                localConfig[key] = config[key];
            });
        }
        localConfig.id = id ? id : '' + new Date().getTime();
        this.componentRef[localConfig.id] = ref;
        this.status[localConfig.id] = new rxjs.Subject();
        instance.init(component, data, localConfig, this);
        this.setSelected(localConfig.id);
        return this.status[localConfig.id];
    };
    PopupLiteService.prototype.confirm = function (id, data) {
        var info = {
            id: id,
            confirmed: true
        };
        if (data) {
            var list = Object.keys(data);
            list.map(function (key) {
                info[key] = data[key];
            });
        }
        this.popedOut(id, info);
    };
    PopupLiteService.prototype.cancel = function (id, data) {
        var info = {
            id: id,
            confirmed: true
        };
        if (data) {
            var list = Object.keys(data);
            list.map(function (key) {
                info[key] = data[key];
            });
        }
        this.popedOut(id, { id: id, confirmed: false });
    };
    return PopupLiteService;
}());
PopupLiteService.decorators = [
    { type: core.Injectable },
];
PopupLiteService.ctorParameters = function () { return [
    { type: core.ComponentFactoryResolver, },
    { type: core.ApplicationRef, },
    { type: core.Injector, },
]; };
var PopupLiteModule = /** @class */ (function () {
    function PopupLiteModule() {
    }
    return PopupLiteModule;
}());
PopupLiteModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [
                    common.CommonModule,
                    dragEnabled.DragDropModule
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
                schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
            },] },
];
PopupLiteModule.ctorParameters = function () { return []; };

exports.PopupLiteComponent = PopupLiteComponent;
exports.PopupLiteService = PopupLiteService;
exports.PopupLiteModule = PopupLiteModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=popup-lite.umd.js.map
