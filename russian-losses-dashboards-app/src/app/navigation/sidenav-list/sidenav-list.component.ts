import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor(private translate: TranslateService) 
  {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    if (localStorage.getItem('locale'))
    {
      const locale = localStorage.getItem('locale') ?? 'en';

      translate.use(locale);
    }
    else
    {
      translate.use('en');
    }
  }

  ngOnInit(): void {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
