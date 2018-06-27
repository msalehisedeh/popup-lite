import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupLiteModule } from './popup-lite/popup-lite.module';
import { AppComponent } from './app.component';
import { TestModalComponent } from './test.component';


@NgModule({
  declarations: [
    AppComponent,
    TestModalComponent
  ],
  imports: [
	CommonModule,
    PopupLiteModule
  ],
  entryComponents: [
    TestModalComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
