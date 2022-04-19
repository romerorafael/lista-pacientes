import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoPatientsComponent } from './modal-info-patients.component';

describe('ModalInfoPatientsComponent', () => {
  let component: ModalInfoPatientsComponent;
  let fixture: ComponentFixture<ModalInfoPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInfoPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInfoPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
