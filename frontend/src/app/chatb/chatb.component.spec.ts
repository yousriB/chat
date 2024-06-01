import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbComponent } from './chatb.component';

describe('ChatbComponent', () => {
  let component: ChatbComponent;
  let fixture: ComponentFixture<ChatbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
