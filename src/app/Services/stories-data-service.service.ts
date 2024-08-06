import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class StoriesDataServiceService {

  private BaseUrl : string = "http://localhost:5000/api/Stories/";

  constructor(private _http:HttpClient) { }

GetAllStories(pageNumber:number,pageSize : number):Observable<any>{
  return this._http.get<any>(this.BaseUrl + "GetAllStories?PageNumber="+ pageNumber + "&PageSize=" + pageSize );
}

SearchStories(searchValue : any):Observable<any>{
  return this._http.get<any>(this.BaseUrl + "GetSearchStories?searchValue=" + searchValue  );
}

}
