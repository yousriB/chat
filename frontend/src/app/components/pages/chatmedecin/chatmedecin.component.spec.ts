import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatmedecinComponent } from './chatmedecin.component';

describe('ChatmedecinComponent', () => {
  let component: ChatmedecinComponent;
  let fixture: ComponentFixture<ChatmedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatmedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatmedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
