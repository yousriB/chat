import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private url: string = 'https://libretranslate.com/translate';

  constructor(private http: HttpClient) { }

  translate(text: string, targetLanguage: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      q: text,
      source: 'en', // assuming the source language is English, you can make this dynamic if needed
      target: targetLanguage,
      format: 'text'
    };
    return this.http.post<any>(this.url, body, { headers });
  }
}