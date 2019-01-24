import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntoPipeModule } from '@sedeh/into-pipes';

import { FlexiblePreviewBoxComponent } from './components/flexible-preview-box.component';

@NgModule({
  imports: [
    CommonModule,
    IntoPipeModule
  ],
  declarations: [
    FlexiblePreviewBoxComponent
  ],
  exports: [
    FlexiblePreviewBoxComponent
  ],
  entryComponents: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class FlexiblePreviewBoxModule {}
