import * as tslib_1 from "tslib";
import { Component, ComponentFactory, ReflectiveInjector, ViewContainerRef, ComponentFactoryResolver, Input, Output, Renderer, HostListener, EventEmitter, Injectable, ViewChild, ElementRef } from "@angular/core";
let PopupLiteComponent = class PopupLiteComponent {
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
    onResize(event) {
        if (this.config.centered && !this.config.pinned) {
            let ne = this.el.querySelector('.popup-lite');
            let root = this.el.parentElement;
            this.renderer.setElementStyle(ne, 'left', ((root.getBoundingClientRect().width - ne.getBoundingClientRect().width) / 2) + "px");
        }
    }
    calcMaxHeight(node, target) {
        let list = node.childNodes;
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
    init(component, data, config, selector) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const componentRef = this.content.createComponent(componentFactory);
        const instance = componentRef.instance;
        instance.data = data;
        instance.id = config.id;
        if (instance.popupTitle) {
            config.popupTitle = instance.popupTitle.bind(instance);
        }
        else {
            config.popupTitle = (id) => id;
        }
        if (config) {
            const list = Object.keys(config);
            list.map((key) => {
                this.config[key] = config[key];
            });
        }
        this.selector = selector;
        this.display(config);
    }
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
    keyUp(event) {
        event.preventDefault();
        const code = event.which;
        if (code === 13) {
            event.target.click();
        }
    }
    closeOverlay() {
        if (this.config.closeOnOverlay) {
            this.closeModal(null, { id: this.config.id, confirmed: false });
        }
    }
    onClose(event) {
        this.closeModal(event, { id: this.config.id, confirmed: false });
    }
    closeModal($event, result) {
        this.config.isOpening = false;
        this.config.overlay = false;
        this.config.isOpen = false;
        this.selector.popedOut(this.config.id, result);
        return false;
    }
    minimizeModal($event) {
        this.config.minimized = !this.config.minimized;
        if (this.config.resizable) {
            let ne = this.el.querySelector('.resize-corner');
            let wn = this.el.querySelector('.popup-lite');
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
    maximizeModal($event) {
        this.config.maximized = !this.config.maximized;
        if (this.config.resizable) {
            let ne = this.el.querySelector('.resize-corner');
            let bd = this.el.querySelector('.modal-body');
            if (bd.getAttribute("oh")) {
                bd.style.height = bd.getAttribute("oh");
            }
            ne.style.display = (this.config.minimized || this.config.maximized) ? 'none' : 'block';
        }
        return false;
    }
    selected($event) {
        this.selector.setSelected(this.config.id);
        return true;
    }
    pinModal($event) {
        this.config.pinned = !this.config.pinned;
        return false;
    }
    dragEnabled(event) {
        return this.config.dragable && !this.config.pinned;
    }
    onDragStart(event) {
    }
    onDrag(event) {
        if (event.node === this.dragHeader.element.nativeElement) {
            this.renderer.setElementStyle(event.medium, 'left', (event.clientX - event.offset.x) + "px");
            this.renderer.setElementStyle(event.medium, 'top', (event.clientY - event.offset.y) + "px");
        }
    }
    onDragEnd(event) {
        if (event.node === this.dragHeader.element.nativeElement) {
            this.renderer.setElementStyle(event.medium, 'left', (event.clientX - event.offset.x) + "px");
            this.renderer.setElementStyle(event.medium, 'top', (event.clientY - event.offset.y) + "px");
        }
    }
    resizeEnabled(event) {
        return this.config.resizable;
    }
    onResizeStart(event) {
    }
    onResizeProgress(event) {
        if (event.node === this.resizer.element.nativeElement) {
            const wr = event.medium.getBoundingClientRect();
            const width = (event.clientX - event.offset.x) - wr.left;
            const height = (event.clientY - event.offset.y) - wr.top;
            let hd = this.el.querySelector('.modal-header');
            let ft = this.el.querySelector('.modal-footer');
            let bd = this.el.querySelector('.modal-body');
            let fth = ft.getBoundingClientRect().height;
            let hdh = hd.getBoundingClientRect().height;
            let h = height - hdh - fth - 2;
            if (width > 200 && height > 60) {
                this.renderer.setElementStyle(event.medium, 'width', width + "px");
                this.renderer.setElementStyle(event.medium, 'height', height + "px");
                this.renderer.setElementStyle(bd, 'height', h + "px");
            }
        }
    }
    onResizeEnd(event) {
        if (event.node === this.resizer.element.nativeElement) {
            const wr = event.medium.getBoundingClientRect();
            const width = (event.clientX - event.offset.x) - wr.left;
            const height = (event.clientY - event.offset.y) - wr.top;
            if (width > 200 && height > 60) {
                let hd = this.el.querySelector('.modal-header');
                let ft = this.el.querySelector('.modal-footer');
                let bd = this.el.querySelector('.modal-body');
                let fth = ft.getBoundingClientRect().height;
                let hdh = hd.getBoundingClientRect().height;
                let h = height - hdh - fth - 2;
                this.renderer.setElementStyle(event.medium, 'width', width + "px");
                this.renderer.setElementStyle(event.medium, 'height', height + "px");
                this.renderer.setElementStyle(bd, 'height', h + "px");
            }
        }
    }
};
PopupLiteComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ComponentFactoryResolver },
    { type: Renderer }
];
tslib_1.__decorate([
    ViewChild("content", { static: false })
], PopupLiteComponent.prototype, "content", void 0);
tslib_1.__decorate([
    ViewChild("modalWondow", { static: false })
], PopupLiteComponent.prototype, "modalWondow", void 0);
tslib_1.__decorate([
    ViewChild("resizer", { static: false })
], PopupLiteComponent.prototype, "resizer", void 0);
tslib_1.__decorate([
    ViewChild("dragHeader", { static: false })
], PopupLiteComponent.prototype, "dragHeader", void 0);
tslib_1.__decorate([
    HostListener('window:resize', ['$event'])
], PopupLiteComponent.prototype, "onResize", null);
PopupLiteComponent = tslib_1.__decorate([
    Component({
        selector: 'popup-lite',
        template: "<div class=\"popup-lite-overlay\" #overlay\n\t(click)=\"closeOverlay()\"\n\t[style.display]=\"config.overlay ? 'block' : 'none'\"></div>\n<div #modalWondow \n\tclass=\"popup-lite\" \n\ttabindex=\"0\"\n\t[style.minWidth]=\"config.minWidth\"\n\t[style.maxWidth]=\"config.maxWidth\"\n\t[style.display]=\"config.isOpening ? 'block' : 'none'\" \n\t[style.position]=\"config.fixed ? 'fixed':'absolute'\"\n\t[style.top]=\"config.top.length ? config.top : ''\"\n\t[style.height]=\"config.height\"\n\t[style.zIndex]=\"config.zIndex\"\n\t[class.fade-in]=\"config.isOpen\" \n\t[class.maximized]=\"config.maximized\"\n\t[class.pinned]=\"config.pinned\"\n\t[style.z-index]=\"config.selected ? 105 : 100\"\n\t(keyup)=\"keyUp($event)\"\n\t(focus)=\"selected($event)\"\n\t(click)=\"selected($event)\">\n\t\t<div class=\"controls\">\n\t\t\t<a *ngIf=\"config.pinable\"\n\t\t\t\tclass=\"pin\" tabindex=\"0\" \n\t\t\t\t(click)=\"pinModal($event)\">\n\t\t\t\t<span *ngIf=\"!config.pinned\" class=\"fa fw fa-unlock\" aria-hidden=\"true\"></span>\n\t\t\t\t<span *ngIf=\"config.pinned\" class=\"fa fw fa-lock\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Pin</span>\n\t\t\t</a><a *ngIf=\"config.minimize\"\n\t\t\t\tclass=\"minify\" tabindex=\"0\" \n\t\t\t\t(click)=\"minimizeModal($event)\" \n\t\t\t\t[class.clicked]=\"config.minimized\">\n\t\t\t\t<span class=\"fa fw fa-window-minimize\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Minimize</span>\n\t\t\t</a><a *ngIf=\"config.maximize\"\n\t\t\t\tclass=\"maxify\" tabindex=\"0\" \n\t\t\t\t(click)=\"maximizeModal($event)\" \n\t\t\t\t[class.clicked]=\"config.maximized\">\n\t\t\t\t<span class=\"fa fw fa-window-maximize\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Maximize</span>\n\t\t\t</a><a *ngIf=\"config.close\"\n\t\t\t\tclass=\"close\" tabindex=\"0\" \n\t\t\t\t(click)=\"onClose($event)\">\n\t\t\t\t<span class=\"fa fw fa-window-close\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"off-screen\">Close</span>\n\t\t\t</a>\n\t\t</div>\n\t\t<a *ngIf=\"config.resizable\"\n\t\t\t#resizer\n\t\t\tclass=\"resize-corner\" \n\t\t\ttabindex=\"0\" \n\t\t\t[medium]=\"modalWondow\"\n\t\t\t[dragInDocument]=\"resizeEnabled.bind(this)\"\n\t\t\t(onDragStart)=\"onResizeStart($event)\"\n\t\t\t(onDrag)=\"onResizeProgress($event)\"\n\t\t\t(onDragEnd)=\"onResizeEnd($event)\">\n\t\t\t<span class=\"fa fw fa-ellipsis-h\" aria-hidden=\"true\"></span>\n\t\t\t<span class=\"off-screen\">Resize</span>\n\t\t</a>\n\t\t<div *ngIf=\"config.header\"\n\t\t\t#dragHeader\n\t\t\tclass=\"modal-header\" \n\t\t\t[id]=\"config.id\"\n\t\t\t[style.cursor]=\"(config.dragable && !config.pinned) ? 'all-scroll':'default'\"\n\t\t\t[class.pinned]=\"config.pinned\"\n\t\t\t[class.minified]=\"config.minimized\"\n\t\t\t[medium]=\"modalWondow\"\n\t\t\t[dragInDocument]=\"dragEnabled.bind(this)\"\n\t\t\t(onDragStart)=\"onDragStart($event)\"\n\t\t\t(onDrag)=\"onDrag($event)\"\n\t\t\t(onDragEnd)=\"onDragEnd($event)\"\n\t\t\t(dblclick)=\"maximizeModal($event)\">\n\t\t\t<span *ngIf=\"config.headerIcon\" [class]=\"'icon ' + config.headerIcon\"></span>\n\t\t\t<span *ngIf=\"config.idOnHeader\" class=\"header-title\" [class.padded]=\"config.headerIcon ? true:null\" [textContent]=\"config.popupTitle(config.id)\"></span>\n\t\t</div>\n\t\t  <div class=\"modal-body\"\n\t\t     [class.minimized]=\"config.minimized\"\n\t\t     [style.minHeight]=\"config.minBodyHeight\"\n\t\t\t [style.maxHeight]=\"config.maxBodyHeight\">\n\t\t\t <ng-template  #content></ng-template>\n\t\t  </div>\n\t      <div class=\"modal-footer\" *ngIf=\"config.footer\"\n\t\t  \t\t[class.minimized]=\"config.minimized\">\n\t         <ng-content select=\"[modal-footer]\"></ng-content>\n\t\t  </div>\n\t    </div>",
        styles: [":host .centered{text-align:center;margin:0 auto}:host .popup-lite h2{font-size:.8em;margin:0}:host .popup-lite-overlay{position:absolute;background-color:rgba(44,44,44,.44);width:100%;height:100%;top:0;left:0;z-index:104}:host .popup-lite{box-sizing:border-box;position:absolute;top:100px;left:100px;border-radius:6px;padding:0;z-index:100;background-color:transparent;min-width:300px;-ms-box-shadow:0 3px 9px rgba(0,0,0,.5);-o-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);opacity:0;transition:opacity .25s ease-in-out}:host .popup-lite .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .popup-lite.fade-in{opacity:1;transition:opacity .25s ease-in-out}:host .popup-lite .controls{position:absolute;top:0;right:2px;border:1px solid #eee;background-color:#fff;border-radius:2px;border-top:0;z-index:2}:host .popup-lite .controls a{text-align:center;border:1px solid #999;box-sizing:border-box;border-radius:0 0 2px 2px;border-top:0;display:inline-block;width:21px;height:21px}:host .popup-lite .controls a span{display:inline-block}:host .popup-lite .controls a.close{cursor:pointer}:host .popup-lite .controls a.close:hover{color:red}:host .popup-lite .controls a.minify{cursor:pointer}:host .popup-lite .controls a.minify.clicked,:host .popup-lite .controls a.minify:hover{color:red}:host .popup-lite .controls a.pin{cursor:pointer}:host .popup-lite .controls a.pin.clicked,:host .popup-lite .controls a.pin:hover{color:red}:host .popup-lite .controls a.maxify{cursor:pointer}:host .popup-lite .controls a.maxify.clicked,:host .popup-lite .controls a.maxify:hover{color:red}:host .popup-lite a{text-align:center;border:1px solid #999;box-sizing:border-box;border-radius:2px}:host .popup-lite a.resize-corner{position:absolute;height:5px;bottom:12px;right:4px;width:13px;border:0;cursor:se-resize}:host .popup-lite a.resize-corner:hover{color:red}:host .popup-lite .modal-header{background-color:#fff;box-sizing:border-box;border-radius:2px 2px 0 0;min-width:100%;min-height:24px;padding:5px 10px}:host .popup-lite .modal-header .icon{position:absolute;left:5px;top:3px}:host .popup-lite .modal-header .header-title{position:absolute;top:0;left:0;padding:2px 5px;box-sizing:border-box;font-size:.9rem}:host .popup-lite .modal-header .header-title.padded{left:15px}:host .popup-lite .modal-body{background-color:#fff;box-sizing:border-box;padding:10px;overflow-y:auto}:host .popup-lite .modal-footer{background-color:#fff;box-sizing:border-box;border-radius:0 0 2px 2px;min-width:100%;min-height:20px;padding:5px 10px}:host .popup-lite .modal-footer .right{text-align:right}:host .header-off{border-top-left-radius:2px;border-top-right-radius:5px}:host .footer-off{border-bottom-right-radius:5px;border-bottom-left-radius:2px}:host .minimized{padding-top:0!important;padding-bottom:0!important;min-height:0!important}:host .maximized{top:0!important;left:0!important;min-width:100%!important;min-height:100%!important}:host .maximized .modal-footer,:host .maximized .modal-header{width:100%}:host .maximized .modal-body{min-width:100%;min-height:95vh}:host .minimized{min-height:0!important;height:0!important}:host .minified{border-radius:6px!important}:host .popup-lite.maximized{height:inherit!important;min-height:inherit!important}:host .pinned{border:1px dotted red}:host .block-key-events{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}"]
    })
], PopupLiteComponent);
export { PopupLiteComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbGl0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvcG9wdXAtbGl0ZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9wdXAtbGl0ZS9jb21wb25lbnRzL3BvcHVwLWxpdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQixrQkFBa0IsRUFDbEIsZ0JBQWdCLEVBQ2hCLHdCQUF3QixFQUN4QixLQUFLLEVBQ0wsTUFBTSxFQUNOLFFBQVEsRUFDUixZQUFZLEVBQ1osWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBWWxDLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBdUQ5QixZQUNDLEVBQWMsRUFDTix3QkFBa0QsRUFDbEQsUUFBaUI7UUFEakIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBeERsQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQXdCMUIsV0FBTSxHQUFpQjtZQUN0QixFQUFFLEVBQUMsRUFBRTtZQUNMLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLEtBQUs7WUFDZCxjQUFjLEVBQUUsS0FBSztZQUNyQixRQUFRLEVBQUUsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFDLEtBQUs7WUFDZCxTQUFTLEVBQUMsS0FBSztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUMsS0FBSztZQUViLE1BQU0sRUFBQyxFQUFFO1lBQ1QsS0FBSyxFQUFDLEVBQUU7WUFDUixhQUFhLEVBQUMsRUFBRTtZQUNoQixhQUFhLEVBQUMsRUFBRTtZQUNoQixRQUFRLEVBQUMsRUFBRTtZQUNYLFFBQVEsRUFBQyxFQUFFO1lBQ1gsWUFBWSxFQUFDLEtBQUs7WUFDbEIsTUFBTSxFQUFFLEtBQUs7WUFDYixTQUFTLEVBQUMsS0FBSztZQUNmLFNBQVMsRUFBQyxLQUFLO1lBQ2YsU0FBUyxFQUFDLEtBQUs7WUFDZixNQUFNLEVBQUMsS0FBSztZQUNaLE1BQU0sRUFBQyxHQUFHO1lBQ1YsR0FBRyxFQUFFLEVBQUU7U0FDUCxDQUFBO1FBTUEsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUExQ0osUUFBUSxDQUFDLEtBQVM7UUFDakIsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDO1lBQzlDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlDLElBQUksSUFBSSxHQUFnQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLEdBQUMsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDckk7SUFDRixDQUFDO0lBc0NPLGFBQWEsQ0FBQyxJQUFRLEVBQUUsTUFBYTtRQUM1QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUVaLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ25DLElBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBRyxNQUFNLEVBQUM7Z0JBQzFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO2dCQUMxQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDckMsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFHLENBQUMsRUFBQzt3QkFDdkIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7cUJBQ3JEO2lCQUNEO2dCQUNELE1BQU07YUFDSjtTQUNHO1FBQ0osT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBd0IsRUFBRSxRQUE2QjtRQUM1RSxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxRixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sUUFBUSxHQUErQixZQUFZLENBQUMsUUFBUyxDQUFDO1FBQ3BFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFFBQVEsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUV4QixJQUFHLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDdkIsTUFBTSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2RDthQUFNO1lBQ04sTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO1NBQy9CO1FBRUQsSUFBSSxNQUFNLEVBQUU7WUFDWCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUE7U0FDRjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRXpCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVNLE9BQU8sQ0FBQyxLQUFtQjtRQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFDO1FBQ3pFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQSxFQUFFLENBQUM7UUFDbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFBLEVBQUUsQ0FBQztRQUNuRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUEsYUFBYSxDQUFDO1FBQzFELElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUEsYUFBYSxDQUFDO1FBQzVELFVBQVUsQ0FBQztZQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDakIsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQUs7UUFDVixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUV6QixJQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7WUFDaEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNyQjtJQUNGLENBQUM7SUFDRCxZQUFZO1FBQ1gsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtZQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUMvRDtJQUNGLENBQUM7SUFDRCxPQUFPLENBQUMsS0FBSztRQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFDRCxVQUFVLENBQUMsTUFBVSxFQUFFLE1BQU07UUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFL0MsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBQ0QsYUFBYSxDQUFDLE1BQVU7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUMvQyxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFDO1lBQ3ZCLElBQUksRUFBRSxHQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDckQsSUFBSSxFQUFFLEdBQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbEQsSUFBSSxFQUFFLEdBQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbEQsSUFBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFDO2dCQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQUEsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUUsU0FBUyxDQUFDO2FBQUM7aUJBQzNGO2dCQUNMLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztnQkFDdEIsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsU0FBUyxDQUFBO2FBQ3hCO1lBQ0QsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUEsQ0FBQyxDQUFBLE9BQU8sQ0FBQztTQUNyRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUNELGFBQWEsQ0FBQyxNQUFVO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDL0MsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBQztZQUN2QixJQUFJLEVBQUUsR0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JELElBQUksRUFBRSxHQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2xELElBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBQztnQkFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQUM7WUFDakUsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUEsQ0FBQyxDQUFBLE9BQU8sQ0FBQztTQUNyRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztJQUNELFFBQVEsQ0FBQyxNQUFXO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBQ0QsUUFBUSxDQUFDLE1BQVU7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUN6QyxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBZ0I7UUFDM0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3BELENBQUM7SUFDRCxXQUFXLENBQUMsS0FBZ0I7SUFDNUIsQ0FBQztJQUNELE1BQU0sQ0FBQyxLQUFnQjtRQUN0QixJQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFO1lBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pGLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hGO0lBQ0YsQ0FBQztJQUNELFNBQVMsQ0FBQyxLQUFnQjtRQUN6QixJQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFO1lBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pGLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hGO0lBQ0YsQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFnQjtRQUM3QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQzlCLENBQUM7SUFDRCxhQUFhLENBQUMsS0FBZ0I7SUFDOUIsQ0FBQztJQUNELGdCQUFnQixDQUFDLEtBQWdCO1FBQ2hDLElBQUcsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDckQsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ2hELE1BQU0sS0FBSyxHQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDeEQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUN2RCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNoRCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNoRCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUM5QyxJQUFJLEdBQUcsR0FBRSxFQUFFLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDM0MsSUFBSSxHQUFHLEdBQUUsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDO1lBQzNDLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFFLENBQUMsQ0FBQztZQUU5QixJQUFHLEtBQUssR0FBQyxHQUFHLElBQUksTUFBTSxHQUFDLEVBQUUsRUFBQztnQkFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25FLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BEO1NBQ0Q7SUFDRixDQUFDO0lBQ0QsV0FBVyxDQUFDLEtBQWdCO1FBQzNCLElBQUcsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDckQsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ2hELE1BQU0sS0FBSyxHQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDeEQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUV2RCxJQUFHLEtBQUssR0FBQyxHQUFHLElBQUksTUFBTSxHQUFDLEVBQUUsRUFBQztnQkFDekIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2hELElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxHQUFHLEdBQUUsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDO2dCQUMzQyxJQUFJLEdBQUcsR0FBRSxFQUFFLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFFLENBQUMsQ0FBQztnQkFFOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxHQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25FLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BEO1NBQ0Q7SUFDRixDQUFDO0NBQ0QsQ0FBQTs7WUF4TEssVUFBVTtZQUNvQix3QkFBd0I7WUFDekMsUUFBUTs7QUFwRDFCO0lBREMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQzttREFDWjtBQUcxQjtJQURDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7dURBQ1o7QUFHOUI7SUFEQyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDO21EQUNaO0FBRzFCO0lBREMsU0FBUyxDQUFDLFlBQVksRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQztzREFDWjtBQUc3QjtJQURDLFlBQVksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztrREFPekM7QUF4Qlcsa0JBQWtCO0lBTDlCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBQyxZQUFZO1FBQ3JCLDJxSEFBMEM7O0tBRTdDLENBQUM7R0FDVyxrQkFBa0IsQ0FnUDlCO1NBaFBZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHtcblx0Q29tcG9uZW50LFxuXHRDb21wb25lbnRGYWN0b3J5LCBcblx0UmVmbGVjdGl2ZUluamVjdG9yLFxuXHRWaWV3Q29udGFpbmVyUmVmLFxuXHRDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG5cdElucHV0LFxuXHRPdXRwdXQsXG5cdFJlbmRlcmVyLFxuXHRIb3N0TGlzdGVuZXIsXG5cdEV2ZW50RW1pdHRlcixcblx0SW5qZWN0YWJsZSxcblx0Vmlld0NoaWxkLFxuXHRFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBEcmFnRXZlbnQgfSBmcm9tICdAc2VkZWgvZHJhZy1lbmFibGVkJztcblxuaW1wb3J0IHsgUG9wdXBMaXRlU2VydmljZSB9IGZyb20gJy4uL2luamVjdGFibGVzL3BvcHVwLWxpdGUuc2VydmljZSc7XG5pbXBvcnQgeyBQb3B1cExpdGVDb250ZW50Q29tcG9uZW50LCBXaW5kb3dMaXRlU2VsZWN0aW9uLCBQb3B1cExpdGVPcHRpb25zLCBXaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9wb3B1cC1saXRlLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOidwb3B1cC1saXRlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcG9wdXAtbGl0ZS5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3BvcHVwLWxpdGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBQb3B1cExpdGVDb21wb25lbnQge1xuXHRwcml2YXRlIGVsOkhUTUxFbGVtZW50O1xuXHRwcml2YXRlIGV4dHJhY2xhc3NlcyA9IFwiXCI7XG5cdHByaXZhdGUgc2VsZWN0b3I6IFdpbmRvd0xpdGVTZWxlY3Rpb247XG5cblx0QFZpZXdDaGlsZChcImNvbnRlbnRcIiwge3N0YXRpYzogZmFsc2V9KSBcblx0Y29udGVudDogVmlld0NvbnRhaW5lclJlZjtcblxuXHRAVmlld0NoaWxkKFwibW9kYWxXb25kb3dcIiwge3N0YXRpYzogZmFsc2V9KSBcblx0bW9kYWxXb25kb3c6IFZpZXdDb250YWluZXJSZWY7XG5cdFxuXHRAVmlld0NoaWxkKFwicmVzaXplclwiLCB7c3RhdGljOiBmYWxzZX0pIFxuXHRyZXNpemVyOiBWaWV3Q29udGFpbmVyUmVmO1xuXHRcblx0QFZpZXdDaGlsZChcImRyYWdIZWFkZXJcIiwge3N0YXRpYzogZmFsc2V9KSBcblx0ZHJhZ0hlYWRlcjogVmlld0NvbnRhaW5lclJlZjtcblx0XG5cdEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuXHRvblJlc2l6ZShldmVudDphbnkpIHtcblx0XHRpZih0aGlzLmNvbmZpZy5jZW50ZXJlZCAmJiAhdGhpcy5jb25maWcucGlubmVkKXtcblx0XHRcdGxldCBuZSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLnBvcHVwLWxpdGUnKTtcblx0XHRcdGxldCByb290OiBIVE1MRWxlbWVudCA9IHRoaXMuZWwucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKG5lLCAnbGVmdCcsICgocm9vdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aC1uZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkvMikgKyBcInB4XCIpO1xuXHRcdH1cblx0fVxuXG5cdGNvbmZpZzogV2luZG93T3B0aW9ucyA9e1xuXHRcdGlkOicnLFxuXHRcdGNsb3NlOiBmYWxzZSxcblx0XHRvdmVybGF5OiBmYWxzZSxcblx0XHRjbG9zZU9uT3ZlcmxheTogZmFsc2UsXG5cdFx0bWluaW1pemU6IGZhbHNlLFxuXHRcdG1heGltaXplOiBmYWxzZSxcblx0XHRkcmFnYWJsZTpmYWxzZSxcblx0XHRyZXNpemFibGU6ZmFsc2UsXG5cdFx0Y2VudGVyZWQ6IGZhbHNlLFxuXHRcdGZpeGVkOiBmYWxzZSxcblx0XHRwaW5hYmxlOmZhbHNlLFxuXG5cdFx0aGVpZ2h0OicnLFxuXHRcdHdpZHRoOicnLFxuXHRcdG1heEJvZHlIZWlnaHQ6JycsXG5cdFx0bWluQm9keUhlaWdodDonJyxcblx0XHRtaW5XaWR0aDonJyxcblx0XHRtYXhXaWR0aDonJyxcblx0XHRhZGp1c3RIZWlnaHQ6ZmFsc2UsXG5cdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRpc09wZW5pbmc6ZmFsc2UsXG5cdFx0bWluaW1pemVkOmZhbHNlLFxuXHRcdG1heGltaXplZDpmYWxzZSxcblx0XHRwaW5uZWQ6ZmFsc2UsXG5cdFx0ekluZGV4OjEwMCxcblx0XHR0b3A6ICcnXG5cdH1cblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRlbDogRWxlbWVudFJlZiwgXG5cdFx0cHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcblx0XHRwcml2YXRlIHJlbmRlcmVyOlJlbmRlcmVyKSB7XG5cdFx0dGhpcy5lbCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuXG5cdHByaXZhdGUgY2FsY01heEhlaWdodChub2RlOmFueSwgdGFyZ2V0OnN0cmluZyl7XG5cdFx0bGV0IGxpc3QgPSBub2RlLmNoaWxkTm9kZXM7XG5cdFx0bGV0IG1heCA9IDA7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHQgICBpZihsaXN0W2ldLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk9PT10YXJnZXQpe1xuXHRcdFx0ICAgbGlzdCA9IGxpc3RbaV0uY2hpbGROb2Rlcztcblx0XHRcdCAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHQgICBpZihsaXN0W2ldLm5vZGVUeXBlPT09MSl7XG5cdFx0XHRcdFx0ICAgbWF4ICs9IChsaXN0W2ldLmNsaWVudEhlaWdodCtsaXN0W2ldLm9mZnNldEhlaWdodCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdCAgIH1cbiAgICAgICAgfVxuICAgIFx0cmV0dXJuIG1heDtcblx0fVxuXG5cdGluaXQoY29tcG9uZW50LCBkYXRhLCBjb25maWc6IFBvcHVwTGl0ZU9wdGlvbnMsIHNlbGVjdG9yOiBXaW5kb3dMaXRlU2VsZWN0aW9uKSB7XG5cdFx0Y29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XG5cdFx0Y29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5jb250ZW50LmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcblx0XHRjb25zdCBpbnN0YW5jZSA9ICg8UG9wdXBMaXRlQ29udGVudENvbXBvbmVudD5jb21wb25lbnRSZWYuaW5zdGFuY2UpO1xuXHRcdGluc3RhbmNlLmRhdGEgPSBkYXRhO1xuXHRcdGluc3RhbmNlLmlkID0gY29uZmlnLmlkO1xuXG5cdFx0aWYoaW5zdGFuY2UucG9wdXBUaXRsZSkge1xuXHRcdFx0Y29uZmlnLnBvcHVwVGl0bGUgPSBpbnN0YW5jZS5wb3B1cFRpdGxlLmJpbmQoaW5zdGFuY2UpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25maWcucG9wdXBUaXRsZSA9IChpZCkgPT4gaWQ7XG5cdFx0fVxuXHRcdFxuXHRcdGlmIChjb25maWcpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhjb25maWcpO1xuXHRcdFx0bGlzdC5tYXAoKGtleSkgPT4ge1xuXHRcdFx0XHR0aGlzLmNvbmZpZ1trZXldID0gY29uZmlnW2tleV07XG5cdFx0XHR9KVxuXHRcdH1cblx0XHR0aGlzLnNlbGVjdG9yID0gc2VsZWN0b3I7XG5cblx0XHR0aGlzLmRpc3BsYXkoY29uZmlnKTtcblx0fVxuXHRcdFxuXHRwdWJsaWMgZGlzcGxheShwcm9wczpXaW5kb3dPcHRpb25zKXtcblx0XHR0aGlzLmNvbmZpZy5tYXhCb2R5SGVpZ2h0ID0gcHJvcHMgJiYgcHJvcHMubWF4SGVpZ2h0ID8gcHJvcHMubWF4SGVpZ2h0OicnO1xuXHRcdCB0aGlzLmNvbmZpZy5taW5XaWR0aCA9IHByb3BzICYmIHByb3BzLm1pbldpZHRoID8gcHJvcHMubWluV2lkdGg6Jyc7XG5cdFx0IHRoaXMuY29uZmlnLm1heFdpZHRoID0gcHJvcHMgJiYgcHJvcHMubWF4V2lkdGggPyBwcm9wcy5tYXhXaWR0aDonJztcblx0XHQgdGhpcy5jb25maWcudG9wID0gcHJvcHMgJiYgcHJvcHMudG9wID8gcHJvcHMudG9wIDogJyc7XG5cdFx0IHRoaXMuY29uZmlnLmlzT3BlbmluZyA9IHRydWU7XG5cdFx0IHRoaXMuY29uZmlnLmFkanVzdEhlaWdodCA9IHByb3BzICYmIHByb3BzLmFkanVzdEhlaWdodCA/IHByb3BzLmFkanVzdEhlaWdodCA6IGZhbHNlO1xuXHRcdCB0aGlzLmV4dHJhY2xhc3NlcyA9IHRoaXMuY29uZmlnLmhlYWRlciA/IFwiXCI6XCJoZWFkZXItb2ZmIFwiO1xuXHRcdCB0aGlzLmV4dHJhY2xhc3NlcyArPSB0aGlzLmNvbmZpZy5mb290ZXIgPyBcIlwiOlwiZm9vdGVyLW9mZiBcIjtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0dGhpcy5vblJlc2l6ZShudWxsKTtcblx0XHRcdHRoaXMuY29uZmlnLmlzT3BlbiA9IHRydWU7XG5cdFx0fS5iaW5kKHRoaXMpLDEwKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRrZXlVcChldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0Y29uc3QgY29kZSA9IGV2ZW50LndoaWNoO1xuXG5cdFx0aWYgKGNvZGUgPT09IDEzKSB7XG5cdFx0XHRldmVudC50YXJnZXQuY2xpY2soKTtcblx0XHR9XHRcdFxuXHR9XG5cdGNsb3NlT3ZlcmxheSgpe1xuXHRcdGlmICh0aGlzLmNvbmZpZy5jbG9zZU9uT3ZlcmxheSkge1xuXHRcdHRoaXMuY2xvc2VNb2RhbChudWxsLCB7IGlkOiB0aGlzLmNvbmZpZy5pZCwgY29uZmlybWVkOiBmYWxzZSB9KTtcblx0XHR9XG5cdH1cblx0b25DbG9zZShldmVudCkge1xuXHRcdHRoaXMuY2xvc2VNb2RhbChldmVudCwgeyBpZDogdGhpcy5jb25maWcuaWQsIGNvbmZpcm1lZDogZmFsc2UgfSk7XG5cdH1cblx0Y2xvc2VNb2RhbCgkZXZlbnQ6YW55LCByZXN1bHQpe1xuXHRcdHRoaXMuY29uZmlnLmlzT3BlbmluZyA9IGZhbHNlO1xuXHRcdHRoaXMuY29uZmlnLm92ZXJsYXkgPSBmYWxzZTtcblx0XHR0aGlzLmNvbmZpZy5pc09wZW4gPSBmYWxzZTtcblx0XHR0aGlzLnNlbGVjdG9yLnBvcGVkT3V0KHRoaXMuY29uZmlnLmlkLCByZXN1bHQpO1xuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdG1pbmltaXplTW9kYWwoJGV2ZW50OmFueSl7XG5cdFx0dGhpcy5jb25maWcubWluaW1pemVkID0gIXRoaXMuY29uZmlnLm1pbmltaXplZDtcblx0XHRpZih0aGlzLmNvbmZpZy5yZXNpemFibGUpe1xuXHRcdCAgbGV0IG5lOmFueSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLnJlc2l6ZS1jb3JuZXInKTtcblx0XHQgIGxldCB3bjphbnkgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1saXRlJyk7XG5cdFx0ICBsZXQgYmQ6YW55ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuXHRcdCAgaWYoIXRoaXMuY29uZmlnLm1pbmltaXplZCl7YmQuc3R5bGUuaGVpZ2h0PWJkLmdldEF0dHJpYnV0ZShcIm9oXCIpO2JkLnN0eWxlLm1heEhlaWdodD0gXCJpbmhlcml0XCI7fVxuXHRcdCAgZWxzZSB7XG5cdFx0ICBiZC5zdHlsZS5oZWlnaHQgPSBcIjBcIjtcblx0XHQgIHduLnN0eWxlLmhlaWdodD1cImluaGVyaXRcIlxuXHRcdCAgfVxuXHRcdCAgbmUuc3R5bGUuZGlzcGxheT0gKHRoaXMuY29uZmlnLm1pbmltaXplZCB8fCB0aGlzLmNvbmZpZy5tYXhpbWl6ZWQpID8gJ25vbmUnOidibG9jayc7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRtYXhpbWl6ZU1vZGFsKCRldmVudDphbnkpe1xuXHRcdHRoaXMuY29uZmlnLm1heGltaXplZCA9ICF0aGlzLmNvbmZpZy5tYXhpbWl6ZWQ7XG5cdFx0aWYodGhpcy5jb25maWcucmVzaXphYmxlKXtcblx0XHQgIGxldCBuZTphbnkgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5yZXNpemUtY29ybmVyJyk7XG5cdFx0ICBsZXQgYmQ6YW55ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuXHRcdCAgaWYoYmQuZ2V0QXR0cmlidXRlKFwib2hcIikpe2JkLnN0eWxlLmhlaWdodD1iZC5nZXRBdHRyaWJ1dGUoXCJvaFwiKTt9XG5cdFx0ICBuZS5zdHlsZS5kaXNwbGF5PSAodGhpcy5jb25maWcubWluaW1pemVkIHx8IHRoaXMuY29uZmlnLm1heGltaXplZCkgPyAnbm9uZSc6J2Jsb2NrJztcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHNlbGVjdGVkKCRldmVudDogYW55KXtcblx0XHR0aGlzLnNlbGVjdG9yLnNldFNlbGVjdGVkKHRoaXMuY29uZmlnLmlkKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRwaW5Nb2RhbCgkZXZlbnQ6YW55KXtcblx0XHR0aGlzLmNvbmZpZy5waW5uZWQgPSAhdGhpcy5jb25maWcucGlubmVkO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGRyYWdFbmFibGVkKGV2ZW50OiBEcmFnRXZlbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25maWcuZHJhZ2FibGUgJiYgIXRoaXMuY29uZmlnLnBpbm5lZDtcblx0fVxuXHRvbkRyYWdTdGFydChldmVudDogRHJhZ0V2ZW50KXtcblx0fVxuXHRvbkRyYWcoZXZlbnQ6IERyYWdFdmVudCl7XG5cdFx0aWYoZXZlbnQubm9kZSA9PT0gdGhpcy5kcmFnSGVhZGVyLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnbGVmdCcsIChldmVudC5jbGllbnRYLWV2ZW50Lm9mZnNldC54KStcInB4XCIpO1xuXHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAndG9wJywgKGV2ZW50LmNsaWVudFktZXZlbnQub2Zmc2V0LnkpK1wicHhcIik7XG5cdFx0fVxuXHR9XG5cdG9uRHJhZ0VuZChldmVudDogRHJhZ0V2ZW50KXtcblx0XHRpZihldmVudC5ub2RlID09PSB0aGlzLmRyYWdIZWFkZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICdsZWZ0JywgKGV2ZW50LmNsaWVudFgtZXZlbnQub2Zmc2V0LngpK1wicHhcIik7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICd0b3AnLCAoZXZlbnQuY2xpZW50WS1ldmVudC5vZmZzZXQueSkrXCJweFwiKTtcblx0XHR9XG5cdH1cblxuXHRyZXNpemVFbmFibGVkKGV2ZW50OiBEcmFnRXZlbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25maWcucmVzaXphYmxlO1xuXHR9XG5cdG9uUmVzaXplU3RhcnQoZXZlbnQ6IERyYWdFdmVudCl7XG5cdH1cblx0b25SZXNpemVQcm9ncmVzcyhldmVudDogRHJhZ0V2ZW50KXtcblx0XHRpZihldmVudC5ub2RlID09PSB0aGlzLnJlc2l6ZXIuZWxlbWVudC5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHRjb25zdCB3ciA9IGV2ZW50Lm1lZGl1bS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGNvbnN0IHdpZHRoID0gIChldmVudC5jbGllbnRYLWV2ZW50Lm9mZnNldC54KSAtIHdyLmxlZnQ7XG5cdFx0XHRjb25zdCBoZWlnaHQgPSAoZXZlbnQuY2xpZW50WS1ldmVudC5vZmZzZXQueSkgLSB3ci50b3A7XG5cdFx0XHRsZXQgaGQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1oZWFkZXInKTtcblx0XHRcdGxldCBmdCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWZvb3RlcicpO1xuXHRcdFx0bGV0IGJkID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtYm9keScpO1xuXHRcdFx0bGV0IGZ0aD0gZnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXHRcdFx0bGV0IGhkaD0gaGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXHRcdFx0bGV0IGggPSBoZWlnaHQgLSBoZGggLSBmdGggLTI7XG5cblx0XHRcdGlmKHdpZHRoPjIwMCAmJiBoZWlnaHQ+NjApe1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICd3aWR0aCcsIHdpZHRoK1wicHhcIik7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ2hlaWdodCcsIGhlaWdodCtcInB4XCIpO1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShiZCwgJ2hlaWdodCcsIGgrXCJweFwiKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0b25SZXNpemVFbmQoZXZlbnQ6IERyYWdFdmVudCl7XG5cdFx0aWYoZXZlbnQubm9kZSA9PT0gdGhpcy5yZXNpemVyLmVsZW1lbnQubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0Y29uc3Qgd3IgPSBldmVudC5tZWRpdW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRjb25zdCB3aWR0aCA9ICAoZXZlbnQuY2xpZW50WC1ldmVudC5vZmZzZXQueCkgLSB3ci5sZWZ0O1xuXHRcdFx0Y29uc3QgaGVpZ2h0ID0gKGV2ZW50LmNsaWVudFktZXZlbnQub2Zmc2V0LnkpIC0gd3IudG9wO1xuXG5cdFx0XHRpZih3aWR0aD4yMDAgJiYgaGVpZ2h0PjYwKXtcblx0XHRcdFx0bGV0IGhkID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtaGVhZGVyJyk7XG5cdFx0XHRcdGxldCBmdCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWZvb3RlcicpO1xuXHRcdFx0XHRsZXQgYmQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1ib2R5Jyk7XG5cdFx0XHRcdGxldCBmdGg9IGZ0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdFx0bGV0IGhkaD0gaGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXHRcdFx0XHRsZXQgaCA9IGhlaWdodCAtIGhkaCAtIGZ0aCAtMjtcblx0XHRcdFx0XHRcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnd2lkdGgnLCB3aWR0aCtcInB4XCIpO1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICdoZWlnaHQnLCBoZWlnaHQrXCJweFwiKTtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoYmQsICdoZWlnaHQnLCBoK1wicHhcIik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iXX0=