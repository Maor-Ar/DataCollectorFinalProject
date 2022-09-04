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
  mouseMoveFlag: boolean = true; // flag to mouse move
  mouseMoveMatrix: Number[][] = new Array; // 2d arr that contains the current location of mouse [x.location][y.location]
  mouseMoveTimeMatrix: Date[] = new Array; // arr to save the time of the mouse movement index is fit to the mouseMoveMatrix
  avgPixelPerSecond: number; // avg of the speed pixel per second
  typeKeyBoardMatrix: Number[] = new Array; // contains the time when a user press a key
  // indexForKeyTime : number; // to calculate the average time between all the keys pressed without repeating




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
      }, 500);
    } else {
      return;
    }
  }
  @HostListener('keyup', ['$event'])
  @HostListener('keydown', ['$event'])
  @HostListener('click', ['$event'])
  @HostListener('scroll', ['$event'])

  keyup($event: KeyboardEvent) {
    console.log('key event:', $event);
    if ($event.type === 'keydown') {
      this.typeKeyBoardMatrix.push($event.timeStamp);
      let avgPressedSpeed = 0.0;
      for (let i = 0; i < this.typeKeyBoardMatrix.length; i++) {
        avgPressedSpeed += parseFloat(this.typeKeyBoardMatrix[i].toString());
      }
      avgPressedSpeed /= this.typeKeyBoardMatrix.length;
      console.log("The avg diffrence between pressed key is: " + avgPressedSpeed);
    }
  }



  // keydown($event: KeyboardEvent) {
  //   console.log('Kkey event:', $event);
  // }
}