import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnBillComponent } from './return-bill.component';

describe('ReturnBillComponent', () => {
  let component: ReturnBillComponent;
  let fixture: ComponentFixture<ReturnBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnBillComponent]
    });
    fixture = TestBed.createComponent(ReturnBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
