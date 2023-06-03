import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyOverviewComponent } from './lobby-overview.component';

describe('LobbyOverviewComponent', () => {
  let component: LobbyOverviewComponent;
  let fixture: ComponentFixture<LobbyOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LobbyOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
