import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.translate();
  }

  translate() {
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }
}
