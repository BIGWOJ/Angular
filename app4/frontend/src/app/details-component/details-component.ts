import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Person, PersonService } from '../person-service';

@Component({
    selector: 'app-details-component',
    imports: [RouterModule, CommonModule],
    templateUrl: './details-component.html',
    styleUrl: './details-component.css',
})
export class DetailsComponent implements OnInit {
    private activatedRoute = inject(ActivatedRoute);
    private router = inject(Router);
    private personService = inject(PersonService);
    
    detailsId = signal<number | null>(null);
    person = signal<Person | null>(null);
    loading = signal<boolean>(false);
    error = signal<string | null>(null);

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            const id = parseInt(params['id'], 10);
            this.detailsId.set(id);
            this.loadPerson(id);
        });
    }

    private loadPerson(id: number): void {
        this.loading.set(true);
        this.error.set(null);
        
        this.personService.getPerson(id).subscribe({
            next: (data) => {
                this.person.set(data);
                this.loading.set(false);
            },
            error: (error) => {
                this.loading.set(false);
            }
        });
    }

    goBack(): void {
        this.router.navigate(['/']);
    }

    deletePerson(): void {
        const id = this.detailsId();
        if (id !== null) {
            this.personService.removePerson(id).subscribe({
                next: () => {
                    this.router.navigate(['/']);
                },
            });
        }
    }
}
