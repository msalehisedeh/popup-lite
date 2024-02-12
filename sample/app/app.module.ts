import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { DataTransfer } from '@sedeh/drag-enabled';
import { PopupLiteComponent, PopupLiteService } from '@sedeh/popup-lite';
import { AppComponent } from './app.component';
import { TestModalComponent } from './test.component';

@NgModule({
  declarations: [AppComponent, TestModalComponent],
  imports: [CommonModule, BrowserModule, PopupLiteComponent],
  providers: [PopupLiteService, DataTransfer],
  bootstrap: [AppComponent],
})
export class AppModule {}
