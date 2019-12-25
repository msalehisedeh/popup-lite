import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupLiteComponent } from './components/popup-lite.component';
import { PopupLiteService } from './injectables/popup-lite.service';
import { DragDropModule } from '@sedeh/drag-enabled';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule
  ],
  declarations: [
    PopupLiteComponent
  ],
  exports: [
    PopupLiteComponent
  ],
  entryComponents: [
    PopupLiteComponent
  ],
  providers: [
    PopupLiteService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class PopupLiteModule {}
