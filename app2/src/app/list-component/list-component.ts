import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Person, PersonService } from '../person-service';

@Component({
  selector: 'app-list-component',
  imports: [RouterModule],
  templateUrl: './list-component.html',
  styleUrl: './list-component.css',
})
export class ListComponent implements OnInit {
    persons: Person[] = [];

    constructor(private personService: PersonService) {}

    ngOnInit(): void {
        this.persons = this.personService.getAllPersons();
    }

    delete(index: number): void {
        this.personService.removePerson(index);
        this.persons = this.personService.getAllPersons();
    }
}
