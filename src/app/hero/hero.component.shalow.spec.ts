import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';

describe('HeroComponent (shallow)', () => {

  let fixture: ComponentFixture<HeroComponent>;
  let component: HeroComponent;
  let element: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          HeroComponent
        ],
        schemas: [NO_ERRORS_SCHEMA]
      });

      fixture = TestBed.createComponent(HeroComponent);
      component = fixture.componentInstance;
      element = fixture.nativeElement;
    });

    it('should have correct hero', () => {
      component.hero = {id: 1, name: 'Spider Dude', strength: 8};

      expect(component.hero.name).toEqual('Spider Dude');
    });

    it('should render hero name', () => {
      component.hero = {id: 1, name: 'Spider Dude', strength: 8};
      fixture.detectChanges();

      expect(element.querySelector('a').textContent).toContain('Spider Dude');
    });
});
