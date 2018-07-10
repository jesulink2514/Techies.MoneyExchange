import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { API_BASE_URL } from '../shared/constants';
import { ExchangeRate } from './exchange-rate';
import { caching } from './../shared/services/caching-observable';

@Injectable()
export class ExchangeRateService {
    constructor(@Inject(API_BASE_URL) private baseUrl: string, private http: HttpClient) {}

    getExchangeRate(base: string, target: string): Observable<ExchangeRate> {
        const url = this.baseUrl + `/api/exchangerate/latest?base=${base}&symbols=${target}`;
        return this.http
          .get<ExchangeRate>(url)
          .pipe(catchError((error: any) => Observable.throw(error.json())))
          .pipe(caching(10, `rate-${base}-${target}`));
    }

    getAvailableCurrencies(): Observable<string[]> {
        const url = this.baseUrl + '/api/currency';
        return this.http.get<string[]>(url)
        .pipe(catchError((error: any) => Observable.throw(error.json())))
        .pipe(caching(10 * 60, 'currencies'));
    }
}
