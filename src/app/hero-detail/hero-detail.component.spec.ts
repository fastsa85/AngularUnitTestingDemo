import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { Location } from '@angular/common';

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLocation;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '3' } }
    };
    mockHeroService = jasmine.createSpyObj('mockHeroService', ['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        HeroDetailComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation }
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
  });

  it ('should render hero name in h2 tag', () => {
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'Spider Dude', strength: 111}));

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SPIDER DUDE');
  });

  it ('should call updateHero when save is called', fakeAsync (() => {
    mockHeroService.getHero.and.returnValue(of({}));
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

     fixture.componentInstance.save();
     flush();

     expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

  // OR
  // it ('should call updateHero when save is called', async (() => {
  //   mockHeroService.getHero.and.returnValue(of({}));
  //   mockHeroService.updateHero.and.returnValue(of({}));
  //   fixture.detectChanges();

  //    fixture.componentInstance.save();

  //    fixture.whenStable().then(() => {
  //    expect(mockHeroService.updateHero).toHaveBeenCalled();
  //    });
  // }));
});
