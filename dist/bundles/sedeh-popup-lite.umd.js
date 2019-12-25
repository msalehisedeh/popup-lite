(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common'), require('@sedeh/drag-enabled')) :
    typeof define === 'function' && define.amd ? define('@sedeh/popup-lite', ['exports', '@angular/core', 'rxjs', '@angular/common', '@sedeh/drag-enabled'], factory) :
    (global = global || self, factory((global.sedeh = global.sedeh || {}, global.sedeh['popup-lite'] = {}), global.ng.core, global.rxjs, global.ng.common, global['drag-enabled']));
}(this, (function (exports, core, rxjs, common, dragEnabled) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var PopupLiteComponent = /** @class */ (function () {
        function PopupLiteComponent(el, componentFactoryResolver, appRef, injector, renderer) {
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
            var componentRef = componentFactory.create(this.injector);
            var instance = componentRef.instance;
            this.appRef.attachView(componentRef.hostView);
            this.content.nativeElement.appendChild(componentRef.hostView.rootNodes[0]);
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
            if (event.node === this.dragHeader.nativeElement) {
                this.renderer.setElementStyle(event.medium, 'left', (event.clientX - event.offset.x) + "px");
                this.renderer.setElementStyle(event.medium, 'top', (event.clientY - event.offset.y) + "px");
            }
        };
        PopupLiteComponent.prototype.onDragEnd = function (event) {
            if (event.node === this.dragHeader.nativeElement) {
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
            if (event.node === this.resizer.nativeElement) {
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
            if (event.node === this.resizer.nativeElement) {
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
        PopupLiteComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ComponentFactoryResolver },
            { type: core.ApplicationRef },
            { type: core.Injector },
            { type: core.Renderer }
        ]; };
        __decorate([
            core.ViewChild("content", { static: false })
        ], PopupLiteComponent.prototype, "content", void 0);
        __decorate([
            core.ViewChild("modalWondow", { static: false })
        ], PopupLiteComponent.prototype, "modalWondow", void 0);
        __decorate([
            core.ViewChild("resizer", { static: false })
        ], PopupLiteComponent.prototype, "resizer", void 0);
        __decorate([
            core.ViewChild("dragHeader", { static: false })
        ], PopupLiteComponent.prototype, "dragHeader", void 0);
        __decorate([
            core.HostListener('window:resize', ['$event'])
        ], PopupLiteComponent.prototype, "onResize", null);
        PopupLiteComponent = __decorate([
            core.Component({
                selector: 'popup-lite',
                template: "<div class=\"popup-lite-overlay\" #overlay\n\t(click)=\"closeOverlay()\"\n\t[style.display]=\"config.overlay ? 'block' : 'none'\"></div>\n<div #modalWondow \n\tclass=\"popup-lite\" \n\ttabindex=\"0\"\n\t[style.minWidth]=\"config.minWidth\"\n\t[style.maxWidth]=\"config.maxWidth\"\n\t[style.display]=\"config.isOpening ? 'block' : 'none'\" \n\t[style.position]=\"config.fixed ? 'fixed':'absolute'\"\n\t[style.top]=\"config.top.length ? config.top : ''\"\n\t[style.height]=\"config.height\"\n\t[style.zIndex]=\"config.zIndex\"\n\t[class.fade-in]=\"config.isOpen\" \n\t[class.maximized]=\"config.maximized\"\n\t[class.pinned]=\"config.pinned\"\n\t[style.z-index]=\"config.selected ? 105 : 100\"\n\t(keyup)=\"keyUp($event)\"\n\t(focus)=\"selected($event)\"\n\t(click)=\"selected($event)\">\n\t<div class=\"controls\">\n\t\t<a *ngIf=\"config.pinable\"\n\t\t\tclass=\"pin\" tabindex=\"0\" \n\t\t\t(click)=\"pinModal($event)\">\n\t\t\t<span *ngIf=\"!config.pinned\" class=\"fa fw fa-unlock\" aria-hidden=\"true\"></span>\n\t\t\t<span *ngIf=\"config.pinned\" class=\"fa fw fa-lock\" aria-hidden=\"true\"></span>\n\t\t\t<span class=\"off-screen\">Pin</span>\n\t\t</a><a *ngIf=\"config.minimize\"\n\t\t\tclass=\"minify\" tabindex=\"0\" \n\t\t\t(click)=\"minimizeModal($event)\" \n\t\t\t[class.clicked]=\"config.minimized\">\n\t\t\t<span class=\"fa fw fa-window-minimize\" aria-hidden=\"true\"></span>\n\t\t\t<span class=\"off-screen\">Minimize</span>\n\t\t</a><a *ngIf=\"config.maximize\"\n\t\t\tclass=\"maxify\" tabindex=\"0\" \n\t\t\t(click)=\"maximizeModal($event)\" \n\t\t\t[class.clicked]=\"config.maximized\">\n\t\t\t<span class=\"fa fw fa-window-maximize\" aria-hidden=\"true\"></span>\n\t\t\t<span class=\"off-screen\">Maximize</span>\n\t\t</a><a *ngIf=\"config.close\"\n\t\t\tclass=\"close\" tabindex=\"0\" \n\t\t\t(click)=\"onClose($event)\">\n\t\t\t<span class=\"fa fw fa-window-close\" aria-hidden=\"true\"></span>\n\t\t\t<span class=\"off-screen\">Close</span>\n\t\t</a>\n\t</div>\n\t<a *ngIf=\"config.resizable\"\n\t\t#resizer\n\t\tclass=\"resize-corner\" \n\t\ttabindex=\"0\" \n\t\t[medium]=\"modalWondow\"\n\t\t[dragInDocument]=\"resizeEnabled.bind(this)\"\n\t\t(onDragStart)=\"onResizeStart($event)\"\n\t\t(onDrag)=\"onResizeProgress($event)\"\n\t\t(onDragEnd)=\"onResizeEnd($event)\">\n\t\t<span class=\"fa fw fa-ellipsis-h\" aria-hidden=\"true\"></span>\n\t\t<span class=\"off-screen\">Resize</span>\n\t</a>\n\t<div *ngIf=\"config.header\"\n\t\t#dragHeader\n\t\tclass=\"modal-header\" \n\t\t[id]=\"config.id\"\n\t\t[style.cursor]=\"(config.dragable && !config.pinned) ? 'all-scroll':'default'\"\n\t\t[class.pinned]=\"config.pinned\"\n\t\t[class.minified]=\"config.minimized\"\n\t\t[medium]=\"modalWondow\"\n\t\t[dragInDocument]=\"dragEnabled.bind(this)\"\n\t\t(onDragStart)=\"onDragStart($event)\"\n\t\t(onDrag)=\"onDrag($event)\"\n\t\t(onDragEnd)=\"onDragEnd($event)\"\n\t\t(dblclick)=\"maximizeModal($event)\">\n\t\t<span *ngIf=\"config.headerIcon\" [class]=\"'icon ' + config.headerIcon\"></span>\n\t\t<span *ngIf=\"config.idOnHeader\" class=\"header-title\" [class.padded]=\"config.headerIcon ? true:null\" [textContent]=\"config.popupTitle(config.id)\"></span>\n\t</div>\n\t<div class=\"modal-body\" #content\n\t\t[class.minimized]=\"config.minimized\"\n\t\t[style.minHeight]=\"config.minBodyHeight\"\n\t\t[style.maxHeight]=\"config.maxBodyHeight\">\n\t</div>\n\t<div class=\"modal-footer\" *ngIf=\"config.footer\"\n\t\t[class.minimized]=\"config.minimized\">\n\t\t<ng-content select=\"[modal-footer]\"></ng-content>\n\t</div>\n</div>\n",
                styles: [":host .centered{text-align:center;margin:0 auto}:host .popup-lite h2{font-size:.8em;margin:0}:host .popup-lite-overlay{position:absolute;background-color:rgba(44,44,44,.44);width:100%;height:100%;top:0;left:0;z-index:104}:host .popup-lite{box-sizing:border-box;position:absolute;top:100px;left:100px;border-radius:6px;padding:0;z-index:100;background-color:transparent;min-width:300px;-ms-box-shadow:0 3px 9px rgba(0,0,0,.5);-o-box-shadow:0 3px 9px rgba(0,0,0,.5);box-shadow:0 3px 9px rgba(0,0,0,.5);opacity:0;transition:opacity .25s ease-in-out}:host .popup-lite .off-screen{display:block;float:left;height:0;overflow:hidden;text-indent:-99999px;width:0}:host .popup-lite.fade-in{opacity:1;transition:opacity .25s ease-in-out}:host .popup-lite .controls{position:absolute;top:0;right:2px;border:1px solid #eee;background-color:#fff;border-radius:2px;border-top:0;z-index:2}:host .popup-lite .controls a{text-align:center;border:1px solid #999;box-sizing:border-box;border-radius:0 0 2px 2px;border-top:0;display:inline-block;width:21px;height:21px}:host .popup-lite .controls a span{display:inline-block}:host .popup-lite .controls a.close{cursor:pointer}:host .popup-lite .controls a.close:hover{color:red}:host .popup-lite .controls a.minify{cursor:pointer}:host .popup-lite .controls a.minify.clicked,:host .popup-lite .controls a.minify:hover{color:red}:host .popup-lite .controls a.pin{cursor:pointer}:host .popup-lite .controls a.pin.clicked,:host .popup-lite .controls a.pin:hover{color:red}:host .popup-lite .controls a.maxify{cursor:pointer}:host .popup-lite .controls a.maxify.clicked,:host .popup-lite .controls a.maxify:hover{color:red}:host .popup-lite a{text-align:center;border:1px solid #999;box-sizing:border-box;border-radius:2px}:host .popup-lite a.resize-corner{position:absolute;height:5px;bottom:12px;right:4px;width:13px;border:0;cursor:se-resize}:host .popup-lite a.resize-corner:hover{color:red}:host .popup-lite .modal-header{background-color:#fff;box-sizing:border-box;border-radius:2px 2px 0 0;min-width:100%;min-height:24px;padding:5px 10px}:host .popup-lite .modal-header .icon{position:absolute;left:5px;top:3px}:host .popup-lite .modal-header .header-title{position:absolute;top:0;left:0;padding:2px 5px;box-sizing:border-box;font-size:.9rem}:host .popup-lite .modal-header .header-title.padded{left:15px}:host .popup-lite .modal-body{background-color:#fff;box-sizing:border-box;padding:10px;overflow-y:auto}:host .popup-lite .modal-footer{background-color:#fff;box-sizing:border-box;border-radius:0 0 2px 2px;min-width:100%;min-height:20px;padding:5px 10px}:host .popup-lite .modal-footer .right{text-align:right}:host .header-off{border-top-left-radius:2px;border-top-right-radius:5px}:host .footer-off{border-bottom-right-radius:5px;border-bottom-left-radius:2px}:host .minimized{padding-top:0!important;padding-bottom:0!important;min-height:0!important}:host .maximized{top:0!important;left:0!important;min-width:100%!important;min-height:100%!important}:host .maximized .modal-footer,:host .maximized .modal-header{width:100%}:host .maximized .modal-body{min-width:100%;min-height:95vh}:host .minimized{min-height:0!important;height:0!important}:host .minified{border-radius:6px!important}:host .popup-lite.maximized{height:inherit!important;min-height:inherit!important}:host .pinned{border:1px dotted red}:host .block-key-events{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}"]
            })
        ], PopupLiteComponent);
        return PopupLiteComponent;
    }());

    var PopupLiteService = /** @class */ (function () {
        // private windowsList: PopupLiteComponent[] = [];
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
            this.domElem = ref.hostView
                .rootNodes[0];
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
                _this.componentRef[ref].instance.config.selected = false;
            });
            this.componentRef[id].instance.config.selected = true;
        };
        PopupLiteService.prototype.openWindow = function (component, id, data, config) {
            var _this = this;
            var ref = this.createPopupLiteComponent();
            var instance = ref.instance;
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
            setTimeout(function () { return instance.init(component, data, localConfig, _this); }, 111);
            this.setSelected(localConfig.id);
            return this.status[localConfig.id];
        };
        PopupLiteService.prototype.openModal = function (component, id, data, config) {
            var _this = this;
            var ref = this.createPopupLiteComponent();
            var instance = ref.instance;
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
            setTimeout(function () { return instance.init(component, data, localConfig, _this); }, 111);
            this.setSelected(localConfig.id);
            return this.status[localConfig.id];
        };
        PopupLiteService.prototype.openDialog = function (component, id, data, config) {
            var _this = this;
            var ref = this.createPopupLiteComponent();
            var instance = ref.instance;
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
            setTimeout(function () { return instance.init(component, data, localConfig, _this); }, 111);
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
        PopupLiteService.ctorParameters = function () { return [
            { type: core.ComponentFactoryResolver },
            { type: core.ApplicationRef },
            { type: core.Injector }
        ]; };
        PopupLiteService = __decorate([
            core.Injectable()
        ], PopupLiteService);
        return PopupLiteService;
    }());

    var PopupLiteModule = /** @class */ (function () {
        function PopupLiteModule() {
        }
        PopupLiteModule = __decorate([
            core.NgModule({
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
            })
        ], PopupLiteModule);
        return PopupLiteModule;
    }());

    exports.PopupLiteComponent = PopupLiteComponent;
    exports.PopupLiteModule = PopupLiteModule;
    exports.PopupLiteService = PopupLiteService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sedeh-popup-lite.umd.js.map
