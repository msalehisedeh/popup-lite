import * as tslib_1 from "tslib";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupLiteComponent } from './components/popup-lite.component';
import { PopupLiteService } from './injectables/popup-lite.service';
import { DragDropModule } from '@sedeh/drag-enabled';
let PopupLiteModule = class PopupLiteModule {
};
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
export { PopupLiteModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbGl0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2VkZWgvcG9wdXAtbGl0ZS8iLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9wdXAtbGl0ZS9wb3B1cC1saXRlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBc0JyRCxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0NBQUcsQ0FBQTtBQUFsQixlQUFlO0lBcEIzQixRQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxZQUFZO1lBQ1osY0FBYztTQUNmO1FBQ0QsWUFBWSxFQUFFO1lBQ1osa0JBQWtCO1NBQ25CO1FBQ0QsT0FBTyxFQUFFO1lBQ1Asa0JBQWtCO1NBQ25CO1FBQ0QsZUFBZSxFQUFFO1lBQ2Ysa0JBQWtCO1NBQ25CO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsZ0JBQWdCO1NBQ2pCO1FBQ0QsT0FBTyxFQUFFLENBQUMsc0JBQXNCLENBQUM7S0FDbEMsQ0FBQztHQUVXLGVBQWUsQ0FBRztTQUFsQixlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFBvcHVwTGl0ZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9wb3B1cC1saXRlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBvcHVwTGl0ZVNlcnZpY2UgfSBmcm9tICcuL2luamVjdGFibGVzL3BvcHVwLWxpdGUuc2VydmljZSc7XHJcbmltcG9ydCB7IERyYWdEcm9wTW9kdWxlIH0gZnJvbSAnQHNlZGVoL2RyYWctZW5hYmxlZCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIERyYWdEcm9wTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIFBvcHVwTGl0ZUNvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgUG9wdXBMaXRlQ29tcG9uZW50XHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFtcclxuICAgIFBvcHVwTGl0ZUNvbXBvbmVudFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICBQb3B1cExpdGVTZXJ2aWNlXHJcbiAgXSxcclxuICBzY2hlbWFzOiBbQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQV1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBQb3B1cExpdGVNb2R1bGUge31cclxuIl19