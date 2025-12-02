import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-random',
    imports: [],
    templateUrl: './random.html',
    styleUrl: './random.css',
})
export class Random {
    @Input() maxNumber: number = 100;
    public randomNumber: number = 0;

    public generateRandomNumber(): void {
        this.randomNumber = Math.floor(Math.random() * (this.maxNumber + 1));
    }

    public getCommentText(): string {
        if (this.randomNumber <= 0.5 * this.maxNumber) {
            return 'Number lower than 0.5*max';
        } else {
            return 'Number greater than 0.5*max';
        }
    }

    public getCommentClass(): string {
        return this.randomNumber <= 0.5 * this.maxNumber ? 'low-value' : 'high-value';
    }

}
