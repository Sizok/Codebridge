import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaFullPostComponent } from './spa-full-post.component';

describe('SpaFullPostComponent', () => {
  let component: SpaFullPostComponent;
  let fixture: ComponentFixture<SpaFullPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaFullPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaFullPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
