import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export function caching<T>(
    expirationInSeconds: number,
    key: string
): (source: Observable<T>) => Observable<T> {

    return function cacheInternal(source: Observable<T>): Observable<T> {

        const item = localStorage.getItem(key);
        if (!!item) {
            const cachedItem = <CacheItem>JSON.parse(item);
            if (cachedItem.expiration > new Date().getTime()) {
                return of(<T>cachedItem.value);
            }
        }

        return source.pipe(tap(r => {
            const newItem: CacheItem = {value: r, expiration: new Date().getTime() + expirationInSeconds * 1000};
            localStorage.setItem(key, JSON.stringify(newItem));
        }));
    };
}

export interface CacheItem {
    value: any;
    expiration: number;
}
