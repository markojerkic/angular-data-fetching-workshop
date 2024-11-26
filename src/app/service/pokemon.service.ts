import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Pokemon = {
  name: string;
  url: string;
  isFavourite: boolean;
};
export type PokemonPage = {
  count: number;
  next?: string;
  previous?: string;
  results: Pokemon[];
};

export type User = {
  user: string;
  favourite: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class PokemonService implements IPokemonService {
  private httpClient = inject(HttpClient);

  public getPokemon(name: string): Observable<Pokemon> {
    return this.httpClient.get<Pokemon>(
      `http://localhost:3000/pokemon/${name}`,
    );
  }

  public getCurrentUser(): Observable<User> {
    return this.httpClient.get<{ user: string; favourite: string | null }>(
      `http://localhost:3000/user`,
    );
  }

  public getAllPokemon(): Observable<PokemonPage> {
    return this.httpClient.get<PokemonPage>('http://localhost:3000/pokemon');
  }

  public setPokemonAsFavourite(name: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
}

interface IPokemonService {
  getPokemon(name: string): Observable<Pokemon>;
  getCurrentUser(): Observable<User>;
  getAllPokemon(): Observable<PokemonPage>;
  setPokemonAsFavourite(name: string): Observable<void>;
}
