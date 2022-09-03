import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { QuestionsComponent } from './questions/questions.component';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';


const appRoutes :Routes = [
  {path:'',redirectTo:'/questions', pathMatch:'full'},
  {path:'questions', component: QuestionsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    QuestionsComponent
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
