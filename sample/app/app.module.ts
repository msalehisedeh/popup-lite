import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { PopupLiteComponent} from './popup-lite/components/popup-lite.component';
import { AppComponent } from './app.component';
import { TestModalComponent } from './test.component';
import { PopupLiteService } from './popup-lite/injectables/popup-lite.service';


@NgModule({
  declarations: [
    AppComponent,
    TestModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    PopupLiteComponent
  ],
  entryComponents: [
    TestModalComponent
  ],
  providers: [
    PopupLiteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
