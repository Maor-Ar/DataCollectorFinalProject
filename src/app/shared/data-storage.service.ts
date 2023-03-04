import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) { }

  addRecordToDB(record){
    return this.http.post('https://emotiondetectorapidata-default-rtdb.firebaseio.com/recordsV3.json',record).subscribe( res => console.log("Submited!"));
  }
}
