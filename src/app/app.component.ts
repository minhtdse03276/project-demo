import { LoaderService } from './helpers/helper-services/loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: any;

  title = 'angular-structure';
  constructor(private loaderService: LoaderService) {
    this.loaderService.loader.subscribe((value: any) => {
      this.loading = value;
    });
  }
  
  ngOnInit() {
      
  }
}
