import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSearchBlockComponent } from './header-search-block.component';

describe('HeaderSearchBlockComponent', () => {
  let component: HeaderSearchBlockComponent;
  let fixture: ComponentFixture<HeaderSearchBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderSearchBlockComponent]
    });
    fixture = TestBed.createComponent(HeaderSearchBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
