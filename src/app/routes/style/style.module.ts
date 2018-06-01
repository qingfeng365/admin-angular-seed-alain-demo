import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { StyleRoutingModule } from './style-routing.module';
import { ColorService } from './color.service';

import { TypographyComponent } from './typography/typography.component';
import { IconsFontComponent } from './iconsfont/iconsfont.component';
import { ColorsComponent } from './colors/colors.component';

@NgModule({
  imports: [SharedModule, StyleRoutingModule],
  declarations: [
    TypographyComponent,
    IconsFontComponent,
    ColorsComponent,
  ],
  providers: [ColorService],
})
export class StyleModule { }
