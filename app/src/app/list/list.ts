import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  public items: string[] = [];
  public newItemControl = new FormControl('');

  public addItem(): void {
    const value = this.newItemControl.value?.trim();
    if (value) {
      this.items.push(value);
      this.newItemControl.setValue('');
    }
  }

  public removeItem(index: number): void {
    this.items.splice(index, 1);
  }
}
