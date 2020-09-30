import { TestBed, inject } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"

describe('HeroService', () => {
let mockMessageService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj('heroComponents', ['add'])

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HeroService,
        {provide: MessageService, useValue: mockMessageService}
      ]
    });
  });

  describe('getHero', () => {
    it('should call get with correct url',
    inject([HeroService, HttpTestingController],
      (heroService: HeroService, testingController: HttpTestingController) => {
        heroService.getHero(4).subscribe();

        const req = testingController.expectOne('api/heroes/4');
        req.flush({id: 1, name: 'Spider Dude', strength: 8});
        testingController.verify();
      }));
  });
});
