import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { StoriesDataServiceService } from '../Services/stories-data-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-stories-list',
  templateUrl: './stories-list.component.html',
  styleUrl: './stories-list.component.css'
})
export class StoriesListComponent implements OnInit ,AfterViewInit{
  constructor(private _storiesDataServiceService: StoriesDataServiceService) { }
  displayedColumns: string[] = ['id', 'title', 'type', 'url'];
  dataSource : any;
  StoriesDataSource: any;
  @ViewChild(MatPaginator) paginator : MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);;
  totalData: number = 0;
  defaultPageNumber: number = 1;
  defaultPageSize: number  = 5
  isLoading = false;

      ngOnInit(): void {
      this.GetStories(this.defaultPageNumber,this.defaultPageSize);
  }
  ngAfterViewInit() {
    this.paginator.length = this.totalData;
      this.paginator.page
      .pipe(
        tap(()=> this.GetStories(
                this.paginator.pageIndex + 1,
                this.paginator.pageSize
              ))
      ).subscribe();
  }

  GetStories(pageNumber : number,pageSize : number ) {
    debugger;
    this.isLoading = true;
    this._storiesDataServiceService.GetAllStories(pageNumber,pageSize).subscribe(
      (result:any )=> {
        this.StoriesDataSource = result.data.stories;
        this.totalData = result.data.totalRecords;
        this.dataSource = new MatTableDataSource<any>( this.StoriesDataSource);
        this.isLoading = false;
    },error => console.error(console.log(error))
    );
  }

  // Searching by title
  applySearch($event:any)
  {
     const searchVal = ($event.target.value); 
     this.isLoading = true
     if(searchVal != null && searchVal != "" ){
      this._storiesDataServiceService.SearchStories(searchVal).subscribe(
        (result:any )=> {
        this.StoriesDataSource = result.data.stories;
        this.dataSource = new MatTableDataSource<any>( this.StoriesDataSource);
        this.totalData = result.data.totalRecords;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
    }
    );
  }
  else{
    this.GetStories(this.defaultPageNumber,this.defaultPageSize);
    this.paginator.length = this.totalData;
  }
  }
}
