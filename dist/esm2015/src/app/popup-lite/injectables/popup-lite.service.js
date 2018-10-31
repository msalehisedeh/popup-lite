/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import { Subject } from 'rxjs';
import { PopupLiteComponent } from '../components/popup-lite.component';
export class PopupLiteService {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} appRef
     * @param {?} injector
     */
    constructor(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
        this.componentRef = {};
        this.status = [];
    }
    /**
     * @return {?}
     */
    createPopupLiteComponent() {
        /** @type {?} */
        const ref = this.componentFactoryResolver
            .resolveComponentFactory(PopupLiteComponent)
            .create(this.injector);
        this.appRef.attachView(ref.hostView);
        this.domElem = /** @type {?} */ ((/** @type {?} */ (ref.hostView))
            .rootNodes[0]);
        document.body.appendChild(this.domElem);
        return ref;
    }
    /**
     * @param {?} id
     * @param {?} result
     * @return {?}
     */
    popedOut(id, result) {
        /** @type {?} */
        const ref = this.componentRef[id];
        this.appRef.detachView(ref.hostView);
        ref.destroy();
        delete this.componentRef[id];
        this.status[id].next(result);
        delete this.status[id];
    }
    /**
     * @param {?} id
     * @return {?}
     */
    setSelected(id) {
        /** @type {?} */
        const list = Object.keys(this.componentRef);
        list.map((ref) => {
            (/** @type {?} */ (this.componentRef[ref].instance)).config.selected = false;
        });
        (/** @type {?} */ (this.componentRef[id].instance)).config.selected = true;
    }
    /**
     * @param {?} component
     * @param {?} id
     * @param {?=} data
     * @param {?=} config
     * @return {?}
     */
    openWindow(component, id, data, config) {
        /** @type {?} */
        const ref = this.createPopupLiteComponent();
        /** @type {?} */
        const instance = (/** @type {?} */ (ref.instance));
        /** @type {?} */
        const localConfig = {
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
            const list = Object.keys(config);
            list.map((key) => {
                localConfig[key] = config[key];
            });
        }
        localConfig.id = id ? id : '' + new Date().getTime();
        this.componentRef[localConfig.id] = ref;
        this.status[localConfig.id] = new Subject();
        instance.init(component, data, localConfig, this);
        this.setSelected(localConfig.id);
        return this.status[localConfig.id];
    }
    /**
     * @param {?} component
     * @param {?} id
     * @param {?=} data
     * @param {?=} config
     * @return {?}
     */
    openModal(component, id, data, config) {
        /** @type {?} */
        const ref = this.createPopupLiteComponent();
        /** @type {?} */
        const instance = (/** @type {?} */ (ref.instance));
        /** @type {?} */
        const localConfig = {
            overlay: true,
            close: true,
            closeOnOverlay: true,
            header: true,
            footer: true,
            centered: true
        };
        if (config) {
            /** @type {?} */
            const list = Object.keys(config);
            list.map((key) => {
                localConfig[key] = config[key];
            });
        }
        localConfig.id = id ? id : '' + new Date().getTime();
        this.componentRef[localConfig.id] = ref;
        this.status[localConfig.id] = new Subject();
        instance.init(component, data, localConfig, this);
        this.setSelected(localConfig.id);
        return this.status[localConfig.id];
    }
    /**
     * @param {?} component
     * @param {?} id
     * @param {?=} data
     * @param {?=} config
     * @return {?}
     */
    openDialog(component, id, data, config) {
        /** @type {?} */
        const ref = this.createPopupLiteComponent();
        /** @type {?} */
        const instance = (/** @type {?} */ (ref.instance));
        /** @type {?} */
        const localConfig = {
            overlay: true,
            close: true,
            closeOnOverlay: true,
            header: true,
            footer: true,
            centered: true
        };
        if (config) {
            /** @type {?} */
            const list = Object.keys(config);
            list.map((key) => {
                localConfig[key] = config[key];
            });
        }
        localConfig.id = id ? id : '' + new Date().getTime();
        this.componentRef[localConfig.id] = ref;
        this.status[localConfig.id] = new Subject();
        instance.init(component, data, localConfig, this);
        this.setSelected(localConfig.id);
        return this.status[localConfig.id];
    }
    /**
     * @param {?} id
     * @param {?} data
     * @return {?}
     */
    confirm(id, data) {
        /** @type {?} */
        const info = {
            id: id,
            confirmed: true
        };
        if (data) {
            /** @type {?} */
            const list = Object.keys(data);
            list.map((key) => {
                info[key] = data[key];
            });
        }
        this.popedOut(id, info);
    }
    /**
     * @param {?} id
     * @param {?} data
     * @return {?}
     */
    cancel(id, data) {
        /** @type {?} */
        const info = {
            id: id,
            confirmed: true
        };
        if (data) {
            /** @type {?} */
            const list = Object.keys(data);
            list.map((key) => {
                info[key] = data[key];
            });
        }
        this.popedOut(id, { id: id, confirmed: false });
    }
}
PopupLiteService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PopupLiteService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ApplicationRef },
    { type: Injector }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbGl0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcG9wdXAtbGl0ZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9wdXAtbGl0ZS9pbmplY3RhYmxlcy9wb3B1cC1saXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFDSCxVQUFVLEVBQ1YsUUFBUSxFQUNSLHdCQUF3QixFQUV4QixjQUFjLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBYyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFJeEUsTUFBTTs7Ozs7O0lBTUosWUFDWSwwQkFDQSxRQUNBO1FBRkEsNkJBQXdCLEdBQXhCLHdCQUF3QjtRQUN4QixXQUFNLEdBQU4sTUFBTTtRQUNOLGFBQVEsR0FBUixRQUFROzRCQVJHLEVBQUU7c0JBRVQsRUFBRTtLQU9iOzs7O0lBRUUsd0JBQXdCOztRQUMvQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsd0JBQXdCO2FBQ3ZDLHVCQUF1QixDQUFDLGtCQUFrQixDQUFDO2FBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxPQUFPLHFCQUFHLG1CQUFDLEdBQUcsQ0FBQyxRQUFnQyxFQUFDO2FBQ25ELFNBQVMsQ0FBQyxDQUFDLENBQWdCLENBQUEsQ0FBQztRQUU5QixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFeEMsTUFBTSxDQUFDLEdBQUcsQ0FBQzs7Ozs7OztJQUdaLFFBQVEsQ0FBQyxFQUFFLEVBQUUsTUFBVzs7UUFDdkIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FB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ICAgSW5qZWN0b3IsXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIEVtYmVkZGVkVmlld1JlZixcbiAgICBBcHBsaWNhdGlvblJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFBvcHVwTGl0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcG9wdXAtbGl0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9wdXBMaXRlT3B0aW9ucywgV2luZG93T3B0aW9ucywgV2luZG93TGl0ZVNlbGVjdGlvbiwgV2luZG93TGl0ZVNlcnZpY2UgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3BvcHVwLWxpdGUuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBvcHVwTGl0ZVNlcnZpY2UgaW1wbGVtZW50cyBXaW5kb3dMaXRlU2VydmljZSwgV2luZG93TGl0ZVNlbGVjdGlvbiB7XG5cdHByaXZhdGUgIGNvbXBvbmVudFJlZiA9IHt9O1xuXHRwcml2YXRlICBkb21FbGVtO1xuXHRwcml2YXRlIHN0YXR1cyA9IFtdO1xuXHQvLyBwcml2YXRlIHdpbmRvd3NMaXN0OiBQb3B1cExpdGVDb21wb25lbnRbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgIHByaXZhdGUgYXBwUmVmOiBBcHBsaWNhdGlvblJlZixcbiAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yXG4gICkgeyB9XG5cblx0cHJpdmF0ZSBjcmVhdGVQb3B1cExpdGVDb21wb25lbnQoKSB7XG5cdFx0Y29uc3QgcmVmID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcblx0XHRcdC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShQb3B1cExpdGVDb21wb25lbnQpXG5cdFx0XHQuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuXG5cdFx0dGhpcy5hcHBSZWYuYXR0YWNoVmlldyhyZWYuaG9zdFZpZXcpO1xuXG5cdFx0dGhpcy5kb21FbGVtID0gKHJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pilcblx0XHRcdC5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG5cblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbSk7XG5cblx0XHRyZXR1cm4gcmVmO1xuXHR9XG4gIFxuXHRwb3BlZE91dChpZCwgcmVzdWx0OiBhbnkpIHtcblx0XHRjb25zdCByZWYgPSB0aGlzLmNvbXBvbmVudFJlZltpZF07XG5cdFx0XG5cdFx0dGhpcy5hcHBSZWYuZGV0YWNoVmlldyhyZWYuaG9zdFZpZXcpO1xuXHRcdHJlZi5kZXN0cm95KCk7XG5cblx0XHRkZWxldGUgdGhpcy5jb21wb25lbnRSZWZbaWRdO1xuXG5cdFx0dGhpcy5zdGF0dXNbaWRdLm5leHQocmVzdWx0KTtcblx0XHRkZWxldGUgdGhpcy5zdGF0dXNbaWRdO1xuXHR9XG5cdHNldFNlbGVjdGVkKGlkKXtcblx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXModGhpcy5jb21wb25lbnRSZWYpO1xuXG5cdFx0bGlzdC5tYXAoKHJlZik9PiB7XG5cdFx0XHQoPFBvcHVwTGl0ZUNvbXBvbmVudD50aGlzLmNvbXBvbmVudFJlZltyZWZdLmluc3RhbmNlKS5jb25maWcuc2VsZWN0ZWQgPSBmYWxzZTtcblx0XHR9KTtcblx0XHQoPFBvcHVwTGl0ZUNvbXBvbmVudD50aGlzLmNvbXBvbmVudFJlZltpZF0uaW5zdGFuY2UpLmNvbmZpZy5zZWxlY3RlZCA9IHRydWU7XG5cdH1cblxuXHRvcGVuV2luZG93KGNvbXBvbmVudDogYW55LCBpZDogc3RyaW5nLCBkYXRhPzogYW55LCBjb25maWc/OiBQb3B1cExpdGVPcHRpb25zKTogT2JzZXJ2YWJsZTxhbnk+e1xuXHRcdGNvbnN0IHJlZiA9IHRoaXMuY3JlYXRlUG9wdXBMaXRlQ29tcG9uZW50KCk7XG5cdFx0Y29uc3QgaW5zdGFuY2UgPSAoPFBvcHVwTGl0ZUNvbXBvbmVudD5yZWYuaW5zdGFuY2UpO1xuXHRcdGNvbnN0IGxvY2FsQ29uZmlnOiBXaW5kb3dPcHRpb25zID0ge1xuXHRcdFx0Y2xvc2U6IHRydWUsXG5cdFx0XHRtaW5pbWl6ZTogdHJ1ZSxcblx0XHRcdG1heGltaXplOiB0cnVlLFxuXHRcdFx0cmVzaXphYmxlOnRydWUsXG5cdFx0XHRoZWFkZXI6IHRydWUsXG5cdFx0XHRmb290ZXI6IHRydWUsXG5cdFx0XHRkcmFnYWJsZTp0cnVlLFxuXHRcdFx0cGluYWJsZTp0cnVlLFxuXHRcdFx0aWRPbkhlYWRlcjogdHJ1ZSxcblx0XHRcdGNlbnRlcmVkOiB0cnVlXG5cdFx0fTtcblx0XHRpZiAoY29uZmlnKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoY29uZmlnKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0bG9jYWxDb25maWdba2V5XSA9IGNvbmZpZ1trZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0bG9jYWxDb25maWcuaWQgPSBpZCA/IGlkIDogJycrbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cblx0XHR0aGlzLmNvbXBvbmVudFJlZltsb2NhbENvbmZpZy5pZF0gPSByZWY7XG5cdFx0dGhpcy5zdGF0dXNbbG9jYWxDb25maWcuaWRdID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG5cdFx0aW5zdGFuY2UuaW5pdChjb21wb25lbnQsIGRhdGEsIGxvY2FsQ29uZmlnLCB0aGlzKTtcblx0XHR0aGlzLnNldFNlbGVjdGVkKGxvY2FsQ29uZmlnLmlkKTtcblxuXHRcdHJldHVybiB0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF07XG5cdH1cblxuXHRvcGVuTW9kYWwoY29tcG9uZW50OiBhbnksIGlkOiBzdHJpbmcsIGRhdGE/OiBhbnksIGNvbmZpZz86IFBvcHVwTGl0ZU9wdGlvbnMpOiBPYnNlcnZhYmxlPGFueT57XG5cdFx0Y29uc3QgcmVmID0gdGhpcy5jcmVhdGVQb3B1cExpdGVDb21wb25lbnQoKTtcblx0XHRjb25zdCBpbnN0YW5jZSA9ICg8UG9wdXBMaXRlQ29tcG9uZW50PnJlZi5pbnN0YW5jZSk7XG5cdFx0Y29uc3QgbG9jYWxDb25maWc6IFdpbmRvd09wdGlvbnMgPSB7XG5cdFx0XHRvdmVybGF5OiB0cnVlLFxuXHRcdFx0Y2xvc2U6IHRydWUsXG5cdFx0XHRjbG9zZU9uT3ZlcmxheTogdHJ1ZSxcblx0XHRcdGhlYWRlcjogdHJ1ZSxcblx0XHRcdGZvb3RlcjogdHJ1ZSxcblx0XHRcdGNlbnRlcmVkOiB0cnVlXG5cdFx0fTtcblxuXHRcdGlmIChjb25maWcpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhjb25maWcpO1xuXHRcdFx0bGlzdC5tYXAoKGtleSkgPT4ge1xuXHRcdFx0XHRsb2NhbENvbmZpZ1trZXldID0gY29uZmlnW2tleV07XG5cdFx0XHR9KVxuXHRcdH1cblx0XHRsb2NhbENvbmZpZy5pZCA9IGlkID8gaWQgOiAnJytuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuXHRcdHRoaXMuY29tcG9uZW50UmVmW2xvY2FsQ29uZmlnLmlkXSA9IHJlZjtcblx0XHR0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF0gPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cblx0XHRpbnN0YW5jZS5pbml0KGNvbXBvbmVudCwgZGF0YSwgbG9jYWxDb25maWcsIHRoaXMpO1xuXHRcdHRoaXMuc2V0U2VsZWN0ZWQobG9jYWxDb25maWcuaWQpO1xuXG5cdFx0cmV0dXJuIHRoaXMuc3RhdHVzW2xvY2FsQ29uZmlnLmlkXTtcblx0fVxuXG5cdG9wZW5EaWFsb2coY29tcG9uZW50OiBhbnksIGlkOiBzdHJpbmcsIGRhdGE/OiBhbnksIGNvbmZpZz86IFBvcHVwTGl0ZU9wdGlvbnMpOiBPYnNlcnZhYmxlPGFueT57XG5cdFx0Y29uc3QgcmVmID0gdGhpcy5jcmVhdGVQb3B1cExpdGVDb21wb25lbnQoKTtcblx0XHRjb25zdCBpbnN0YW5jZSA9ICg8UG9wdXBMaXRlQ29tcG9uZW50PnJlZi5pbnN0YW5jZSk7XG5cdFx0Y29uc3QgbG9jYWxDb25maWc6IFdpbmRvd09wdGlvbnMgPSB7XG5cdFx0XHRvdmVybGF5OiB0cnVlLFxuXHRcdFx0Y2xvc2U6IHRydWUsXG5cdFx0XHRjbG9zZU9uT3ZlcmxheTogdHJ1ZSxcblx0XHRcdGhlYWRlcjogdHJ1ZSxcblx0XHRcdGZvb3RlcjogdHJ1ZSxcblx0XHRcdGNlbnRlcmVkOiB0cnVlXG5cdFx0fTtcblx0XHRpZiAoY29uZmlnKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoY29uZmlnKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0bG9jYWxDb25maWdba2V5XSA9IGNvbmZpZ1trZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0bG9jYWxDb25maWcuaWQgPSBpZCA/IGlkIDogJycrbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cblx0XHR0aGlzLmNvbXBvbmVudFJlZltsb2NhbENvbmZpZy5pZF0gPSByZWY7XG5cdFx0dGhpcy5zdGF0dXNbbG9jYWxDb25maWcuaWRdID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG5cdFx0aW5zdGFuY2UuaW5pdChjb21wb25lbnQsIGRhdGEsIGxvY2FsQ29uZmlnLCB0aGlzKTtcblx0XHR0aGlzLnNldFNlbGVjdGVkKGxvY2FsQ29uZmlnLmlkKTtcblxuXHRcdHJldHVybiB0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF07XG5cdH1cblxuXHRjb25maXJtKGlkLCBkYXRhOiB7fSkge1xuXHRcdGNvbnN0IGluZm8gPSB7IFxuXHRcdFx0aWQ6IGlkLCBcblx0XHRcdGNvbmZpcm1lZDogdHJ1ZSBcblx0XHR9O1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoZGF0YSk7XG5cdFx0XHRsaXN0Lm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRcdGluZm9ba2V5XSA9IGRhdGFba2V5XTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdHRoaXMucG9wZWRPdXQoaWQsIGluZm8pO1xuXHR9XG5cdGNhbmNlbChpZCwgZGF0YToge30pIHtcblx0XHRjb25zdCBpbmZvID0geyBcblx0XHRcdGlkOiBpZCwgXG5cdFx0XHRjb25maXJtZWQ6IHRydWUgXG5cdFx0fTtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKGRhdGEpO1xuXHRcdFx0bGlzdC5tYXAoKGtleSkgPT4ge1xuXHRcdFx0XHRpbmZvW2tleV0gPSBkYXRhW2tleV07XG5cdFx0XHR9KVxuXHRcdH1cblx0XHR0aGlzLnBvcGVkT3V0KGlkLCB7IGlkOiBpZCwgY29uZmlybWVkOiBmYWxzZSB9KTtcblx0fVxuXG59Il19