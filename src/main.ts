import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { RecipeCardComponent } from './app/components/recipe-card.component';
import { SearchBarComponent } from './app/components/search-bar.component';
import { RecipeService } from './app/services/recipe.service';
import { Recipe } from './app/models/recipe.model';
import { importProvidersFrom } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RecipeCardComponent, SearchBarComponent],
  template: `
    <div class="app-container">
      <header>
        <h1><span style="cursor: pointer" (click)="reloadPage()">🍳</span> Buscador de Receitas</h1>
        <p class="subtitle">Encontre receitas deliciosas com seus ingredientes favoritos</p>
      </header>

      <app-search-bar (searchEvent)="searchRecipes($event)"></app-search-bar>

      <div *ngIf="searching" class="message-container">
        <p>Buscando receitas... 🔍</p>
      </div>

      <div *ngIf="!searching && recipes.length === 0 && hasSearched" class="message-container">
        <p>Nenhuma receita encontrada para "{{lastSearch}}" 😔</p>
        <p>Tente buscar com outros ingredientes!</p>
      </div>

      <div class="recipe-grid">
        <app-recipe-card 
          *ngFor="let recipe of recipes" 
          [recipe]="recipe"
        ></app-recipe-card>
      </div>
    </div>
  `
})
export class App {
  recipes: Recipe[] = [];
  searching = false;
  hasSearched = false;
  lastSearch = '';

  constructor(private recipeService: RecipeService) {}

  searchRecipes(ingredient: string) {
    this.searching = true;
    this.lastSearch = ingredient;
    this.hasSearched = true;
    this.recipes = [];

    this.recipeService.searchRecipes(ingredient).subscribe({
      next: (data) => {
        this.recipes = data.hits;
        this.searching = false;
      },
      error: () => {
        this.searching = false;
      }
    });
  }

  reloadPage() {
    window.location.reload();
  }
}

bootstrapApplication(App, {
  providers: [
    RecipeService,
    provideHttpClient(),
    importProvidersFrom(HttpClientModule)
  ]
});