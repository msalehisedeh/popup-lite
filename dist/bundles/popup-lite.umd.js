(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common'), require('drag-enabled')) :
    typeof define === 'function' && define.amd ? define('popup-lite', ['exports', '@angular/core', 'rxjs', '@angular/common', 'drag-enabled'], factory) :
    (factory((global['popup-lite'] = {}),global.ng.core,global.rxjs,global.ng.common,global.dragEnabled));
}(this, (function (exports,core,rxjs,common,dragEnabled) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PopupLiteComponent = (function () {
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
            { type: core.Component, args: [{
                        selector: 'popup-lite',
                        template: "<div class=\"popup-lite-overlay\" #overlay\n\t(click)=\"closeOverlay()\"\n\t[style.display]=\"config.overlay ? 'block' : 'none'\"></div>\n<div #modalWondow \n\tclass=\"popup-lite\" \n\ttabindex=\"0\"\n\t[style.minWidth]=\"config.minWidth\"\n\t[style.maxWidth]=\"config.maxWidth\"\n\t[style.display]=\"config.isOpening ? 'block' : 'none'\" \n\t[style.position]=\"config.fixed ? 'fixed':'absolute'\"\n\t[style.top]=\"config.top.length ? config.top : ''\"\n\t[style.height]=\"config.height\"\n\t[style.zIndex]=\"config.zIndex\"\n\t[class.fade-in]=\"config.isOpen\" \n\t[class.maximized]=\"config.maximized\"\n\t[class.pinned]=\"config.pinned\"\n\t[style.z-index]=\"config.selected ? 105 : 100\"\n\t(keyup)=\"keyUp($event)\"\n\t(focus)=\"selected($event)\"\n\t(click)=\"selected($event)\">\n\t\t<div class=\"controls\">\n\t\t\t<a *ngIf=\"config.pinable\"\n\t\t\t\tclass=\"pin\" tabindex=\"0\" \n\t\t\t\t(click)=\"pinModal($event)\">\n\t\t\t\t<span *ngIf=\"!config.pinned\" class=\"fa fw fa-unlock\" aria-hidden=\"true\"></span>\n\t\t\t\t<span *ngIf=\"config.pinned\" class=\"fa fw fa-lock\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Pin</span>\n\t\t\t</a><a *ngIf=\"config.minimize\"\n\t\t\t\tclass=\"minify\" tabindex=\"0\" \n\t\t\t\t(click)=\"minimizeModal($event)\" \n\t\t\t\t[class.clicked]=\"config.minimized\">\n\t\t\t\t<span class=\"fa fw fa-window-minimize\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Minimize</span>\n\t\t\t</a><a *ngIf=\"config.maximize\"\n\t\t\t\tclass=\"maxify\" tabindex=\"0\" \n\t\t\t\t(click)=\"maximizeModal($event)\" \n\t\t\t\t[class.clicked]=\"config.maximized\">\n\t\t\t\t<span class=\"fa fw fa-window-maximize\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Maximize</span>\n\t\t\t</a><a *ngIf=\"config.close\"\n\t\t\t\tclass=\"close\" tabindex=\"0\" \n\t\t\t\t(click)=\"onClose($event)\">\n\t\t\t\t<span class=\"fa fw fa-window-close\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Close</span>\n\t\t\t</a>\n\t\t</div>\n\t\t<a *ngIf=\"config.resizable\"\n\t\t\t#resizer\n\t\t\tclass=\"resize-corner\" \n\t\t\ttabindex=\"0\" \n\t\t\t[medium]=\"modalWondow\"\n\t\t\t[dragInDocument]=\"resizeEnabled.bind(this)\"\n\t\t\t(onDragStart)=\"onResizeStart($event)\"\n\t\t\t(onDrag)=\"onResizeProgress($event)\"\n\t\t\t(onDragEnd)=\"onResizeEnd($event)\">\n\t\t\t<span class=\"fa fw fa-ellipsis-h\" aria-hidden=\"true\"></span>\n\t\t\t<span class=\"off-screen\">Resize</span>\n\t\t</a>\n\t\t<div *ngIf=\"config.header\"\n\t\t\t#dragHeader\n\t\t\tclass=\"modal-header\" \n\t\t\t[id]=\"config.id\"\n\t\t\t[style.cursor]=\"(config.dragable && !config.pinned) ? 'all-scroll':'default'\"\n\t\t\t[class.pinned]=\"config.pinned\"\n\t\t\t[class.minified]=\"config.minimized\"\n\t\t\t[medium]=\"modalWondow\"\n\t\t\t[dragInDocument]=\"dragEnabled.bind(this)\"\n\t\t\t(onDragStart)=\"onDragStart($event)\"\n\t\t\t(onDrag)=\"onDrag($event)\"\n\t\t\t(onDragEnd)=\"onDragEnd($event)\"\n\t\t\t(dblclick)=\"maximizeModal($event)\">\n\t\t\t<span *ngIf=\"config.headerIcon\" [class]=\"'icon ' + config.headerIcon\"></span>\n\t\t\t<span *ngIf=\"config.idOnHeader\" class=\"header-title\" [class.padded]=\"config.headerIcon ? true:null\" [textContent]=\"config.popupTitle(config.id)\"></span>\n\t\t</div>\n\t\t  <div class=\"modal-body\"\n\t\t     [class.minimized]=\"config.minimized\"\n\t\t     [style.minHeight]=\"config.minBodyHeight\"\n\t\t\t [style.maxHeight]=\"config.maxBodyHeight\">\n\t\t\t <ng-template  #content></ng-template>\n\t\t  </div>\n\t      <div class=\"modal-footer\" *ngIf=\"config.footer\"\n\t\t  \t\t[class.minimized]=\"config.minimized\">\n\t         <ng-content select=\"[modal-footer]\"></ng-content>\n\t\t  </div>\n\t    </div>",
                        styles: [":host .centered{text-align:center;margin:0 auto}:host .popup-lite h2{font-size:.8em;margin:0}:host .popup-lite-overlay{position:absolute;background-color:rgba(44,44,44,.44);width:100%;height:100%;top:0;left:0;z-index:104}:host .popup-lite{box-sizing:border-box;position:absolute;top:100px;left:100px;border-radius:6px;padding:0;z-index:100;background-color:transparent;min-width:300px;-ms-box-shadow:0 3px 9px rgba(0,0,0,.5);-o-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);opacity:0;transition:opacity .25s ease-in-out}:host .popup-lite .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .popup-lite.fade-in{opacity:1;transition:opacity .25s ease-in-out}:host .popup-lite .controls{position:absolute;top:0;right:2px;border:1px solid #eee;background-color:#fff;border-radius:2px;border-top:0;z-index:2}:host .popup-lite .controls a{text-align:center;border:1px solid #999;box-sizing:border-box;border-radius:0 0 2px 2px;border-top:0;display:inline-block;width:21px;height:21px}:host .popup-lite .controls a span{display:inline-block}:host .popup-lite .controls a.close{cursor:pointer}:host .popup-lite .controls a.close:hover{color:red}:host .popup-lite .controls a.minify{cursor:pointer}:host .popup-lite .controls a.minify.clicked,:host .popup-lite .controls a.minify:hover{color:red}:host .popup-lite .controls a.pin{cursor:pointer}:host .popup-lite .controls a.pin.clicked,:host .popup-lite .controls a.pin:hover{color:red}:host .popup-lite .controls a.maxify{cursor:pointer}:host .popup-lite .controls a.maxify.clicked,:host .popup-lite .controls a.maxify:hover{color:red}:host .popup-lite a{text-align:center;border:1px solid #999;box-sizing:border-box;border-radius:2px}:host .popup-lite a.resize-corner{position:absolute;height:5px;bottom:12px;right:4px;width:13px;border:0;cursor:se-resize}:host .popup-lite a.resize-corner:hover{color:red}:host .popup-lite .modal-header{background-color:#fff;box-sizing:border-box;border-radius:2px 2px 0 0;min-width:100%;min-height:24px;padding:5px 10px}:host .popup-lite .modal-header .icon{position:absolute;left:5px;top:3px}:host .popup-lite .modal-header .header-title{position:absolute;top:0;left:0;padding:2px 5px;box-sizing:border-box;font-size:.9rem}:host .popup-lite .modal-header .header-title.padded{left:15px}:host .popup-lite .modal-body{background-color:#fff;box-sizing:border-box;padding:10px;overflow-y:auto}:host .popup-lite .modal-footer{background-color:#fff;box-sizing:border-box;border-radius:0 0 2px 2px;min-width:100%;min-height:20px;padding:5px 10px}:host .popup-lite .modal-footer .right{text-align:right}:host .header-off{border-top-left-radius:2px;border-top-right-radius:5px}:host .footer-off{border-bottom-right-radius:5px;border-bottom-left-radius:2px}:host .minimized{padding-top:0!important;padding-bottom:0!important;min-height:0!important}:host .maximized{top:0!important;left:0!important;min-width:100%!important;min-height:100%!important}:host .maximized .modal-footer,:host .maximized .modal-header{width:100%}:host .maximized .modal-body{min-width:100%;min-height:95vh}:host .minimized{min-height:0!important;height:0!important}:host .minified{border-radius:6px!important}:host .popup-lite.maximized{height:inherit!important;min-height:inherit!important}:host .pinned{border:1px dotted red}:host .block-key-events{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}"]
                    }] }
        ];
        /** @nocollapse */
        PopupLiteComponent.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: core.ComponentFactoryResolver },
                { type: core.Renderer }
            ];
        };
        PopupLiteComponent.propDecorators = {
            content: [{ type: core.ViewChild, args: ["content", { read: core.ViewContainerRef },] }],
            modalWondow: [{ type: core.ViewChild, args: ["modalWondow", { read: core.ViewContainerRef },] }],
            resizer: [{ type: core.ViewChild, args: ["resizer", { read: core.ViewContainerRef },] }],
            dragHeader: [{ type: core.ViewChild, args: ["dragHeader", { read: core.ViewContainerRef },] }],
            onResize: [{ type: core.HostListener, args: ['window:resize', ['$event'],] }]
        };
        return PopupLiteComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PopupLiteService = (function () {
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
                this.domElem = /** @type {?} */ (((ref.hostView))
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
                    ((_this.componentRef[ref].instance)).config.selected = false;
                });
                ((this.componentRef[id].instance)).config.selected = true;
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
                var instance = ((ref.instance));
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
                this.status[localConfig.id] = new rxjs.Subject();
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
                var instance = ((ref.instance));
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
                this.status[localConfig.id] = new rxjs.Subject();
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
                var instance = ((ref.instance));
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
                this.status[localConfig.id] = new rxjs.Subject();
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        PopupLiteService.ctorParameters = function () {
            return [
                { type: core.ComponentFactoryResolver },
                { type: core.ApplicationRef },
                { type: core.Injector }
            ];
        };
        return PopupLiteService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var PopupLiteModule = (function () {
        function PopupLiteModule() {
        }
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

    exports.PopupLiteComponent = PopupLiteComponent;
    exports.PopupLiteService = PopupLiteService;
    exports.PopupLiteModule = PopupLiteModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbGl0ZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL3BvcHVwLWxpdGUvc3JjL2FwcC9wb3B1cC1saXRlL2NvbXBvbmVudHMvcG9wdXAtbGl0ZS5jb21wb25lbnQudHMiLCJuZzovL3BvcHVwLWxpdGUvc3JjL2FwcC9wb3B1cC1saXRlL2luamVjdGFibGVzL3BvcHVwLWxpdGUuc2VydmljZS50cyIsIm5nOi8vcG9wdXAtbGl0ZS9zcmMvYXBwL3BvcHVwLWxpdGUvcG9wdXAtbGl0ZS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1xuXHRDb21wb25lbnQsXG5cdENvbXBvbmVudEZhY3RvcnksIFxuXHRSZWZsZWN0aXZlSW5qZWN0b3IsXG5cdFZpZXdDb250YWluZXJSZWYsXG5cdENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcblx0SW5wdXQsXG5cdE91dHB1dCxcblx0UmVuZGVyZXIsXG5cdEhvc3RMaXN0ZW5lcixcblx0RXZlbnRFbWl0dGVyLFxuXHRJbmplY3RhYmxlLFxuXHRWaWV3Q2hpbGQsXG5cdEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IERyYWdFdmVudCB9IGZyb20gJ2RyYWctZW5hYmxlZCc7XG5cbmltcG9ydCB7IFBvcHVwTGl0ZVNlcnZpY2UgfSBmcm9tICcuLi9pbmplY3RhYmxlcy9wb3B1cC1saXRlLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9wdXBMaXRlQ29udGVudENvbXBvbmVudCwgV2luZG93TGl0ZVNlbGVjdGlvbiwgUG9wdXBMaXRlT3B0aW9ucywgV2luZG93T3B0aW9ucyB9IGZyb20gJy4uL2ludGVyZmFjZXMvcG9wdXAtbGl0ZS5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjoncG9wdXAtbGl0ZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BvcHVwLWxpdGUuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9wb3B1cC1saXRlLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUG9wdXBMaXRlQ29tcG9uZW50IHtcblx0cHJpdmF0ZSBlbDpIVE1MRWxlbWVudDtcblx0cHJpdmF0ZSBleHRyYWNsYXNzZXMgPSBcIlwiO1xuXHRwcml2YXRlIHNlbGVjdG9yOiBXaW5kb3dMaXRlU2VsZWN0aW9uO1xuXG5cdEBWaWV3Q2hpbGQoXCJjb250ZW50XCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgXG5cdGNvbnRlbnQ6IFZpZXdDb250YWluZXJSZWY7XG5cblx0QFZpZXdDaGlsZChcIm1vZGFsV29uZG93XCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgXG5cdG1vZGFsV29uZG93OiBWaWV3Q29udGFpbmVyUmVmO1xuXHRcblx0QFZpZXdDaGlsZChcInJlc2l6ZXJcIiwge3JlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBcblx0cmVzaXplcjogVmlld0NvbnRhaW5lclJlZjtcblx0XG5cdEBWaWV3Q2hpbGQoXCJkcmFnSGVhZGVyXCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgXG5cdGRyYWdIZWFkZXI6IFZpZXdDb250YWluZXJSZWY7XG5cdFxuXHRASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcblx0b25SZXNpemUoZXZlbnQ6YW55KSB7XG5cdFx0aWYodGhpcy5jb25maWcuY2VudGVyZWQgJiYgIXRoaXMuY29uZmlnLnBpbm5lZCl7XG5cdFx0XHRsZXQgbmUgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1saXRlJyk7XG5cdFx0XHRsZXQgcm9vdDogSFRNTEVsZW1lbnQgPSB0aGlzLmVsLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShuZSwgJ2xlZnQnLCAoKHJvb3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgtbmUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpLzIpICsgXCJweFwiKTtcblx0XHR9XG5cdH1cblxuXHRjb25maWc6IFdpbmRvd09wdGlvbnMgPXtcblx0XHRpZDonJyxcblx0XHRjbG9zZTogZmFsc2UsXG5cdFx0b3ZlcmxheTogZmFsc2UsXG5cdFx0Y2xvc2VPbk92ZXJsYXk6IGZhbHNlLFxuXHRcdG1pbmltaXplOiBmYWxzZSxcblx0XHRtYXhpbWl6ZTogZmFsc2UsXG5cdFx0ZHJhZ2FibGU6ZmFsc2UsXG5cdFx0cmVzaXphYmxlOmZhbHNlLFxuXHRcdGNlbnRlcmVkOiBmYWxzZSxcblx0XHRmaXhlZDogZmFsc2UsXG5cdFx0cGluYWJsZTpmYWxzZSxcblxuXHRcdGhlaWdodDonJyxcblx0XHR3aWR0aDonJyxcblx0XHRtYXhCb2R5SGVpZ2h0OicnLFxuXHRcdG1pbkJvZHlIZWlnaHQ6JycsXG5cdFx0bWluV2lkdGg6JycsXG5cdFx0bWF4V2lkdGg6JycsXG5cdFx0YWRqdXN0SGVpZ2h0OmZhbHNlLFxuXHRcdGlzT3BlbjogZmFsc2UsXG5cdFx0aXNPcGVuaW5nOmZhbHNlLFxuXHRcdG1pbmltaXplZDpmYWxzZSxcblx0XHRtYXhpbWl6ZWQ6ZmFsc2UsXG5cdFx0cGlubmVkOmZhbHNlLFxuXHRcdHpJbmRleDoxMDAsXG5cdFx0dG9wOiAnJ1xuXHR9XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0ZWw6IEVsZW1lbnRSZWYsIFxuXHRcdHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG5cdFx0cHJpdmF0ZSByZW5kZXJlcjpSZW5kZXJlcikge1xuXHRcdHRoaXMuZWwgPSBlbC5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuXHRwcml2YXRlIGNhbGNNYXhIZWlnaHQobm9kZTphbnksIHRhcmdldDpzdHJpbmcpe1xuXHRcdGxldCBsaXN0ID0gbm9kZS5jaGlsZE5vZGVzO1xuXHRcdGxldCBtYXggPSAwO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0ICAgaWYobGlzdFtpXS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT09dGFyZ2V0KXtcblx0XHRcdCAgIGxpc3QgPSBsaXN0W2ldLmNoaWxkTm9kZXM7XG5cdFx0XHQgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0ICAgaWYobGlzdFtpXS5ub2RlVHlwZT09PTEpe1xuXHRcdFx0XHRcdCAgIG1heCArPSAobGlzdFtpXS5jbGllbnRIZWlnaHQrbGlzdFtpXS5vZmZzZXRIZWlnaHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHQgICB9XG4gICAgICAgIH1cbiAgICBcdHJldHVybiBtYXg7XG5cdH1cblxuXHRpbml0KGNvbXBvbmVudCwgZGF0YSwgY29uZmlnOiBQb3B1cExpdGVPcHRpb25zLCBzZWxlY3RvcjogV2luZG93TGl0ZVNlbGVjdGlvbikge1xuXHRcdGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuXHRcdGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuY29udGVudC5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG5cdFx0Y29uc3QgaW5zdGFuY2UgPSAoPFBvcHVwTGl0ZUNvbnRlbnRDb21wb25lbnQ+Y29tcG9uZW50UmVmLmluc3RhbmNlKTtcblx0XHRpbnN0YW5jZS5kYXRhID0gZGF0YTtcblx0XHRpbnN0YW5jZS5pZCA9IGNvbmZpZy5pZDtcblxuXHRcdGlmKGluc3RhbmNlLnBvcHVwVGl0bGUpIHtcblx0XHRcdGNvbmZpZy5wb3B1cFRpdGxlID0gaW5zdGFuY2UucG9wdXBUaXRsZS5iaW5kKGluc3RhbmNlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uZmlnLnBvcHVwVGl0bGUgPSAoaWQpID0+IGlkO1xuXHRcdH1cblx0XHRcblx0XHRpZiAoY29uZmlnKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoY29uZmlnKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0dGhpcy5jb25maWdba2V5XSA9IGNvbmZpZ1trZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0dGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuXG5cdFx0dGhpcy5kaXNwbGF5KGNvbmZpZyk7XG5cdH1cblx0XHRcblx0cHVibGljIGRpc3BsYXkocHJvcHM6V2luZG93T3B0aW9ucyl7XG5cdFx0dGhpcy5jb25maWcubWF4Qm9keUhlaWdodCA9IHByb3BzICYmIHByb3BzLm1heEhlaWdodCA/IHByb3BzLm1heEhlaWdodDonJztcblx0XHQgdGhpcy5jb25maWcubWluV2lkdGggPSBwcm9wcyAmJiBwcm9wcy5taW5XaWR0aCA/IHByb3BzLm1pbldpZHRoOicnO1xuXHRcdCB0aGlzLmNvbmZpZy5tYXhXaWR0aCA9IHByb3BzICYmIHByb3BzLm1heFdpZHRoID8gcHJvcHMubWF4V2lkdGg6Jyc7XG5cdFx0IHRoaXMuY29uZmlnLnRvcCA9IHByb3BzICYmIHByb3BzLnRvcCA/IHByb3BzLnRvcCA6ICcnO1xuXHRcdCB0aGlzLmNvbmZpZy5pc09wZW5pbmcgPSB0cnVlO1xuXHRcdCB0aGlzLmNvbmZpZy5hZGp1c3RIZWlnaHQgPSBwcm9wcyAmJiBwcm9wcy5hZGp1c3RIZWlnaHQgPyBwcm9wcy5hZGp1c3RIZWlnaHQgOiBmYWxzZTtcblx0XHQgdGhpcy5leHRyYWNsYXNzZXMgPSB0aGlzLmNvbmZpZy5oZWFkZXIgPyBcIlwiOlwiaGVhZGVyLW9mZiBcIjtcblx0XHQgdGhpcy5leHRyYWNsYXNzZXMgKz0gdGhpcy5jb25maWcuZm9vdGVyID8gXCJcIjpcImZvb3Rlci1vZmYgXCI7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMub25SZXNpemUobnVsbCk7XG5cdFx0XHR0aGlzLmNvbmZpZy5pc09wZW4gPSB0cnVlO1xuXHRcdH0uYmluZCh0aGlzKSwxMCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0a2V5VXAoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcblxuXHRcdGlmIChjb2RlID09PSAxMykge1xuXHRcdFx0ZXZlbnQudGFyZ2V0LmNsaWNrKCk7XG5cdFx0fVx0XHRcblx0fVxuXHRjbG9zZU92ZXJsYXkoKXtcblx0XHRpZiAodGhpcy5jb25maWcuY2xvc2VPbk92ZXJsYXkpIHtcblx0XHR0aGlzLmNsb3NlTW9kYWwobnVsbCwgeyBpZDogdGhpcy5jb25maWcuaWQsIGNvbmZpcm1lZDogZmFsc2UgfSk7XG5cdFx0fVxuXHR9XG5cdG9uQ2xvc2UoZXZlbnQpIHtcblx0XHR0aGlzLmNsb3NlTW9kYWwoZXZlbnQsIHsgaWQ6IHRoaXMuY29uZmlnLmlkLCBjb25maXJtZWQ6IGZhbHNlIH0pO1xuXHR9XG5cdGNsb3NlTW9kYWwoJGV2ZW50OmFueSwgcmVzdWx0KXtcblx0XHR0aGlzLmNvbmZpZy5pc09wZW5pbmcgPSBmYWxzZTtcblx0XHR0aGlzLmNvbmZpZy5vdmVybGF5ID0gZmFsc2U7XG5cdFx0dGhpcy5jb25maWcuaXNPcGVuID0gZmFsc2U7XG5cdFx0dGhpcy5zZWxlY3Rvci5wb3BlZE91dCh0aGlzLmNvbmZpZy5pZCwgcmVzdWx0KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRtaW5pbWl6ZU1vZGFsKCRldmVudDphbnkpe1xuXHRcdHRoaXMuY29uZmlnLm1pbmltaXplZCA9ICF0aGlzLmNvbmZpZy5taW5pbWl6ZWQ7XG5cdFx0aWYodGhpcy5jb25maWcucmVzaXphYmxlKXtcblx0XHQgIGxldCBuZTphbnkgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5yZXNpemUtY29ybmVyJyk7XG5cdFx0ICBsZXQgd246YW55ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtbGl0ZScpO1xuXHRcdCAgbGV0IGJkOmFueSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHQgIGlmKCF0aGlzLmNvbmZpZy5taW5pbWl6ZWQpe2JkLnN0eWxlLmhlaWdodD1iZC5nZXRBdHRyaWJ1dGUoXCJvaFwiKTtiZC5zdHlsZS5tYXhIZWlnaHQ9IFwiaW5oZXJpdFwiO31cblx0XHQgIGVsc2Uge1xuXHRcdCAgYmQuc3R5bGUuaGVpZ2h0ID0gXCIwXCI7XG5cdFx0ICB3bi5zdHlsZS5oZWlnaHQ9XCJpbmhlcml0XCJcblx0XHQgIH1cblx0XHQgIG5lLnN0eWxlLmRpc3BsYXk9ICh0aGlzLmNvbmZpZy5taW5pbWl6ZWQgfHwgdGhpcy5jb25maWcubWF4aW1pemVkKSA/ICdub25lJzonYmxvY2snO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0bWF4aW1pemVNb2RhbCgkZXZlbnQ6YW55KXtcblx0XHR0aGlzLmNvbmZpZy5tYXhpbWl6ZWQgPSAhdGhpcy5jb25maWcubWF4aW1pemVkO1xuXHRcdGlmKHRoaXMuY29uZmlnLnJlc2l6YWJsZSl7XG5cdFx0ICBsZXQgbmU6YW55ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcucmVzaXplLWNvcm5lcicpO1xuXHRcdCAgbGV0IGJkOmFueSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHQgIGlmKGJkLmdldEF0dHJpYnV0ZShcIm9oXCIpKXtiZC5zdHlsZS5oZWlnaHQ9YmQuZ2V0QXR0cmlidXRlKFwib2hcIik7fVxuXHRcdCAgbmUuc3R5bGUuZGlzcGxheT0gKHRoaXMuY29uZmlnLm1pbmltaXplZCB8fCB0aGlzLmNvbmZpZy5tYXhpbWl6ZWQpID8gJ25vbmUnOidibG9jayc7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRzZWxlY3RlZCgkZXZlbnQ6IGFueSl7XG5cdFx0dGhpcy5zZWxlY3Rvci5zZXRTZWxlY3RlZCh0aGlzLmNvbmZpZy5pZCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cGluTW9kYWwoJGV2ZW50OmFueSl7XG5cdFx0dGhpcy5jb25maWcucGlubmVkID0gIXRoaXMuY29uZmlnLnBpbm5lZDtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRkcmFnRW5hYmxlZChldmVudDogRHJhZ0V2ZW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnLmRyYWdhYmxlICYmICF0aGlzLmNvbmZpZy5waW5uZWQ7XG5cdH1cblx0b25EcmFnU3RhcnQoZXZlbnQ6IERyYWdFdmVudCl7XG5cdH1cblx0b25EcmFnKGV2ZW50OiBEcmFnRXZlbnQpe1xuXHRcdGlmKGV2ZW50Lm5vZGUgPT09IHRoaXMuZHJhZ0hlYWRlci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ2xlZnQnLCAoZXZlbnQuY2xpZW50WC1ldmVudC5vZmZzZXQueCkrXCJweFwiKTtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ3RvcCcsIChldmVudC5jbGllbnRZLWV2ZW50Lm9mZnNldC55KStcInB4XCIpO1xuXHRcdH1cblx0fVxuXHRvbkRyYWdFbmQoZXZlbnQ6IERyYWdFdmVudCl7XG5cdFx0aWYoZXZlbnQubm9kZSA9PT0gdGhpcy5kcmFnSGVhZGVyLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnbGVmdCcsIChldmVudC5jbGllbnRYLWV2ZW50Lm9mZnNldC54KStcInB4XCIpO1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAndG9wJywgKGV2ZW50LmNsaWVudFktZXZlbnQub2Zmc2V0LnkpK1wicHhcIik7XG5cdFx0fVxuXHR9XG5cblx0cmVzaXplRW5hYmxlZChldmVudDogRHJhZ0V2ZW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnLnJlc2l6YWJsZTtcblx0fVxuXHRvblJlc2l6ZVN0YXJ0KGV2ZW50OiBEcmFnRXZlbnQpe1xuXHR9XG5cdG9uUmVzaXplUHJvZ3Jlc3MoZXZlbnQ6IERyYWdFdmVudCl7XG5cdFx0aWYoZXZlbnQubm9kZSA9PT0gdGhpcy5yZXNpemVyLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0Y29uc3Qgd3IgPSBldmVudC5tZWRpdW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRjb25zdCB3aWR0aCA9ICAoZXZlbnQuY2xpZW50WC1ldmVudC5vZmZzZXQueCkgLSB3ci5sZWZ0O1xuXHRcdFx0Y29uc3QgaGVpZ2h0ID0gKGV2ZW50LmNsaWVudFktZXZlbnQub2Zmc2V0LnkpIC0gd3IudG9wO1xuXHRcdFx0bGV0IGhkID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtaGVhZGVyJyk7XG5cdFx0XHRsZXQgZnQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1mb290ZXInKTtcblx0XHRcdGxldCBiZCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHRcdGxldCBmdGg9IGZ0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdGxldCBoZGg9IGhkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdGxldCBoID0gaGVpZ2h0IC0gaGRoIC0gZnRoIC0yO1xuXG5cdFx0XHRpZih3aWR0aD4yMDAgJiYgaGVpZ2h0PjYwKXtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnd2lkdGgnLCB3aWR0aCtcInB4XCIpO1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICdoZWlnaHQnLCBoZWlnaHQrXCJweFwiKTtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoYmQsICdoZWlnaHQnLCBoK1wicHhcIik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdG9uUmVzaXplRW5kKGV2ZW50OiBEcmFnRXZlbnQpe1xuXHRcdGlmKGV2ZW50Lm5vZGUgPT09IHRoaXMucmVzaXplci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdGNvbnN0IHdyID0gZXZlbnQubWVkaXVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0Y29uc3Qgd2lkdGggPSAgKGV2ZW50LmNsaWVudFgtZXZlbnQub2Zmc2V0LngpIC0gd3IubGVmdDtcblx0XHRcdGNvbnN0IGhlaWdodCA9IChldmVudC5jbGllbnRZLWV2ZW50Lm9mZnNldC55KSAtIHdyLnRvcDtcblxuXHRcdFx0aWYod2lkdGg+MjAwICYmIGhlaWdodD42MCl7XG5cdFx0XHRcdGxldCBoZCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWhlYWRlcicpO1xuXHRcdFx0XHRsZXQgZnQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1mb290ZXInKTtcblx0XHRcdFx0bGV0IGJkID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuXHRcdFx0XHRsZXQgZnRoPSBmdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHRcdGxldCBoZGg9IGhkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdFx0bGV0IGggPSBoZWlnaHQgLSBoZGggLSBmdGggLTI7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ3dpZHRoJywgd2lkdGgrXCJweFwiKTtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnaGVpZ2h0JywgaGVpZ2h0K1wicHhcIik7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGJkLCAnaGVpZ2h0JywgaCtcInB4XCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIiwiXG5pbXBvcnQge1xuICAgIEluamVjdGFibGUsXG4gICAgSW5qZWN0b3IsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIEVtYmVkZGVkVmlld1JlZixcbiAgICBBcHBsaWNhdGlvblJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFBvcHVwTGl0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcG9wdXAtbGl0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wdXBMaXRlT3B0aW9ucywgV2luZG93T3B0aW9ucywgV2luZG93TGl0ZVNlbGVjdGlvbiwgV2luZG93TGl0ZVNlcnZpY2UgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3BvcHVwLWxpdGUuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBvcHVwTGl0ZVNlcnZpY2UgaW1wbGVtZW50cyBXaW5kb3dMaXRlU2VydmljZSwgV2luZG93TGl0ZVNlbGVjdGlvbiB7XG5cdHByaXZhdGUgIGNvbXBvbmVudFJlZiA9IHt9O1xuXHRwcml2YXRlICBkb21FbGVtO1xuXHRwcml2YXRlIHN0YXR1cyA9IFtdO1xuXHQvLyBwcml2YXRlIHdpbmRvd3NMaXN0OiBQb3B1cExpdGVDb21wb25lbnRbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXG4gICkgeyB9XG5cblx0cHJpdmF0ZSBjcmVhdGVQb3B1cExpdGVDb21wb25lbnQoKSB7XG5cdFx0Y29uc3QgcmVmID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcblx0XHRcdC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShQb3B1cExpdGVDb21wb25lbnQpXG5cdFx0XHQuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG5cdFx0dGhpcy5hcHBSZWYuYXR0YWNoVmlldyhyZWYuaG9zdFZpZXcpO1xuXG5cdFx0dGhpcy5kb21FbGVtID0gKHJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pilcblx0XHRcdC5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG5cblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbSk7XG5cblx0XHRyZXR1cm4gcmVmO1xuXHR9XG4gIFxuXHRwb3BlZE91dChpZCwgcmVzdWx0OiBhbnkpIHtcblx0XHRjb25zdCByZWYgPSB0aGlzLmNvbXBvbmVudFJlZltpZF07XG5cdFx0XG5cdFx0dGhpcy5hcHBSZWYuZGV0YWNoVmlldyhyZWYuaG9zdFZpZXcpO1xuXHRcdHJlZi5kZXN0cm95KCk7XG5cblx0XHRkZWxldGUgdGhpcy5jb21wb25lbnRSZWZbaWRdO1xuXG5cdFx0dGhpcy5zdGF0dXNbaWRdLm5leHQocmVzdWx0KTtcblx0XHRkZWxldGUgdGhpcy5zdGF0dXNbaWRdO1xuXHR9XG5cdHNldFNlbGVjdGVkKGlkKXtcblx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXModGhpcy5jb21wb25lbnRSZWYpO1xuXG5cdFx0bGlzdC5tYXAoKHJlZik9PiB7XG5cdFx0XHQoPFBvcHVwTGl0ZUNvbXBvbmVudD50aGlzLmNvbXBvbmVudFJlZltyZWZdLmluc3RhbmNlKS5jb25maWcuc2VsZWN0ZWQgPSBmYWxzZTtcblx0XHR9KTtcblx0XHQoPFBvcHVwTGl0ZUNvbXBvbmVudD50aGlzLmNvbXBvbmVudFJlZltpZF0uaW5zdGFuY2UpLmNvbmZpZy5zZWxlY3RlZCA9IHRydWU7XG5cdH1cblxuXHRvcGVuV2luZG93KGNvbXBvbmVudDogYW55LCBpZDogc3RyaW5nLCBkYXRhPzogYW55LCBjb25maWc/OiBQb3B1cExpdGVPcHRpb25zKTogT2JzZXJ2YWJsZTxhbnk+e1xuXHRcdGNvbnN0IHJlZiA9IHRoaXMuY3JlYXRlUG9wdXBMaXRlQ29tcG9uZW50KCk7XG5cdFx0Y29uc3QgaW5zdGFuY2UgPSAoPFBvcHVwTGl0ZUNvbXBvbmVudD5yZWYuaW5zdGFuY2UpO1xuXHRcdGNvbnN0IGxvY2FsQ29uZmlnOiBXaW5kb3dPcHRpb25zID0ge1xuXHRcdFx0Y2xvc2U6IHRydWUsXG5cdFx0XHRtaW5pbWl6ZTogdHJ1ZSxcblx0XHRcdG1heGltaXplOiB0cnVlLFxuXHRcdFx0cmVzaXphYmxlOnRydWUsXG5cdFx0XHRoZWFkZXI6IHRydWUsXG5cdFx0XHRmb290ZXI6IHRydWUsXG5cdFx0XHRkcmFnYWJsZTp0cnVlLFxuXHRcdFx0cGluYWJsZTp0cnVlLFxuXHRcdFx0aWRPbkhlYWRlcjogdHJ1ZSxcblx0XHRcdGNlbnRlcmVkOiB0cnVlXG5cdFx0fTtcblx0XHRpZiAoY29uZmlnKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoY29uZmlnKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0bG9jYWxDb25maWdba2V5XSA9IGNvbmZpZ1trZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0bG9jYWxDb25maWcuaWQgPSBpZCA/IGlkIDogJycrbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cblx0XHR0aGlzLmNvbXBvbmVudFJlZltsb2NhbENvbmZpZy5pZF0gPSByZWY7XG5cdFx0dGhpcy5zdGF0dXNbbG9jYWxDb25maWcuaWRdID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG5cdFx0aW5zdGFuY2UuaW5pdChjb21wb25lbnQsIGRhdGEsIGxvY2FsQ29uZmlnLCB0aGlzKTtcblx0XHR0aGlzLnNldFNlbGVjdGVkKGxvY2FsQ29uZmlnLmlkKTtcblxuXHRcdHJldHVybiB0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF07XG5cdH1cblxuXHRvcGVuTW9kYWwoY29tcG9uZW50OiBhbnksIGlkOiBzdHJpbmcsIGRhdGE/OiBhbnksIGNvbmZpZz86IFBvcHVwTGl0ZU9wdGlvbnMpOiBPYnNlcnZhYmxlPGFueT57XG5cdFx0Y29uc3QgcmVmID0gdGhpcy5jcmVhdGVQb3B1cExpdGVDb21wb25lbnQoKTtcblx0XHRjb25zdCBpbnN0YW5jZSA9ICg8UG9wdXBMaXRlQ29tcG9uZW50PnJlZi5pbnN0YW5jZSk7XG5cdFx0Y29uc3QgbG9jYWxDb25maWc6IFdpbmRvd09wdGlvbnMgPSB7XG5cdFx0XHRvdmVybGF5OiB0cnVlLFxuXHRcdFx0Y2xvc2U6IHRydWUsXG5cdFx0XHRjbG9zZU9uT3ZlcmxheTogdHJ1ZSxcblx0XHRcdGhlYWRlcjogdHJ1ZSxcblx0XHRcdGZvb3RlcjogdHJ1ZSxcblx0XHRcdGNlbnRlcmVkOiB0cnVlXG5cdFx0fTtcblxuXHRcdGlmIChjb25maWcpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhjb25maWcpO1xuXHRcdFx0bGlzdC5tYXAoKGtleSkgPT4ge1xuXHRcdFx0XHRsb2NhbENvbmZpZ1trZXldID0gY29uZmlnW2tleV07XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRsb2NhbENvbmZpZy5pZCA9IGlkID8gaWQgOiAnJytuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuXHRcdHRoaXMuY29tcG9uZW50UmVmW2xvY2FsQ29uZmlnLmlkXSA9IHJlZjtcblx0XHR0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF0gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cblx0XHRpbnN0YW5jZS5pbml0KGNvbXBvbmVudCwgZGF0YSwgbG9jYWxDb25maWcsIHRoaXMpO1xuXHRcdHRoaXMuc2V0U2VsZWN0ZWQobG9jYWxDb25maWcuaWQpO1xuXG5cdFx0cmV0dXJuIHRoaXMuc3RhdHVzW2xvY2FsQ29uZmlnLmlkXTtcblx0fVxuXG5cdG9wZW5EaWFsb2coY29tcG9uZW50OiBhbnksIGlkOiBzdHJpbmcsIGRhdGE/OiBhbnksIGNvbmZpZz86IFBvcHVwTGl0ZU9wdGlvbnMpOiBPYnNlcnZhYmxlPGFueT57XG5cdFx0Y29uc3QgcmVmID0gdGhpcy5jcmVhdGVQb3B1cExpdGVDb21wb25lbnQoKTtcblx0XHRjb25zdCBpbnN0YW5jZSA9ICg8UG9wdXBMaXRlQ29tcG9uZW50PnJlZi5pbnN0YW5jZSk7XG5cdFx0Y29uc3QgbG9jYWxDb25maWc6IFdpbmRvd09wdGlvbnMgPSB7XG5cdFx0XHRvdmVybGF5OiB0cnVlLFxuXHRcdFx0Y2xvc2U6IHRydWUsXG5cdFx0XHRjbG9zZU9uT3ZlcmxheTogdHJ1ZSxcblx0XHRcdGhlYWRlcjogdHJ1ZSxcblx0XHRcdGZvb3RlcjogdHJ1ZSxcblx0XHRcdGNlbnRlcmVkOiB0cnVlXG5cdFx0fTtcblx0XHRpZiAoY29uZmlnKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoY29uZmlnKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0bG9jYWxDb25maWdba2V5XSA9IGNvbmZpZ1trZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0bG9jYWxDb25maWcuaWQgPSBpZCA/IGlkIDogJycrbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cblx0XHR0aGlzLmNvbXBvbmVudFJlZltsb2NhbENvbmZpZy5pZF0gPSByZWY7XG5cdFx0dGhpcy5zdGF0dXNbbG9jYWxDb25maWcuaWRdID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG5cdFx0aW5zdGFuY2UuaW5pdChjb21wb25lbnQsIGRhdGEsIGxvY2FsQ29uZmlnLCB0aGlzKTtcblx0XHR0aGlzLnNldFNlbGVjdGVkKGxvY2FsQ29uZmlnLmlkKTtcblxuXHRcdHJldHVybiB0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF07XG5cdH1cblxuXHRjb25maXJtKGlkLCBkYXRhOiB7fSkge1xuXHRcdGNvbnN0IGluZm8gPSB7IFxuXHRcdFx0aWQ6IGlkLCBcblx0XHRcdGNvbmZpcm1lZDogdHJ1ZSBcblx0XHR9O1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoZGF0YSk7XG5cdFx0XHRsaXN0Lm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRcdGluZm9ba2V5XSA9IGRhdGFba2V5XTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdHRoaXMucG9wZWRPdXQoaWQsIGluZm8pO1xuXHR9XG5cdGNhbmNlbChpZCwgZGF0YToge30pIHtcblx0XHRjb25zdCBpbmZvID0geyBcblx0XHRcdGlkOiBpZCwgXG5cdFx0XHRjb25maXJtZWQ6IHRydWUgXG5cdFx0fTtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKGRhdGEpO1xuXHRcdFx0bGlzdC5tYXAoKGtleSkgPT4ge1xuXHRcdFx0XHRpbmZvW2tleV0gPSBkYXRhW2tleV07XG5cdFx0XHR9KVxuXHRcdH1cblx0XHR0aGlzLnBvcGVkT3V0KGlkLCB7IGlkOiBpZCwgY29uZmlybWVkOiBmYWxzZSB9KTtcblx0fVxuXG59IiwiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFBvcHVwTGl0ZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wb3B1cC1saXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBvcHVwTGl0ZVNlcnZpY2UgfSBmcm9tICcuL2luamVjdGFibGVzL3BvcHVwLWxpdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnZHJhZy1lbmFibGVkJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRHJhZ0Ryb3BNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgUG9wdXBMaXRlQ29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBQb3B1cExpdGVDb21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgUG9wdXBMaXRlQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIFBvcHVwTGl0ZVNlcnZpY2VcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFBvcHVwTGl0ZU1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiRWxlbWVudFJlZiIsIkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciIsIlJlbmRlcmVyIiwiVmlld0NoaWxkIiwiVmlld0NvbnRhaW5lclJlZiIsIkhvc3RMaXN0ZW5lciIsIlN1YmplY3QiLCJJbmplY3RhYmxlIiwiQXBwbGljYXRpb25SZWYiLCJJbmplY3RvciIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRHJhZ0Ryb3BNb2R1bGUiLCJDVVNUT01fRUxFTUVOVFNfU0NIRU1BIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7UUFnRkMsNEJBQ0MsRUFBYyxFQUNOLDBCQUNBO1lBREEsNkJBQXdCLEdBQXhCLHdCQUF3QjtZQUN4QixhQUFRLEdBQVIsUUFBUTtnQ0F4RE0sRUFBRTswQkF3QkY7Z0JBQ3RCLEVBQUUsRUFBQyxFQUFFO2dCQUNMLEtBQUssRUFBRSxLQUFLO2dCQUNaLE9BQU8sRUFBRSxLQUFLO2dCQUNkLGNBQWMsRUFBRSxLQUFLO2dCQUNyQixRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUMsS0FBSztnQkFDZCxTQUFTLEVBQUMsS0FBSztnQkFDZixRQUFRLEVBQUUsS0FBSztnQkFDZixLQUFLLEVBQUUsS0FBSztnQkFDWixPQUFPLEVBQUMsS0FBSztnQkFFYixNQUFNLEVBQUMsRUFBRTtnQkFDVCxLQUFLLEVBQUMsRUFBRTtnQkFDUixhQUFhLEVBQUMsRUFBRTtnQkFDaEIsYUFBYSxFQUFDLEVBQUU7Z0JBQ2hCLFFBQVEsRUFBQyxFQUFFO2dCQUNYLFFBQVEsRUFBQyxFQUFFO2dCQUNYLFlBQVksRUFBQyxLQUFLO2dCQUNsQixNQUFNLEVBQUUsS0FBSztnQkFDYixTQUFTLEVBQUMsS0FBSztnQkFDZixTQUFTLEVBQUMsS0FBSztnQkFDZixTQUFTLEVBQUMsS0FBSztnQkFDZixNQUFNLEVBQUMsS0FBSztnQkFDWixNQUFNLEVBQUMsR0FBRztnQkFDVixHQUFHLEVBQUUsRUFBRTthQUNQO1lBTUEsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQ3hCOzs7OztRQTFDSixxQ0FBUTs7OztZQURSLFVBQ1MsS0FBUztnQkFDakIsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDOztvQkFDOUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7O29CQUM5QyxJQUFJLElBQUksR0FBZ0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssR0FBQyxFQUFFLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLElBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO2lCQUNySTthQUNEOzs7Ozs7UUFzQ08sMENBQWE7Ozs7O3NCQUFDLElBQVEsRUFBRSxNQUFhOztnQkFDNUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Z0JBQzNCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFFWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDbkMsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFHLE1BQU0sRUFBQzt3QkFDMUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7d0JBQzFCLEtBQUssSUFBSSxHQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsRUFBRSxFQUFFOzRCQUNyQyxJQUFHLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUcsQ0FBQyxFQUFDO2dDQUN2QixHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7NkJBQ3JEO3lCQUNEO3dCQUNELE1BQU07cUJBQ0o7aUJBQ0c7Z0JBQ0osT0FBTyxHQUFHLENBQUM7Ozs7Ozs7OztRQUdmLGlDQUFJOzs7Ozs7O1lBQUosVUFBSyxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQXdCLEVBQUUsUUFBNkI7Z0JBQTdFLGlCQXNCQzs7Z0JBckJBLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDOztnQkFDMUYsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7Z0JBQ3BFLElBQU0sUUFBUSxLQUErQixZQUFZLENBQUMsUUFBUSxFQUFDLENBQUM7Z0JBQ3BFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixRQUFRLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBRXhCLElBQUcsUUFBUSxDQUFDLFVBQVUsRUFBRTtvQkFDdkIsTUFBTSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDdkQ7cUJBQU07b0JBQ04sTUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFDLEVBQUUsSUFBSyxPQUFBLEVBQUUsR0FBQSxDQUFDO2lCQUMvQjtnQkFFRCxJQUFJLE1BQU0sRUFBRTs7b0JBQ1gsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7d0JBQ1osS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQy9CLENBQUMsQ0FBQTtpQkFDRjtnQkFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFFekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyQjs7Ozs7UUFFTSxvQ0FBTzs7OztzQkFBQyxLQUFtQjtnQkFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsR0FBQyxFQUFFLENBQUM7Z0JBQ3pFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLEdBQUMsRUFBRSxDQUFDO2dCQUNuRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxHQUFDLEVBQUUsQ0FBQztnQkFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQ3BGLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxHQUFDLGFBQWEsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUMsYUFBYSxDQUFDO2dCQUM1RCxVQUFVLENBQUM7b0JBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2lCQUMxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsT0FBTyxLQUFLLENBQUM7Ozs7OztRQUdkLGtDQUFLOzs7O1lBQUwsVUFBTSxLQUFLO2dCQUNWLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Z0JBQ3ZCLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBRXpCLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtvQkFDaEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztpQkFDckI7YUFDRDs7OztRQUNELHlDQUFZOzs7WUFBWjtnQkFDQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO29CQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztpQkFDL0Q7YUFDRDs7Ozs7UUFDRCxvQ0FBTzs7OztZQUFQLFVBQVEsS0FBSztnQkFDWixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUNqRTs7Ozs7O1FBQ0QsdUNBQVU7Ozs7O1lBQVYsVUFBVyxNQUFVLEVBQUUsTUFBTTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBRS9DLE9BQU8sS0FBSyxDQUFDO2FBQ2I7Ozs7O1FBQ0QsMENBQWE7Ozs7WUFBYixVQUFjLE1BQVU7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQy9DLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUM7O29CQUN2QixJQUFJLEVBQUUsR0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztvQkFDckQsSUFBSSxFQUFFLEdBQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7O29CQUNsRCxJQUFJLEVBQUUsR0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDbEQsSUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFDO3dCQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQUEsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUUsU0FBUyxDQUFDO3FCQUFDO3lCQUMzRjt3QkFDTCxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7d0JBQ3RCLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLFNBQVMsQ0FBQTtxQkFDeEI7b0JBQ0QsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLEdBQUMsT0FBTyxDQUFDO2lCQUNyRjtnQkFDRCxPQUFPLEtBQUssQ0FBQzthQUNiOzs7OztRQUNELDBDQUFhOzs7O1lBQWIsVUFBYyxNQUFVO2dCQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUMvQyxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFDOztvQkFDdkIsSUFBSSxFQUFFLEdBQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7b0JBQ3JELElBQUksRUFBRSxHQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNsRCxJQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUM7d0JBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFBQztvQkFDakUsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLEdBQUMsT0FBTyxDQUFDO2lCQUNyRjtnQkFDRCxPQUFPLEtBQUssQ0FBQzthQUNiOzs7OztRQUNELHFDQUFROzs7O1lBQVIsVUFBUyxNQUFXO2dCQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLElBQUksQ0FBQzthQUNaOzs7OztRQUNELHFDQUFROzs7O1lBQVIsVUFBUyxNQUFVO2dCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUN6QyxPQUFPLEtBQUssQ0FBQzthQUNiOzs7OztRQUVELHdDQUFXOzs7O1lBQVgsVUFBWSxLQUFnQjtnQkFDM0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO2FBQ25EOzs7OztRQUNELHdDQUFXOzs7O1lBQVgsVUFBWSxLQUFnQjthQUMzQjs7Ozs7UUFDRCxtQ0FBTTs7OztZQUFOLFVBQU8sS0FBZ0I7Z0JBQ3RCLElBQUcsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7b0JBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDekYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN4RjthQUNEOzs7OztRQUNELHNDQUFTOzs7O1lBQVQsVUFBVSxLQUFnQjtnQkFDekIsSUFBRyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtvQkFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFFLElBQUksQ0FBQyxDQUFDO29CQUN6RixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3hGO2FBQ0Q7Ozs7O1FBRUQsMENBQWE7Ozs7WUFBYixVQUFjLEtBQWdCO2dCQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2FBQzdCOzs7OztRQUNELDBDQUFhOzs7O1lBQWIsVUFBYyxLQUFnQjthQUM3Qjs7Ozs7UUFDRCw2Q0FBZ0I7Ozs7WUFBaEIsVUFBaUIsS0FBZ0I7Z0JBQ2hDLElBQUcsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7O29CQUNyRCxJQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUM7O29CQUNoRCxJQUFNLEtBQUssR0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQzs7b0JBQ3hELElBQU0sTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDOztvQkFDdkQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7O29CQUNoRCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7b0JBQ2hELElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztvQkFDOUMsSUFBSSxHQUFHLEdBQUUsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDOztvQkFDM0MsSUFBSSxHQUFHLEdBQUUsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDOztvQkFDM0MsSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUUsQ0FBQyxDQUFDO29CQUU5QixJQUFHLEtBQUssR0FBQyxHQUFHLElBQUksTUFBTSxHQUFDLEVBQUUsRUFBQzt3QkFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ25FLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNwRDtpQkFDRDthQUNEOzs7OztRQUNELHdDQUFXOzs7O1lBQVgsVUFBWSxLQUFnQjtnQkFDM0IsSUFBRyxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTs7b0JBQ3JELElBQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUUsQ0FBQzs7b0JBQ2hELElBQU0sS0FBSyxHQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDOztvQkFDeEQsSUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7b0JBRXZELElBQUcsS0FBSyxHQUFDLEdBQUcsSUFBSSxNQUFNLEdBQUMsRUFBRSxFQUFDOzt3QkFDekIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7O3dCQUNoRCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7d0JBQ2hELElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDOzt3QkFDOUMsSUFBSSxHQUFHLEdBQUUsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDOzt3QkFDM0MsSUFBSSxHQUFHLEdBQUUsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDOzt3QkFDM0MsSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUUsQ0FBQyxDQUFDO3dCQUU5QixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEdBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2pFLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sR0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3BEO2lCQUNEO2FBQ0Q7O29CQXBQREEsY0FBUyxTQUFDO3dCQUNQLFFBQVEsRUFBQyxZQUFZO3dCQUNyQiwycUhBQTBDOztxQkFFN0M7Ozs7O3dCQVhBQyxlQUFVO3dCQVJWQyw2QkFBd0I7d0JBR3hCQyxhQUFROzs7OzhCQXNCUEMsY0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFDLElBQUksRUFBRUMscUJBQWdCLEVBQUM7a0NBRzdDRCxjQUFTLFNBQUMsYUFBYSxFQUFFLEVBQUMsSUFBSSxFQUFFQyxxQkFBZ0IsRUFBQzs4QkFHakRELGNBQVMsU0FBQyxTQUFTLEVBQUUsRUFBQyxJQUFJLEVBQUVDLHFCQUFnQixFQUFDO2lDQUc3Q0QsY0FBUyxTQUFDLFlBQVksRUFBRSxFQUFDLElBQUksRUFBRUMscUJBQWdCLEVBQUM7K0JBR2hEQyxpQkFBWSxTQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7aUNBM0MxQzs7Ozs7OztBQ0NBOztRQW9CRSwwQkFDWSwwQkFDQSxRQUNBO1lBRkEsNkJBQXdCLEdBQXhCLHdCQUF3QjtZQUN4QixXQUFNLEdBQU4sTUFBTTtZQUNOLGFBQVEsR0FBUixRQUFRO2dDQVJHLEVBQUU7MEJBRVQsRUFBRTtTQU9iOzs7O1FBRUUsbURBQXdCOzs7OztnQkFDL0IsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLHdCQUF3QjtxQkFDdkMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUM7cUJBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXhCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFckMsSUFBSSxDQUFDLE9BQU8scUJBQUcsRUFBQyxHQUFHLENBQUMsUUFBZ0M7cUJBQ2xELFNBQVMsQ0FBQyxDQUFDLENBQWdCLENBQUEsQ0FBQztnQkFFOUIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUV4QyxPQUFPLEdBQUcsQ0FBQzs7Ozs7OztRQUdaLG1DQUFROzs7OztZQUFSLFVBQVMsRUFBRSxFQUFFLE1BQVc7O2dCQUN2QixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUVsQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFFZCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRTdCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdkI7Ozs7O1FBQ0Qsc0NBQVc7Ozs7WUFBWCxVQUFZLEVBQUU7Z0JBQWQsaUJBT0M7O2dCQU5BLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUU1QyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUMsR0FBRztvQkFDWixFQUFxQixLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsR0FBRSxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztpQkFDOUUsQ0FBQyxDQUFDO2dCQUNILEVBQXFCLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxHQUFFLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQzVFOzs7Ozs7OztRQUVELHFDQUFVOzs7Ozs7O1lBQVYsVUFBVyxTQUFjLEVBQUUsRUFBVSxFQUFFLElBQVUsRUFBRSxNQUF5Qjs7Z0JBQzNFLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDOztnQkFDNUMsSUFBTSxRQUFRLEtBQXdCLEdBQUcsQ0FBQyxRQUFRLEVBQUMsQ0FBQzs7Z0JBQ3BELElBQU0sV0FBVyxHQUFrQjtvQkFDbEMsS0FBSyxFQUFFLElBQUk7b0JBQ1gsUUFBUSxFQUFFLElBQUk7b0JBQ2QsUUFBUSxFQUFFLElBQUk7b0JBQ2QsU0FBUyxFQUFDLElBQUk7b0JBQ2QsTUFBTSxFQUFFLElBQUk7b0JBQ1osTUFBTSxFQUFFLElBQUk7b0JBQ1osUUFBUSxFQUFDLElBQUk7b0JBQ2IsT0FBTyxFQUFDLElBQUk7b0JBQ1osVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRSxJQUFJO2lCQUNkLENBQUM7Z0JBQ0YsSUFBSSxNQUFNLEVBQUU7O29CQUNYLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHO3dCQUNaLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQy9CLENBQUMsQ0FBQTtpQkFDRjtnQkFDRCxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRW5ELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSUMsWUFBTyxFQUFPLENBQUM7Z0JBRWpELFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUVqQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ25DOzs7Ozs7OztRQUVELG9DQUFTOzs7Ozs7O1lBQVQsVUFBVSxTQUFjLEVBQUUsRUFBVSxFQUFFLElBQVUsRUFBRSxNQUF5Qjs7Z0JBQzFFLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDOztnQkFDNUMsSUFBTSxRQUFRLEtBQXdCLEdBQUcsQ0FBQyxRQUFRLEVBQUMsQ0FBQzs7Z0JBQ3BELElBQU0sV0FBVyxHQUFrQjtvQkFDbEMsT0FBTyxFQUFFLElBQUk7b0JBQ2IsS0FBSyxFQUFFLElBQUk7b0JBQ1gsY0FBYyxFQUFFLElBQUk7b0JBQ3BCLE1BQU0sRUFBRSxJQUFJO29CQUNaLE1BQU0sRUFBRSxJQUFJO29CQUNaLFFBQVEsRUFBRSxJQUFJO2lCQUNkLENBQUM7Z0JBRUYsSUFBSSxNQUFNLEVBQUU7O29CQUNYLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHO3dCQUNaLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQy9CLENBQUMsQ0FBQTtpQkFDRjtnQkFDRCxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRW5ELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSUEsWUFBTyxFQUFPLENBQUM7Z0JBRWpELFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUVqQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ25DOzs7Ozs7OztRQUVELHFDQUFVOzs7Ozs7O1lBQVYsVUFBVyxTQUFjLEVBQUUsRUFBVSxFQUFFLElBQVUsRUFBRSxNQUF5Qjs7Z0JBQzNFLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDOztnQkFDNUMsSUFBTSxRQUFRLEtBQXdCLEdBQUcsQ0FBQyxRQUFRLEVBQUMsQ0FBQzs7Z0JBQ3BELElBQU0sV0FBVyxHQUFrQjtvQkFDbEMsT0FBTyxFQUFFLElBQUk7b0JBQ2IsS0FBSyxFQUFFLElBQUk7b0JBQ1gsY0FBYyxFQUFFLElBQUk7b0JBQ3BCLE1BQU0sRUFBRSxJQUFJO29CQUNaLE1BQU0sRUFBRSxJQUFJO29CQUNaLFFBQVEsRUFBRSxJQUFJO2lCQUNkLENBQUM7Z0JBQ0YsSUFBSSxNQUFNLEVBQUU7O29CQUNYLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHO3dCQUNaLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQy9CLENBQUMsQ0FBQTtpQkFDRjtnQkFDRCxXQUFXLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRW5ELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSUEsWUFBTyxFQUFPLENBQUM7Z0JBRWpELFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUVqQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ25DOzs7Ozs7UUFFRCxrQ0FBTzs7Ozs7WUFBUCxVQUFRLEVBQUUsRUFBRSxJQUFROztnQkFDbkIsSUFBTSxJQUFJLEdBQUc7b0JBQ1osRUFBRSxFQUFFLEVBQUU7b0JBQ04sU0FBUyxFQUFFLElBQUk7aUJBQ2YsQ0FBQztnQkFDRixJQUFJLElBQUksRUFBRTs7b0JBQ1QsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7d0JBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDdEIsQ0FBQyxDQUFBO2lCQUNGO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3hCOzs7Ozs7UUFDRCxpQ0FBTTs7Ozs7WUFBTixVQUFPLEVBQUUsRUFBRSxJQUFROztnQkFDbEIsSUFBTSxJQUFJLEdBQUc7b0JBQ1osRUFBRSxFQUFFLEVBQUU7b0JBQ04sU0FBUyxFQUFFLElBQUk7aUJBQ2YsQ0FBQztnQkFDRixJQUFJLElBQUksRUFBRTs7b0JBQ1QsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7d0JBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDdEIsQ0FBQyxDQUFBO2lCQUNGO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUNoRDs7b0JBbEtEQyxlQUFVOzs7Ozt3QkFWUE4sNkJBQXdCO3dCQUV4Qk8sbUJBQWM7d0JBSGRDLGFBQVE7OzsrQkFIWjs7Ozs7OztBQ0FBOzs7O29CQU9DQyxhQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFOzRCQUNQQyxtQkFBWTs0QkFDWkMsMEJBQWM7eUJBQ2Y7d0JBQ0QsWUFBWSxFQUFFOzRCQUNaLGtCQUFrQjt5QkFDbkI7d0JBQ0QsT0FBTyxFQUFFOzRCQUNQLGtCQUFrQjt5QkFDbkI7d0JBQ0QsZUFBZSxFQUFFOzRCQUNmLGtCQUFrQjt5QkFDbkI7d0JBQ0QsU0FBUyxFQUFFOzRCQUNULGdCQUFnQjt5QkFDakI7d0JBQ0QsT0FBTyxFQUFFLENBQUNDLDJCQUFzQixDQUFDO3FCQUNsQzs7OEJBekJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9