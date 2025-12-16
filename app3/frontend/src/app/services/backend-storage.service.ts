import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BackendStorage {
    private readonly SETTINGS_URL = 'http://localhost:53894/api/settings';

    constructor(private http: HttpClient) {}

    setItem(key: string, value: any): Observable<any> {
        try {
            const jsonValue = JSON.stringify({ key, value });
            return this.http.post<any>(this.SETTINGS_URL, jsonValue).pipe(
                catchError((error) => {
                    return of(null);
                })
            );
        } catch (error) {
            return of(null);
        }
    }

    getItem<T>(key: string): Observable<T | null> {
        return this.http.get<any>(this.SETTINGS_URL).pipe(
            map((resp) => {
                if (!resp || !resp.jsonData) return null;
                try {
                    const parsed = JSON.parse(resp.jsonData);
                    if (parsed && parsed.key === key) return parsed.value as T;
                    return null;
                } catch (e) {
                    return null;
                }
            }),
            catchError((error) => {
                return of(null);
            })
        );
    }

    removeItem(key: string): void {
        console.warn('removeItem: not implemented on backend');
    }

    clear(): void {
        console.warn('clear: not implemented on backend');
    }
}
