
import {
	Component,
	ComponentFactory, 
	ReflectiveInjector,
	ViewContainerRef,
	ComponentFactoryResolver,
	Input,
	Output,
	Renderer,
	HostListener,
	EventEmitter,
	Injectable,
	ViewChild,
	ElementRef} from "@angular/core";

import { DragEvent } from 'drag-enabled';

import { PopupLiteService } from '../injectables/popup-lite.service';
import { PopupLiteContentComponent, WindowLiteSelection, PopupLiteOptions, WindowOptions } from '../interfaces/popup-lite.interface';

@Component({
    selector:'popup-lite',
    templateUrl: './popup-lite.component.html',
	styleUrls: ['./popup-lite.component.scss']
})
export class PopupLiteComponent {
	private el:HTMLElement;
	private extraclasses = "";
	private selector: WindowLiteSelection;

	@ViewChild("content", {read: ViewContainerRef}) 
	content: ViewContainerRef;

	@ViewChild("modalWondow", {read: ViewContainerRef}) 
	modalWondow: ViewContainerRef;
	
	@ViewChild("resizer", {read: ViewContainerRef}) 
	resizer: ViewContainerRef;
	
	@ViewChild("dragHeader", {read: ViewContainerRef}) 
	dragHeader: ViewContainerRef;
	
	@HostListener('window:resize', ['$event'])
	onResize(event:any) {
		if(this.config.centered && !this.config.pinned){
			let ne = this.el.querySelector('.popup-lite');
			let root: HTMLElement = this.el.parentElement;
            this.renderer.setElementStyle(ne, 'left', ((root.getBoundingClientRect().width-ne.getBoundingClientRect().width)/2) + "px");
		}
	}

	config: WindowOptions ={
		id:'',
		close: false,
		overlay: false,
		closeOnOverlay: false,
		minimize: false,
		maximize: false,
		dragable:false,
		resizable:false,
		centered: false,
		fixed: false,
		pinable:false,

		height:'',
		width:'',
		maxBodyHeight:'',
		minBodyHeight:'',
		minWidth:'',
		maxWidth:'',
		adjustHeight:false,
		isOpen: false,
		isOpening:false,
		minimized:false,
		maximized:false,
		pinned:false,
		zIndex:100,
		top: ''
	}

	constructor(
		el: ElementRef, 
		private componentFactoryResolver: ComponentFactoryResolver,
		private renderer:Renderer) {
		this.el = el.nativeElement;
    }

	private calcMaxHeight(node:any, target:string){
		let list = node.childNodes;
		let max = 0;

		for (let i = 0; i < list.length; i++) {
		   if(list[i].nodeName.toLowerCase()===target){
			   list = list[i].childNodes;
			   for (let i = 0; i < list.length; i++) {
				   if(list[i].nodeType===1){
					   max += (list[i].clientHeight+list[i].offsetHeight);
					}
				}
				break;
		   }
        }
    	return max;
	}

	init(component, data, config: PopupLiteOptions, selector: WindowLiteSelection) {
		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
		let componentRef = this.content.createComponent(componentFactory);
		(<PopupLiteContentComponent>componentRef.instance).data = data;
		(<PopupLiteContentComponent>componentRef.instance).id = config.id;
		
		if (config) {
			const list = Object.keys(config);
			list.map((key) => {
				this.config[key] = config[key];
			})
		}
		this.selector = selector;

		this.display(config);
	}
		
	public display(props:WindowOptions){
		this.config.maxBodyHeight = props && props.maxHeight ? props.maxHeight:'';
		 this.config.minWidth = props && props.minWidth ? props.minWidth:'';
		 this.config.maxWidth = props && props.maxWidth ? props.maxWidth:'';
		 this.config.top = props && props.top ? props.top : '';
		 this.config.isOpening = true;
		 this.config.adjustHeight = props && props.adjustHeight ? props.adjustHeight : false;
		 this.extraclasses = this.config.header ? "":"header-off ";
		 this.extraclasses += this.config.footer ? "":"footer-off ";
		setTimeout(function() {
			this.onResize(null);
			this.config.isOpen = true;
		}.bind(this),10);
		return false;
	}

