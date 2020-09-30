import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {

  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id: 1, name: 'Spider Dude', strength: 8},
      {id: 2, name: 'Wonderful Girl', strength: 24},
      {id: 3, name: 'Super Dude', strength: 55}
    ];

    mockHeroService = jasmine.createSpyObj('mockHeroService', ['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {

    it('should remove specified hero from the heroes list', () => {

      component.heroes = HEROES;
      mockHeroService.deleteHero.and.returnValue(of(true));

      component.delete(HEROES[2]);

      expect(component.heroes.length).toBe(2);
    });

    it('should call deleteHero for correct hero', () => {

      component.heroes = HEROES;
      mockHeroService.deleteHero.and.returnValue(of(true));

      component.delete(HEROES[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });
});
