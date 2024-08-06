import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoriesListComponent } from './stories-list/stories-list.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

  describe('AppComponent', () => {
    let fixture :any;
    let app : any;
    let service : any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,MatFormFieldModule,MatPaginatorModule,MatButtonModule,MatInputModule,MatProgressSpinnerModule,MatFormField
      ],
      declarations: [
        AppComponent,
        [StoriesListComponent]
      ]
    }).compileComponents();
    
  });

beforeEach(()=>{
  fixture = TestBed.createComponent(AppComponent);
  app = fixture.componentInstance;
})

it("shoult create the app",()=>{
  expect(app).toBeTruthy();
});
});
