import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public langVal: string = 'EN';

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    if (localStorage.getItem('locale'))
    {
      const locale = localStorage.getItem('locale') ?? 'en';

      translate.use(locale);

      this.langVal = locale == "ua" ? "UA" : "EN";
    }
    else
    {
      translate.use('en');
    }
   }

  ngOnInit(): void {
  }

  public onToggleSidenav = () => { 
    this.sidenavToggle.emit();
  }

  onClick(){
    if (this.translate.currentLang == 'ua') {
      this.translate.use('en');
      this.langVal = 'EN';
      localStorage.setItem('locale','en');
    }
    else {
      this.translate.use('ua');
      this.langVal = 'UA';
      localStorage.setItem('locale','ua');
    }
  }
}
