/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, ViewContainerRef, ComponentFactoryResolver, Renderer, HostListener, ViewChild, ElementRef } from "@angular/core";
export class PopupLiteComponent {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbGl0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvcG9wdXAtbGl0ZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9wdXAtbGl0ZS9jb21wb25lbnRzL3BvcHVwLWxpdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ04sU0FBUyxFQUdULGdCQUFnQixFQUNoQix3QkFBd0IsRUFHeEIsUUFBUSxFQUNSLFlBQVksRUFHWixTQUFTLEVBQ1QsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBWWxDLE1BQU07Ozs7OztJQXVETCxZQUNDLEVBQWMsRUFDTiwwQkFDQTtRQURBLDZCQUF3QixHQUF4Qix3QkFBd0I7UUFDeEIsYUFBUSxHQUFSLFFBQVE7NEJBeERNLEVBQUU7c0JBd0JGO1lBQ3RCLEVBQUUsRUFBQyxFQUFFO1lBQ0wsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsS0FBSztZQUNkLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUMsS0FBSztZQUNkLFNBQVMsRUFBQyxLQUFLO1lBQ2YsUUFBUSxFQUFFLEtBQUs7WUFDZixLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBQyxLQUFLO1lBRWIsTUFBTSxFQUFDLEVBQUU7WUFDVCxLQUFLLEVBQUMsRUFBRTtZQUNSLGFBQWEsRUFBQyxFQUFFO1lBQ2hCLGFBQWEsRUFBQyxFQUFFO1lBQ2hCLFFBQVEsRUFBQyxFQUFFO1lBQ1gsUUFBUSxFQUFDLEVBQUU7WUFDWCxZQUFZLEVBQUMsS0FBSztZQUNsQixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBQyxLQUFLO1lBQ2YsU0FBUyxFQUFDLEtBQUs7WUFDZixTQUFTLEVBQUMsS0FBSztZQUNmLE1BQU0sRUFBQyxLQUFLO1lBQ1osTUFBTSxFQUFDLEdBQUc7WUFDVixHQUFHLEVBQUUsRUFBRTtT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LEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUEsYUFBYSxDQUFDO1FBQzFELElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUEsYUFBYSxDQUFDO1FBQzVELFVBQVUsQ0FBQztZQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQzFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUM7Ozs7OztJQUdkLEtBQUssQ0FBQyxLQUFLO1FBQ1YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDOztRQUN2QixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBRXpCLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDckI7S0FDRDs7OztJQUNELFlBQVk7UUFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDL0Q7S0FDRDs7Ozs7SUFDRCxPQUFPLENBQUMsS0FBSztRQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ2pFOzs7Ozs7SUFDRCxVQUFV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LFNBQUMsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFDOzBCQUc3QyxTQUFTLFNBQUMsYUFBYSxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFDO3NCQUdqRCxTQUFTLFNBQUMsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFDO3lCQUc3QyxTQUFTLFNBQUMsWUFBWSxFQUFFLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFDO3VCQUdoRCxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1xuXHRDb21wb25lbnQsXG5cdENvbXBvbmVudEZhY3RvcnksIFxuXHRSZWZsZWN0aXZlSW5qZWN0b3IsXG5cdFZpZXdDb250YWluZXJSZWYsXG5cdENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcblx0SW5wdXQsXG5cdE91dHB1dCxcblx0UmVuZGVyZXIsXG5cdEhvc3RMaXN0ZW5lcixcblx0RXZlbnRFbWl0dGVyLFxuXHRJbmplY3RhYmxlLFxuXHRWaWV3Q2hpbGQsXG5cdEVsZW1lbnRSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IERyYWdFdmVudCB9IGZyb20gJ0BzZWRlaC9kcmFnLWVuYWJsZWQnO1xuXG5pbXBvcnQgeyBQb3B1cExpdGVTZXJ2aWNlIH0gZnJvbSAnLi4vaW5qZWN0YWJsZXMvcG9wdXAtbGl0ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFBvcHVwTGl0ZUNvbnRlbnRDb21wb25lbnQsIFdpbmRvd0xpdGVTZWxlY3Rpb24sIFBvcHVwTGl0ZU9wdGlvbnMsIFdpbmRvd09wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3BvcHVwLWxpdGUuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6J3BvcHVwLWxpdGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wb3B1cC1saXRlLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vcG9wdXAtbGl0ZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBvcHVwTGl0ZUNvbXBvbmVudCB7XG5cdHByaXZhdGUgZWw6SFRNTEVsZW1lbnQ7XG5cdHByaXZhdGUgZXh0cmFjbGFzc2VzID0gXCJcIjtcblx0cHJpdmF0ZSBzZWxlY3RvcjogV2luZG93TGl0ZVNlbGVjdGlvbjtcblxuXHRAVmlld0NoaWxkKFwiY29udGVudFwiLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIFxuXHRjb250ZW50OiBWaWV3Q29udGFpbmVyUmVmO1xuXG5cdEBWaWV3Q2hpbGQoXCJtb2RhbFdvbmRvd1wiLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIFxuXHRtb2RhbFdvbmRvdzogVmlld0NvbnRhaW5lclJlZjtcblx0XG5cdEBWaWV3Q2hpbGQoXCJyZXNpemVyXCIsIHtyZWFkOiBWaWV3Q29udGFpbmVyUmVmfSkgXG5cdHJlc2l6ZXI6IFZpZXdDb250YWluZXJSZWY7XG5cdFxuXHRAVmlld0NoaWxkKFwiZHJhZ0hlYWRlclwiLCB7cmVhZDogVmlld0NvbnRhaW5lclJlZn0pIFxuXHRkcmFnSGVhZGVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXHRcblx0QEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG5cdG9uUmVzaXplKGV2ZW50OmFueSkge1xuXHRcdGlmKHRoaXMuY29uZmlnLmNlbnRlcmVkICYmICF0aGlzLmNvbmZpZy5waW5uZWQpe1xuXHRcdFx0bGV0IG5lID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtbGl0ZScpO1xuXHRcdFx0bGV0IHJvb3Q6IEhUTUxFbGVtZW50ID0gdGhpcy5lbC5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUobmUsICdsZWZ0JywgKChyb290LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoLW5lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKS8yKSArIFwicHhcIik7XG5cdFx0fVxuXHR9XG5cblx0Y29uZmlnOiBXaW5kb3dPcHRpb25zID17XG5cdFx0aWQ6JycsXG5cdFx0Y2xvc2U6IGZhbHNlLFxuXHRcdG92ZXJsYXk6IGZhbHNlLFxuXHRcdGNsb3NlT25PdmVybGF5OiBmYWxzZSxcblx0XHRtaW5pbWl6ZTogZmFsc2UsXG5cdFx0bWF4aW1pemU6IGZhbHNlLFxuXHRcdGRyYWdhYmxlOmZhbHNlLFxuXHRcdHJlc2l6YWJsZTpmYWxzZSxcblx0XHRjZW50ZXJlZDogZmFsc2UsXG5cdFx0Zml4ZWQ6IGZhbHNlLFxuXHRcdHBpbmFibGU6ZmFsc2UsXG5cblx0XHRoZWlnaHQ6JycsXG5cdFx0d2lkdGg6JycsXG5cdFx0bWF4Qm9keUhlaWdodDonJyxcblx0XHRtaW5Cb2R5SGVpZ2h0OicnLFxuXHRcdG1pbldpZHRoOicnLFxuXHRcdG1heFdpZHRoOicnLFxuXHRcdGFkanVzdEhlaWdodDpmYWxzZSxcblx0XHRpc09wZW46IGZhbHNlLFxuXHRcdGlzT3BlbmluZzpmYWxzZSxcblx0XHRtaW5pbWl6ZWQ6ZmFsc2UsXG5cdFx0bWF4aW1pemVkOmZhbHNlLFxuXHRcdHBpbm5lZDpmYWxzZSxcblx0XHR6SW5kZXg6MTAwLFxuXHRcdHRvcDogJydcblx0fVxuXG5cdGNvbnN0cnVjdG9yKFxuXHRcdGVsOiBFbGVtZW50UmVmLCBcblx0XHRwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuXHRcdHByaXZhdGUgcmVuZGVyZXI6UmVuZGVyZXIpIHtcblx0XHR0aGlzLmVsID0gZWwubmF0aXZlRWxlbWVudDtcbiAgICB9XG5cblx0cHJpdmF0ZSBjYWxjTWF4SGVpZ2h0KG5vZGU6YW55LCB0YXJnZXQ6c3RyaW5nKXtcblx0XHRsZXQgbGlzdCA9IG5vZGUuY2hpbGROb2Rlcztcblx0XHRsZXQgbWF4ID0gMDtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdCAgIGlmKGxpc3RbaV0ubm9kZU5hbWUudG9Mb3dlckNhc2UoKT09PXRhcmdldCl7XG5cdFx0XHQgICBsaXN0ID0gbGlzdFtpXS5jaGlsZE5vZGVzO1xuXHRcdFx0ICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdCAgIGlmKGxpc3RbaV0ubm9kZVR5cGU9PT0xKXtcblx0XHRcdFx0XHQgICBtYXggKz0gKGxpc3RbaV0uY2xpZW50SGVpZ2h0K2xpc3RbaV0ub2Zmc2V0SGVpZ2h0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0ICAgfVxuICAgICAgICB9XG4gICAgXHRyZXR1cm4gbWF4O1xuXHR9XG5cblx0aW5pdChjb21wb25lbnQsIGRhdGEsIGNvbmZpZzogUG9wdXBMaXRlT3B0aW9ucywgc2VsZWN0b3I6IFdpbmRvd0xpdGVTZWxlY3Rpb24pIHtcblx0XHRjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcblx0XHRjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmNvbnRlbnQuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuXHRcdGNvbnN0IGluc3RhbmNlID0gKDxQb3B1cExpdGVDb250ZW50Q29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XG5cdFx0aW5zdGFuY2UuZGF0YSA9IGRhdGE7XG5cdFx0aW5zdGFuY2UuaWQgPSBjb25maWcuaWQ7XG5cblx0XHRpZihpbnN0YW5jZS5wb3B1cFRpdGxlKSB7XG5cdFx0XHRjb25maWcucG9wdXBUaXRsZSA9IGluc3RhbmNlLnBvcHVwVGl0bGUuYmluZChpbnN0YW5jZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbmZpZy5wb3B1cFRpdGxlID0gKGlkKSA9PiBpZDtcblx0XHR9XG5cdFx0XG5cdFx0aWYgKGNvbmZpZykge1xuXHRcdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKGNvbmZpZyk7XG5cdFx0XHRsaXN0Lm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRcdHRoaXMuY29uZmlnW2tleV0gPSBjb25maWdba2V5XTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcblxuXHRcdHRoaXMuZGlzcGxheShjb25maWcpO1xuXHR9XG5cdFx0XG5cdHB1YmxpYyBkaXNwbGF5KHByb3BzOldpbmRvd09wdGlvbnMpe1xuXHRcdHRoaXMuY29uZmlnLm1heEJvZHlIZWlnaHQgPSBwcm9wcyAmJiBwcm9wcy5tYXhIZWlnaHQgPyBwcm9wcy5tYXhIZWlnaHQ6Jyc7XG5cdFx0IHRoaXMuY29uZmlnLm1pbldpZHRoID0gcHJvcHMgJiYgcHJvcHMubWluV2lkdGggPyBwcm9wcy5taW5XaWR0aDonJztcblx0XHQgdGhpcy5jb25maWcubWF4V2lkdGggPSBwcm9wcyAmJiBwcm9wcy5tYXhXaWR0aCA/IHByb3BzLm1heFdpZHRoOicnO1xuXHRcdCB0aGlzLmNvbmZpZy50b3AgPSBwcm9wcyAmJiBwcm9wcy50b3AgPyBwcm9wcy50b3AgOiAnJztcblx0XHQgdGhpcy5jb25maWcuaXNPcGVuaW5nID0gdHJ1ZTtcblx0XHQgdGhpcy5jb25maWcuYWRqdXN0SGVpZ2h0ID0gcHJvcHMgJiYgcHJvcHMuYWRqdXN0SGVpZ2h0ID8gcHJvcHMuYWRqdXN0SGVpZ2h0IDogZmFsc2U7XG5cdFx0IHRoaXMuZXh0cmFjbGFzc2VzID0gdGhpcy5jb25maWcuaGVhZGVyID8gXCJcIjpcImhlYWRlci1vZmYgXCI7XG5cdFx0IHRoaXMuZXh0cmFjbGFzc2VzICs9IHRoaXMuY29uZmlnLmZvb3RlciA/IFwiXCI6XCJmb290ZXItb2ZmIFwiO1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHR0aGlzLm9uUmVzaXplKG51bGwpO1xuXHRcdFx0dGhpcy5jb25maWcuaXNPcGVuID0gdHJ1ZTtcblx0XHR9LmJpbmQodGhpcyksMTApO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGtleVVwKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRjb25zdCBjb2RlID0gZXZlbnQud2hpY2g7XG5cblx0XHRpZiAoY29kZSA9PT0gMTMpIHtcblx0XHRcdGV2ZW50LnRhcmdldC5jbGljaygpO1xuXHRcdH1cdFx0XG5cdH1cblx0Y2xvc2VPdmVybGF5KCl7XG5cdFx0aWYgKHRoaXMuY29uZmlnLmNsb3NlT25PdmVybGF5KSB7XG5cdFx0dGhpcy5jbG9zZU1vZGFsKG51bGwsIHsgaWQ6IHRoaXMuY29uZmlnLmlkLCBjb25maXJtZWQ6IGZhbHNlIH0pO1xuXHRcdH1cblx0fVxuXHRvbkNsb3NlKGV2ZW50KSB7XG5cdFx0dGhpcy5jbG9zZU1vZGFsKGV2ZW50LCB7IGlkOiB0aGlzLmNvbmZpZy5pZCwgY29uZmlybWVkOiBmYWxzZSB9KTtcblx0fVxuXHRjbG9zZU1vZGFsKCRldmVudDphbnksIHJlc3VsdCl7XG5cdFx0dGhpcy5jb25maWcuaXNPcGVuaW5nID0gZmFsc2U7XG5cdFx0dGhpcy5jb25maWcub3ZlcmxheSA9IGZhbHNlO1xuXHRcdHRoaXMuY29uZmlnLmlzT3BlbiA9IGZhbHNlO1xuXHRcdHRoaXMuc2VsZWN0b3IucG9wZWRPdXQodGhpcy5jb25maWcuaWQsIHJlc3VsdCk7XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0bWluaW1pemVNb2RhbCgkZXZlbnQ6YW55KXtcblx0XHR0aGlzLmNvbmZpZy5taW5pbWl6ZWQgPSAhdGhpcy5jb25maWcubWluaW1pemVkO1xuXHRcdGlmKHRoaXMuY29uZmlnLnJlc2l6YWJsZSl7XG5cdFx0ICBsZXQgbmU6YW55ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcucmVzaXplLWNvcm5lcicpO1xuXHRcdCAgbGV0IHduOmFueSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLnBvcHVwLWxpdGUnKTtcblx0XHQgIGxldCBiZDphbnkgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1ib2R5Jyk7XG5cdFx0ICBpZighdGhpcy5jb25maWcubWluaW1pemVkKXtiZC5zdHlsZS5oZWlnaHQ9YmQuZ2V0QXR0cmlidXRlKFwib2hcIik7YmQuc3R5bGUubWF4SGVpZ2h0PSBcImluaGVyaXRcIjt9XG5cdFx0ICBlbHNlIHtcblx0XHQgIGJkLnN0eWxlLmhlaWdodCA9IFwiMFwiO1xuXHRcdCAgd24uc3R5bGUuaGVpZ2h0PVwiaW5oZXJpdFwiXG5cdFx0ICB9XG5cdFx0ICBuZS5zdHlsZS5kaXNwbGF5PSAodGhpcy5jb25maWcubWluaW1pemVkIHx8IHRoaXMuY29uZmlnLm1heGltaXplZCkgPyAnbm9uZSc6J2Jsb2NrJztcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdG1heGltaXplTW9kYWwoJGV2ZW50OmFueSl7XG5cdFx0dGhpcy5jb25maWcubWF4aW1pemVkID0gIXRoaXMuY29uZmlnLm1heGltaXplZDtcblx0XHRpZih0aGlzLmNvbmZpZy5yZXNpemFibGUpe1xuXHRcdCAgbGV0IG5lOmFueSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLnJlc2l6ZS1jb3JuZXInKTtcblx0XHQgIGxldCBiZDphbnkgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1ib2R5Jyk7XG5cdFx0ICBpZihiZC5nZXRBdHRyaWJ1dGUoXCJvaFwiKSl7YmQuc3R5bGUuaGVpZ2h0PWJkLmdldEF0dHJpYnV0ZShcIm9oXCIpO31cblx0XHQgIG5lLnN0eWxlLmRpc3BsYXk9ICh0aGlzLmNvbmZpZy5taW5pbWl6ZWQgfHwgdGhpcy5jb25maWcubWF4aW1pemVkKSA/ICdub25lJzonYmxvY2snO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0c2VsZWN0ZWQoJGV2ZW50OiBhbnkpe1xuXHRcdHRoaXMuc2VsZWN0b3Iuc2V0U2VsZWN0ZWQodGhpcy5jb25maWcuaWQpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHBpbk1vZGFsKCRldmVudDphbnkpe1xuXHRcdHRoaXMuY29uZmlnLnBpbm5lZCA9ICF0aGlzLmNvbmZpZy5waW5uZWQ7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0ZHJhZ0VuYWJsZWQoZXZlbnQ6IERyYWdFdmVudCkge1xuXHRcdHJldHVybiB0aGlzLmNvbmZpZy5kcmFnYWJsZSAmJiAhdGhpcy5jb25maWcucGlubmVkO1xuXHR9XG5cdG9uRHJhZ1N0YXJ0KGV2ZW50OiBEcmFnRXZlbnQpe1xuXHR9XG5cdG9uRHJhZyhldmVudDogRHJhZ0V2ZW50KXtcblx0XHRpZihldmVudC5ub2RlID09PSB0aGlzLmRyYWdIZWFkZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICdsZWZ0JywgKGV2ZW50LmNsaWVudFgtZXZlbnQub2Zmc2V0LngpK1wicHhcIik7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICd0b3AnLCAoZXZlbnQuY2xpZW50WS1ldmVudC5vZmZzZXQueSkrXCJweFwiKTtcblx0XHR9XG5cdH1cblx0b25EcmFnRW5kKGV2ZW50OiBEcmFnRXZlbnQpe1xuXHRcdGlmKGV2ZW50Lm5vZGUgPT09IHRoaXMuZHJhZ0hlYWRlci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ2xlZnQnLCAoZXZlbnQuY2xpZW50WC1ldmVudC5vZmZzZXQueCkrXCJweFwiKTtcblx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ3RvcCcsIChldmVudC5jbGllbnRZLWV2ZW50Lm9mZnNldC55KStcInB4XCIpO1xuXHRcdH1cblx0fVxuXG5cdHJlc2l6ZUVuYWJsZWQoZXZlbnQ6IERyYWdFdmVudCkge1xuXHRcdHJldHVybiB0aGlzLmNvbmZpZy5yZXNpemFibGU7XG5cdH1cblx0b25SZXNpemVTdGFydChldmVudDogRHJhZ0V2ZW50KXtcblx0fVxuXHRvblJlc2l6ZVByb2dyZXNzKGV2ZW50OiBEcmFnRXZlbnQpe1xuXHRcdGlmKGV2ZW50Lm5vZGUgPT09IHRoaXMucmVzaXplci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpIHtcblx0XHRcdGNvbnN0IHdyID0gZXZlbnQubWVkaXVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0Y29uc3Qgd2lkdGggPSAgKGV2ZW50LmNsaWVudFgtZXZlbnQub2Zmc2V0LngpIC0gd3IubGVmdDtcblx0XHRcdGNvbnN0IGhlaWdodCA9IChldmVudC5jbGllbnRZLWV2ZW50Lm9mZnNldC55KSAtIHdyLnRvcDtcblx0XHRcdGxldCBoZCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWhlYWRlcicpO1xuXHRcdFx0bGV0IGZ0ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtZm9vdGVyJyk7XG5cdFx0XHRsZXQgYmQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1ib2R5Jyk7XG5cdFx0XHRsZXQgZnRoPSBmdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHRsZXQgaGRoPSBoZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHRsZXQgaCA9IGhlaWdodCAtIGhkaCAtIGZ0aCAtMjtcblxuXHRcdFx0aWYod2lkdGg+MjAwICYmIGhlaWdodD42MCl7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ3dpZHRoJywgd2lkdGgrXCJweFwiKTtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnaGVpZ2h0JywgaGVpZ2h0K1wicHhcIik7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGJkLCAnaGVpZ2h0JywgaCtcInB4XCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRvblJlc2l6ZUVuZChldmVudDogRHJhZ0V2ZW50KXtcblx0XHRpZihldmVudC5ub2RlID09PSB0aGlzLnJlc2l6ZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHRjb25zdCB3ciA9IGV2ZW50Lm1lZGl1bS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGNvbnN0IHdpZHRoID0gIChldmVudC5jbGllbnRYLWV2ZW50Lm9mZnNldC54KSAtIHdyLmxlZnQ7XG5cdFx0XHRjb25zdCBoZWlnaHQgPSAoZXZlbnQuY2xpZW50WS1ldmVudC5vZmZzZXQueSkgLSB3ci50b3A7XG5cblx0XHRcdGlmKHdpZHRoPjIwMCAmJiBoZWlnaHQ+NjApe1xuXHRcdFx0XHRsZXQgaGQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1oZWFkZXInKTtcblx0XHRcdFx0bGV0IGZ0ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtZm9vdGVyJyk7XG5cdFx0XHRcdGxldCBiZCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHRcdFx0bGV0IGZ0aD0gZnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXHRcdFx0XHRsZXQgaGRoPSBoZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHRcdGxldCBoID0gaGVpZ2h0IC0gaGRoIC0gZnRoIC0yO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICd3aWR0aCcsIHdpZHRoK1wicHhcIik7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ2hlaWdodCcsIGhlaWdodCtcInB4XCIpO1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShiZCwgJ2hlaWdodCcsIGgrXCJweFwiKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiJdfQ==