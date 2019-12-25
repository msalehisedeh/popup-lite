import * as tslib_1 from "tslib";
import { Component, ViewContainerRef, ComponentFactoryResolver, Renderer, HostListener, ViewChild, Injector, ApplicationRef, EmbeddedViewRef, ElementRef } from "@angular/core";
let PopupLiteComponent = class PopupLiteComponent {
    constructor(el, componentFactoryResolver, appRef, injector, renderer) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
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
        const componentRef = componentFactory.create(this.injector);
        const instance = componentRef.instance;
        this.appRef.attachView(componentRef.hostView);
        this.content.nativeElement.appendChild(componentRef.hostView.rootNodes[0]);
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
        if (event.node === this.dragHeader.nativeElement) {
            this.renderer.setElementStyle(event.medium, 'left', (event.clientX - event.offset.x) + "px");
            this.renderer.setElementStyle(event.medium, 'top', (event.clientY - event.offset.y) + "px");
        }
    }
    onDragEnd(event) {
        if (event.node === this.dragHeader.nativeElement) {
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
        if (event.node === this.resizer.nativeElement) {
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
        if (event.node === this.resizer.nativeElement) {
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
    { type: ApplicationRef },
    { type: Injector },
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
        template: "<div class=\"popup-lite-overlay\" #overlay\n\t(click)=\"closeOverlay()\"\n\t[style.display]=\"config.overlay ? 'block' : 'none'\"></div>\n<div #modalWondow \n\tclass=\"popup-lite\" \n\ttabindex=\"0\"\n\t[style.minWidth]=\"config.minWidth\"\n\t[style.maxWidth]=\"config.maxWidth\"\n\t[style.display]=\"config.isOpening ? 'block' : 'none'\" \n\t[style.position]=\"config.fixed ? 'fixed':'absolute'\"\n\t[style.top]=\"config.top.length ? config.top : ''\"\n\t[style.height]=\"config.height\"\n\t[style.zIndex]=\"config.zIndex\"\n\t[class.fade-in]=\"config.isOpen\" \n\t[class.maximized]=\"config.maximized\"\n\t[class.pinned]=\"config.pinned\"\n\t[style.z-index]=\"config.selected ? 105 : 100\"\n\t(keyup)=\"keyUp($event)\"\n\t(focus)=\"selected($event)\"\n\t(click)=\"selected($event)\">\n\t<div class=\"controls\">\n\t\t<a *ngIf=\"config.pinable\"\n\t\t\tclass=\"pin\" tabindex=\"0\" \n\t\t\t(click)=\"pinModal($event)\">\n\t\t\t<span *ngIf=\"!config.pinned\" class=\"fa fw fa-unlock\" aria-hidden=\"true\"></span>\n\t\t\t<span *ngIf=\"config.pinned\" class=\"fa fw fa-lock\" aria-hidden=\"true\"></span>\n\t\t\t<span class=\"off-screen\">Pin</span>\n\t\t</a><a *ngIf=\"config.minimize\"\n\t\t\tclass=\"minify\" tabindex=\"0\" \n\t\t\t(click)=\"minimizeModal($event)\" \n\t\t\t[class.clicked]=\"config.minimized\">\n\t\t\t<span class=\"fa fw fa-window-minimize\" aria-hidden=\"true\"></span>\n\t\t\t<span class=\"off-screen\">Minimize</span>\n\t\t</a><a *ngIf=\"config.maximize\"\n\t\t\tclass=\"maxify\" tabindex=\"0\" \n\t\t\t(click)=\"maximizeModal($event)\" \n\t\t\t[class.clicked]=\"config.maximized\">\n\t\t\t<span class=\"fa fw fa-window-maximize\" aria-hidden=\"true\"></span>\n\t\t\t<span class=\"off-screen\">Maximize</span>\n\t\t</a><a *ngIf=\"config.close\"\n\t\t\tclass=\"close\" tabindex=\"0\" \n\t\t\t(click)=\"onClose($event)\">\n\t\t\t<span class=\"fa fw fa-window-close\" aria-hidden=\"true\"></span>\n\t\t\t<span class=\"off-screen\">Close</span>\n\t\t</a>\n\t</div>\n\t<a *ngIf=\"config.resizable\"\n\t\t#resizer\n\t\tclass=\"resize-corner\" \n\t\ttabindex=\"0\" \n\t\t[medium]=\"modalWondow\"\n\t\t[dragInDocument]=\"resizeEnabled.bind(this)\"\n\t\t(onDragStart)=\"onResizeStart($event)\"\n\t\t(onDrag)=\"onResizeProgress($event)\"\n\t\t(onDragEnd)=\"onResizeEnd($event)\">\n\t\t<span class=\"fa fw fa-ellipsis-h\" aria-hidden=\"true\"></span>\n\t\t<span class=\"off-screen\">Resize</span>\n\t</a>\n\t<div *ngIf=\"config.header\"\n\t\t#dragHeader\n\t\tclass=\"modal-header\" \n\t\t[id]=\"config.id\"\n\t\t[style.cursor]=\"(config.dragable && !config.pinned) ? 'all-scroll':'default'\"\n\t\t[class.pinned]=\"config.pinned\"\n\t\t[class.minified]=\"config.minimized\"\n\t\t[medium]=\"modalWondow\"\n\t\t[dragInDocument]=\"dragEnabled.bind(this)\"\n\t\t(onDragStart)=\"onDragStart($event)\"\n\t\t(onDrag)=\"onDrag($event)\"\n\t\t(onDragEnd)=\"onDragEnd($event)\"\n\t\t(dblclick)=\"maximizeModal($event)\">\n\t\t<span *ngIf=\"config.headerIcon\" [class]=\"'icon ' + config.headerIcon\"></span>\n\t\t<span *ngIf=\"config.idOnHeader\" class=\"header-title\" [class.padded]=\"config.headerIcon ? true:null\" [textContent]=\"config.popupTitle(config.id)\"></span>\n\t</div>\n\t<div class=\"modal-body\" #content\n\t\t[class.minimized]=\"config.minimized\"\n\t\t[style.minHeight]=\"config.minBodyHeight\"\n\t\t[style.maxHeight]=\"config.maxBodyHeight\">\n\t</div>\n\t<div class=\"modal-footer\" *ngIf=\"config.footer\"\n\t\t[class.minimized]=\"config.minimized\">\n\t\t<ng-content select=\"[modal-footer]\"></ng-content>\n\t</div>\n</div>\n",
        styles: [":host .centered{text-align:center;margin:0 auto}:host .popup-lite h2{font-size:.8em;margin:0}:host .popup-lite-overlay{position:absolute;background-color:rgba(44,44,44,.44);width:100%;height:100%;top:0;left:0;z-index:104}:host .popup-lite{box-sizing:border-box;position:absolute;top:100px;left:100px;border-radius:6px;padding:0;z-index:100;background-color:transparent;min-width:300px;-ms-box-shadow:0 3px 9px rgba(0,0,0,.5);-o-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);opacity:0;transition:opacity .25s ease-in-out}:host .popup-lite .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .popup-lite.fade-in{opacity:1;transition:opacity .25s ease-in-out}:host .popup-lite .controls{position:absolute;top:0;right:2px;border:1px solid #eee;background-color:#fff;border-radius:2px;border-top:0;z-index:2}:host .popup-lite .controls a{text-align:center;border:1px solid #999;box-sizing:border-box;border-radius:0 0 2px 2px;border-top:0;display:inline-block;width:21px;height:21px}:host .popup-lite .controls a span{display:inline-block}:host .popup-lite .controls a.close{cursor:pointer}:host .popup-lite .controls a.close:hover{color:red}:host .popup-lite .controls a.minify{cursor:pointer}:host .popup-lite .controls a.minify.clicked,:host .popup-lite .controls a.minify:hover{color:red}:host .popup-lite .controls a.pin{cursor:pointer}:host .popup-lite .controls a.pin.clicked,:host .popup-lite .controls a.pin:hover{color:red}:host .popup-lite .controls a.maxify{cursor:pointer}:host .popup-lite .controls a.maxify.clicked,:host .popup-lite .controls a.maxify:hover{color:red}:host .popup-lite a{text-align:center;border:1px solid #999;box-sizing:border-box;border-radius:2px}:host .popup-lite a.resize-corner{position:absolute;height:5px;bottom:12px;right:4px;width:13px;border:0;cursor:se-resize}:host .popup-lite a.resize-corner:hover{color:red}:host .popup-lite .modal-header{background-color:#fff;box-sizing:border-box;border-radius:2px 2px 0 0;min-width:100%;min-height:24px;padding:5px 10px}:host .popup-lite .modal-header .icon{position:absolute;left:5px;top:3px}:host .popup-lite .modal-header .header-title{position:absolute;top:0;left:0;padding:2px 5px;box-sizing:border-box;font-size:.9rem}:host .popup-lite .modal-header .header-title.padded{left:15px}:host .popup-lite .modal-body{background-color:#fff;box-sizing:border-box;padding:10px;overflow-y:auto}:host .popup-lite .modal-footer{background-color:#fff;box-sizing:border-box;border-radius:0 0 2px 2px;min-width:100%;min-height:20px;padding:5px 10px}:host .popup-lite .modal-footer .right{text-align:right}:host .header-off{border-top-left-radius:2px;border-top-right-radius:5px}:host .footer-off{border-bottom-right-radius:5px;border-bottom-left-radius:2px}:host .minimized{padding-top:0!important;padding-bottom:0!important;min-height:0!important}:host .maximized{top:0!important;left:0!important;min-width:100%!important;min-height:100%!important}:host .maximized .modal-footer,:host .maximized .modal-header{width:100%}:host .maximized .modal-body{min-width:100%;min-height:95vh}:host .minimized{min-height:0!important;height:0!important}:host .minified{border-radius:6px!important}:host .popup-lite.maximized{height:inherit!important;min-height:inherit!important}:host .pinned{border:1px dotted red}:host .block-key-events{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}"]
    })
], PopupLiteComponent);
export { PopupLiteComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbGl0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvcG9wdXAtbGl0ZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9wdXAtbGl0ZS9jb21wb25lbnRzL3BvcHVwLWxpdGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQix3QkFBd0IsRUFDeEIsUUFBUSxFQUNSLFlBQVksRUFDWixTQUFTLEVBQ1QsUUFBUSxFQUNSLGNBQWMsRUFDZCxlQUFlLEVBQ2YsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBVWxDLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBZ0Q5QixZQUNDLEVBQWMsRUFDTix3QkFBa0QsRUFDbEQsTUFBc0IsRUFDdEIsUUFBa0IsRUFDbEIsUUFBaUI7UUFIakIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFuRGxCLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBaUIxQixXQUFNLEdBQWlCO1lBQ3RCLEVBQUUsRUFBQyxFQUFFO1lBQ0wsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsS0FBSztZQUNkLGNBQWMsRUFBRSxLQUFLO1lBQ3JCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUMsS0FBSztZQUNkLFNBQVMsRUFBQyxLQUFLO1lBQ2YsUUFBUSxFQUFFLEtBQUs7WUFDZixLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBQyxLQUFLO1lBRWIsTUFBTSxFQUFDLEVBQUU7WUFDVCxLQUFLLEVBQUMsRUFBRTtZQUNSLGFBQWEsRUFBQyxFQUFFO1lBQ2hCLGFBQWEsRUFBQyxFQUFFO1lBQ2hCLFFBQVEsRUFBQyxFQUFFO1lBQ1gs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Q0FBQzttREFBcUI7QUFDakI7SUFBekMsU0FBUyxDQUFDLFlBQVksRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQztzREFBd0I7QUFHakU7SUFEQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7a0RBT3pDO0FBakJXLGtCQUFrQjtJQUw5QixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUMsWUFBWTtRQUNyQiwwK0dBQTBDOztLQUU3QyxDQUFDO0dBQ1csa0JBQWtCLENBOE85QjtTQTlPWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7XG5cdENvbXBvbmVudCxcblx0Vmlld0NvbnRhaW5lclJlZixcblx0Q29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuXHRSZW5kZXJlcixcblx0SG9zdExpc3RlbmVyLFxuXHRWaWV3Q2hpbGQsXG5cdEluamVjdG9yLFxuXHRBcHBsaWNhdGlvblJlZixcblx0RW1iZWRkZWRWaWV3UmVmLFxuXHRFbGVtZW50UmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBEcmFnRXZlbnQgfSBmcm9tICdAc2VkZWgvZHJhZy1lbmFibGVkJztcbmltcG9ydCB7IFBvcHVwTGl0ZUNvbnRlbnRDb21wb25lbnQsIFdpbmRvd0xpdGVTZWxlY3Rpb24sIFBvcHVwTGl0ZU9wdGlvbnMsIFdpbmRvd09wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3BvcHVwLWxpdGUuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6J3BvcHVwLWxpdGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wb3B1cC1saXRlLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vcG9wdXAtbGl0ZS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBvcHVwTGl0ZUNvbXBvbmVudCB7XG5cdHByaXZhdGUgZWw6SFRNTEVsZW1lbnQ7XG5cdHByaXZhdGUgZXh0cmFjbGFzc2VzID0gXCJcIjtcblx0cHJpdmF0ZSBzZWxlY3RvcjogV2luZG93TGl0ZVNlbGVjdGlvbjtcblxuXHRAVmlld0NoaWxkKFwiY29udGVudFwiLCB7c3RhdGljOiBmYWxzZX0pIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cdEBWaWV3Q2hpbGQoXCJtb2RhbFdvbmRvd1wiLCB7c3RhdGljOiBmYWxzZX0pIG1vZGFsV29uZG93OiBFbGVtZW50UmVmO1xuXHRAVmlld0NoaWxkKFwicmVzaXplclwiLCB7c3RhdGljOiBmYWxzZX0pIHJlc2l6ZXI6IEVsZW1lbnRSZWY7XG5cdEBWaWV3Q2hpbGQoXCJkcmFnSGVhZGVyXCIsIHtzdGF0aWM6IGZhbHNlfSkgZHJhZ0hlYWRlcjogRWxlbWVudFJlZjtcblx0XG5cdEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxuXHRvblJlc2l6ZShldmVudDphbnkpIHtcblx0XHRpZih0aGlzLmNvbmZpZy5jZW50ZXJlZCAmJiAhdGhpcy5jb25maWcucGlubmVkKXtcblx0XHRcdGxldCBuZSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLnBvcHVwLWxpdGUnKTtcblx0XHRcdGxldCByb290OiBIVE1MRWxlbWVudCA9IHRoaXMuZWwucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKG5lLCAnbGVmdCcsICgocm9vdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aC1uZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkvMikgKyBcInB4XCIpO1xuXHRcdH1cblx0fVxuXG5cdGNvbmZpZzogV2luZG93T3B0aW9ucyA9e1xuXHRcdGlkOicnLFxuXHRcdGNsb3NlOiBmYWxzZSxcblx0XHRvdmVybGF5OiBmYWxzZSxcblx0XHRjbG9zZU9uT3ZlcmxheTogZmFsc2UsXG5cdFx0bWluaW1pemU6IGZhbHNlLFxuXHRcdG1heGltaXplOiBmYWxzZSxcblx0XHRkcmFnYWJsZTpmYWxzZSxcblx0XHRyZXNpemFibGU6ZmFsc2UsXG5cdFx0Y2VudGVyZWQ6IGZhbHNlLFxuXHRcdGZpeGVkOiBmYWxzZSxcblx0XHRwaW5hYmxlOmZhbHNlLFxuXG5cdFx0aGVpZ2h0OicnLFxuXHRcdHdpZHRoOicnLFxuXHRcdG1heEJvZHlIZWlnaHQ6JycsXG5cdFx0bWluQm9keUhlaWdodDonJyxcblx0XHRtaW5XaWR0aDonJyxcblx0XHRtYXhXaWR0aDonJyxcblx0XHRhZGp1c3RIZWlnaHQ6ZmFsc2UsXG5cdFx0aXNPcGVuOiBmYWxzZSxcblx0XHRpc09wZW5pbmc6ZmFsc2UsXG5cdFx0bWluaW1pemVkOmZhbHNlLFxuXHRcdG1heGltaXplZDpmYWxzZSxcblx0XHRwaW5uZWQ6ZmFsc2UsXG5cdFx0ekluZGV4OjEwMCxcblx0XHR0b3A6ICcnXG5cdH1cblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRlbDogRWxlbWVudFJlZiwgXG5cdFx0cHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcblx0XHRwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG5cdFx0cHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG5cdFx0cHJpdmF0ZSByZW5kZXJlcjpSZW5kZXJlcikge1xuXHRcdHRoaXMuZWwgPSBlbC5uYXRpdmVFbGVtZW50O1xuICAgIH1cblxuXHRwcml2YXRlIGNhbGNNYXhIZWlnaHQobm9kZTphbnksIHRhcmdldDpzdHJpbmcpe1xuXHRcdGxldCBsaXN0ID0gbm9kZS5jaGlsZE5vZGVzO1xuXHRcdGxldCBtYXggPSAwO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0ICAgaWYobGlzdFtpXS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpPT09dGFyZ2V0KXtcblx0XHRcdCAgIGxpc3QgPSBsaXN0W2ldLmNoaWxkTm9kZXM7XG5cdFx0XHQgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0ICAgaWYobGlzdFtpXS5ub2RlVHlwZT09PTEpe1xuXHRcdFx0XHRcdCAgIG1heCArPSAobGlzdFtpXS5jbGllbnRIZWlnaHQrbGlzdFtpXS5vZmZzZXRIZWlnaHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHQgICB9XG4gICAgICAgIH1cbiAgICBcdHJldHVybiBtYXg7XG5cdH1cblxuXHRpbml0KGNvbXBvbmVudCwgZGF0YSwgY29uZmlnOiBQb3B1cExpdGVPcHRpb25zLCBzZWxlY3RvcjogV2luZG93TGl0ZVNlbGVjdGlvbikge1xuXHRcdGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuXHRcdGNvbnN0IGNvbXBvbmVudFJlZiA9IGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXHRcdGNvbnN0IGluc3RhbmNlID0gKDxQb3B1cExpdGVDb250ZW50Q29tcG9uZW50PmNvbXBvbmVudFJlZi5pbnN0YW5jZSk7XG5cblx0XHR0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG5cdFx0dGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuYXBwZW5kQ2hpbGQoKGNvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50KTtcblx0XHRpbnN0YW5jZS5kYXRhID0gZGF0YTtcblx0XHRpbnN0YW5jZS5pZCA9IGNvbmZpZy5pZDtcblxuXHRcdGlmKGluc3RhbmNlLnBvcHVwVGl0bGUpIHtcblx0XHRcdGNvbmZpZy5wb3B1cFRpdGxlID0gaW5zdGFuY2UucG9wdXBUaXRsZS5iaW5kKGluc3RhbmNlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uZmlnLnBvcHVwVGl0bGUgPSAoaWQpID0+IGlkO1xuXHRcdH1cblx0XHRcblx0XHRpZiAoY29uZmlnKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoY29uZmlnKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0dGhpcy5jb25maWdba2V5XSA9IGNvbmZpZ1trZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0dGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuXG5cdFx0dGhpcy5kaXNwbGF5KGNvbmZpZyk7XG5cdH1cblx0XHRcblx0cHVibGljIGRpc3BsYXkocHJvcHM6V2luZG93T3B0aW9ucyl7XG5cdFx0dGhpcy5jb25maWcubWF4Qm9keUhlaWdodCA9IHByb3BzICYmIHByb3BzLm1heEhlaWdodCA/IHByb3BzLm1heEhlaWdodDonJztcblx0XHQgdGhpcy5jb25maWcubWluV2lkdGggPSBwcm9wcyAmJiBwcm9wcy5taW5XaWR0aCA/IHByb3BzLm1pbldpZHRoOicnO1xuXHRcdCB0aGlzLmNvbmZpZy5tYXhXaWR0aCA9IHByb3BzICYmIHByb3BzLm1heFdpZHRoID8gcHJvcHMubWF4V2lkdGg6Jyc7XG5cdFx0IHRoaXMuY29uZmlnLnRvcCA9IHByb3BzICYmIHByb3BzLnRvcCA/IHByb3BzLnRvcCA6ICcnO1xuXHRcdCB0aGlzLmNvbmZpZy5pc09wZW5pbmcgPSB0cnVlO1xuXHRcdCB0aGlzLmNvbmZpZy5hZGp1c3RIZWlnaHQgPSBwcm9wcyAmJiBwcm9wcy5hZGp1c3RIZWlnaHQgPyBwcm9wcy5hZGp1c3RIZWlnaHQgOiBmYWxzZTtcblx0XHQgdGhpcy5leHRyYWNsYXNzZXMgPSB0aGlzLmNvbmZpZy5oZWFkZXIgPyBcIlwiOlwiaGVhZGVyLW9mZiBcIjtcblx0XHQgdGhpcy5leHRyYWNsYXNzZXMgKz0gdGhpcy5jb25maWcuZm9vdGVyID8gXCJcIjpcImZvb3Rlci1vZmYgXCI7XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdHRoaXMub25SZXNpemUobnVsbCk7XG5cdFx0XHR0aGlzLmNvbmZpZy5pc09wZW4gPSB0cnVlO1xuXHRcdH0uYmluZCh0aGlzKSwxMCk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0a2V5VXAoZXZlbnQpIHtcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGNvbnN0IGNvZGUgPSBldmVudC53aGljaDtcblxuXHRcdGlmIChjb2RlID09PSAxMykge1xuXHRcdFx0ZXZlbnQudGFyZ2V0LmNsaWNrKCk7XG5cdFx0fVx0XHRcblx0fVxuXHRjbG9zZU92ZXJsYXkoKXtcblx0XHRpZiAodGhpcy5jb25maWcuY2xvc2VPbk92ZXJsYXkpIHtcblx0XHR0aGlzLmNsb3NlTW9kYWwobnVsbCwgeyBpZDogdGhpcy5jb25maWcuaWQsIGNvbmZpcm1lZDogZmFsc2UgfSk7XG5cdFx0fVxuXHR9XG5cdG9uQ2xvc2UoZXZlbnQpIHtcblx0XHR0aGlzLmNsb3NlTW9kYWwoZXZlbnQsIHsgaWQ6IHRoaXMuY29uZmlnLmlkLCBjb25maXJtZWQ6IGZhbHNlIH0pO1xuXHR9XG5cdGNsb3NlTW9kYWwoJGV2ZW50OmFueSwgcmVzdWx0KXtcblx0XHR0aGlzLmNvbmZpZy5pc09wZW5pbmcgPSBmYWxzZTtcblx0XHR0aGlzLmNvbmZpZy5vdmVybGF5ID0gZmFsc2U7XG5cdFx0dGhpcy5jb25maWcuaXNPcGVuID0gZmFsc2U7XG5cdFx0dGhpcy5zZWxlY3Rvci5wb3BlZE91dCh0aGlzLmNvbmZpZy5pZCwgcmVzdWx0KTtcblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRtaW5pbWl6ZU1vZGFsKCRldmVudDphbnkpe1xuXHRcdHRoaXMuY29uZmlnLm1pbmltaXplZCA9ICF0aGlzLmNvbmZpZy5taW5pbWl6ZWQ7XG5cdFx0aWYodGhpcy5jb25maWcucmVzaXphYmxlKXtcblx0XHQgIGxldCBuZTphbnkgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5yZXNpemUtY29ybmVyJyk7XG5cdFx0ICBsZXQgd246YW55ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtbGl0ZScpO1xuXHRcdCAgbGV0IGJkOmFueSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHQgIGlmKCF0aGlzLmNvbmZpZy5taW5pbWl6ZWQpe2JkLnN0eWxlLmhlaWdodD1iZC5nZXRBdHRyaWJ1dGUoXCJvaFwiKTtiZC5zdHlsZS5tYXhIZWlnaHQ9IFwiaW5oZXJpdFwiO31cblx0XHQgIGVsc2Uge1xuXHRcdCAgYmQuc3R5bGUuaGVpZ2h0ID0gXCIwXCI7XG5cdFx0ICB3bi5zdHlsZS5oZWlnaHQ9XCJpbmhlcml0XCJcblx0XHQgIH1cblx0XHQgIG5lLnN0eWxlLmRpc3BsYXk9ICh0aGlzLmNvbmZpZy5taW5pbWl6ZWQgfHwgdGhpcy5jb25maWcubWF4aW1pemVkKSA/ICdub25lJzonYmxvY2snO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0bWF4aW1pemVNb2RhbCgkZXZlbnQ6YW55KXtcblx0XHR0aGlzLmNvbmZpZy5tYXhpbWl6ZWQgPSAhdGhpcy5jb25maWcubWF4aW1pemVkO1xuXHRcdGlmKHRoaXMuY29uZmlnLnJlc2l6YWJsZSl7XG5cdFx0ICBsZXQgbmU6YW55ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcucmVzaXplLWNvcm5lcicpO1xuXHRcdCAgbGV0IGJkOmFueSA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHQgIGlmKGJkLmdldEF0dHJpYnV0ZShcIm9oXCIpKXtiZC5zdHlsZS5oZWlnaHQ9YmQuZ2V0QXR0cmlidXRlKFwib2hcIik7fVxuXHRcdCAgbmUuc3R5bGUuZGlzcGxheT0gKHRoaXMuY29uZmlnLm1pbmltaXplZCB8fCB0aGlzLmNvbmZpZy5tYXhpbWl6ZWQpID8gJ25vbmUnOidibG9jayc7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRzZWxlY3RlZCgkZXZlbnQ6IGFueSl7XG5cdFx0dGhpcy5zZWxlY3Rvci5zZXRTZWxlY3RlZCh0aGlzLmNvbmZpZy5pZCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0cGluTW9kYWwoJGV2ZW50OmFueSl7XG5cdFx0dGhpcy5jb25maWcucGlubmVkID0gIXRoaXMuY29uZmlnLnBpbm5lZDtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRkcmFnRW5hYmxlZChldmVudDogRHJhZ0V2ZW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuY29uZmlnLmRyYWdhYmxlICYmICF0aGlzLmNvbmZpZy5waW5uZWQ7XG5cdH1cblx0b25EcmFnU3RhcnQoZXZlbnQ6IERyYWdFdmVudCl7XG5cdH1cblx0b25EcmFnKGV2ZW50OiBEcmFnRXZlbnQpe1xuXHRcdGlmKGV2ZW50Lm5vZGUgPT09IHRoaXMuZHJhZ0hlYWRlci5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICdsZWZ0JywgKGV2ZW50LmNsaWVudFgtZXZlbnQub2Zmc2V0LngpK1wicHhcIik7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICd0b3AnLCAoZXZlbnQuY2xpZW50WS1ldmVudC5vZmZzZXQueSkrXCJweFwiKTtcblx0XHR9XG5cdH1cblx0b25EcmFnRW5kKGV2ZW50OiBEcmFnRXZlbnQpe1xuXHRcdGlmKGV2ZW50Lm5vZGUgPT09IHRoaXMuZHJhZ0hlYWRlci5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICdsZWZ0JywgKGV2ZW50LmNsaWVudFgtZXZlbnQub2Zmc2V0LngpK1wicHhcIik7XG5cdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICd0b3AnLCAoZXZlbnQuY2xpZW50WS1ldmVudC5vZmZzZXQueSkrXCJweFwiKTtcblx0XHR9XG5cdH1cblxuXHRyZXNpemVFbmFibGVkKGV2ZW50OiBEcmFnRXZlbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5jb25maWcucmVzaXphYmxlO1xuXHR9XG5cdG9uUmVzaXplU3RhcnQoZXZlbnQ6IERyYWdFdmVudCl7XG5cdH1cblx0b25SZXNpemVQcm9ncmVzcyhldmVudDogRHJhZ0V2ZW50KXtcblx0XHRpZihldmVudC5ub2RlID09PSB0aGlzLnJlc2l6ZXIubmF0aXZlRWxlbWVudCkge1xuXHRcdFx0Y29uc3Qgd3IgPSBldmVudC5tZWRpdW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRjb25zdCB3aWR0aCA9ICAoZXZlbnQuY2xpZW50WC1ldmVudC5vZmZzZXQueCkgLSB3ci5sZWZ0O1xuXHRcdFx0Y29uc3QgaGVpZ2h0ID0gKGV2ZW50LmNsaWVudFktZXZlbnQub2Zmc2V0LnkpIC0gd3IudG9wO1xuXHRcdFx0bGV0IGhkID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtaGVhZGVyJyk7XG5cdFx0XHRsZXQgZnQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1mb290ZXInKTtcblx0XHRcdGxldCBiZCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHRcdGxldCBmdGg9IGZ0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdGxldCBoZGg9IGhkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcblx0XHRcdGxldCBoID0gaGVpZ2h0IC0gaGRoIC0gZnRoIC0yO1xuXG5cdFx0XHRpZih3aWR0aD4yMDAgJiYgaGVpZ2h0PjYwKXtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoZXZlbnQubWVkaXVtLCAnd2lkdGgnLCB3aWR0aCtcInB4XCIpO1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICdoZWlnaHQnLCBoZWlnaHQrXCJweFwiKTtcblx0XHRcdFx0dGhpcy5yZW5kZXJlci5zZXRFbGVtZW50U3R5bGUoYmQsICdoZWlnaHQnLCBoK1wicHhcIik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdG9uUmVzaXplRW5kKGV2ZW50OiBEcmFnRXZlbnQpe1xuXHRcdGlmKGV2ZW50Lm5vZGUgPT09IHRoaXMucmVzaXplci5uYXRpdmVFbGVtZW50KSB7XG5cdFx0XHRjb25zdCB3ciA9IGV2ZW50Lm1lZGl1bS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGNvbnN0IHdpZHRoID0gIChldmVudC5jbGllbnRYLWV2ZW50Lm9mZnNldC54KSAtIHdyLmxlZnQ7XG5cdFx0XHRjb25zdCBoZWlnaHQgPSAoZXZlbnQuY2xpZW50WS1ldmVudC5vZmZzZXQueSkgLSB3ci50b3A7XG5cblx0XHRcdGlmKHdpZHRoPjIwMCAmJiBoZWlnaHQ+NjApe1xuXHRcdFx0XHRsZXQgaGQgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1oZWFkZXInKTtcblx0XHRcdFx0bGV0IGZ0ID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtZm9vdGVyJyk7XG5cdFx0XHRcdGxldCBiZCA9IHRoaXMuZWwucXVlcnlTZWxlY3RvcignLm1vZGFsLWJvZHknKTtcblx0XHRcdFx0bGV0IGZ0aD0gZnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXHRcdFx0XHRsZXQgaGRoPSBoZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cdFx0XHRcdGxldCBoID0gaGVpZ2h0IC0gaGRoIC0gZnRoIC0yO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShldmVudC5tZWRpdW0sICd3aWR0aCcsIHdpZHRoK1wicHhcIik7XG5cdFx0XHRcdHRoaXMucmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKGV2ZW50Lm1lZGl1bSwgJ2hlaWdodCcsIGhlaWdodCtcInB4XCIpO1xuXHRcdFx0XHR0aGlzLnJlbmRlcmVyLnNldEVsZW1lbnRTdHlsZShiZCwgJ2hlaWdodCcsIGgrXCJweFwiKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiJdfQ==