import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Address {
    city?: string;
    street?: string;
    postCode?: string;
}

export interface Person {
    id?: number;
    firstName?: string;
    lastName?: string;
    age?: number;
    address: Address;
    _links?: {
        self: {
            href: string;
        };
    };
}

interface HalResponse {
    _embedded?: {
        persons: Person[];
    };
}

@Injectable({
    providedIn: 'root',
})
export class PersonService {
    private readonly API_URL = 'http://localhost:53894/api/persons';

    constructor(private http: HttpClient) {}

    private extractIdFromUrl(url: string): number {
        const parts = url.split('/');
        return parseInt(parts[parts.length - 1], 10);
    }

    getAllPersons(): Observable<Person[]> {
        return this.http.get<HalResponse>(this.API_URL).pipe(
            map(response => {
                const persons = response._embedded?.persons || [];
                return persons.map(person => {
                    if (person._links?.self?.href && !person.id) {
                        person.id = this.extractIdFromUrl(person._links.self.href);
                    }
                    return person;
                });
            })
        );
    }

    addPerson(person: Person): Observable<Person> {
        return this.http.post<Person>(this.API_URL, person);
    }

    removePerson(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }

    getPerson(id: number): Observable<Person> {
        return this.http.get<Person>(`${this.API_URL}/${id}`);
    }

    updatePerson(id: number, person: Person): Observable<Person> {
        return this.http.put<Person>(`${this.API_URL}/${id}`, person);
    }
}
