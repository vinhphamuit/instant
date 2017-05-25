import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChannelComponent } from './new-channel.component';

describe('NewChannelComponent', () => {
  let component: NewChannelComponent;
  let fixture: ComponentFixture<NewChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
