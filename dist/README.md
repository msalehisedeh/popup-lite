

# Welcome to Popup Lite!

Have you ever wanted to have a lite weight modal popup, dialogue box, or free moving window? Well... I needed one. And here it is... a lite weight popup fully configurable with modal, dialog, and free workspace like window... all in one package!

This library provides Angular 4 components that enables you to have such things without relying on heavy **"@angular/material"** and just by adding PopupLiteModule into your AppModule.

[Live Demo](https://popup-lite.stackblitz.io) | [Source code](https://github.com/msalehisedeh/popup-lite) | [Comments/Requests](https://github.com/msalehisedeh/popup-lite/issues)

# Version 1.0.0
Compiled with AOT option and resolved issues.

# Version 0.0.1

```javascript
MODULE: 
	PopupLiteModule

EXPORTS:
  PopupLiteModule,
  PopupLiteOptions,
  PopupLiteContentComponent,
  WindowLiteService,
  PopupLiteComponent,
  PopupLiteService

DEPENDENCIES: 
    "drag-enabled": "^0.2.4",
    "font-awesome": "^4.7.0",
```


The following are available functionalities presented in this version:

Interfaces to use
```javascript
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
export interface PopupLiteContentComponent {
	data: any;
	id: string;
}

export interface WindowLiteService {
	openWindow(component: any, id: string, data?: any, options?: PopupLiteOptions): Observable<any>;
	openModal(component: any, id: string, data?: any, options?: PopupLiteOptions): Observable<any>;
	openDialog(component: any, id: string, data?: any, options?: PopupLiteOptions): Observable<any>;
}
```

Sample code

```javascript

myDataSet = {name: "masoud"};

modalBox() {
    this.popService.openModal(TestModalComponent, "myModal"+this.counter++, this.myDataSet).subscribe( 
      (success)=>{
        this.events.push(success);
      },
      (fail) => {
        this.events.push(fail);
      });
}

freeBox() {
    this.popService.openWindow(TestModalComponent, "myWindow"+this.counter++, this.myDataSet).subscribe( 
      (success)=>{
        this.events.push(success);
      },
      (fail) => {
        this.events.push(fail);
      });
}

dialogBox() {
    this.popService.openDialog(TestModalComponent, "myID"+this.counter++, this.myDataSet).subscribe( 
        (success)=>{
          this.events.push(success);
        },
        (fail) => {
          this.events.push(fail);
        });
    }
}
.............

import { Component } from '@angular/core';

import { PopupLiteService } from './popup-lite/injectables/popup-lite.service';
import { PopupLiteContentComponent } from './popup-lite/interfaces/popup-lite.interface';

@Component({
  selector: 'test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestModalComponent implements PopupLiteContentComponent {
 
  data: any;
  id: string;

  constructor(private popService: PopupLiteService) {
  }
 
  cancel() {
    this.popService.cancel(this.id, {action: "cancel", data: this.data});
  }
  confirm() {
    this.popService.confirm(this.id, {action: "confirm", data: this.data});
  }
}
.............
<div style="text-align:center">
  <h1>Testing</h1>

  My Name:
  <span [innerHTML]="data.name"></span>
  <button (click)="cancel()">cancel it!</button>
  <button (click)="confirm()">fonfirm it!</button>
</div>

```

![alt text](https://raw.githubusercontent.com/msalehisedeh/popup-lite/master/sample.png  "What you would see when a popup lite is used")

