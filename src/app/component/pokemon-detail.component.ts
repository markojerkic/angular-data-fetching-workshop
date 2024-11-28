import { Component, inject, input } from '@angular/core';
import {
  PokemonDetail,
  PokemonService,
  User,
} from '../service/pokemon.service';
import { JsonPipe } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { injectRouterParam } from '../util/router';
import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';

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
      @if (pokemonDetail.isPending()) {
        <app-pokemon-detail-skeleton />
      } @else if (pokemonDetail.isError()) {
        <span class="text-red-800">{{ pokemonDetail.error() | json }}</span>
      } @else if (pokemonDetail.isSuccess()) {
        @if (pokemonDetail.data(); as pokemonDetail) {
          <app-pokemon-detail-view [pokemon]="pokemonDetail" />
          <button
            [class]="
              'mt-4 self-end bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 ' +
              (favouriteMutation.isPending()
                ? 'cursor-not-allowed bg-gray-500'
                : '')
            "
            (click)="markAsFavourite(pokemonDetail.name)"
          >
            Označi kao omiljenog
          </button>
          @if (favouriteMutation.isError()) {
            <span class="text-red-800"
              >Greška kod označavanja favorita:
              {{ favouriteMutation.error() | json }}</span
            >
          }
        }
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
export class PokemonDetailComponent {
  private pokemonService = inject(PokemonService);
  private pokemonId = injectRouterParam('id');
  private queryClient = injectQueryClient();

  public favouriteMutation = injectMutation(() => ({
    mutationKey: ['favourite'],
    mutationFn: (name: string) => {
      return lastValueFrom(this.pokemonService.setPokemonAsFavourite(name));
    },
    onSuccess: () => {
      this.queryClient.invalidateQueries({
        queryKey: ['pokemon-list'],
      });

      this.queryClient.setQueryData(
        ['pokemon', `pokemon-${this.pokemonId()}`],
        (data: PokemonDetail) => {
          return {
            ...data,
            isFavourite: true,
          };
        },
      );

      this.queryClient.setQueryData(['user'], (data: User) => {
        return {
          ...data,
          favourite: this.pokemonId(),
        };
      });
    },
  }));

  public pokemonDetail = injectQuery(() => ({
    queryKey: ['pokemon', `pokemon-${this.pokemonId()}`],
    queryFn: () =>
      lastValueFrom(this.pokemonService.getPokemon(this.pokemonId()!)),
    enabled: !!this.pokemonId(),
  }));

  public markAsFavourite(name: string) {
    this.favouriteMutation.mutate(name);
  }
}
