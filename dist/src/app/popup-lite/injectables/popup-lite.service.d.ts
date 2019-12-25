import { Injector, ComponentFactoryResolver, ApplicationRef } from '@angular/core';
import { Observable } from 'rxjs';
import { PopupLiteOptions, WindowLiteSelection, WindowLiteService } from '../interfaces/popup-lite.interface';
export declare class PopupLiteService implements WindowLiteService, WindowLiteSelection {
    private componentFactoryResolver;
    private appRef;
    private injector;
    private componentRef;
    private domElem;
    private status;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector);
    private createPopupLiteComponent;
    popedOut(id: any, result: any): void;
    setSelected(id: any): void;
    openWindow(component: any, id: string, data?: any, config?: PopupLiteOptions): Observable<any>;
    openModal(component: any, id: string, data?: any, config?: PopupLiteOptions): Observable<any>;
    openDialog(component: any, id: string, data?: any, config?: PopupLiteOptions): Observable<any>;
    confirm(id: any, data: {}): void;
    cancel(id: any, data: {}): void;
}
