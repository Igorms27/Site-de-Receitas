import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="search-container">
      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input 
          [(ngModel)]="ingredient" 
          class="search-box"
          placeholder="Digite um ingrediente..."
          (keyup.enter)="search()"
        >
        <button (click)="search()" class="search-button">
          Buscar Receitas
        </button>
      </div>
    </div>
  `
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();
  ingredient = '';

  search() {
    if (this.ingredient.trim()) {
      this.searchEvent.emit(this.ingredient);
    }
  }
}