import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedCommentsPage } from './feed-comments.page';

describe('FeedCommentsPage', () => {
  let component: FeedCommentsPage;
  let fixture: ComponentFixture<FeedCommentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedCommentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedCommentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
