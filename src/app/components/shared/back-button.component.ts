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
    background: linear-gradient(135deg, #00bfa5, #64ffda);
    border: none;
    color: #ffffff;
    font-weight: 600;
    font-size: 1rem;
    padding: 0.5rem 1.2rem;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .back-button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`]

})
export class BackButtonComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
