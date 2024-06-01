import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatpatientComponent } from './chatpatient.component';

describe('ChatpatientComponent', () => {
  let component: ChatpatientComponent;
  let fixture: ComponentFixture<ChatpatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatpatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatpatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
