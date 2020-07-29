import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CustomService } from 'src/app/services/custom.service';

@Component({
  selector: 'app-page-status',
  templateUrl: './page-status.component.html',
  styleUrls: ['./page-status.component.css'],
})
export class PageStatusComponent implements OnInit {
  @ViewChild('status', { static: true }) status: ElementRef;

  private highlight(message: string, color: string) {
    this.status.nativeElement.style.backgroundColor = color;
    this.message = message;
  }
  
  staticAlertClosed = false;
  successMessage: string = '';
  messageType: string = '';
  messageFace: string = '';

  constructor(private customService: CustomService) {}

  message = 'success element or fail ...';

  ngOnInit(): void {
    this.customService._success.subscribe(message => this.successMessage = message);
    this.customService._type.subscribe(type => this.messageType = type);
    this.customService._face.subscribe(face => this.messageFace = face);
    this.customService._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }

  

}

interface Alert {
  type: string;
  message: string;
}