	keyUp(event) {
		event.preventDefault();
		const code = event.which;

		if (code === 13) {
			event.target.click();
		}		
	}
	closeOverlay(){
		if (this.config.closeOnOverlay) {
		this.closeModal(null, { id: this.config.id, confirmed: false });
		}
	}
	private onClose(event) {
		this.closeModal(event, { id: this.config.id, confirmed: false });
	}
	private closeModal($event:any, result){
		this.config.isOpening = false;
		this.config.overlay = false;
		this.config.isOpen = false;
		this.selector.popedOut(this.config.id, result);

		return false;
	}
	private minimizeModal($event:any){
		this.config.minimized = !this.config.minimized;
		if(this.config.resizable){
		  let ne:any = this.el.querySelector('.resize-corner');
		  let wn:any = this.el.querySelector('.popup-lite');
		  let bd:any = this.el.querySelector('.modal-body');
		  if(!this.config.minimized){bd.style.height=bd.getAttribute("oh");bd.style.maxHeight= "inherit";}
		  else {
		  bd.style.height = "0";
		  wn.style.height="inherit"
		  }
		  ne.style.display= (this.config.minimized || this.config.maximized) ? 'none':'block';
		}
		return false;
	}
	private maximizeModal($event:any){
		this.config.maximized = !this.config.maximized;
		if(this.config.resizable){
		  let ne:any = this.el.querySelector('.resize-corner');
		  let bd:any = this.el.querySelector('.modal-body');
		  if(bd.getAttribute("oh")){bd.style.height=bd.getAttribute("oh");}
		  ne.style.display= (this.config.minimized || this.config.maximized) ? 'none':'block';
		}
		return false;
	}
	selected($event: any){
		this.selector.setSelected(this.config.id);
		return true;
	}
	private pinModal($event:any){
		this.config.pinned = !this.config.pinned;
		return false;
	}

	dragEnabled(event: DragEvent) {
		return this.config.dragable && !this.config.pinned;
	}
	onDragStart(event: DragEvent){
	}
	onDrag(event: DragEvent){
		if(event.node === this.dragHeader.element.nativeElement) {
			this.renderer.setElementStyle(event.medium, 'left', (event.clientX-event.offset.x)+"px");
			this.renderer.setElementStyle(event.medium, 'top', (event.clientY-event.offset.y)+"px");
		}
	}
	onDragEnd(event: DragEvent){
		if(event.node === this.dragHeader.element.nativeElement) {
			this.renderer.setElementStyle(event.medium, 'left', (event.clientX-event.offset.x)+"px");
			this.renderer.setElementStyle(event.medium, 'top', (event.clientY-event.offset.y)+"px");
		}
	}

	resizeEnabled(event: DragEvent) {
		return this.config.resizable;
	}
	onResizeStart(event: DragEvent){
	}
	onResizeProgress(event: DragEvent){
		if(event.node === this.resizer.element.nativeElement) {
			const wr = event.medium.getBoundingClientRect();
			const width =  (event.clientX-event.offset.x) - wr.left;
			const height = (event.clientY-event.offset.y) - wr.top;
			let hd = this.el.querySelector('.modal-header');
			let ft = this.el.querySelector('.modal-footer');
			let bd = this.el.querySelector('.modal-body');
			let fth= ft.getBoundingClientRect().height;
			let hdh= hd.getBoundingClientRect().height;
			let h = height - hdh - fth -2;

			if(width>200 && height>60){
				this.renderer.setElementStyle(event.medium, 'width', width+"px");
				this.renderer.setElementStyle(event.medium, 'height', height+"px");
				this.renderer.setElementStyle(bd, 'height', h+"px");
			}
		}
	}
	onResizeEnd(event: DragEvent){
		if(event.node === this.resizer.element.nativeElement) {
			const wr = event.medium.getBoundingClientRect();
			const width =  (event.clientX-event.offset.x) - wr.left;
			const height = (event.clientY-event.offset.y) - wr.top;

			if(width>200 && height>60){
				let hd = this.el.querySelector('.modal-header');
				let ft = this.el.querySelector('.modal-footer');
				let bd = this.el.querySelector('.modal-body');
				let fth= ft.getBoundingClientRect().height;
				let hdh= hd.getBoundingClientRect().height;
				let h = height - hdh - fth -2;
					
				this.renderer.setElementStyle(event.medium, 'width', width+"px");
				this.renderer.setElementStyle(event.medium, 'height', height+"px");
				this.renderer.setElementStyle(bd, 'height', h+"px");
			}
		}
	}
}
