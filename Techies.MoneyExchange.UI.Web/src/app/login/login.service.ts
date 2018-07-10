import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TOKEN_ENDPOINT } from './login.constant';

@Injectable()
export class LoginService {

    constructor(@Inject(TOKEN_ENDPOINT)
    private securityUrl: string,
        private httpClient: HttpClient) { }

    loginWithPassword(user: string, password: string): Observable<string> {
        return this.httpClient.post<TokenResponse>(this.securityUrl, { username: user, password })
            .pipe(map(r => r.token));
    }
}

export interface TokenResponse {
    token: string;
}
