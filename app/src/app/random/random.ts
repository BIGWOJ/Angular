import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-random',
  imports: [],
  templateUrl: './random.html',
  styleUrl: './random.css',
})
export class Random {
    private randomService = Inject(Random);
}
