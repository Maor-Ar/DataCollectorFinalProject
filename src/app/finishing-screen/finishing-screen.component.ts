import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finishing-screen',
  templateUrl: './finishing-screen.component.html',
  styleUrls: ['./finishing-screen.component.css']
})
export class FinishingScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  copyText(val: string){
    let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }

}
