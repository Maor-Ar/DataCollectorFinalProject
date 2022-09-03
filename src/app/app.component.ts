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

  //@HostListener('keypress', ['$event'])
  @HostListener('mousemove', ['$event'])
  mouseMove($event: MouseEvent) {
    this.mouseX = $event.clientX;
    this.mouseY = $event.clientY;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    console.log('x:',this.mouseX,'y:',this.mouseY,'width:',this.width,'height:',this.height);
  }
  @HostListener('keyup', ['$event'])
  @HostListener('keydown', ['$event'])
  @HostListener('click', ['$event'])
  @HostListener('scroll', ['$event'])
  
  eventHandler($event: KeyboardEvent){
    console.log('key event:',$event);
  }
  


  keydown($event: KeyboardEvent){
    console.log('key event:',$event);
  }
}
