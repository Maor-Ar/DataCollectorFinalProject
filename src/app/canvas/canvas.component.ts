import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
  animations: [
    trigger('divState',[
      state('normal',style({backgroundColor: 'red', transform:'translateX(0)'})),
      state('highLighted',style({backgroundColor: 'blue', transform:'translateX(100px)'})),
      transition('normal => highLighted', animate(300)),
      transition('highLighted => normal', animate(800)),
    ]),
    trigger('wildState',[
      state('normal',style({backgroundColor: 'red', transform:'translateX(0) scale(1)'})),
      state('midState',style({backgroundColor: 'blue', transform:'translateX(100px) scale(0.5)'})),
      state('highLighted',style({backgroundColor: 'blue', transform:'translateX(100px) scale(1)'})),
      transition('normal => highLighted', animate(300)),
      transition('highLighted => normal', animate(800)),
      transition('midState <=> *', [style({borderRadius:'0'}),animate(600,style({borderRadius: '50px',transform:'translateX(50px) scale(0.75)',backgroundColor: 'purple'})),animate(500)])
    ])
  ] 
})
export class CanvasComponent implements OnInit {
  state = 'normal';
  wstate = 'normal';

  @ViewChild('myCanvas') canvasRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
    let ctx = this.canvasRef.nativeElement.getContext('2d');
    ctx.moveTo(125,30);
    ctx.lineTo(31.9,63.2);
    ctx.lineTo(46.1,63.2);
    }


    onAnimate(){
      this.state = this.state == 'normal'? 'highLighted' : 'normal';
      this.wstate = 'highLighted';
    }
    onAnimateWild(){
      this.wstate = this.wstate == 'normal'? 'midState' : 'normal';
    }
  // calculateMousePos(evt: any){
  //   if(this.canvas != null)
  //     { 
  //        var rect = this.canvas.getBoundingClientRect();
  //       var root = document.documentElement;
  //       var mouseX = evt.clientX - rect.left - root.scrollLeft;
  //       var mouseY = evt.clientY - rect.top - root.scrollTop;
  //       return {
  //       x:mouseX,
  //       y:mouseY
  //       };
  //     }
  //   else return null;
  // } 

}
