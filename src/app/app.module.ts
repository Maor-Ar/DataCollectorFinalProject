import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { FinishingScreenComponent } from './finishing-screen/finishing-screen.component';


const appRoutes :Routes = [
  {path:'',redirectTo:'/questions', pathMatch:'full'},
  {path:'questions', component: QuestionsComponent},
  {path:'finish', component: FinishingScreenComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    FinishingScreenComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
