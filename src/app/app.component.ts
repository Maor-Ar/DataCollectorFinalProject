import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from './shared/data-storage.service';
import { FormSubmitService } from './shared/form-submit.service';
import { ApiService } from './shared/aiModelApi.service';
import { AiApiResponse } from './interfaces/ai-api-response';
import { format } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {
  title = 'DataCollector';
  
  mouseMoveFlag: boolean = true; // flag to mouse move
  ScreenDimensions: Number[];
  isMobile: boolean = false;
  touchSlideMatrix: Number[][] = new Array;
  touchSlideTimeArray: Number[] = new Array;
  scrollTimeArray: Number[] = new Array; // arr to save timestamp of scrolling events
  mouseMoveMatrix: Number[][] = new Array; // 2d arr that contains the current location of mouse [x.location][y.location]
  mouseMoveTimeArray: Number[] = new Array; // arr to save the time of the mouse movement index is fit to the mouseMoveMatrix
  mouseClickMatrix: Number[][] = new Array; // 2d arr that contains the current click location of mouse [x.location][y.location]
  mouseClickTimeArray: Number[] = new Array; // arr to save the time of the mouse click index is fit to the mouseMoveMatrix
  avgPixelPerSecond: number = 0; // avg of the speed pixel per second
  typeKeyBoardTimeArray: Number[] = new Array; // contains the time when a user press a key
  typeKeyBoardKeyArray: String[] = new Array; // contains the character that the user pressed
  // indexForKeyTime : number; // to calculate the average time between all the keys pressed without repeating
  sub: Subscription;
  ipAddress = '';// Client's Ip address
  isIOS: boolean;
  startingTime: number;
  
  
  constructor(private dataStorageService : DataStorageService, private formSubmitService: FormSubmitService, private http: HttpClient, private aiService: ApiService) {}
  ngAfterContentInit(): void {
    this.sub = (this.formSubmitService.getSub().subscribe((form)=>{
  //     this.dataStorageService.addRecordToDB({
  //     "form": form,
  //     "isMobile": this.isMobile,
  //     "touchSlideMatrix": this.touchSlideMatrix,
  //     "touchSlideTimeArray": this.touchSlideTimeArray,
  //     "scrollTimeArray": this.scrollTimeArray,
  //     "mouseMoveMatrix": this.mouseMoveMatrix,
  //     "mouseMoveTimeArray": this.mouseMoveTimeArray,
  //     "mouseClickMatrix": this.mouseClickMatrix, 
  //     "mouseClickTimeArray": this.mouseClickTimeArray, 
  //     "typeKeyBoardTimeArray": this.typeKeyBoardTimeArray, 
  //     "typeKeyBoardKeyArray": this.typeKeyBoardKeyArray, 
  //     "avgPixelPerSecond": this.avgPixelPerSecond,
  //     "date" : new Date(),
  //     "IPaddress": this.ipAddress,
  //     "ScreenDimensions": this.ScreenDimensions,
  //     "isIOS": this.isIOS
  // })
// send form to API
  const backspaceComparedToTyping = this.BackspaceComparedToTyping(this.typeKeyBoardKeyArray)
  this.aiService.predict(
    {
      "data": {
          "User's Age": form.userAge,
          "User's Sex": form.userSex === 'male'? 0 : 1,
          "Speed": this.avgPixelPerSecond,
          "Dominant Hand": form.dominantHand === 'right'? 0 : 1 ,
          "Backspaces Count": backspaceComparedToTyping,
          "Move Avg Time": this.calcAvgTime(this.mouseMoveTimeArray.map(n => n.valueOf())),
          "Total Move Events": this.mouseMoveTimeArray.length,
          "Click Avg Time": this.calcAvgTime(this.mouseClickTimeArray.map(n => n.valueOf())),
          "Total Click Events": this.mouseClickTimeArray.length,
          "Keyboard Avg Time": this.calcAvgTime(this.typeKeyBoardTimeArray.map(n => n.valueOf())),
          "Total Keyboard Events": this.typeKeyBoardTimeArray.length
      }
  }
  ).subscribe((res: AiApiResponse) => {
    this.aiService.response = res ;
    console.log(`RES: \n
    distructedLevel ${res.distructedLevel[0]}\n
    fearLevel ${res.fearLevel[0]}\n
    joyLevel ${res.joyLevel[0]}\n
    sadnessLevel ${res.sadnessLevel[0]}\n
    stressLevel ${res.stressLevel[0]}\n
    tiredLevel ${res.tiredLevel[0]}`);
  })
}));

  }
  calcAvgTime(TimeArray: number[]) {
    const waitTimes = [];

    for (let i = 0; i < TimeArray.length - 1; i++) {
      waitTimes.push(TimeArray[i + 1] - TimeArray[i]);
    }
    const mouseClickAverageWaitTime = waitTimes.reduce((a, b) => a + b) / waitTimes.length;

    return mouseClickAverageWaitTime;
  }

  BackspaceComparedToTyping(typeKeyBoardKeyArray: any) {
    let backCount = 0;

    for (const key of typeKeyBoardKeyArray) {
      if (key === "Backspace") {
        backCount++;
      }
    }

    backCount /= typeKeyBoardKeyArray.length;

    return backCount;
  }


  ngOnInit(): void {
    this.ScreenDimensions = [window.innerWidth,window.innerHeight];
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| ||a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) 
    {this.isMobile = true;}

    if(
      [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document))
      {this.isIOS = true;}

    this.getIPAddress(); //Getting Ip address

    this.startingTime = performance.now();
  }

  //@HostListener('keypress', ['$event'])
  @HostListener('mousemove', ['$event'])
  mouseMove($event: MouseEvent) {
    if (this.mouseMoveFlag == true) {
      this.mouseMoveMatrix.push([$event.clientX, $event.clientY]);
      this.mouseMoveTimeArray.push($event.timeStamp/1000);
      //console.log('x:', $event.clientX, 'y:', $event.clientY, 'width:', window.innerWidth, 'height:', window.innerHeight);
      //console.log($event);
      //console.log(this.mouseMoveMatrix.length);
      this.mouseMoveFlag = false;
      if (this.mouseMoveMatrix.length != 0 && this.mouseMoveMatrix.length != 1) {
        let vX = 0.0;
        let vY = 0.0;
        for (let i = 0; i < this.mouseMoveMatrix.length - 1; i++) {
          const d = this.mouseMoveTimeArray[i+1].valueOf() - this.mouseMoveTimeArray[i].valueOf();
          vX = vX + ((Math.abs(parseFloat(this.mouseMoveMatrix[i+1][0].toString()) -parseFloat(this.mouseMoveMatrix[i][0].toString()))) / d);
          vY = vY + ((Math.abs(parseFloat(this.mouseMoveMatrix[i+1][1].toString()) - parseFloat(this.mouseMoveMatrix[i][1].toString()))) / d);
        }
        vX /= this.mouseMoveMatrix.length;
        vY /= this.mouseMoveMatrix.length;
        var avgV = Math.sqrt(Math.pow(vX, 2) + Math.pow(vY, 2));
        //console.log('The average pixel per second is: ' + 1000*avgV);
        this.avgPixelPerSecond = 1000*avgV;
      }
      setTimeout(() => {
        this.mouseMoveFlag = true;
      }, 100);
    } else {
      return;
    }
  }

  @HostListener('window:scroll', ['$event'])
  scroll($event: Event)
  {  
    this.scrollTimeArray.push($event.timeStamp/1000);
  }
  
  @HostListener('keydown', ['$event'])
  keyup($event: KeyboardEvent) {
    //console.log('key event:', $event);
    //console.log(Math.floor(performance.now() - this.startingTime)/1000);
    this.typeKeyBoardKeyArray.push($event.key);

    this.typeKeyBoardTimeArray.push(Math.floor(performance.now() - this.startingTime)/1000);
    let avgPressedSpeed = 0.0;
    for (let i = 0; i < this.typeKeyBoardTimeArray.length-1; i++) {
      avgPressedSpeed += (parseFloat(this.typeKeyBoardTimeArray[i+1].toString()) - parseFloat(this.typeKeyBoardTimeArray[i].toString()));
    }
    avgPressedSpeed /= this.typeKeyBoardTimeArray.length;
    //console.log("The avg difference between pressed key is: " + avgPressedSpeed);
  }
  @HostListener('click', ['$event'])
  click($event: PointerEvent)
  {
    this.mouseClickMatrix.push([$event.x,$event.y])
    this.mouseClickTimeArray.push($event.timeStamp/1000);
  }
  
  @HostListener('touchmove', ['$event'])
  slide($event)
  {
    this.touchSlideMatrix.push([Math.floor($event.touches[0].clientX),Math.floor($event.touches[0].clientY)])
    this.touchSlideTimeArray.push($event.timeStamp/1000);
  }

  getIPAddress()
  {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
    });
  }
  // keydown($event: KeyboardEvent) {
  //   console.log('Kkey event:', $event);
  // }
}