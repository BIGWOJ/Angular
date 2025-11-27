import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { List } from './list/list';
import { Random } from './random/random';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, List, Random],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app');
  public name: string = "Wojtek Latos";
}
