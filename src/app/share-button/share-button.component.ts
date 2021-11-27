import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent implements OnInit {

  @Input() type: 'whatsapp' | 'linkedin' = 'whatsapp';
  @Input() shareUrl = '';
  navUrl = '';

  constructor() { }

  ngOnInit(): void {
    this.createNavigationUrl();
  }

  private createNavigationUrl(): void {
    const searchParams = new URLSearchParams();
    switch (this.type) {
      case 'whatsapp':
        if (window.innerWidth > 860) {
          this.navUrl =  `https://web.whatsapp.com/send?text=${this.shareUrl}`;
      } else {
        this.navUrl = `whatsapp://send?text=${this.shareUrl}`;
      }
        break;
      case 'linkedin':
        searchParams.set('url', this.shareUrl);
        this.navUrl =  'https://www.linkedin.com/sharing/share-offsite/?' + searchParams;
        break;
    }
  }

  // tslint:disable-next-line:typedef
  public share() {
    return window.open(this.navUrl, '_blank');
  }

}
