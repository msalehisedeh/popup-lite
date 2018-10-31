/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewContainerRef, ComponentFactoryResolver, Renderer, HostListener, ViewChild, ElementRef } from "@angular/core";
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
export { PopupLiteComponent };
if (false) {
    /** @type {?} */
    PopupLiteComponent.prototype.el;
    /** @type {?} */
    PopupLiteComponent.prototype.extraclasses;
    /** @type {?} */
    PopupLiteComponent.prototype.selector;
    /** @type {?} */
    PopupLiteComponent.prototype.content;
    /** @type {?} */
    PopupLiteComponent.prototype.modalWondow;
    /** @type {?} */
    PopupLiteComponent.prototype.resizer;
    /** @type {?} */
    PopupLiteComponent.prototype.dragHeader;
    /** @type {?} */
    PopupLiteComponent.prototype.config;
    /** @type {?} */
    PopupLiteComponent.prototype.componentFactoryResolver;
    /** @type {?} */
    PopupLiteComponent.prototype.renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbGl0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wb3B1cC1saXRlLyIsInNvdXJjZXMiOlsic3JjL2FwcC9wb3B1cC1saXRlL2NvbXBvbmVudHMvcG9wdXAtbGl0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFDTixTQUFTLEVBR1QsZ0JBQWdCLEVBQ2hCLHdCQUF3QixFQUd4QixRQUFRLEVBQ1IsWUFBWSxFQUdaLFNBQVMsRUFDVCxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0lBbUVqQyw0QkFDQyxFQUFjLEVBQ04sMEJBQ0E7UUFEQSw2QkFBd0IsR0FBeEIsd0JBQXdCO1FBQ3hCLGFBQVEsR0FBUixRQUFROzRCQXhETSxFQUFFO3NCQXdCRjtZQUN0QixFQUFFLEVBQUMsRUFBRTtZQUNMLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLEtBQUs7WUFDZCxjQUFjLEVBQUUsS0FBSztZQUNyQixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFDLEtBQUs7WUFDZCxTQUFTLEVBQUMsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUMsS0FBSztZQUViLE1BQU0sRUFBQyxFQUFFO1lBQ1QsS0FBSyxFQUFDLEVBQUU7WUFDUixhQUFhLEVBQUMsRUFBRTtZQUNoQixhQUFhLEVBQUMsRUFBRTtZQUNoQixRQUFRLEVBQUMsRUFBRTtZQUNYLFFBQVEsRUFBQyxFQUFFO1lBQ1gsWUFBWSxFQUFDLEtBQUs7WUFDbEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUMsS0FBSztZQUNmLFNBQVMsRUFBQyxLQUFLO1lBQ2YsU0FBUyxFQUFDLEtBQUs7WUFDZixNQUFNLEVBQUMsS0FBSztZQUNaLE1BQU0sRUFBQyxHQUFHO1lBQ1YsR0FBRyxFQUFFLEVBQUU7U0FDUDtRQU1BLElBQUksQ0FBQyxF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LFFBQVEsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUM7YUFDcEQ7U0FDRDtLQUNEOztnQkFwUEQsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBQyxZQUFZO29CQUNyQiwycUhBQTBDOztpQkFFN0M7Ozs7Z0JBWEEsVUFBVTtnQkFSVix3QkFBd0I7Z0JBR3hCLFFBQVE7OzswQkFzQlAsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQzs4QkFHN0MsU0FBUyxTQUFDLGFBQWEsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQzswQkFHakQsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQzs2QkFHN0MsU0FBUyxTQUFDLFlBQVksRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQzsyQkFHaEQsWUFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7NkJBM0MxQzs7U0EwQmEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1xuXHRDb21wb25lbnQsXG5cdENvbXBvbmVudEZhY3RvcnksIFxuXHRSZWZsZWN0aXZlSW5qZWN0b3IsXG5cdFZpZXdDb250YWluZXJSZWYsXG5cdENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcblx0SW5wdXQsXG5cdE91dHB1dCxcblx0UmVuZGVyZXIsXG5cdEhvc3RMaXN0ZW5lcixcblx0RXZlbnRFbWl0dGVyLFxuXHRJbmplY3RhYmxlLFxuXHRWaWV3Q2hpbGQsXG5cdEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IERyYWdFdmVudCB9IGZyb20gJ2RyYWctZW5hYmxlZCc7XG5cbmltcG9ydCB7IFBvcHVwTGl0ZVNlcnZpY2UgfSBmcm9tICcuLi9pbmplY3RhYmxlcy9wb3B1cC1saXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9wdXBMaXRlQ29udGVudENvbXBvbmVudCwgV2luZG93TGl0ZVNlbGVjdGlvbiwgUG9wdXBMaXRlT3B0aW9ucywgV2luZG93T3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvcG9wdXAtbGl0ZS5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjoncG9wdXAtbGl0ZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BvcHVwLWxpdGUuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9wb3B1cC1saXRlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUG9wdXBMaXRlQ29tcG9uZW50IHtcblx0cHJpdmF0ZSBlbDpIVE1MRWxlbWVudDtcblx0cHJpdmF0ZSBleHRyYWNsYXNzZXMgPSBcIlwiO1xuXHRwcml2YXRlIHNlbGVjdG9yOiBXaW5kb3dMaXRlU2VsZWN0aW9uO1xuXG5cdEBWaWV3Q2hpbGQoXCJjb250ZW50XCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgXG5cdGNvbnRlbnQ6IFZpZXdDb250YWluZXJSZWY7XG5cblx0QFZpZXdDaGlsZChcIm1vZGFsV29uZG93XCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgXG5cdG1vZGFsV29uZG93OiBWaWV3Q29udGFpbmVyUmVmO1xuXHRcblx0QFZpZXdDaGlsZChcInJlc2l6ZXJcIiwge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBcblx0cmVzaXplcjogVmlld0NvbnRhaW5lclJlZjtcblx0XG5cdEBWaWV3Q2hpbGQoXCJkcmFnSGVhZGVyXCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgXG5cdGRyYWdIZWFkZXI6IFZpZXdDb250YWluZXJSZWY7XG5cdFxuXHRASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcblx0b25SZXNpemUoZXZlbnQ6YW55KSB7XG5cdFx0aWYodGhpcy5jb25maWcuY2VudGVyZWQgJiYgIXRoaXMuY29uZmlnLnBpbm5lZCl7XG5cdFx0XHRsZXQgbmUgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1saXRlJyk7XG5cdFx0XHRsZXQgcm9vdDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShuZSwgJ2xlZnQnLCAoKHJvb3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgtbmUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpLzIpICsgXCJweFwiKTtcblx0XHR9XG5cdH1cblxuXHRjb25maWc6IFdpbmRvd09wdGlvbnMgPXtcblx0XHRpZDonJyxcblx0XHRjbG9zZTogZmFsc2UsXG5cdFx0b3ZlcmxheTogZmFsc2UsXG5cdFx0Y2xvc2VPbk92ZXJsYXk6IGZhbHNlLFxuXHRcdG1pbmltaXplOiBmYWxzZSxcblx0XHRtYXhpbWl6ZTogZmFsc2UsXG5cdFx0ZHJhZ2FibGU6ZmFsc2UsXG5cdFx0cmVzaXphYmxlOmZhbHNlLFxuXHRcdGNlbnRlcmVkOiBmYWxzZSxcblx0XHRmaXhlZDogZmFsc2UsXG5cdFx0cGluYWJsZTpmYWxzZSxcblxuXHRcdGhlaWdodDonJyxcblx0XHR3aWR0aDonJyxcblx0XHRtYXhCb2R5SGVpZ2h0OicnLFxuXHRcdG1pbkJvZHlIZWlnaHQ6JycsXG5cdFx0bWluV2lkdGg6JycsXG5cdFx0bWF4V2lkdGg6JycsXG5cdFx0YWRqdXN0SGVpZ2h0OmZhbHNlLFxuXHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0aXNPcGVuaW5nOmZhbHNlLFxuXHRcdG1pbmltaXplZDpmYWxzZSxcblx0XHRtYXhpbWl6ZWQ6ZmFsc2UsXG5cdFx0cGlubmVkOmZhbHNlLFxuXHRcdHpJbmRleDoxMDAsXG5cdFx0dG9wOiAnJ1xuXHR9XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0ZWw6IEVsZW1lbnRSZWYsIFxuXHRcdHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG5cdFx0cHJpdmF0ZSByZW5kZXJlcjpSZW5kZXJlcikge1xuXHRcdHRoaXMuZWwgPSBlbC5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuXHRwcml2YXRlIGNhbGNNYXhIZWlnaHQobm9kZTphbnksIHRhcmdldDpzdHJpbmcpe1xuXHRcdGxldCBsaXN0ID0gbm9kZS5jaGlsZE5vZGVzO1xuXHRcdGxldCBtYXggPSAwO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0ICAgaWYobGlzdFtpXS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT09dGFyZ2V0KXtcblx0XHRcdCAgIGxpc3QgPSBsaXN0W2ldLmNoaWxkTm9kZXM7XG5cdFx0XHQgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0ICAgaWYobGlzdFtpXS5ub2RlVHlwZT09PTEpe1xuXHRcdFx0XHRcdCAgIG1heCArPSAobGlzdFtpXS5jbGllbnRIZWlnaHQrbGlzdFtpXS5vZmZzZXRIZWlnaHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHQgICB9XG4gICAgICAgIH1cbiAgICBcdHJldHVybiBtYXg7XG5cdH1cblxuXHRpbml0KGNvbXBvbmVudCwgZGF0YSwgY29uZmlnOiBQb3B1cExpdGVPcHRpb25zLCBzZWxlY3RvcjogV2luZG93TGl0ZVNlbGVjdGlvbikge1xuXHRcdGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuXHRcdGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuY29udGVudC5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cdFx0Y29uc3QgaW5zdGFuY2UgPSAoPFBvcHVwTGl0ZUNvbnRlbnRDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKTtcblx0XHRpbnN0YW5jZS5kYXRhID0gZGF0YTtcblx0XHRpbnN0YW5jZS5pZCA9IGNvbmZpZy5pZDtcblxuXHRcdGlmKGluc3RhbmNlLnBvcHVwVGl0bGUpIHtcblx0XHRcdGNvbmZpZy5wb3B1cFRpdGxlID0gaW5zdGFuY2UucG9wdXBUaXRsZS5iaW5kKGluc3RhbmNlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uZmlnLnBvcHVwVGl0bGUgPSAoaWQpID0+IGlkO1xuXHRcdH1cblx0XHRcblx0XHRpZiAoY29uZmlnKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoY29uZmlnKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0dGhpcy5jb25maWdba2V5XSA9IGNvbmZpZ1trZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0dGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuXG5cdFx0dGhpcy5kaXNwbGF5KGNvbmZpZyk7XG5cdH1cblx0XHRcblx0cHVibGljIGRpc3BsYXkocHJvcHM6V2luZG93T3B0aW9ucyl7XG5cdFx0dGhpcy5jb25maWcubWF4Qm9keUhlaWdodCA9IHByb3BzICYmIHByb3BzLm1heEhlaWdodCA/IHByb3BzLm1heEhlaWdodDonJztcblx0XHQgdGhpcy5jb25maWcubWluV2lkdGggPSBwcm9wcyAmJiBwcm9wcy5taW5XaWR0aCA/IHByb3BzLm1pbldpZHRoOicnO1xuXHRcdCB0aGlzLmNvbmZpZy5tYXhXaWR0aCA9IHByb3BzICYmIHByb3BzLm1heFdpZHRoID8gcHJvcHMubWF4V2lkdGg6Jyc7XG5cdFx0IHRoaXMuY29uZmlnLnRvcCA9IHByb3BzICYmIHByb3BzLnRvcCA/IHByb3BzLnRvcCA6ICcnO1xuXHRcdCB0aGlzLmNvbmZpZy5pc09wZW5pbmcgPSB0cnVlO1xuXHRcdCB0aGlzLmNvbmZpZy5hZGp1c3RIZWlnaHQgPSBwcm9wcyAmJiBwcm9wcy5hZGp1c3RIZWlnaHQgPyBwcm9wcy5hZGp1c3RIZWlnaHQgOiBmYWxzZTtcblx0XHQgdGhpcy5leHRyYWNsYXNzZXMgPSB0aGlzLmNvbmZpZy5oZWFkZXIgPyBcIlwiOlwiaGVhZGVyLW9mZiBcIjtcblx0XHQgdGhpcy5leHRyYWNsYXNzZXMgKz0gdGhpcy5jb25maWcuZm9vdGVyID8gXCJcIjpcImZvb3Rlci1vZmYgXCI7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMub25SZXNpemUobnVsbCk7XG5cdFx0XHR0aGlzLmNvbmZpZy5pc09wZW4gPSB0cnVlO1xuXHRcdH0uYmluZCh0aGlzKSwxMCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0a2V5VXAoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcblxuXHRcdGlmIChjb2RlID09PSAxMykge1xuXHRcdFx0ZXZlbnQudGFyZ2V0LmNsaWNrKCk7XG5cdFx0fVx0XHRcblx0fVxuXHRjbG9zZU92ZXJsYXkoKXtcblx0XHRpZiAodGhpcy5jb25maWcuY2xvc2VPbk92ZXJsYXkpIHtcblx0XHR0aGlzLmNsb3NlTW9kYWwobnVsbCwgeyBpZDogdGhpcy5jb25maWcuaWQsIGNvbmZpcm1lZDogZmFsc2UgfSk7XG5cdFx0fVxuXHR9XG5cdG9uQ2xvc2UoZXZlbnQpIHtcblx0XHR0aGlzLmNsb3NlTW9kYWwoZXZlbnQsIHsgaWQ6IHRoaXMuY29uZmlnLmlkLCBjb25maXJtZWQ6IGZhbHNlIH0pO1xuXHR9XG5cdGNsb3NlTW9kYWwoJGV2ZW50OmFueSwgcmVzdWx0KXtcblx0XHR0aGlzLmNvbmZpZy5pc09wZW5pbmcgPSBmYWxzZTtcblx0XHR0aGlzLmNvbmZpZy5vdmVybGF5ID0gZmFsc2U7XG5cdFx0dGhpcy5jb25maWcuaXNPcGVuID0gZmFsc2U7XG5cdFx0dGhpcy5zZWxlY3Rvci5wb3BlZE91dCh0aGlzLmNvbmZpZy5pZCwgcmVzdWx0KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRtaW5pbWl6ZU1vZGFsKCRldmVudDphbnkpe1xuXHRcdHRoaXMuY29uZmlnLm1pbmltaXplZCA9ICF0aGlzLmNvbmZpZy5taW5pbWl6ZWQ7XG5cdFx0aWYodGhpcy5jb25maWcucmVzaXphYmxlKXtcblx0XHQgIGxldCBuZTphbnkgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5yZXNpemUtY29ybmVyJyk7XG5cdFx0ICBsZXQgd246YW55ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtbGl0ZScpO1xuXHRcdCAgbGV0IGJkOmFueSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHQgIGlmKCF0aGlzLmNvbmZpZy5taW5pbWl6ZWQpe2JkLnN0eWxlLmhlaWdodD1iZC5nZXRBdHRyaWJ1dGUoXCJvaFwiKTtiZC5zdHlsZS5tYXhIZWlnaHQ9IFwiaW5oZXJpdFwiO31cblx0XHQgIGVsc2Uge1xuXHRcdCAgYmQuc3R5bGUuaGVpZ2h0ID0gXCIwXCI7XG5cdFx0ICB3bi5zdHlsZS5oZWlnaHQ9XCJpbmhlcml0XCJcblx0XHQgIH1cblx0XHQgIG5lLnN0eWxlLmRpc3BsYXk9ICh0aGlzLmNvbmZpZy5taW5pbWl6ZWQgfHwgdGhpcy5jb25maWcubWF4aW1pemVkKSA/ICdub25lJzonYmxvY2snO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0bWF4aW1pemVNb2RhbCgkZXZlbnQ6YW55KXtcblx0XHR0aGlzLmNvbmZpZy5tYXhpbWl6ZWQgPSAhdGhpcy5jb25maWcubWF4aW1pemVkO1xuXHRcdGlmKHRoaXMuY29uZmlnLnJlc2l6YWJsZSl7XG5cdFx0ICBsZXQgbmU6YW55ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcucmVzaXplLWNvcm5lcicpO1xuXHRcdCAgbGV0IGJkOmFueSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHQgIGlmKGJkLmdldEF0dHJpYnV0ZShcIm9oXCIpKXtiZC5zdHlsZS5oZWlnaHQ9YmQuZ2V0QXR0cmlidXRlKFwib2hcIik7fVxuXHRcdCAgbmUuc3R5bGUuZGlzcGxheT0gKHRoaXMuY29uZmlnLm1pbmltaXplZCB8fCB0aGlzLmNvbmZpZy5tYXhpbWl6ZWQpID8gJ25vbmUnOidibG9jayc7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRzZWxlY3RlZCgkZXZlbnQ6IGFueSl7XG5cdFx0dGhpcy5zZWxlY3Rvci5zZXRTZWxlY3RlZCh0aGlzLmNvbmZpZy5pZCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cGluTW9kYWwoJGV2ZW50OmFueSl7XG5cdFx0dGhpcy5jb25maWcucGlubmVkID0gIXRoaXMuY29uZmlnLnBpbm5lZDtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRkcmFnRW5hYmxlZChldmVudDogRHJhZ0V2ZW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnLmRyYWdhYmxlICYmICF0aGlzLmNvbmZpZy5waW5uZWQ7XG5cdH1cblx0b25EcmFnU3RhcnQoZXZlbnQ6IERyYWdFdmVudCl7XG5cdH1cblx0b25EcmFnKGV2ZW50OiBEcmFnRXZlbnQpe1xuXHRcdGlmKGV2ZW50Lm5vZGUgPT09IHRoaXMuZHJhZ0hlYWRlci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ2xlZnQnLCAoZXZlbnQuY2xpZW50WC1ldmVudC5vZmZzZXQueCkrXCJweFwiKTtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ3RvcCcsIChldmVudC5jbGllbnRZLWV2ZW50Lm9mZnNldC55KStcInB4XCIpO1xuXHRcdH1cblx0fVxuXHRvbkRyYWdFbmQoZXZlbnQ6IERyYWdFdmVudCl7XG5cdFx0aWYoZXZlbnQubm9kZSA9PT0gdGhpcy5kcmFnSGVhZGVyLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnbGVmdCcsIChldmVudC5jbGllbnRYLWV2ZW50Lm9mZnNldC54KStcInB4XCIpO1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAndG9wJywgKGV2ZW50LmNsaWVudFktZXZlbnQub2Zmc2V0LnkpK1wicHhcIik7XG5cdFx0fVxuXHR9XG5cblx0cmVzaXplRW5hYmxlZChldmVudDogRHJhZ0V2ZW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnLnJlc2l6YWJsZTtcblx0fVxuXHRvblJlc2l6ZVN0YXJ0KGV2ZW50OiBEcmFnRXZlbnQpe1xuXHR9XG5cdG9uUmVzaXplUHJvZ3Jlc3MoZXZlbnQ6IERyYWdFdmVudCl7XG5cdFx0aWYoZXZlbnQubm9kZSA9PT0gdGhpcy5yZXNpemVyLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0Y29uc3Qgd3IgPSBldmVudC5tZWRpdW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRjb25zdCB3aWR0aCA9ICAoZXZlbnQuY2xpZW50WC1ldmVudC5vZmZzZXQueCkgLSB3ci5sZWZ0O1xuXHRcdFx0Y29uc3QgaGVpZ2h0ID0gKGV2ZW50LmNsaWVudFktZXZlbnQub2Zmc2V0LnkpIC0gd3IudG9wO1xuXHRcdFx0bGV0IGhkID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtaGVhZGVyJyk7XG5cdFx0XHRsZXQgZnQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1mb290ZXInKTtcblx0XHRcdGxldCBiZCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHRcdGxldCBmdGg9IGZ0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdGxldCBoZGg9IGhkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdGxldCBoID0gaGVpZ2h0IC0gaGRoIC0gZnRoIC0yO1xuXG5cdFx0XHRpZih3aWR0aD4yMDAgJiYgaGVpZ2h0PjYwKXtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnd2lkdGgnLCB3aWR0aCtcInB4XCIpO1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICdoZWlnaHQnLCBoZWlnaHQrXCJweFwiKTtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoYmQsICdoZWlnaHQnLCBoK1wicHhcIik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdG9uUmVzaXplRW5kKGV2ZW50OiBEcmFnRXZlbnQpe1xuXHRcdGlmKGV2ZW50Lm5vZGUgPT09IHRoaXMucmVzaXplci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdGNvbnN0IHdyID0gZXZlbnQubWVkaXVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0Y29uc3Qgd2lkdGggPSAgKGV2ZW50LmNsaWVudFgtZXZlbnQub2Zmc2V0LngpIC0gd3IubGVmdDtcblx0XHRcdGNvbnN0IGhlaWdodCA9IChldmVudC5jbGllbnRZLWV2ZW50Lm9mZnNldC55KSAtIHdyLnRvcDtcblxuXHRcdFx0aWYod2lkdGg+MjAwICYmIGhlaWdodD42MCl7XG5cdFx0XHRcdGxldCBoZCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWhlYWRlcicpO1xuXHRcdFx0XHRsZXQgZnQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1mb290ZXInKTtcblx0XHRcdFx0bGV0IGJkID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuXHRcdFx0XHRsZXQgZnRoPSBmdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHRcdGxldCBoZGg9IGhkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdFx0bGV0IGggPSBoZWlnaHQgLSBoZGggLSBmdGggLTI7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ3dpZHRoJywgd2lkdGgrXCJweFwiKTtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnaGVpZ2h0JywgaGVpZ2h0K1wicHhcIik7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGJkLCAnaGVpZ2h0JywgaCtcInB4XCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIl19