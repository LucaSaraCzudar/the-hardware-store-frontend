import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';

@NgModule({
  declarations: [LayoutComponent, ToolbarComponent],
  exports: [LayoutComponent],
  imports: [CommonModule, MaterialModule, RouterModule]
})
export class CoreModule {}
