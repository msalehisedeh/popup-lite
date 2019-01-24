(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common'), require('@sedeh/drag-enabled')) :
    typeof define === 'function' && define.amd ? define('@sedeh/popup-lite', ['exports', '@angular/core', 'rxjs', '@angular/common', '@sedeh/drag-enabled'], factory) :
    (factory((global.sedeh = global.sedeh || {}, global.sedeh['popup-lite'] = {}),global.ng.core,global.rxjs,global.ng.common,global['drag-enabled']));
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VkZWgtcG9wdXAtbGl0ZS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BzZWRlaC9wb3B1cC1saXRlL3NyYy9hcHAvcG9wdXAtbGl0ZS9jb21wb25lbnRzL3BvcHVwLWxpdGUuY29tcG9uZW50LnRzIiwibmc6Ly9Ac2VkZWgvcG9wdXAtbGl0ZS9zcmMvYXBwL3BvcHVwLWxpdGUvaW5qZWN0YWJsZXMvcG9wdXAtbGl0ZS5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2VkZWgvcG9wdXAtbGl0ZS9zcmMvYXBwL3BvcHVwLWxpdGUvcG9wdXAtbGl0ZS5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1xuXHRDb21wb25lbnQsXG5cdENvbXBvbmVudEZhY3RvcnksIFxuXHRSZWZsZWN0aXZlSW5qZWN0b3IsXG5cdFZpZXdDb250YWluZXJSZWYsXG5cdENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcblx0SW5wdXQsXG5cdE91dHB1dCxcblx0UmVuZGVyZXIsXG5cdEhvc3RMaXN0ZW5lcixcblx0RXZlbnRFbWl0dGVyLFxuXHRJbmplY3RhYmxlLFxuXHRWaWV3Q2hpbGQsXG5cdEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IERyYWdFdmVudCB9IGZyb20gJ0BzZWRlaC9kcmFnLWVuYWJsZWQnO1xuXG5pbXBvcnQgeyBQb3B1cExpdGVTZXJ2aWNlIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvcG9wdXAtbGl0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBvcHVwTGl0ZUNvbnRlbnRDb21wb25lbnQsIFdpbmRvd0xpdGVTZWxlY3Rpb24sIFBvcHVwTGl0ZU9wdGlvbnMsIFdpbmRvd09wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3BvcHVwLWxpdGUuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6J3BvcHVwLWxpdGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wb3B1cC1saXRlLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vcG9wdXAtbGl0ZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBvcHVwTGl0ZUNvbXBvbmVudCB7XG5cdHByaXZhdGUgZWw6SFRNTEVsZW1lbnQ7XG5cdHByaXZhdGUgZXh0cmFjbGFzc2VzID0gXCJcIjtcblx0cHJpdmF0ZSBzZWxlY3RvcjogV2luZG93TGl0ZVNlbGVjdGlvbjtcblxuXHRAVmlld0NoaWxkKFwiY29udGVudFwiLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIFxuXHRjb250ZW50OiBWaWV3Q29udGFpbmVyUmVmO1xuXG5cdEBWaWV3Q2hpbGQoXCJtb2RhbFdvbmRvd1wiLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIFxuXHRtb2RhbFdvbmRvdzogVmlld0NvbnRhaW5lclJlZjtcblx0XG5cdEBWaWV3Q2hpbGQoXCJyZXNpemVyXCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgXG5cdHJlc2l6ZXI6IFZpZXdDb250YWluZXJSZWY7XG5cdFxuXHRAVmlld0NoaWxkKFwiZHJhZ0hlYWRlclwiLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIFxuXHRkcmFnSGVhZGVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXHRcblx0QEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG5cdG9uUmVzaXplKGV2ZW50OmFueSkge1xuXHRcdGlmKHRoaXMuY29uZmlnLmNlbnRlcmVkICYmICF0aGlzLmNvbmZpZy5waW5uZWQpe1xuXHRcdFx0bGV0IG5lID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtbGl0ZScpO1xuXHRcdFx0bGV0IHJvb3Q6IEhUTUxFbGVtZW50ID0gdGhpcy5lbC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUobmUsICdsZWZ0JywgKChyb290LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoLW5lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKS8yKSArIFwicHhcIik7XG5cdFx0fVxuXHR9XG5cblx0Y29uZmlnOiBXaW5kb3dPcHRpb25zID17XG5cdFx0aWQ6JycsXG5cdFx0Y2xvc2U6IGZhbHNlLFxuXHRcdG92ZXJsYXk6IGZhbHNlLFxuXHRcdGNsb3NlT25PdmVybGF5OiBmYWxzZSxcblx0XHRtaW5pbWl6ZTogZmFsc2UsXG5cdFx0bWF4aW1pemU6IGZhbHNlLFxuXHRcdGRyYWdhYmxlOmZhbHNlLFxuXHRcdHJlc2l6YWJsZTpmYWxzZSxcblx0XHRjZW50ZXJlZDogZmFsc2UsXG5cdFx0Zml4ZWQ6IGZhbHNlLFxuXHRcdHBpbmFibGU6ZmFsc2UsXG5cblx0XHRoZWlnaHQ6JycsXG5cdFx0d2lkdGg6JycsXG5cdFx0bWF4Qm9keUhlaWdodDonJyxcblx0XHRtaW5Cb2R5SGVpZ2h0OicnLFxuXHRcdG1pbldpZHRoOicnLFxuXHRcdG1heFdpZHRoOicnLFxuXHRcdGFkanVzdEhlaWdodDpmYWxzZSxcblx0XHRpc09wZW46IGZhbHNlLFxuXHRcdGlzT3BlbmluZzpmYWxzZSxcblx0XHRtaW5pbWl6ZWQ6ZmFsc2UsXG5cdFx0bWF4aW1pemVkOmZhbHNlLFxuXHRcdHBpbm5lZDpmYWxzZSxcblx0XHR6SW5kZXg6MTAwLFxuXHRcdHRvcDogJydcblx0fVxuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdGVsOiBFbGVtZW50UmVmLCBcblx0XHRwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuXHRcdHByaXZhdGUgcmVuZGVyZXI6UmVuZGVyZXIpIHtcblx0XHR0aGlzLmVsID0gZWwubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cblx0cHJpdmF0ZSBjYWxjTWF4SGVpZ2h0KG5vZGU6YW55LCB0YXJnZXQ6c3RyaW5nKXtcblx0XHRsZXQgbGlzdCA9IG5vZGUuY2hpbGROb2Rlcztcblx0XHRsZXQgbWF4ID0gMDtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdCAgIGlmKGxpc3RbaV0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKT09PXRhcmdldCl7XG5cdFx0XHQgICBsaXN0ID0gbGlzdFtpXS5jaGlsZE5vZGVzO1xuXHRcdFx0ICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdCAgIGlmKGxpc3RbaV0ubm9kZVR5cGU9PT0xKXtcblx0XHRcdFx0XHQgICBtYXggKz0gKGxpc3RbaV0uY2xpZW50SGVpZ2h0K2xpc3RbaV0ub2Zmc2V0SGVpZ2h0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0ICAgfVxuICAgICAgICB9XG4gICAgXHRyZXR1cm4gbWF4O1xuXHR9XG5cblx0aW5pdChjb21wb25lbnQsIGRhdGEsIGNvbmZpZzogUG9wdXBMaXRlT3B0aW9ucywgc2VsZWN0b3I6IFdpbmRvd0xpdGVTZWxlY3Rpb24pIHtcblx0XHRjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcblx0XHRjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmNvbnRlbnQuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXHRcdGNvbnN0IGluc3RhbmNlID0gKDxQb3B1cExpdGVDb250ZW50Q29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XG5cdFx0aW5zdGFuY2UuZGF0YSA9IGRhdGE7XG5cdFx0aW5zdGFuY2UuaWQgPSBjb25maWcuaWQ7XG5cblx0XHRpZihpbnN0YW5jZS5wb3B1cFRpdGxlKSB7XG5cdFx0XHRjb25maWcucG9wdXBUaXRsZSA9IGluc3RhbmNlLnBvcHVwVGl0bGUuYmluZChpbnN0YW5jZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbmZpZy5wb3B1cFRpdGxlID0gKGlkKSA9PiBpZDtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKGNvbmZpZykge1xuXHRcdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKGNvbmZpZyk7XG5cdFx0XHRsaXN0Lm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRcdHRoaXMuY29uZmlnW2tleV0gPSBjb25maWdba2V5XTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcblxuXHRcdHRoaXMuZGlzcGxheShjb25maWcpO1xuXHR9XG5cdFx0XG5cdHB1YmxpYyBkaXNwbGF5KHByb3BzOldpbmRvd09wdGlvbnMpe1xuXHRcdHRoaXMuY29uZmlnLm1heEJvZHlIZWlnaHQgPSBwcm9wcyAmJiBwcm9wcy5tYXhIZWlnaHQgPyBwcm9wcy5tYXhIZWlnaHQ6Jyc7XG5cdFx0IHRoaXMuY29uZmlnLm1pbldpZHRoID0gcHJvcHMgJiYgcHJvcHMubWluV2lkdGggPyBwcm9wcy5taW5XaWR0aDonJztcblx0XHQgdGhpcy5jb25maWcubWF4V2lkdGggPSBwcm9wcyAmJiBwcm9wcy5tYXhXaWR0aCA/IHByb3BzLm1heFdpZHRoOicnO1xuXHRcdCB0aGlzLmNvbmZpZy50b3AgPSBwcm9wcyAmJiBwcm9wcy50b3AgPyBwcm9wcy50b3AgOiAnJztcblx0XHQgdGhpcy5jb25maWcuaXNPcGVuaW5nID0gdHJ1ZTtcblx0XHQgdGhpcy5jb25maWcuYWRqdXN0SGVpZ2h0ID0gcHJvcHMgJiYgcHJvcHMuYWRqdXN0SGVpZ2h0ID8gcHJvcHMuYWRqdXN0SGVpZ2h0IDogZmFsc2U7XG5cdFx0IHRoaXMuZXh0cmFjbGFzc2VzID0gdGhpcy5jb25maWcuaGVhZGVyID8gXCJcIjpcImhlYWRlci1vZmYgXCI7XG5cdFx0IHRoaXMuZXh0cmFjbGFzc2VzICs9IHRoaXMuY29uZmlnLmZvb3RlciA/IFwiXCI6XCJmb290ZXItb2ZmIFwiO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLm9uUmVzaXplKG51bGwpO1xuXHRcdFx0dGhpcy5jb25maWcuaXNPcGVuID0gdHJ1ZTtcblx0XHR9LmJpbmQodGhpcyksMTApO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGtleVVwKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XG5cblx0XHRpZiAoY29kZSA9PT0gMTMpIHtcblx0XHRcdGV2ZW50LnRhcmdldC5jbGljaygpO1xuXHRcdH1cdFx0XG5cdH1cblx0Y2xvc2VPdmVybGF5KCl7XG5cdFx0aWYgKHRoaXMuY29uZmlnLmNsb3NlT25PdmVybGF5KSB7XG5cdFx0dGhpcy5jbG9zZU1vZGFsKG51bGwsIHsgaWQ6IHRoaXMuY29uZmlnLmlkLCBjb25maXJtZWQ6IGZhbHNlIH0pO1xuXHRcdH1cblx0fVxuXHRvbkNsb3NlKGV2ZW50KSB7XG5cdFx0dGhpcy5jbG9zZU1vZGFsKGV2ZW50LCB7IGlkOiB0aGlzLmNvbmZpZy5pZCwgY29uZmlybWVkOiBmYWxzZSB9KTtcblx0fVxuXHRjbG9zZU1vZGFsKCRldmVudDphbnksIHJlc3VsdCl7XG5cdFx0dGhpcy5jb25maWcuaXNPcGVuaW5nID0gZmFsc2U7XG5cdFx0dGhpcy5jb25maWcub3ZlcmxheSA9IGZhbHNlO1xuXHRcdHRoaXMuY29uZmlnLmlzT3BlbiA9IGZhbHNlO1xuXHRcdHRoaXMuc2VsZWN0b3IucG9wZWRPdXQodGhpcy5jb25maWcuaWQsIHJlc3VsdCk7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0bWluaW1pemVNb2RhbCgkZXZlbnQ6YW55KXtcblx0XHR0aGlzLmNvbmZpZy5taW5pbWl6ZWQgPSAhdGhpcy5jb25maWcubWluaW1pemVkO1xuXHRcdGlmKHRoaXMuY29uZmlnLnJlc2l6YWJsZSl7XG5cdFx0ICBsZXQgbmU6YW55ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcucmVzaXplLWNvcm5lcicpO1xuXHRcdCAgbGV0IHduOmFueSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLnBvcHVwLWxpdGUnKTtcblx0XHQgIGxldCBiZDphbnkgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1ib2R5Jyk7XG5cdFx0ICBpZighdGhpcy5jb25maWcubWluaW1pemVkKXtiZC5zdHlsZS5oZWlnaHQ9YmQuZ2V0QXR0cmlidXRlKFwib2hcIik7YmQuc3R5bGUubWF4SGVpZ2h0PSBcImluaGVyaXRcIjt9XG5cdFx0ICBlbHNlIHtcblx0XHQgIGJkLnN0eWxlLmhlaWdodCA9IFwiMFwiO1xuXHRcdCAgd24uc3R5bGUuaGVpZ2h0PVwiaW5oZXJpdFwiXG5cdFx0ICB9XG5cdFx0ICBuZS5zdHlsZS5kaXNwbGF5PSAodGhpcy5jb25maWcubWluaW1pemVkIHx8IHRoaXMuY29uZmlnLm1heGltaXplZCkgPyAnbm9uZSc6J2Jsb2NrJztcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdG1heGltaXplTW9kYWwoJGV2ZW50OmFueSl7XG5cdFx0dGhpcy5jb25maWcubWF4aW1pemVkID0gIXRoaXMuY29uZmlnLm1heGltaXplZDtcblx0XHRpZih0aGlzLmNvbmZpZy5yZXNpemFibGUpe1xuXHRcdCAgbGV0IG5lOmFueSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLnJlc2l6ZS1jb3JuZXInKTtcblx0XHQgIGxldCBiZDphbnkgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1ib2R5Jyk7XG5cdFx0ICBpZihiZC5nZXRBdHRyaWJ1dGUoXCJvaFwiKSl7YmQuc3R5bGUuaGVpZ2h0PWJkLmdldEF0dHJpYnV0ZShcIm9oXCIpO31cblx0XHQgIG5lLnN0eWxlLmRpc3BsYXk9ICh0aGlzLmNvbmZpZy5taW5pbWl6ZWQgfHwgdGhpcy5jb25maWcubWF4aW1pemVkKSA/ICdub25lJzonYmxvY2snO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0c2VsZWN0ZWQoJGV2ZW50OiBhbnkpe1xuXHRcdHRoaXMuc2VsZWN0b3Iuc2V0U2VsZWN0ZWQodGhpcy5jb25maWcuaWQpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHBpbk1vZGFsKCRldmVudDphbnkpe1xuXHRcdHRoaXMuY29uZmlnLnBpbm5lZCA9ICF0aGlzLmNvbmZpZy5waW5uZWQ7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0ZHJhZ0VuYWJsZWQoZXZlbnQ6IERyYWdFdmVudCkge1xuXHRcdHJldHVybiB0aGlzLmNvbmZpZy5kcmFnYWJsZSAmJiAhdGhpcy5jb25maWcucGlubmVkO1xuXHR9XG5cdG9uRHJhZ1N0YXJ0KGV2ZW50OiBEcmFnRXZlbnQpe1xuXHR9XG5cdG9uRHJhZyhldmVudDogRHJhZ0V2ZW50KXtcblx0XHRpZihldmVudC5ub2RlID09PSB0aGlzLmRyYWdIZWFkZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICdsZWZ0JywgKGV2ZW50LmNsaWVudFgtZXZlbnQub2Zmc2V0LngpK1wicHhcIik7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICd0b3AnLCAoZXZlbnQuY2xpZW50WS1ldmVudC5vZmZzZXQueSkrXCJweFwiKTtcblx0XHR9XG5cdH1cblx0b25EcmFnRW5kKGV2ZW50OiBEcmFnRXZlbnQpe1xuXHRcdGlmKGV2ZW50Lm5vZGUgPT09IHRoaXMuZHJhZ0hlYWRlci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ2xlZnQnLCAoZXZlbnQuY2xpZW50WC1ldmVudC5vZmZzZXQueCkrXCJweFwiKTtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ3RvcCcsIChldmVudC5jbGllbnRZLWV2ZW50Lm9mZnNldC55KStcInB4XCIpO1xuXHRcdH1cblx0fVxuXG5cdHJlc2l6ZUVuYWJsZWQoZXZlbnQ6IERyYWdFdmVudCkge1xuXHRcdHJldHVybiB0aGlzLmNvbmZpZy5yZXNpemFibGU7XG5cdH1cblx0b25SZXNpemVTdGFydChldmVudDogRHJhZ0V2ZW50KXtcblx0fVxuXHRvblJlc2l6ZVByb2dyZXNzKGV2ZW50OiBEcmFnRXZlbnQpe1xuXHRcdGlmKGV2ZW50Lm5vZGUgPT09IHRoaXMucmVzaXplci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdGNvbnN0IHdyID0gZXZlbnQubWVkaXVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0Y29uc3Qgd2lkdGggPSAgKGV2ZW50LmNsaWVudFgtZXZlbnQub2Zmc2V0LngpIC0gd3IubGVmdDtcblx0XHRcdGNvbnN0IGhlaWdodCA9IChldmVudC5jbGllbnRZLWV2ZW50Lm9mZnNldC55KSAtIHdyLnRvcDtcblx0XHRcdGxldCBoZCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWhlYWRlcicpO1xuXHRcdFx0bGV0IGZ0ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtZm9vdGVyJyk7XG5cdFx0XHRsZXQgYmQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1ib2R5Jyk7XG5cdFx0XHRsZXQgZnRoPSBmdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHRsZXQgaGRoPSBoZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHRsZXQgaCA9IGhlaWdodCAtIGhkaCAtIGZ0aCAtMjtcblxuXHRcdFx0aWYod2lkdGg+MjAwICYmIGhlaWdodD42MCl7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ3dpZHRoJywgd2lkdGgrXCJweFwiKTtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnaGVpZ2h0JywgaGVpZ2h0K1wicHhcIik7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGJkLCAnaGVpZ2h0JywgaCtcInB4XCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRvblJlc2l6ZUVuZChldmVudDogRHJhZ0V2ZW50KXtcblx0XHRpZihldmVudC5ub2RlID09PSB0aGlzLnJlc2l6ZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHRjb25zdCB3ciA9IGV2ZW50Lm1lZGl1bS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGNvbnN0IHdpZHRoID0gIChldmVudC5jbGllbnRYLWV2ZW50Lm9mZnNldC54KSAtIHdyLmxlZnQ7XG5cdFx0XHRjb25zdCBoZWlnaHQgPSAoZXZlbnQuY2xpZW50WS1ldmVudC5vZmZzZXQueSkgLSB3ci50b3A7XG5cblx0XHRcdGlmKHdpZHRoPjIwMCAmJiBoZWlnaHQ+NjApe1xuXHRcdFx0XHRsZXQgaGQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1oZWFkZXInKTtcblx0XHRcdFx0bGV0IGZ0ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtZm9vdGVyJyk7XG5cdFx0XHRcdGxldCBiZCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHRcdFx0bGV0IGZ0aD0gZnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXHRcdFx0XHRsZXQgaGRoPSBoZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHRcdGxldCBoID0gaGVpZ2h0IC0gaGRoIC0gZnRoIC0yO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICd3aWR0aCcsIHdpZHRoK1wicHhcIik7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ2hlaWdodCcsIGhlaWdodCtcInB4XCIpO1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShiZCwgJ2hlaWdodCcsIGgrXCJweFwiKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsIlxuaW1wb3J0IHtcbiAgICBJbmplY3RhYmxlLFxuICAgIEluamVjdG9yLFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBFbWJlZGRlZFZpZXdSZWYsXG4gICAgQXBwbGljYXRpb25SZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBQb3B1cExpdGVDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3BvcHVwLWxpdGUuY29tcG9uZW50JztcbmltcG9ydCB7IFBvcHVwTGl0ZU9wdGlvbnMsIFdpbmRvd09wdGlvbnMsIFdpbmRvd0xpdGVTZWxlY3Rpb24sIFdpbmRvd0xpdGVTZXJ2aWNlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9wb3B1cC1saXRlLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb3B1cExpdGVTZXJ2aWNlIGltcGxlbWVudHMgV2luZG93TGl0ZVNlcnZpY2UsIFdpbmRvd0xpdGVTZWxlY3Rpb24ge1xuXHRwcml2YXRlICBjb21wb25lbnRSZWYgPSB7fTtcblx0cHJpdmF0ZSAgZG9tRWxlbTtcblx0cHJpdmF0ZSBzdGF0dXMgPSBbXTtcblx0Ly8gcHJpdmF0ZSB3aW5kb3dzTGlzdDogUG9wdXBMaXRlQ29tcG9uZW50W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxuICApIHsgfVxuXG5cdHByaXZhdGUgY3JlYXRlUG9wdXBMaXRlQ29tcG9uZW50KCkge1xuXHRcdGNvbnN0IHJlZiA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG5cdFx0XHQucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoUG9wdXBMaXRlQ29tcG9uZW50KVxuXHRcdFx0LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcblxuXHRcdHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcocmVmLmhvc3RWaWV3KTtcblxuXHRcdHRoaXMuZG9tRWxlbSA9IChyZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pXG5cdFx0XHQucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmRvbUVsZW0pO1xuXG5cdFx0cmV0dXJuIHJlZjtcblx0fVxuICBcblx0cG9wZWRPdXQoaWQsIHJlc3VsdDogYW55KSB7XG5cdFx0Y29uc3QgcmVmID0gdGhpcy5jb21wb25lbnRSZWZbaWRdO1xuXHRcdFxuXHRcdHRoaXMuYXBwUmVmLmRldGFjaFZpZXcocmVmLmhvc3RWaWV3KTtcblx0XHRyZWYuZGVzdHJveSgpO1xuXG5cdFx0ZGVsZXRlIHRoaXMuY29tcG9uZW50UmVmW2lkXTtcblxuXHRcdHRoaXMuc3RhdHVzW2lkXS5uZXh0KHJlc3VsdCk7XG5cdFx0ZGVsZXRlIHRoaXMuc3RhdHVzW2lkXTtcblx0fVxuXHRzZXRTZWxlY3RlZChpZCl7XG5cdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50UmVmKTtcblxuXHRcdGxpc3QubWFwKChyZWYpPT4ge1xuXHRcdFx0KDxQb3B1cExpdGVDb21wb25lbnQ+dGhpcy5jb21wb25lbnRSZWZbcmVmXS5pbnN0YW5jZSkuY29uZmlnLnNlbGVjdGVkID0gZmFsc2U7XG5cdFx0fSk7XG5cdFx0KDxQb3B1cExpdGVDb21wb25lbnQ+dGhpcy5jb21wb25lbnRSZWZbaWRdLmluc3RhbmNlKS5jb25maWcuc2VsZWN0ZWQgPSB0cnVlO1xuXHR9XG5cblx0b3BlbldpbmRvdyhjb21wb25lbnQ6IGFueSwgaWQ6IHN0cmluZywgZGF0YT86IGFueSwgY29uZmlnPzogUG9wdXBMaXRlT3B0aW9ucyk6IE9ic2VydmFibGU8YW55Pntcblx0XHRjb25zdCByZWYgPSB0aGlzLmNyZWF0ZVBvcHVwTGl0ZUNvbXBvbmVudCgpO1xuXHRcdGNvbnN0IGluc3RhbmNlID0gKDxQb3B1cExpdGVDb21wb25lbnQ+cmVmLmluc3RhbmNlKTtcblx0XHRjb25zdCBsb2NhbENvbmZpZzogV2luZG93T3B0aW9ucyA9IHtcblx0XHRcdGNsb3NlOiB0cnVlLFxuXHRcdFx0bWluaW1pemU6IHRydWUsXG5cdFx0XHRtYXhpbWl6ZTogdHJ1ZSxcblx0XHRcdHJlc2l6YWJsZTp0cnVlLFxuXHRcdFx0aGVhZGVyOiB0cnVlLFxuXHRcdFx0Zm9vdGVyOiB0cnVlLFxuXHRcdFx0ZHJhZ2FibGU6dHJ1ZSxcblx0XHRcdHBpbmFibGU6dHJ1ZSxcblx0XHRcdGlkT25IZWFkZXI6IHRydWUsXG5cdFx0XHRjZW50ZXJlZDogdHJ1ZVxuXHRcdH07XG5cdFx0aWYgKGNvbmZpZykge1xuXHRcdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKGNvbmZpZyk7XG5cdFx0XHRsaXN0Lm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRcdGxvY2FsQ29uZmlnW2tleV0gPSBjb25maWdba2V5XTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGxvY2FsQ29uZmlnLmlkID0gaWQgPyBpZCA6ICcnK25ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG5cdFx0dGhpcy5jb21wb25lbnRSZWZbbG9jYWxDb25maWcuaWRdID0gcmVmO1xuXHRcdHRoaXMuc3RhdHVzW2xvY2FsQ29uZmlnLmlkXSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuXHRcdGluc3RhbmNlLmluaXQoY29tcG9uZW50LCBkYXRhLCBsb2NhbENvbmZpZywgdGhpcyk7XG5cdFx0dGhpcy5zZXRTZWxlY3RlZChsb2NhbENvbmZpZy5pZCk7XG5cblx0XHRyZXR1cm4gdGhpcy5zdGF0dXNbbG9jYWxDb25maWcuaWRdO1xuXHR9XG5cblx0b3Blbk1vZGFsKGNvbXBvbmVudDogYW55LCBpZDogc3RyaW5nLCBkYXRhPzogYW55LCBjb25maWc/OiBQb3B1cExpdGVPcHRpb25zKTogT2JzZXJ2YWJsZTxhbnk+e1xuXHRcdGNvbnN0IHJlZiA9IHRoaXMuY3JlYXRlUG9wdXBMaXRlQ29tcG9uZW50KCk7XG5cdFx0Y29uc3QgaW5zdGFuY2UgPSAoPFBvcHVwTGl0ZUNvbXBvbmVudD5yZWYuaW5zdGFuY2UpO1xuXHRcdGNvbnN0IGxvY2FsQ29uZmlnOiBXaW5kb3dPcHRpb25zID0ge1xuXHRcdFx0b3ZlcmxheTogdHJ1ZSxcblx0XHRcdGNsb3NlOiB0cnVlLFxuXHRcdFx0Y2xvc2VPbk92ZXJsYXk6IHRydWUsXG5cdFx0XHRoZWFkZXI6IHRydWUsXG5cdFx0XHRmb290ZXI6IHRydWUsXG5cdFx0XHRjZW50ZXJlZDogdHJ1ZVxuXHRcdH07XG5cblx0XHRpZiAoY29uZmlnKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoY29uZmlnKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0bG9jYWxDb25maWdba2V5XSA9IGNvbmZpZ1trZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0bG9jYWxDb25maWcuaWQgPSBpZCA/IGlkIDogJycrbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cblx0XHR0aGlzLmNvbXBvbmVudFJlZltsb2NhbENvbmZpZy5pZF0gPSByZWY7XG5cdFx0dGhpcy5zdGF0dXNbbG9jYWxDb25maWcuaWRdID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG5cdFx0aW5zdGFuY2UuaW5pdChjb21wb25lbnQsIGRhdGEsIGxvY2FsQ29uZmlnLCB0aGlzKTtcblx0XHR0aGlzLnNldFNlbGVjdGVkKGxvY2FsQ29uZmlnLmlkKTtcblxuXHRcdHJldHVybiB0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF07XG5cdH1cblxuXHRvcGVuRGlhbG9nKGNvbXBvbmVudDogYW55LCBpZDogc3RyaW5nLCBkYXRhPzogYW55LCBjb25maWc/OiBQb3B1cExpdGVPcHRpb25zKTogT2JzZXJ2YWJsZTxhbnk+e1xuXHRcdGNvbnN0IHJlZiA9IHRoaXMuY3JlYXRlUG9wdXBMaXRlQ29tcG9uZW50KCk7XG5cdFx0Y29uc3QgaW5zdGFuY2UgPSAoPFBvcHVwTGl0ZUNvbXBvbmVudD5yZWYuaW5zdGFuY2UpO1xuXHRcdGNvbnN0IGxvY2FsQ29uZmlnOiBXaW5kb3dPcHRpb25zID0ge1xuXHRcdFx0b3ZlcmxheTogdHJ1ZSxcblx0XHRcdGNsb3NlOiB0cnVlLFxuXHRcdFx0Y2xvc2VPbk92ZXJsYXk6IHRydWUsXG5cdFx0XHRoZWFkZXI6IHRydWUsXG5cdFx0XHRmb290ZXI6IHRydWUsXG5cdFx0XHRjZW50ZXJlZDogdHJ1ZVxuXHRcdH07XG5cdFx0aWYgKGNvbmZpZykge1xuXHRcdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKGNvbmZpZyk7XG5cdFx0XHRsaXN0Lm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRcdGxvY2FsQ29uZmlnW2tleV0gPSBjb25maWdba2V5XTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGxvY2FsQ29uZmlnLmlkID0gaWQgPyBpZCA6ICcnK25ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG5cdFx0dGhpcy5jb21wb25lbnRSZWZbbG9jYWxDb25maWcuaWRdID0gcmVmO1xuXHRcdHRoaXMuc3RhdHVzW2xvY2FsQ29uZmlnLmlkXSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuXHRcdGluc3RhbmNlLmluaXQoY29tcG9uZW50LCBkYXRhLCBsb2NhbENvbmZpZywgdGhpcyk7XG5cdFx0dGhpcy5zZXRTZWxlY3RlZChsb2NhbENvbmZpZy5pZCk7XG5cblx0XHRyZXR1cm4gdGhpcy5zdGF0dXNbbG9jYWxDb25maWcuaWRdO1xuXHR9XG5cblx0Y29uZmlybShpZCwgZGF0YToge30pIHtcblx0XHRjb25zdCBpbmZvID0geyBcblx0XHRcdGlkOiBpZCwgXG5cdFx0XHRjb25maXJtZWQ6IHRydWUgXG5cdFx0fTtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKGRhdGEpO1xuXHRcdFx0bGlzdC5tYXAoKGtleSkgPT4ge1xuXHRcdFx0XHRpbmZvW2tleV0gPSBkYXRhW2tleV07XG5cdFx0XHR9KVxuXHRcdH1cblx0XHR0aGlzLnBvcGVkT3V0KGlkLCBpbmZvKTtcblx0fVxuXHRjYW5jZWwoaWQsIGRhdGE6IHt9KSB7XG5cdFx0Y29uc3QgaW5mbyA9IHsgXG5cdFx0XHRpZDogaWQsIFxuXHRcdFx0Y29uZmlybWVkOiB0cnVlIFxuXHRcdH07XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhkYXRhKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0aW5mb1trZXldID0gZGF0YVtrZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0dGhpcy5wb3BlZE91dChpZCwgeyBpZDogaWQsIGNvbmZpcm1lZDogZmFsc2UgfSk7XG5cdH1cblxufSIsImltcG9ydCB7IE5nTW9kdWxlLCBDVVNUT01fRUxFTUVOVFNfU0NIRU1BIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBQb3B1cExpdGVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvcG9wdXAtbGl0ZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQb3B1cExpdGVTZXJ2aWNlIH0gZnJvbSAnLi9pbmplY3RhYmxlcy9wb3B1cC1saXRlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9IGZyb20gJ0BzZWRlaC9kcmFnLWVuYWJsZWQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBEcmFnRHJvcE1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBQb3B1cExpdGVDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFBvcHVwTGl0ZUNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbXHJcbiAgICBQb3B1cExpdGVDb21wb25lbnRcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgUG9wdXBMaXRlU2VydmljZVxyXG4gIF0sXHJcbiAgc2NoZW1hczogW0NVU1RPTV9FTEVNRU5UU19TQ0hFTUFdXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgUG9wdXBMaXRlTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJFbGVtZW50UmVmIiwiQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIiwiUmVuZGVyZXIiLCJWaWV3Q2hpbGQiLCJWaWV3Q29udGFpbmVyUmVmIiwiSG9zdExpc3RlbmVyIiwiU3ViamVjdCIsIkluamVjdGFibGUiLCJBcHBsaWNhdGlvblJlZiIsIkluamVjdG9yIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJEcmFnRHJvcE1vZHVsZSIsIkNVU1RPTV9FTEVNRU5UU19TQ0hFTUEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTtRQWdGQyw0QkFDQyxFQUFjLEVBQ04sMEJBQ0E7WUFEQSw2QkFBd0IsR0FBeEIsd0JBQXdCO1lBQ3hCLGFBQVEsR0FBUixRQUFRO2dDQXhETSxFQUFFOzBCQXdCRjtnQkFDdEIsRUFBRSxFQUFDLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsY0FBYyxFQUFFLEtBQUs7Z0JBQ3JCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFBQyxLQUFLO2dCQUNkLFNBQVMsRUFBQyxLQUFLO2dCQUNmLFFBQVEsRUFBRSxLQUFLO2dCQUNmLEtBQUssRUFBRSxLQUFLO2dCQUNaLE9BQU8sRUFBQyxLQUFLO2dCQUViLE1BQU0sRUFBQyxFQUFFO2dCQUNULEtBQUssRUFBQyxFQUFFO2dCQUNSLGFBQWEsRUFBQyxFQUFFO2dCQUNoQixhQUFhLEVBQUMsRUFBRTtnQkFDaEIsUUFBUSxFQUFD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