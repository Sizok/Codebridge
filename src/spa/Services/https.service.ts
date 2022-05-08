import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpsService{
  private readonly _url = 'https://api.spaceflightnewsapi.net/v3/articles';
  private readonly _reservedFields: string[] = ['title_contains', 'summary_contains'];
  constructor( private readonly _http: HttpClient) { }

  private _getUrl(query: string | null): string {
    if (!query) return undefined;

    const words = query
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .split(' ')
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

    return this._reservedFields.reduce((acc, field, currentIndex) => {
      const str = words.map((v) => `_where[${field}]=${v}`).join('&');
      return acc += currentIndex === (this._reservedFields.length - 1) ? str : `${str}&`;
    }, `${this._url}?_limit=100&`);
    //

  }
  public getValue(query: string | null): Observable<Record<string, any>[]> {
    return this._http.get<Record<string, any>[]>(this._getUrl(query))
      .pipe(
        catchError(() => of([])),
      );
  }
  public getFullPost(query: string| null): Observable<Record<string, any>[]>{
    return this._http.get<Record<string, any>[]>(this._url +'/'+query)
    .pipe(
      catchError(() => of([])),
    );
  }
}
