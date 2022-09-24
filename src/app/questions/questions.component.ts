// import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';

// @Component({
//   selector: 'app-questions',
//   templateUrl: './questions.component.html',
//   styleUrls: ['./questions.component.css']
// })
// export class QuestionsComponent implements OnInit{


//   // questions :any[] = 
//   // [
//   //   {title: 'name', question: "What is your name?", type:'text'},
//   //   {title: 'lastName', question: "What is your last name?", type:'text'},
//   //   {title: 'where', question: "Where are you from?", type:'text'},
//   //   {title: 'how', question: "How was your day?", type:'text'},
//   //   {title: 'rate', question: "Rate how mad you are from 1 to 10?", type:'number', range: {min:0,max:10}},
//   //   {title: 'gender', question: "what is your gender?", type:'list', options: ['Male', 'Female', 'Other']},   
//   // ];



//   constructor() { }

//   ngOnInit(): void {
//   }

//   onSubmit(form: any){
//     console.log(form.value);
//     // form.reset();
//   }

// }


import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../shared/data-storage.service';
import { FormSubmitService } from '../shared/form-submit.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {


  @ViewChild('f', { static: false }) signupForm: NgForm;

  constructor(private dataStorageService : DataStorageService, private formSubmitService: FormSubmitService) {}


  onSubmit() {
    // this.submitted = true;
    // this.user.username = this.signupForm.value.userData.username;
    // this.user.email = this.signupForm.value.userData.email;
    // this.user.secretQuestion = this.signupForm.value.secret;
    // this.user.answer = this.signupForm.value.questionAnswer;
    // this.user.gender = this.signupForm.value.gender;
    console.log(this.signupForm.value);
    this.formSubmitService.onSubmit(this.signupForm.value);
    // this.dataStorageService.addRecordToDB(this.signupForm.value);
    this.signupForm.reset();
  }

  
}
