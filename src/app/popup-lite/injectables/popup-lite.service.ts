
import {
    Injectable,
    Injector,
    ComponentFactoryResolver,
    EmbeddedViewRef,
    ApplicationRef
} from '@angular/core';

import { Observable, Subject} from 'rxjs';

import { PopupLiteComponent } from '../components/popup-lite.component';
import { PopupLiteOptions, WindowOptions, WindowLiteSelection, WindowLiteService } from '../interfaces/popup-lite.interface';

@Injectable()
export class PopupLiteService implements WindowLiteService, WindowLiteSelection {
	private  componentRef = {};
	private  domElem;
	private status = [];
	// private windowsList: PopupLiteComponent[] = [];

  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
      private appRef: ApplicationRef,
      private injector: Injector
  ) { }

	private createPopupLiteComponent() {
		const ref = this.componentFactoryResolver
			.resolveComponentFactory(PopupLiteComponent)
			.create(this.injector);

		this.appRef.attachView(ref.hostView);

		this.domElem = (ref.hostView as EmbeddedViewRef<any>)
			.rootNodes[0] as HTMLElement;

		document.body.appendChild(this.domElem);

		return ref;
	}
  
	popedOut(id, result: any) {
		const ref = this.componentRef[id];
		
		this.appRef.detachView(ref.hostView);
		ref.destroy();

		delete this.componentRef[id];

		this.status[id].next(result);
		delete this.status[id];
	}
	setSelected(id){
		const list = Object.keys(this.componentRef);

		list.map((ref)=> {
			(<PopupLiteComponent>this.componentRef[ref].instance).config.selected = false;
		});
		(<PopupLiteComponent>this.componentRef[id].instance).config.selected = true;
	}

	openWindow(component: any, id: string, data?: any, config?: PopupLiteOptions): Observable<any>{
		const ref = this.createPopupLiteComponent();
		const instance = (<PopupLiteComponent>ref.instance);
		const localConfig: WindowOptions = {
			close: true,
			minimize: true,
			maximize: true,
			resizable:true,
			header: true,
			footer: true,
			dragable:true,
			pinable:true,
			idOnHeader: true,
			centered: true
		};
		if (config) {
			const list = Object.keys(config);
			list.map((key) => {
				localConfig[key] = config[key];
			})
		}
		localConfig.id = id ? id : ''+new Date().getTime();

		this.componentRef[localConfig.id] = ref;
		this.status[localConfig.id] = new Subject<any>();

		setTimeout(() => instance.init(component, data, localConfig, this), 111);
		this.setSelected(localConfig.id);

		return this.status[localConfig.id];
	}

	openModal(component: any, id: string, data?: any, config?: PopupLiteOptions): Observable<any>{
		const ref = this.createPopupLiteComponent();
		const instance = (<PopupLiteComponent>ref.instance);
		const localConfig: WindowOptions = {
			overlay: true,
			close: true,
			closeOnOverlay: true,
			header: true,
			footer: true,
			centered: true
		};

		if (config) {
			const list = Object.keys(config);
			list.map((key) => {
				localConfig[key] = config[key];
			})
		}
		localConfig.id = id ? id : ''+new Date().getTime();

		this.componentRef[localConfig.id] = ref;
		this.status[localConfig.id] = new Subject<any>();

		setTimeout(() => instance.init(component, data, localConfig, this), 111);
		this.setSelected(localConfig.id);

		return this.status[localConfig.id];
	}

	openDialog(component: any, id: string, data?: any, config?: PopupLiteOptions): Observable<any>{
		const ref = this.createPopupLiteComponent();
		const instance = (<PopupLiteComponent>ref.instance);
		const localConfig: WindowOptions = {
			overlay: true,
			close: true,
			closeOnOverlay: true,
			header: true,
			footer: true,
			centered: true
		};
		if (config) {
			const list = Object.keys(config);
			list.map((key) => {
				localConfig[key] = config[key];
			})
		}
		localConfig.id = id ? id : ''+new Date().getTime();

		this.componentRef[localConfig.id] = ref;
		this.status[localConfig.id] = new Subject<any>();

		setTimeout(() => instance.init(component, data, localConfig, this), 111);
		this.setSelected(localConfig.id);

		return this.status[localConfig.id];
	}

	confirm(id, data: {}) {
		const info = { 
			id: id, 
			confirmed: true 
		};
		if (data) {
			const list = Object.keys(data);
			list.map((key) => {
				info[key] = data[key];
			})
		}
		this.popedOut(id, info);
	}
	cancel(id, data: {}) {
		const info = { 
			id: id, 
			confirmed: true 
		};
		if (data) {
			const list = Object.keys(data);
			list.map((key) => {
				info[key] = data[key];
			})
		}
		this.popedOut(id, { id: id, confirmed: false });
	}

}