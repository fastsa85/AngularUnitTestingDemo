import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent (deep)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let element: HTMLElement;
  let HEROES;

  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Spider Dude', strength: 8},
      {id: 2, name: 'Wonderful Girl', strength: 24},
      {id: 3, name: 'Super Dude', strength: 55}
    ];

    mockHeroService = jasmine.createSpyObj('mockHeroService', ['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should render each hero as HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponents.length).toBe(3);

    for (let i = 0; i < heroComponents.length; i++){
      expect(heroComponents[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });
});
