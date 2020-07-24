import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RenamepopupPage } from './renamepopup.page';

describe('RenamepopupPage', () => {
  let component: RenamepopupPage;
  let fixture: ComponentFixture<RenamepopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenamepopupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RenamepopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
