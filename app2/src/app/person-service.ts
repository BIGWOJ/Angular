import { Injectable } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

export interface Person {
    firstName?: string;
    lastName?: string;
    age?: number;
    address: {
        city?: string;
        street?: string;
        postCode?: string;
  }
}

@Injectable({
    providedIn: 'root',
})
export class PersonService {
    private readonly STORAGE_KEY = 'persons';

    constructor(private localStorageService: LocalStorageService) {}

    getAllPersons(): Person[] {
        const persons = this.localStorageService.getItem<Person[]>(this.STORAGE_KEY);
        return persons || [];
    }

    addPerson(person: Person): void {
        const persons = this.getAllPersons();
        persons.push(person);
        this.localStorageService.setItem(this.STORAGE_KEY, persons);
    }

    removePerson(index: number): void {
        const persons = this.getAllPersons();
        if (index >= 0 && index < persons.length) {
            persons.splice(index, 1);
            this.localStorageService.setItem(this.STORAGE_KEY, persons);
        }
    }

    getPerson(index: number): Person | null {
        const persons = this.getAllPersons();
        return (index >= 0 && index < persons.length) ? persons[index] : null;
    }

}
