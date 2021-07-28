import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TypesOfProjectComponent } from './types-of-project.component';

describe('TypesOfProjectComponent', () => {
  let component: TypesOfProjectComponent;
  let fixture: ComponentFixture<TypesOfProjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TypesOfProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesOfProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
