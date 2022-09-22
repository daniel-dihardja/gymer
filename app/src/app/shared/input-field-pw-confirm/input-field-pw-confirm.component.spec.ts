import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputFieldPwConfirmComponent } from './input-field-pw-confirm.component';

describe('InputFieldPwConfirmComponent', () => {
  let component: InputFieldPwConfirmComponent;
  let fixture: ComponentFixture<InputFieldPwConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [InputFieldPwConfirmComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputFieldPwConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
