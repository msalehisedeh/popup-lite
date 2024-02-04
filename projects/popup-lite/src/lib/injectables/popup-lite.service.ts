
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
	private  componentRef: any = {};
	private  domElem!: any;
	private status: any[] = [];
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
  
	popedOut(id: any, result: any) {
		const ref = this.componentRef[id];
		
		this.appRef.detachView(ref.hostView);
		ref.destroy();

		delete this.componentRef[id];

		this.status[id].next(result);
		delete this.status[id];
	}
	setSelected(id: any){
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
			const list: string[] = Object.keys(config);
			list.map((key: any) => {
				(<any>localConfig)[key] = (<any>config)[key];
			})
		}
		localConfig.id = id ? id : ''+new Date().getTime();

		this.componentRef[localConfig.id] = ref;
		(<any>this.status)[localConfig.id] = new Subject<any>();

		setTimeout(() => instance.init(component, data, localConfig, this), 111);
		this.setSelected(localConfig.id);

		return (<any>this.status)[localConfig.id];
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
			list.map((key: string) => {
				(<any>localConfig)[key] = (<any>config)[key];
			})
		}
		localConfig.id = id ? id : ''+new Date().getTime();

		this.componentRef[localConfig.id] = ref;
		(<any>this.status)[localConfig.id] = new Subject<any>();

		setTimeout(() => instance.init(component, data, localConfig, this), 111);
		this.setSelected(localConfig.id);

		return (<any>this.status)[localConfig.id];
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
			list.map((key: any) => {
				(<any>localConfig)[key] = (<any>config)[key];
			})
		}
		localConfig.id = id ? id : ''+new Date().getTime();

		this.componentRef[localConfig.id] = ref;
		(<any>this.status)[localConfig.id] = new Subject<any>();

		setTimeout(() => instance.init(component, data, localConfig, this), 111);
		this.setSelected(localConfig.id);

		return (<any>this.status)[localConfig.id];
	}

	confirm(id: any, data: any) {
		const info: any = { 
			id: id, 
			confirmed: true 
		};
		if (data) {
			const list: any[] = Object.keys(data);
			list.map((key: any) => {
				info[key] = data[key];
			})
		}
		this.popedOut(id, info);
	}
	cancel(id: any, data: any) {
		const info: any = { 
			id: id, 
			confirmed: true 
		};
		if (data) {
			const list: any[] = Object.keys(data);
			list.map((key: any) => {
				info[key] = data[key];
			})
		}
		this.popedOut(id, { id: id, confirmed: false });
	}

}