import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="recipe-card">
      <div class="recipe-image">
        <img [src]="recipe.recipe.image" [alt]="recipe.recipe.label">
      </div>
      <div class="recipe-content">
        <h2>{{ recipe.recipe.label }}</h2>
        <p class="calories">
          <span class="icon">🔥</span>
          {{ recipe.recipe.calories | number:'1.0-0' }} calorias
        </p>
        <div class="ingredients">
          <h3><span class="icon">📝</span> Ingredientes:</h3>
          <ul>
            <li *ngFor="let ingredient of recipe.recipe.ingredientLines">
              {{ ingredient }}
            </li>
          </ul>
        </div>
        <a [href]="recipe.recipe.url" target="_blank" class="view-recipe">
          Ver Receita Completa <span class="icon">👩‍🍳</span>
        </a>
      </div>
    </div>
  `
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
}