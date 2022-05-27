import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSidenavModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatBadgeModule
      ],
      declarations: [LayoutComponent, ToolbarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sidenav toggling', () => {
    const spy = spyOn(<MatSidenav>component.sidenav, 'toggle');
    component.opened$.next(false);
    component.onToggle();
    expect(spy).toHaveBeenCalled();
    expect(component.opened$.getValue()).toBeTruthy();

    component.onToggle();
    expect(component.opened$.getValue()).toBeFalsy();
  });
});
