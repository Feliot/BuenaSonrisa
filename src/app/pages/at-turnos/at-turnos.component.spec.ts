import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtTurnosComponent } from './at-turnos.component';

describe('AtTurnosComponent', () => {
  let component: AtTurnosComponent;
  let fixture: ComponentFixture<AtTurnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtTurnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
