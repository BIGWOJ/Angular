import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Person, PersonService } from '../person-service';

@Component({
  selector: 'app-list-component',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './list-component.html',
  styleUrl: './list-component.css',
})
export class ListComponent implements OnInit {
    persons: Person[] = [];

    constructor(
        private personService: PersonService,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.loadPersons();
    }

    loadPersons(): void {
        this.cdr.detectChanges();
        
        this.personService.getAllPersons().subscribe({
            next: (data) => {
                this.persons = data;
                this.cdr.detectChanges();
            },
            error: (error) => {
                this.cdr.detectChanges();
            }
        });
    }

    delete(id: number | undefined): void {
        if (id === undefined) return;
        
        this.personService.removePerson(id).subscribe({
            next: () => {
                this.loadPersons();
            },
        });
    }
}
