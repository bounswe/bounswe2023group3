import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed ,fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../header/header.component'; 
import { SideBarComponent } from '../side-bar/side-bar.component'; 
import { TagsBarComponent } from '../tags-bar/tags-bar.component'; 
import { LeaderboardBarComponent } from '../leaderboard-bar/leaderboard-bar.component'; 
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent,HeaderComponent,SideBarComponent,TagsBarComponent,LeaderboardBarComponent],
      imports: [HttpClientModule,HttpClientTestingModule],
    })
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    httpTestingController = TestBed.inject(HttpTestingController); 
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should retrieve trending polls', () => {
    const mockResponse = [
      { id: 1, tags: [] },
      { id: 2, tags: [{ name: 'Movies' }, { name: 'Recent' }] },
      { id: 3, tags: [{ name: 'Trending' }] },
    ];

    const httpClientSpy = spyOn(component['http'], 'get').and.returnValue(of(mockResponse));

    component.trendingPolls();

    expect(httpClientSpy).toHaveBeenCalledWith('http://34.105.66.254:1923/poll/');

    expect(component.polls.length).toEqual(1);
    expect(component.polls).toEqual([{ id: 3, tags: [{ name: 'Trending' }] }]);
  });

})
