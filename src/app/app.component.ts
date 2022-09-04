import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DataCollector';

  constructor() {
  }


  mouseX: number;
  mouseY: number;
  width: number;
  height: number;
  mouseMoveFlag: boolean = true;
  mouseMoveMatrix: Number[][] = new Array;
  mouseMoveTimeMatrix: Date[] = new Array;
  avgPixelPerSecond: number;



  //@HostListener('keypress', ['$event'])
  @HostListener('mousemove', ['$event'])
  mouseMove($event: MouseEvent) {
    if (this.mouseMoveFlag == true) {
      this.mouseX = $event.clientX;
      this.mouseY = $event.clientY;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.mouseMoveMatrix.push([this.mouseX, this.mouseY]);
      this.mouseMoveTimeMatrix.push(new Date());
      console.log('x:', this.mouseX, 'y:', this.mouseY, 'width:', this.width, 'height:', this.height);
      this.mouseMoveFlag = false;
      if (this.mouseMoveMatrix.length != 0 && this.mouseMoveMatrix.length != 1) {
        let vX = 0.0;
        let vY = 0.0;
        for (let i = 0; i < this.mouseMoveMatrix.length - 1; i++) {
          const d = this.mouseMoveTimeMatrix[i + 1].valueOf() - this.mouseMoveTimeMatrix[i].valueOf();
          vX = vX + (Math.abs(parseFloat(this.mouseMoveMatrix[i + 1][0].toString())) - Math.abs(parseFloat(this.mouseMoveMatrix[i][0].toString())) / d);
          vY = vY + (Math.abs(parseFloat(this.mouseMoveMatrix[i + 1][1].toString())) - Math.abs(parseFloat(this.mouseMoveMatrix[i][1].toString())) / d);
        }
        vX /= this.mouseMoveMatrix.length;
        vY /= this.mouseMoveMatrix.length;
        var avgV = Math.sqrt(Math.pow(vX, 2) + Math.pow(vY, 2));
        console.log('The average pixel per second is: ' + avgV);
        console.log(vX);
      }
      setTimeout(() => {
        this.mouseMoveFlag = true;
      }, 2000);
    } else {
      return;
    }
  }
  @HostListener('keyup', ['$event'])
  @HostListener('keydown', ['$event'])
  @HostListener('click', ['$event'])
  @HostListener('scroll', ['$event'])

  eventHandler($event: KeyboardEvent) {
    console.log('key event:', $event);
  }



  keydown($event: KeyboardEvent) {
    console.log('key event:', $event);
  }
}