
import {
	Component,
	ComponentFactoryResolver,
	Renderer2,
	HostListener,
	ViewChild,
	Injector,
	ApplicationRef,
	EmbeddedViewRef,
	ElementRef} from "@angular/core";

import { DragEvent } from '@sedeh/drag-enabled';
import { PopupLiteContentComponent, WindowLiteSelection, PopupLiteOptions, WindowOptions } from '../interfaces/popup-lite.interface';
import { CommonModule } from '@angular/common';

import { PopupLiteService } from '../injectables/popup-lite.service';
import { DragDropModule } from '@sedeh/drag-enabled';

@Component({
    selector:'popup-lite',
	standalone: true,
	imports: [CommonModule, DragDropModule],
    templateUrl: './popup-lite.component.html',
	styleUrls: ['./popup-lite.component.scss']
})
export class PopupLiteComponent {
	private el:HTMLElement;
	private extraclasses = "";
	private selector!: WindowLiteSelection;

	@ViewChild("content", {static: false}) content!: ElementRef;
	@ViewChild("modalWondow", {static: false}) modalWondow!: ElementRef;
	@ViewChild("resizer", {static: false}) resizer!: ElementRef;
	@ViewChild("dragHeader", {static: false}) dragHeader!: ElementRef;
	
	@HostListener('window:resize', ['$event'])
	onResize(event:any) {
		if(this.config.centered && !this.config.pinned){
			let ne: any = this.el.querySelector('.popup-lite');
			let root: any = this.el.parentElement;
            this.renderer.setStyle(ne, 'left', ((root.getBoundingClientRect().width-ne.getBoundingClientRect().width)/2) + "px");
		}
	}

	config: WindowOptions = {
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
		private appRef: ApplicationRef,
		private injector: Injector,
		private renderer:Renderer2) {
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

	init(component: any, data: any, config: PopupLiteOptions, selector: WindowLiteSelection) {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
		const componentRef = componentFactory.create(this.injector);
		const instance: any = (<PopupLiteContentComponent>componentRef.instance);

		this.appRef.attachView(componentRef.hostView);
		this.content.nativeElement.appendChild((componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement);
		instance.data = data;
		instance.id = config.id;

		if(instance.popupTitle) {
			config.popupTitle = instance.popupTitle.bind(instance);
		} else {
			config.popupTitle = (id: any) => id;
		}
		
		if (config) {
			const list: any[] = Object.keys(config);
			list.map((key: any) => {
				(<any>this.config)[key] = (<any>config)[key];
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
		setTimeout(() => {
			this.onResize(null);
			this.config.isOpen = true;
		},10);
		return false;
	}

	keyUp(event: any) {
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
	onClose(event: any) {
		this.closeModal(event, { id: this.config.id, confirmed: false });
	}
	closeModal($event:any, result: any){
		this.config.isOpening = false;
		this.config.overlay = false;
		this.config.isOpen = false;
		this.selector.popedOut(this.config.id, result);

		return false;
	}
	minimizeModal($event:any){
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
	maximizeModal($event:any){
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
	pinModal($event:any){
		this.config.pinned = !this.config.pinned;
		return false;
	}

	onDragStart(event: DragEvent){
	}
	onDrag(event: any){
		if(event && (event.node === this.dragHeader.nativeElement)) {
			this.renderer.setStyle(event.medium, 'left', (event.clientX-event.offset.x)+"px");
			this.renderer.setStyle(event.medium, 'top', (event.clientY-event.offset.y)+"px");
		}
	}
	onDragEnd(event: any){
		if(event && (event.node === this.dragHeader.nativeElement)) {
			this.renderer.setStyle(event.medium, 'left', (event.clientX-event.offset.x)+"px");
			this.renderer.setStyle(event.medium, 'top', (event.clientY-event.offset.y)+"px");
		}
	}
	onResizeStart(event: DragEvent){
	}
	onResizeProgress(event: any){
		if(event && (event.node === this.resizer.nativeElement)) {
			const wr = event.medium.getBoundingClientRect();
			const width =  (event.clientX-event.offset.x) - wr.left;
			const height = (event.clientY-event.offset.y) - wr.top;
			let hd: any = this.el.querySelector('.modal-header');
			let ft: any = this.el.querySelector('.modal-footer');
			let bd: any = this.el.querySelector('.modal-body');
			let fth= ft.getBoundingClientRect().height;
			let hdh= hd.getBoundingClientRect().height;
			let h = height - hdh - fth -2;

			if(width>200 && height>60){
				this.renderer.setStyle(event.medium, 'width', width+"px");
				this.renderer.setStyle(event.medium, 'height', height+"px");
				this.renderer.setStyle(bd, 'height', h+"px");
			}
		}
	}
	pinAndDrag(): boolean {
		const draggable = this.config.dragable ? true : false;
		const pinned = this.config.pinned ? false : true;
		return (draggable && pinned);
	}
	onResizeEnd(event: any){
		if(event && (event.node === this.resizer.nativeElement)) {
			const wr = event.medium.getBoundingClientRect();
			const width =  (event.clientX-event.offset.x) - wr.left;
			const height = (event.clientY-event.offset.y) - wr.top;

			if(width>200 && height>60){
				let hd: any = this.el.querySelector('.modal-header');
				let ft: any = this.el.querySelector('.modal-footer');
				let bd: any = this.el.querySelector('.modal-body');
				let fth= ft.getBoundingClientRect().height;
				let hdh= hd.getBoundingClientRect().height;
				let h = height - hdh - fth -2;
					
				this.renderer.setStyle(event.medium, 'width', width+"px");
				this.renderer.setStyle(event.medium, 'height', height+"px");
				this.renderer.setStyle(bd, 'height', h+"px");
			}
		}
	}
}
