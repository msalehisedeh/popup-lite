import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlexiblePreviewBoxModule } from './flexible-preview-box/flexible-preview-box.module';

import { CustomFavoriteComponent } from './formatters/favorite-formatter';
import { CustomCartComponent } from './formatters/cart-formatter';
import { CustomInventoryComponent } from './formatters/inventory-formatter';


@NgModule({
  declarations: [
    AppComponent,
    CustomFavoriteComponent,
    CustomCartComponent,
    CustomInventoryComponent
  ],
  imports: [
    BrowserModule,
    FlexiblePreviewBoxModule
  ],
  entryComponents: [
    CustomFavoriteComponent,
    CustomCartComponent,
    CustomInventoryComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
