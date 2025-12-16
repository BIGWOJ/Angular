import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Person, PersonService } from '../person-service';

@Component({
    selector: 'app-add-person-component',
    imports: [FormsModule, RouterModule],
    templateUrl: './add-person-component.html',
    styleUrl: './add-person-component.css',
})
export class AddPersonComponent {
    person: Person = {
        address: {}
    };

    constructor(
        private personService: PersonService,
        private router: Router
    ) {}

    save(): void {
        this.personService.addPerson(this.person).subscribe({
            next: () => {
                this.router.navigate(['/']);
            },
        });
    }
}
