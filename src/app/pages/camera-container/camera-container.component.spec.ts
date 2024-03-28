import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraContainerComponent } from './camera-container.component';

describe('CameraContainerComponent', () => {
  let component: CameraContainerComponent;
  let fixture: ComponentFixture<CameraContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CameraContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
