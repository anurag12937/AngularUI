import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoriesDataServiceService } from './stories-data-service.service';
import { of } from 'rxjs';


describe('Stories-Data-Service', () => {
    let service: StoriesDataServiceService;
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [StoriesDataServiceService], 
      });
  
      service = TestBed.inject(StoriesDataServiceService);
    
    });

      it('should get all Stories with correct parameters', () => {
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

        service.GetAllStories(pageNumber, pageSize).subscribe((result) => {
        expect(result).toEqual(mockAPIResponse); 
            });

      });


      it('should get Stories paas search value founded', () => {
        const searchValue = "Generating";
        
        const mockAPIResponse = {
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
            return of(mockAPIResponse);
          });
        service.SearchStories(searchValue).subscribe((res) => {
          expect(res).toEqual(mockAPIResponse); 
        });
        
      });


});  


