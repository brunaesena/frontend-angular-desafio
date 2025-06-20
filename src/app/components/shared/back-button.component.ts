import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [],
  template: `
    <button (click)="goBack()" class="back-button">
      ← Voltar
    </button>
  `,
  styles: [`
    .back-button {
      background: none;
      border: none;
      color: #007bff;
      font-size: 1.1rem;
      cursor: pointer;
      margin-bottom: 1rem;
    }

    .back-button:hover {
      text-decoration: underline;
    }
  `]
})
export class BackButtonComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
