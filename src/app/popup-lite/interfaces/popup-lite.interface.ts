
import { Observable } from 'rxjs';

export interface PopupLiteContentComponent {
	data: any;
	id: string;
}

export interface PopupLiteOptions {
	id?:string,
	overlay?: boolean,
	close?: boolean,
	closeOnOverlay?:boolean,
	minimize?: boolean,
	maximize?: boolean,
	resizable?: boolean,
	dragable?:boolean,
	centered?:boolean,
	fixed?:boolean,
	pinable?:boolean,
	header?: boolean,
	footer?: boolean,
	idOnHeader?:boolean,

	maxHeight?:string,
	minWidth?:string,
	maxWidth?:string,
}
export interface WindowOptions extends PopupLiteOptions {
	selected?:boolean,
	isOpen?: boolean,
	isOpening?: boolean,
	minimized?:boolean,
	maximized?:boolean,
	pinned?:boolean,

	top?: string,
	height?: string,
	width?: string,
	maxHeight?: string,
	maxBodyHeight?:string,
	minBodyHeight?:string,
	adjustHeight?:boolean,
	zIndex?: number
}

export interface WindowLiteSelection {
	popedOut(id, result: any);
	setSelected(id);
}

export interface WindowLiteService {
	openWindow(component: any, id: string, data?: any, options?: PopupLiteOptions): Observable<any>;
	openModal(component: any, id: string, data?: any, options?: PopupLiteOptions): Observable<any>;
	openDialog(component: any, id: string, data?: any, options?: PopupLiteOptions): Observable<any>;
}

