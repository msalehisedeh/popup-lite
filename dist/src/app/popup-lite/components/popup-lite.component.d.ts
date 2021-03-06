import { ComponentFactoryResolver, Renderer, Injector, ApplicationRef, ElementRef } from "@angular/core";
import { DragEvent } from '@sedeh/drag-enabled';
import { WindowLiteSelection, PopupLiteOptions, WindowOptions } from '../interfaces/popup-lite.interface';
export declare class PopupLiteComponent {
    private componentFactoryResolver;
    private appRef;
    private injector;
    private renderer;
    private el;
    private extraclasses;
    private selector;
    content: ElementRef;
    modalWondow: ElementRef;
    resizer: ElementRef;
    dragHeader: ElementRef;
    onResize(event: any): void;
    config: WindowOptions;
    constructor(el: ElementRef, componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector, renderer: Renderer);
    private calcMaxHeight;
    init(component: any, data: any, config: PopupLiteOptions, selector: WindowLiteSelection): void;
    display(props: WindowOptions): boolean;
    keyUp(event: any): void;
    closeOverlay(): void;
    onClose(event: any): void;
    closeModal($event: any, result: any): boolean;
    minimizeModal($event: any): boolean;
    maximizeModal($event: any): boolean;
    selected($event: any): boolean;
    pinModal($event: any): boolean;
    dragEnabled(event: DragEvent): boolean;
    onDragStart(event: DragEvent): void;
    onDrag(event: DragEvent): void;
    onDragEnd(event: DragEvent): void;
    resizeEnabled(event: DragEvent): boolean;
    onResizeStart(event: DragEvent): void;
    onResizeProgress(event: DragEvent): void;
    onResizeEnd(event: DragEvent): void;
}
