import { TestBed } from '@angular/core/testing';

import { StoriesListComponent } from './stories-list.component';
import { StoriesDataServiceService } from '../Services/stories-data-service.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';

describe('StoriesListComponent', () => {
  let fixture :any;
    let app : any;
    let service : any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatFormFieldModule,MatPaginatorModule,MatButtonModule,MatInputModule,MatProgressSpinnerModule,MatFormField
      ],
      declarations: [StoriesListComponent],
      providers:[StoriesDataServiceService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoriesListComponent);
    app = fixture.componentInstance;
    service = fixture.debugElement.injector.get(StoriesDataServiceService);
  });

  it('should create', () => {
    expect(StoriesListComponent).toBeTruthy();
  });
  it('should return  List of Stories data',()=>{
  
    const pageNumber = 1;
    const pageSize = 1;
    const mockAPIResponse = {
      apiResponseStatus: "OK",
      httpStatus: 200,
      message:"Success",
      data:{
              stories: [
                  {"id":39828481,"title":"Generating music in the waveform domain (2020)","type":"story","url":"https://sander.ai/2020/03/24/audio-generation.html"},
                  {"id":39836513,"title":"Facebook Accused of Using Your Phone to Wiretap Snapchat","type":"story","url":"https://gizmodo.com/project-ghostbusters-facebook-meta-wiretap-snapchat-1851366093"},
              ],
              totalCount: 2,
          },
      errors:[]
  };
    spyOn(service,"GetAllStories").and.callFake(() => {
      return of(mockAPIResponse);
    });
      app.GetStories(pageNumber,pageSize);
      expect(app.StoriesDataSource.length).toEqual(2);
  
  });
  it('should return Stories data if search value founded',()=>{
    let searchValue = "Generating";
    const event = { target: { value: searchValue }};
    const expected = {
      apiResponseStatus: "OK",
      httpStatus: 200,
      message:"Success",
      data:{
              stories: [
                  {"id":39828481,"title":"Generating music in the waveform domain (2020)","type":"story","url":"https://sander.ai/2020/03/24/audio-generation.html"}
              ],
              totalCount: 1,
          },
      errors:[]
  };
    
   spyOn(service,"SearchStories").and.callFake(() => {
      return of(expected);
    });
  
       app.applySearch(event);
       expect(app.StoriesDataSource.length).toEqual(1);
  });
});
