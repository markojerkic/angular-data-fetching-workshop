import { Component, inject, input, OnInit } from '@angular/core';
import { PokemonDetail, PokemonService } from '../service/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail-skeleton',
  template: `
    <div class="h-10 rounded-xl bg-gray-300 animate-pulse bg-opacity-70"></div>

    <img
      class="mx-auto bg-gray-300 animate-pulse bg-opacity-70 my-2"
      height="250"
      width="250"
    />

    <h2 class="h-10 rounded-xl bg-gray-300 animate-pulse bg-opacity-70"></h2>
    <ul class="pl-2">
      <li
        class="h-8 rounded-xl bg-gray-300 animate-pulse bg-opacity-70 mt-2"
      ></li>
      <li
        class="h-8 rounded-xl bg-gray-300 animate-pulse bg-opacity-70 mt-2"
      ></li>
      <li
        class="h-8 rounded-xl bg-gray-300 animate-pulse bg-opacity-70 mt-2"
      ></li>
    </ul>
  `,
  standalone: true,
})
export class PokemonDetailSkeletonComponent {}

@Component({
  selector: 'app-pokemon-detail-view',
  template: `
    <h1 class="font-bold text-2xl">{{ pokemon().name }}</h1>
    @if (pokemon().isFavourite) {
      <span class="text-sm text-green-800">Omiljeni</span>
    }

    <img
      [src]="getSprite(pokemon().id)"
      class="mx-auto"
      style="image-rendering: pixelated;"
      height="250"
      width="250"
    />

    <h2 class="mt-4 font-semibold text-xl">Abilities</h2>
    <ul class="pl-2">
      @for (ability of pokemon().abilities; track ability.slot) {
        <li>
          {{ ability.ability.name }}
        </li>
      }
    </ul>

    <h2 class="mt-4 font-semibold text-xl">Forms</h2>
    <ul class="pl-2">
      @for (form of pokemon().forms; track form.name) {
        <li>
          {{ form.name }}
        </li>
      }
    </ul>
  `,
  standalone: true,
  imports: [],
})
export class PokemonDetailViewComponent {
  public pokemon = input.required<PokemonDetail>();

  public getSprite(id: number) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}

@Component({
  selector: 'app-pokemon-detail',
  template: `
    <div class="h-full rounded-md bg-detail p-4 border border-black bloc">
      @if (loading) {
        <app-pokemon-detail-skeleton />
      } @else if (error) {
        <span class="text-red-800">{{ error | json }}</span>
      } @else if (pokemonDetail) {
        <app-pokemon-detail-view [pokemon]="pokemonDetail" />
        <button
          class="mt-4 self-end bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2"
          (click)="markAsFavourite(pokemonDetail.name)"
        >
          Označi kao omiljenog
        </button>
      }
    </div>
  `,
  standalone: true,
  imports: [
    PokemonDetailViewComponent,
    PokemonDetailSkeletonComponent,
    JsonPipe,
  ],
})
export class PokemonDetailComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);

  public pokemonDetail: PokemonDetail | null = null;
  public loading = true;
  public error = null;

  ngOnInit() {
    this.pokemonService.getPokemon(this.route.snapshot.params['id']).subscribe({
      next: (pokemon) => {
        this.pokemonDetail = pokemon;
      },
      error: (error) => {
        this.error = error;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  public markAsFavourite(name: string) {
    this.pokemonService.setPokemonAsFavourite(name).subscribe(() => {
      alert('Označeno kao omiljeni');
    });
  }
}
