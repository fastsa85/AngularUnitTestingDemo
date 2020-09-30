import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent (shallow)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let element: HTMLElement;
  let HEROES;

  let mockHeroService;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj('mockHeroService', ['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    HEROES = [
      {id: 1, name: 'Spider Dude', strength: 8},
      {id: 2, name: 'Wonderful Girl', strength: 24},
      {id: 3, name: 'Super Dude', strength: 55}
    ];
  });

  it('should set heroes from service correctly', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(component.heroes.length).toBe(3);
  });

  it('should render each hero in li element', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  });

});
