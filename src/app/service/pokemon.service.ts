import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Pokemon = {
  name: string;
  url: string;
  isFavourite: boolean;
};

export type PokemonDetail = Pokemon & {
  id: number;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];

  forms: {
    name: string;
    url: string;
  }[];
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
export class PokemonService {
  private httpClient = inject(HttpClient);

  public getPokemon(name: string): Observable<PokemonDetail> {
    return this.httpClient.get<PokemonDetail>(
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
    return this.httpClient.post<void>('http://localhost:3000/favourite', {
      favourite: name,
    });
  }
}
