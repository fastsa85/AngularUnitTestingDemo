import { Directive, HostListener, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { HeroesComponent } from './heroes.component';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[routerLink]'
})
// tslint:disable-next-line: directive-class-suffix
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any;

  @HostListener('click') onClick() {
    this.navigatedTo = this.linkParams;
  }
}

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
        HeroComponent,
        RouterLinkDirectiveStub
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ]
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

    for (let i = 0; i < heroComponents.length; i++) {
      expect(heroComponents[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it(`should call heroService.deleteHero
  when delete button is clicked`, () => {
    spyOn(component, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    heroComponents[0].query(By.css('button')).
    triggerEventHandler('click', {stopPropagation: () => {}});

    // or
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    // or
    // heroComponents[0].triggerEventHandler('delete', null);

    expect(component.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add a new hero to list when add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    mockHeroService.addHero.and.returnValue(of({id: 4, name: 'Mr. Ice', strengh: 4}));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = 'Mr. Ice';
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const actualText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(actualText).toContain('Mr. Ice');
  });

  it ('should have correct route for hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    let routerLink = heroComponents[0]
    .query(By.directive(RouterLinkDirectiveStub))
    .injector.get(RouterLinkDirectiveStub);

    heroComponents[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigatedTo).toBe('/detail/1');
  });
});
