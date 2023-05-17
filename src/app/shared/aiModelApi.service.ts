import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AiApiResponse } from '../interfaces/ai-api-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://europe-west6-concrete-braid-385214.cloudfunctions.net/EmotionAnalysisAPI';
  response: AiApiResponse;

  constructor(private http: HttpClient) { }

  public predict(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}