import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPerComponent } from './lista-per.component';

describe('ListaPerComponent', () => {
  let component: ListaPerComponent;
  let fixture: ComponentFixture<ListaPerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPerComponent]
    });
    fixture = TestBed.createComponent(ListaPerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
