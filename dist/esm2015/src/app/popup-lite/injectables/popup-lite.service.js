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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbGl0ZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNlZGVoL3BvcHVwLWxpdGUvIiwic291cmNlcyI6WyJzcmMvYXBwL3BvcHVwLWxpdGUvaW5qZWN0YWJsZXMvcG9wdXAtbGl0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQ0gsVUFBVSxFQUNWLFFBQVEsRUFDUix3QkFBd0IsRUFFeEIsY0FBYyxFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQWMsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBSXhFLE1BQU07Ozs7OztJQU1KLFlBQ1ksMEJBQ0EsUUFDQTtRQUZBLDZCQUF3QixHQUF4Qix3QkFBd0I7UUFDeEIsV0FBTSxHQUFOLE1BQU07UUFDTixhQUFRLEdBQVIsUUFBUTs0QkFSRyxFQUFFO3NCQUVULEVBQUU7S0FPYjs7OztJQUVFLHdCQUF3Qjs7UUFDL0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLHdCQUF3QjthQUN2Qyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQzthQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsT0FBTyxxQkFBRyxtQkFBQyxHQUFHLENBQUMsUUFBZ0MsRUFBQzthQUNuRCxTQUFTLENBQUMsQ0FBQyxDQUFnQixDQUFBLENBQUM7UUFFOUIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXhDLE1BQU0sQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7SUFHWixRQUFRLENBQUMsRUFBRSxFQUFFLE1BQVc7O1FBQ3ZCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxZ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YmxlLFxuICAgIEluamVjdG9yLFxuICAgIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBFbWJlZGRlZFZpZXdSZWYsXG4gICAgQXBwbGljYXRpb25SZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBQb3B1cExpdGVDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3BvcHVwLWxpdGUuY29tcG9uZW50JztcbmltcG9ydCB7IFBvcHVwTGl0ZU9wdGlvbnMsIFdpbmRvd09wdGlvbnMsIFdpbmRvd0xpdGVTZWxlY3Rpb24sIFdpbmRvd0xpdGVTZXJ2aWNlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9wb3B1cC1saXRlLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb3B1cExpdGVTZXJ2aWNlIGltcGxlbWVudHMgV2luZG93TGl0ZVNlcnZpY2UsIFdpbmRvd0xpdGVTZWxlY3Rpb24ge1xuXHRwcml2YXRlICBjb21wb25lbnRSZWYgPSB7fTtcblx0cHJpdmF0ZSAgZG9tRWxlbTtcblx0cHJpdmF0ZSBzdGF0dXMgPSBbXTtcblx0Ly8gcHJpdmF0ZSB3aW5kb3dzTGlzdDogUG9wdXBMaXRlQ29tcG9uZW50W10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxuICApIHsgfVxuXG5cdHByaXZhdGUgY3JlYXRlUG9wdXBMaXRlQ29tcG9uZW50KCkge1xuXHRcdGNvbnN0IHJlZiA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG5cdFx0XHQucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoUG9wdXBMaXRlQ29tcG9uZW50KVxuXHRcdFx0LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcblxuXHRcdHRoaXMuYXBwUmVmLmF0dGFjaFZpZXcocmVmLmhvc3RWaWV3KTtcblxuXHRcdHRoaXMuZG9tRWxlbSA9IChyZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pXG5cdFx0XHQucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmRvbUVsZW0pO1xuXG5cdFx0cmV0dXJuIHJlZjtcblx0fVxuICBcblx0cG9wZWRPdXQoaWQsIHJlc3VsdDogYW55KSB7XG5cdFx0Y29uc3QgcmVmID0gdGhpcy5jb21wb25lbnRSZWZbaWRdO1xuXHRcdFxuXHRcdHRoaXMuYXBwUmVmLmRldGFjaFZpZXcocmVmLmhvc3RWaWV3KTtcblx0XHRyZWYuZGVzdHJveSgpO1xuXG5cdFx0ZGVsZXRlIHRoaXMuY29tcG9uZW50UmVmW2lkXTtcblxuXHRcdHRoaXMuc3RhdHVzW2lkXS5uZXh0KHJlc3VsdCk7XG5cdFx0ZGVsZXRlIHRoaXMuc3RhdHVzW2lkXTtcblx0fVxuXHRzZXRTZWxlY3RlZChpZCl7XG5cdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKHRoaXMuY29tcG9uZW50UmVmKTtcblxuXHRcdGxpc3QubWFwKChyZWYpPT4ge1xuXHRcdFx0KDxQb3B1cExpdGVDb21wb25lbnQ+dGhpcy5jb21wb25lbnRSZWZbcmVmXS5pbnN0YW5jZSkuY29uZmlnLnNlbGVjdGVkID0gZmFsc2U7XG5cdFx0fSk7XG5cdFx0KDxQb3B1cExpdGVDb21wb25lbnQ+dGhpcy5jb21wb25lbnRSZWZbaWRdLmluc3RhbmNlKS5jb25maWcuc2VsZWN0ZWQgPSB0cnVlO1xuXHR9XG5cblx0b3BlbldpbmRvdyhjb21wb25lbnQ6IGFueSwgaWQ6IHN0cmluZywgZGF0YT86IGFueSwgY29uZmlnPzogUG9wdXBMaXRlT3B0aW9ucyk6IE9ic2VydmFibGU8YW55Pntcblx0XHRjb25zdCByZWYgPSB0aGlzLmNyZWF0ZVBvcHVwTGl0ZUNvbXBvbmVudCgpO1xuXHRcdGNvbnN0IGluc3RhbmNlID0gKDxQb3B1cExpdGVDb21wb25lbnQ+cmVmLmluc3RhbmNlKTtcblx0XHRjb25zdCBsb2NhbENvbmZpZzogV2luZG93T3B0aW9ucyA9IHtcblx0XHRcdGNsb3NlOiB0cnVlLFxuXHRcdFx0bWluaW1pemU6IHRydWUsXG5cdFx0XHRtYXhpbWl6ZTogdHJ1ZSxcblx0XHRcdHJlc2l6YWJsZTp0cnVlLFxuXHRcdFx0aGVhZGVyOiB0cnVlLFxuXHRcdFx0Zm9vdGVyOiB0cnVlLFxuXHRcdFx0ZHJhZ2FibGU6dHJ1ZSxcblx0XHRcdHBpbmFibGU6dHJ1ZSxcblx0XHRcdGlkT25IZWFkZXI6IHRydWUsXG5cdFx0XHRjZW50ZXJlZDogdHJ1ZVxuXHRcdH07XG5cdFx0aWYgKGNvbmZpZykge1xuXHRcdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKGNvbmZpZyk7XG5cdFx0XHRsaXN0Lm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRcdGxvY2FsQ29uZmlnW2tleV0gPSBjb25maWdba2V5XTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGxvY2FsQ29uZmlnLmlkID0gaWQgPyBpZCA6ICcnK25ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG5cdFx0dGhpcy5jb21wb25lbnRSZWZbbG9jYWxDb25maWcuaWRdID0gcmVmO1xuXHRcdHRoaXMuc3RhdHVzW2xvY2FsQ29uZmlnLmlkXSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuXHRcdGluc3RhbmNlLmluaXQoY29tcG9uZW50LCBkYXRhLCBsb2NhbENvbmZpZywgdGhpcyk7XG5cdFx0dGhpcy5zZXRTZWxlY3RlZChsb2NhbENvbmZpZy5pZCk7XG5cblx0XHRyZXR1cm4gdGhpcy5zdGF0dXNbbG9jYWxDb25maWcuaWRdO1xuXHR9XG5cblx0b3Blbk1vZGFsKGNvbXBvbmVudDogYW55LCBpZDogc3RyaW5nLCBkYXRhPzogYW55LCBjb25maWc/OiBQb3B1cExpdGVPcHRpb25zKTogT2JzZXJ2YWJsZTxhbnk+e1xuXHRcdGNvbnN0IHJlZiA9IHRoaXMuY3JlYXRlUG9wdXBMaXRlQ29tcG9uZW50KCk7XG5cdFx0Y29uc3QgaW5zdGFuY2UgPSAoPFBvcHVwTGl0ZUNvbXBvbmVudD5yZWYuaW5zdGFuY2UpO1xuXHRcdGNvbnN0IGxvY2FsQ29uZmlnOiBXaW5kb3dPcHRpb25zID0ge1xuXHRcdFx0b3ZlcmxheTogdHJ1ZSxcblx0XHRcdGNsb3NlOiB0cnVlLFxuXHRcdFx0Y2xvc2VPbk92ZXJsYXk6IHRydWUsXG5cdFx0XHRoZWFkZXI6IHRydWUsXG5cdFx0XHRmb290ZXI6IHRydWUsXG5cdFx0XHRjZW50ZXJlZDogdHJ1ZVxuXHRcdH07XG5cblx0XHRpZiAoY29uZmlnKSB7XG5cdFx0XHRjb25zdCBsaXN0ID0gT2JqZWN0LmtleXMoY29uZmlnKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0bG9jYWxDb25maWdba2V5XSA9IGNvbmZpZ1trZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0bG9jYWxDb25maWcuaWQgPSBpZCA/IGlkIDogJycrbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cblx0XHR0aGlzLmNvbXBvbmVudFJlZltsb2NhbENvbmZpZy5pZF0gPSByZWY7XG5cdFx0dGhpcy5zdGF0dXNbbG9jYWxDb25maWcuaWRdID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG5cdFx0aW5zdGFuY2UuaW5pdChjb21wb25lbnQsIGRhdGEsIGxvY2FsQ29uZmlnLCB0aGlzKTtcblx0XHR0aGlzLnNldFNlbGVjdGVkKGxvY2FsQ29uZmlnLmlkKTtcblxuXHRcdHJldHVybiB0aGlzLnN0YXR1c1tsb2NhbENvbmZpZy5pZF07XG5cdH1cblxuXHRvcGVuRGlhbG9nKGNvbXBvbmVudDogYW55LCBpZDogc3RyaW5nLCBkYXRhPzogYW55LCBjb25maWc/OiBQb3B1cExpdGVPcHRpb25zKTogT2JzZXJ2YWJsZTxhbnk+e1xuXHRcdGNvbnN0IHJlZiA9IHRoaXMuY3JlYXRlUG9wdXBMaXRlQ29tcG9uZW50KCk7XG5cdFx0Y29uc3QgaW5zdGFuY2UgPSAoPFBvcHVwTGl0ZUNvbXBvbmVudD5yZWYuaW5zdGFuY2UpO1xuXHRcdGNvbnN0IGxvY2FsQ29uZmlnOiBXaW5kb3dPcHRpb25zID0ge1xuXHRcdFx0b3ZlcmxheTogdHJ1ZSxcblx0XHRcdGNsb3NlOiB0cnVlLFxuXHRcdFx0Y2xvc2VPbk92ZXJsYXk6IHRydWUsXG5cdFx0XHRoZWFkZXI6IHRydWUsXG5cdFx0XHRmb290ZXI6IHRydWUsXG5cdFx0XHRjZW50ZXJlZDogdHJ1ZVxuXHRcdH07XG5cdFx0aWYgKGNvbmZpZykge1xuXHRcdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKGNvbmZpZyk7XG5cdFx0XHRsaXN0Lm1hcCgoa2V5KSA9PiB7XG5cdFx0XHRcdGxvY2FsQ29uZmlnW2tleV0gPSBjb25maWdba2V5XTtcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGxvY2FsQ29uZmlnLmlkID0gaWQgPyBpZCA6ICcnK25ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG5cdFx0dGhpcy5jb21wb25lbnRSZWZbbG9jYWxDb25maWcuaWRdID0gcmVmO1xuXHRcdHRoaXMuc3RhdHVzW2xvY2FsQ29uZmlnLmlkXSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuXHRcdGluc3RhbmNlLmluaXQoY29tcG9uZW50LCBkYXRhLCBsb2NhbENvbmZpZywgdGhpcyk7XG5cdFx0dGhpcy5zZXRTZWxlY3RlZChsb2NhbENvbmZpZy5pZCk7XG5cblx0XHRyZXR1cm4gdGhpcy5zdGF0dXNbbG9jYWxDb25maWcuaWRdO1xuXHR9XG5cblx0Y29uZmlybShpZCwgZGF0YToge30pIHtcblx0XHRjb25zdCBpbmZvID0geyBcblx0XHRcdGlkOiBpZCwgXG5cdFx0XHRjb25maXJtZWQ6IHRydWUgXG5cdFx0fTtcblx0XHRpZiAoZGF0YSkge1xuXHRcdFx0Y29uc3QgbGlzdCA9IE9iamVjdC5rZXlzKGRhdGEpO1xuXHRcdFx0bGlzdC5tYXAoKGtleSkgPT4ge1xuXHRcdFx0XHRpbmZvW2tleV0gPSBkYXRhW2tleV07XG5cdFx0XHR9KVxuXHRcdH1cblx0XHR0aGlzLnBvcGVkT3V0KGlkLCBpbmZvKTtcblx0fVxuXHRjYW5jZWwoaWQsIGRhdGE6IHt9KSB7XG5cdFx0Y29uc3QgaW5mbyA9IHsgXG5cdFx0XHRpZDogaWQsIFxuXHRcdFx0Y29uZmlybWVkOiB0cnVlIFxuXHRcdH07XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGNvbnN0IGxpc3QgPSBPYmplY3Qua2V5cyhkYXRhKTtcblx0XHRcdGxpc3QubWFwKChrZXkpID0+IHtcblx0XHRcdFx0aW5mb1trZXldID0gZGF0YVtrZXldO1xuXHRcdFx0fSlcblx0XHR9XG5cdFx0dGhpcy5wb3BlZE91dChpZCwgeyBpZDogaWQsIGNvbmZpcm1lZDogZmFsc2UgfSk7XG5cdH1cblxufSJdfQ==