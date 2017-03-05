import {Component, OnInit} from '@angular/core';
import {ContactPageService} from './contact-page.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.less'],
  providers: [ContactPageService]
})
export class ContactPageComponent implements OnInit {

  constructor(private service: ContactPageService) {
  }

  emailSuccess: boolean = false;
  emailFailed: boolean = false;

  ngOnInit() {
  }

  model = {
    name: null,
    email: null,
    message: null
  };

  private setModel () {
    this.model.name = null;
    this.model.email = null;
    this.model.message = null;
  }

  onSubmit() {
    this.service.sendMessage(this.model).then(() => {
      this.emailSuccess = true;
      this.setModel();
    }, () => {
      this.emailFailed = true;
    });
  }

  showContactInfo() {
    this.emailFailed = false;
    this.emailSuccess = false;
  }
}
