import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatailsPageComponent } from './datails-page.component';

describe('DatailsPageComponent', () => {
  let component: DatailsPageComponent;
  let fixture: ComponentFixture<DatailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatailsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
