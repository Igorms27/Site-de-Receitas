import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly appId = '019b9b31';
  private readonly appKey = '0c323719c48ab833f9d7b70da566da5a';
  private readonly baseUrl = 'https://api.edamam.com/api/recipes/v2';

  constructor(private http: HttpClient) {}

  searchRecipes(ingredient: string): Observable<any> {
    const url = `${this.baseUrl}?type=public&q=${ingredient}&app_id=${this.appId}&app_key=${this.appKey}`;
    return this.http.get<any>(url);
  }
}