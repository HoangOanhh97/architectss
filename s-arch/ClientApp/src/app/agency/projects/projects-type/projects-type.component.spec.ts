import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectsTypeComponent } from './projects-type.component';

describe('ProjectsTypeComponent', () => {
  let component: ProjectsTypeComponent;
  let fixture: ComponentFixture<ProjectsTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
