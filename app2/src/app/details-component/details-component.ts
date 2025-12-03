import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Person, PersonService } from '../person-service';

@Component({
    selector: 'app-details-component',
    imports: [RouterModule],
    templateUrl: './details-component.html',
    styleUrl: './details-component.css',
})
export class DetailsComponent implements OnInit {
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);
    private personService = inject(PersonService);
    
    detailsId = signal('');
    person = signal<Person | null>(null);
    personIndex = signal<number>(-1);

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
            this.detailsId.set(id);
            this.loadPerson(parseInt(id, 10));
        });
    }

    private loadPerson(index: number): void {
        const foundPerson = this.personService.getPerson(index);
        if (foundPerson) {
            this.person.set(foundPerson);
            this.personIndex.set(index);
        } else {
            this.router.navigate(['/']);
        }
    }

    goBack(): void {
        this.router.navigate(['/']);
    }

    deletePerson(): void {
        this.personService.removePerson(this.personIndex());
        this.router.navigate(['/']);
    }
}
