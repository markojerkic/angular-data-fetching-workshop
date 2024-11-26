import { Component, inject, input } from '@angular/core';
import { Pokemon, PokemonService } from '../service/pokemon.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

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

      <a
        class="rounded-md border border-black p-2"
        [routerLink]="['/pokemon', pokemon().name]"
      >
        Pogledaj
      </a>
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
        @for (pokemon of (pokemon$ | async)?.results; track pokemon.name) {
          <app-pokemon-list-item [pokemon]="pokemon" />

          @if (!$last) {
            <hr />
          }
        } @empty {
          <app-pokemon-list-skeleton />
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
  imports: [AsyncPipe, PokemonListItemComponent, PokemonListSkeletonComponent],
})
export class PokemonListComponent {
  private pokemonService = inject(PokemonService);

  public pokemon$ = this.pokemonService.getAllPokemon();

  public loadMore() {
    alert('Kako???');
  }
}
