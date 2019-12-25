import * as tslib_1 from "tslib";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupLiteComponent } from './components/popup-lite.component';
import { PopupLiteService } from './injectables/popup-lite.service';
import { DragDropModule } from '@sedeh/drag-enabled';
var PopupLiteModule = /** @class */ (function () {
    function PopupLiteModule() {
    }
    PopupLiteModule = tslib_1.__decorate([
        NgModule({
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
    ], PopupLiteModule);
    return PopupLiteModule;
}());
export { PopupLiteModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbGl0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvcG9wdXAtbGl0ZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9wdXAtbGl0ZS9wb3B1cC1saXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBc0JyRDtJQUFBO0lBQThCLENBQUM7SUFBbEIsZUFBZTtRQXBCM0IsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLFlBQVk7Z0JBQ1osY0FBYzthQUNmO1lBQ0QsWUFBWSxFQUFFO2dCQUNaLGtCQUFrQjthQUNuQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxrQkFBa0I7YUFDbkI7WUFDRCxlQUFlLEVBQUU7Z0JBQ2Ysa0JBQWtCO2FBQ25CO1lBQ0QsU0FBUyxFQUFFO2dCQUNULGdCQUFnQjthQUNqQjtZQUNELE9BQU8sRUFBRSxDQUFDLHNCQUFzQixDQUFDO1NBQ2xDLENBQUM7T0FFVyxlQUFlLENBQUc7SUFBRCxzQkFBQztDQUFBLEFBQS9CLElBQStCO1NBQWxCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgUG9wdXBMaXRlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3BvcHVwLWxpdGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUG9wdXBMaXRlU2VydmljZSB9IGZyb20gJy4vaW5qZWN0YWJsZXMvcG9wdXAtbGl0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRHJhZ0Ryb3BNb2R1bGUgfSBmcm9tICdAc2VkZWgvZHJhZy1lbmFibGVkJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgRHJhZ0Ryb3BNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgUG9wdXBMaXRlQ29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBQb3B1cExpdGVDb21wb25lbnRcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgUG9wdXBMaXRlQ29tcG9uZW50XHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIFBvcHVwTGl0ZVNlcnZpY2VcclxuICBdLFxyXG4gIHNjaGVtYXM6IFtDVVNUT01fRUxFTUVOVFNfU0NIRU1BXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFBvcHVwTGl0ZU1vZHVsZSB7fVxyXG4iXX0=