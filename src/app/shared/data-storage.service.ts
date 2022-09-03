import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) { }

  addRecordToDB(record){
    return this.http.put('https://emotiondetectorapidata-default-rtdb.firebaseio.com/recordsV1.json',record).subscribe( res => console.log(res));
  }
}
