import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSuccessModalComponent } from './contact-success-modal.component';

describe('ContactSuccessModalComponent', () => {
  let component: ContactSuccessModalComponent;
  let fixture: ComponentFixture<ContactSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSuccessModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
