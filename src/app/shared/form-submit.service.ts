import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormSubmitService {

  sub: Subject<any> = new Subject();
  
  constructor() { }

  getSub(){
    return this.sub;
  }

  onSubmit(form){
    this.sub.next(form);
  }
}
