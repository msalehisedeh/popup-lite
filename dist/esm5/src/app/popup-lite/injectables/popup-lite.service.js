/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import { Subject } from 'rxjs';
import { PopupLiteComponent } from '../components/popup-lite.component';
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
export { PopupLiteService };
if (false) {
    /** @type {?} */
    PopupLiteService.prototype.componentRef;
    /** @type {?} */
    PopupLiteService.prototype.domElem;
    /** @type {?} */
    PopupLiteService.prototype.status;
    /** @type {?} */
    PopupLiteService.prototype.componentFactoryResolver;
    /** @type {?} */
    PopupLiteService.prototype.appRef;
    /** @type {?} */
    PopupLiteService.prototype.injector;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbGl0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcG9wdXAtbGl0ZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9wdXAtbGl0ZS9pbmplY3RhYmxlcy9wb3B1cC1saXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFDSCxVQUFVLEVBQ1YsUUFBUSxFQUNSLHdCQUF3QixFQUV4QixjQUFjLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7O0lBUXZFLGtEQUFrRDtJQUVqRCwwQkFDWSwwQkFDQSxRQUNBO1FBRkEsNkJBQXdCLEdBQXhCLHdCQUF3QjtRQUN4QixXQUFNLEdBQU4sTUFBTTtRQUNOLGFBQVEsR0FBUixRQUFROzRCQVJHLEVBQUU7c0JBRVQsRUFBRTtLQU9iOzs7O0lBRUUsbURBQXdCOzs7OztRQUMvQixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsd0JBQXdCO2FBQ3ZDLHVCQUF1QixDQUFDLGtCQUFrQixDQUFDO2FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxPQUFPLHFCQUFHLG1CQUFDLEdBQUcsQ0FBQyxRQUFnQyxFQUFDO2FBQ25ELFNBQVMsQ0FBQyxDQUFDLENBQWdCLENBQUEsQ0FBQztRQUU5QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQzs7Ozs7OztJQUdaLG1DQUFROzs7OztJQUFSLFVBQVMsRUFBRSxFQUFFLE1BQVc7O1FBQ3ZCLElBQU0sR0FBRyxHQUFHLElBQUks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b3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7XG4gICAgSW5qZWN0YWJsZSxcbiAgICBJbmplY3RvcixcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgRW1iZWRkZWRWaWV3UmVmLFxuICAgIEFwcGxpY2F0aW9uUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUG9wdXBMaXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9wb3B1cC1saXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQb3B1cExpdGVPcHRpb25zLCBXaW5kb3dPcHRpb25zLCBXaW5kb3dMaXRlU2VsZWN0aW9uLCBXaW5kb3dMaXRlU2VydmljZSB9IGZyb20gJy4uL2ludGVyZmFjZXMvcG9wdXAtbGl0ZS5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUG9wdXBMaXRlU2VydmljZSBpbXBsZW1lbnRzIFdpbmRvd0xpdGVTZXJ2aWNlLCBXaW5kb3dMaXRlU2VsZWN0aW9uIHtcblx0cHJpdmF0ZSAgY29tcG9uZW50UmVmID0ge307XG5cdHByaXZhdGUgIGRvbUVsZW07XG5cdHByaXZhdGUgc3RhdHVzID0gW107XG5cdC8vIHByaXZhdGUgd2luZG93c0xpc3Q6IFBvcHVwTGl0ZUNvbXBvbmVudFtdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmLFxuICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3JcbiAgKSB7IH1cblxuXHRwcml2YXRlIGNyZWF0ZVBvcHVwTGl0ZUNvbXBvbmVudCgpIHtcblx0XHRjb25zdCByZWYgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxuXHRcdFx0LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFBvcHVwTGl0ZUNvbXBvbmVudClcblx0XHRcdC5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG5cblx0XHR0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KHJlZi5ob3N0Vmlldyk7XG5cblx0XHR0aGlzLmRvbUVsZW0gPSAocmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KVxuXHRcdFx0LnJvb3ROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcblxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5kb21FbGVtKTtcblxuXHRcdHJldHVybiByZWY7XG5cdH1cbiAgXG5cdHBvcGVkT3V0KGlkLCByZXN1bHQ6IGFueSkge1xuXHRcdGNvbnN0IHJlZiA9IHRoaXMuY29tcG9uZW50UmVmW2lkXTtcblx0XHRcblx0XHR0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KHJlZi5ob3N0Vmlldyk7XG5cdFx0cmVmLmRlc3Ryb3koKTtcblxuXHRcdGRlbGV0ZSB0aGlzLmNvbXBvbmVudFJlZltpZF07XG5cblx0XHR0aGlzLnN0YXR1c1tpZF0ubmV4dChyZXN1bHQpO1xuXHRcdGRlbGV0ZSB0aGlzLnN0YXR1c1tpZF07XG5cdH1cblx0c2V0U2VsZWN0ZWQoaWQpe1xuXHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyh0aGlzLmNvbXBvbmVudFJlZik7XG5cblx0XHRsaXN0Lm1hcCgocmVmKT0+IHtcblx0XHRcdCg8UG9wdXBMaXRlQ29tcG9uZW50PnRoaXMuY29tcG9uZW50UmVmW3JlZl0uaW5zdGFuY2UpLmNvbmZpZy5zZWxlY3RlZCA9IGZhbHNlO1xuXHRcdH0pO1xuXHRcdCg8UG9wdXBMaXRlQ29tcG9uZW50PnRoaXMuY29tcG9uZW50UmVmW2lkXS5pbnN0YW5jZSkuY29uZmlnLnNlbGVjdGVkID0gdHJ1ZTtcblx0fVxuXG5cdG9wZW5XaW5kb3coY29tcG9uZW50OiBhbnksIGlkOiBzdHJpbmcsIGRhdGE/OiBhbnksIGNvbmZpZz86IFBvcHVwTGl0ZU9wdGlvbnMpOiBPYnNlcnZhYmxlPGFueT57XG5cdFx0Y29uc3QgcmVmID0gdGhpcy5jcmVhdGVQb3B1cExpdGVDb21wb25lbnQoKTtcblx0XHRjb25zdCBpbnN0YW5jZSA9ICg8UG9wdXBMaXRlQ29tcG9uZW50PnJlZi5pbnN0YW5jZSk7XG5cdFx0Y29uc3QgbG9jYWxDb25maWc6IFdpbmRvd09wdGlvbnMgPSB7XG5cdFx0XHRjbG9zZTogdHJ1ZSxcblx0XHRcdG1pbmltaXplOiB0cnVlLFxuXHRcdFx0bWF4aW1pemU6IHRydWUsXG5cdFx0XHRyZXNpemFibGU6dHJ1ZSxcblx0XHRcdGhlYWRlcjogdHJ1ZSxcblx0XHRcdGZvb3RlcjogdHJ1ZSxcblx0XHRcdGRyYWdhYmxlOnRydWUsXG5cdFx0XHRwaW5hYmxlOnRydWUsXG5cdFx0XHRpZE9uSGVhZGVyOiB0cnVlLFxuXHRcdFx0Y2VudGVyZWQ6IHRydWVcblx0XHR9O1xuXHRcdGlmIChjb25maWcpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhjb25maWcpO1xuXHRcdFx0bGlzdC5tYXAoKGtleSkgPT4ge1xuXHRcdFx0XHRsb2NhbENvbmZpZ1trZXldID0gY29uZmlnW2tleV07XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRsb2NhbENvbmZpZy5pZCA9IGlkID8gaWQgOiAnJytuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuXHRcdHRoaXMuY29tcG9uZW50UmVmW2xvY2FsQ29uZmlnLmlkXSA9IHJlZjtcblx0XHR0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF0gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cblx0XHRpbnN0YW5jZS5pbml0KGNvbXBvbmVudCwgZGF0YSwgbG9jYWxDb25maWcsIHRoaXMpO1xuXHRcdHRoaXMuc2V0U2VsZWN0ZWQobG9jYWxDb25maWcuaWQpO1xuXG5cdFx0cmV0dXJuIHRoaXMuc3RhdHVzW2xvY2FsQ29uZmlnLmlkXTtcblx0fVxuXG5cdG9wZW5Nb2RhbChjb21wb25lbnQ6IGFueSwgaWQ6IHN0cmluZywgZGF0YT86IGFueSwgY29uZmlnPzogUG9wdXBMaXRlT3B0aW9ucyk6IE9ic2VydmFibGU8YW55Pntcblx0XHRjb25zdCByZWYgPSB0aGlzLmNyZWF0ZVBvcHVwTGl0ZUNvbXBvbmVudCgpO1xuXHRcdGNvbnN0IGluc3RhbmNlID0gKDxQb3B1cExpdGVDb21wb25lbnQ+cmVmLmluc3RhbmNlKTtcblx0XHRjb25zdCBsb2NhbENvbmZpZzogV2luZG93T3B0aW9ucyA9IHtcblx0XHRcdG92ZXJsYXk6IHRydWUsXG5cdFx0XHRjbG9zZTogdHJ1ZSxcblx0XHRcdGNsb3NlT25PdmVybGF5OiB0cnVlLFxuXHRcdFx0aGVhZGVyOiB0cnVlLFxuXHRcdFx0Zm9vdGVyOiB0cnVlLFxuXHRcdFx0Y2VudGVyZWQ6IHRydWVcblx0XHR9O1xuXG5cdFx0aWYgKGNvbmZpZykge1xuXHRcdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKGNvbmZpZyk7XG5cdFx0XHRsaXN0Lm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRcdGxvY2FsQ29uZmlnW2tleV0gPSBjb25maWdba2V5XTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGxvY2FsQ29uZmlnLmlkID0gaWQgPyBpZCA6ICcnK25ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG5cdFx0dGhpcy5jb21wb25lbnRSZWZbbG9jYWxDb25maWcuaWRdID0gcmVmO1xuXHRcdHRoaXMuc3RhdHVzW2xvY2FsQ29uZmlnLmlkXSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuXHRcdGluc3RhbmNlLmluaXQoY29tcG9uZW50LCBkYXRhLCBsb2NhbENvbmZpZywgdGhpcyk7XG5cdFx0dGhpcy5zZXRTZWxlY3RlZChsb2NhbENvbmZpZy5pZCk7XG5cblx0XHRyZXR1cm4gdGhpcy5zdGF0dXNbbG9jYWxDb25maWcuaWRdO1xuXHR9XG5cblx0b3BlbkRpYWxvZyhjb21wb25lbnQ6IGFueSwgaWQ6IHN0cmluZywgZGF0YT86IGFueSwgY29uZmlnPzogUG9wdXBMaXRlT3B0aW9ucyk6IE9ic2VydmFibGU8YW55Pntcblx0XHRjb25zdCByZWYgPSB0aGlzLmNyZWF0ZVBvcHVwTGl0ZUNvbXBvbmVudCgpO1xuXHRcdGNvbnN0IGluc3RhbmNlID0gKDxQb3B1cExpdGVDb21wb25lbnQ+cmVmLmluc3RhbmNlKTtcblx0XHRjb25zdCBsb2NhbENvbmZpZzogV2luZG93T3B0aW9ucyA9IHtcblx0XHRcdG92ZXJsYXk6IHRydWUsXG5cdFx0XHRjbG9zZTogdHJ1ZSxcblx0XHRcdGNsb3NlT25PdmVybGF5OiB0cnVlLFxuXHRcdFx0aGVhZGVyOiB0cnVlLFxuXHRcdFx0Zm9vdGVyOiB0cnVlLFxuXHRcdFx0Y2VudGVyZWQ6IHRydWVcblx0XHR9O1xuXHRcdGlmIChjb25maWcpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhjb25maWcpO1xuXHRcdFx0bGlzdC5tYXAoKGtleSkgPT4ge1xuXHRcdFx0XHRsb2NhbENvbmZpZ1trZXldID0gY29uZmlnW2tleV07XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRsb2NhbENvbmZpZy5pZCA9IGlkID8gaWQgOiAnJytuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuXHRcdHRoaXMuY29tcG9uZW50UmVmW2xvY2FsQ29uZmlnLmlkXSA9IHJlZjtcblx0XHR0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF0gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cblx0XHRpbnN0YW5jZS5pbml0KGNvbXBvbmVudCwgZGF0YSwgbG9jYWxDb25maWcsIHRoaXMpO1xuXHRcdHRoaXMuc2V0U2VsZWN0ZWQobG9jYWxDb25maWcuaWQpO1xuXG5cdFx0cmV0dXJuIHRoaXMuc3RhdHVzW2xvY2FsQ29uZmlnLmlkXTtcblx0fVxuXG5cdGNvbmZpcm0oaWQsIGRhdGE6IHt9KSB7XG5cdFx0Y29uc3QgaW5mbyA9IHsgXG5cdFx0XHRpZDogaWQsIFxuXHRcdFx0Y29uZmlybWVkOiB0cnVlIFxuXHRcdH07XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhkYXRhKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0aW5mb1trZXldID0gZGF0YVtrZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0dGhpcy5wb3BlZE91dChpZCwgaW5mbyk7XG5cdH1cblx0Y2FuY2VsKGlkLCBkYXRhOiB7fSkge1xuXHRcdGNvbnN0IGluZm8gPSB7IFxuXHRcdFx0aWQ6IGlkLCBcblx0XHRcdGNvbmZpcm1lZDogdHJ1ZSBcblx0XHR9O1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoZGF0YSk7XG5cdFx0XHRsaXN0Lm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRcdGluZm9ba2V5XSA9IGRhdGFba2V5XTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdHRoaXMucG9wZWRPdXQoaWQsIHsgaWQ6IGlkLCBjb25maXJtZWQ6IGZhbHNlIH0pO1xuXHR9XG5cbn0iXX0=