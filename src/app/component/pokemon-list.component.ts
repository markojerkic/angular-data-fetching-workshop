import { Component, inject, input, OnInit } from '@angular/core';
import {
  Pokemon,
  PokemonPage,
  PokemonService,
} from '../service/pokemon.service';
import { RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-list-skeleton',
  template: `
    <ul class="flex flex-col gap-2">
      <li
        class="flex justify-between items-center h-10 rounded-xl bg-gray-300 animate-pulse bg-opacity-70"
      ></li>
      <li
        class="flex justify-between items-center h-10 rounded-xl bg-gray-300 animate-pulse bg-opacity-70"
      ></li>
      <li
        class="flex justify-between items-center h-10 rounded-xl bg-gray-300 animate-pulse bg-opacity-70"
      ></li>
      <li
        class="flex justify-between items-center h-10 rounded-xl bg-gray-300 animate-pulse bg-opacity-70"
      ></li>
      <li
        class="flex justify-between items-center h-10 rounded-xl bg-gray-300 animate-pulse bg-opacity-70"
      ></li>
      <li
        class="flex justify-between items-center h-10 rounded-xl bg-gray-300 animate-pulse bg-opacity-70"
      ></li>
    </ul>
  `,
  standalone: true,
})
export class PokemonListSkeletonComponent {}

@Component({
  selector: 'app-pokemon-list-item',
  template: `
    <li class="flex justify-between items-center">
      <span>{{ pokemon().name }}</span>

      <span class="flex justify-end text-center items-center gap-2">
        @if (pokemon().isFavourite) {
          <span class="text-sm text-green-800">Omiljeni</span>
        } @else {
          <span class="text-sm text-rose-800">Nije omiljeni</span>
        }

        <a
          class="rounded-md border border-black p-2"
          [routerLink]="['/pokemon', pokemon().name]"
        >
          Pogledaj
        </a>
      </span>
    </li>
  `,
  standalone: true,
  imports: [RouterLink],
})
export class PokemonListItemComponent {
  public pokemon = input.required<Pokemon>();
}

@Component({
  selector: 'app-pokemon-list',
  template: `
    <div class="h-full rounded-md bg-list p-4 border border-black">
      <ul class="flex flex-col gap-2">
        @if (loading) {
          <app-pokemon-list-skeleton />
        } @else if (error) {
          <span class="text-red-800">{{ error | json }}</span>
        } @else if (pokemon) {
          @for (pokemon of pokemon.results; track pokemon.name) {
            <app-pokemon-list-item [pokemon]="pokemon" />
            @if (!$last) {
              <hr />
            }
          }
        }
      </ul>

      <button
        (click)="loadMore()"
        class="mt-4 rounded-md border border-black p-2 bg-violet-300"
      >
        Učitaj još
      </button>
    </div>
  `,
  styles: `
    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 1px solid black;
      margin: 1em 0;
      padding: 0;
    }
  `,
  standalone: true,
  imports: [PokemonListItemComponent, PokemonListSkeletonComponent, JsonPipe],
})
export class PokemonListComponent implements OnInit {
  private pokemonService = inject(PokemonService);

  public pokemon: PokemonPage | null = null;
  public loading = true;
  public error = null;

  ngOnInit() {
    this.pokemonService.getAllPokemon().subscribe({
      next: (pokemon) => {
        this.pokemon = pokemon;
      },
      error: (error) => {
        this.error = error;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  public loadMore() {
    alert('Kako???');
  }
}
