import { Component, inject } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-skeleton',
  template: `
    <span
      class="font-bold text-xl h-[4rem] bg-gray-300 animate-pulse bg-opacity-70"
    ></span>
    <span class=" h-[2rem] bg-gray-300 animate-pulse bg-opacity-70"> </span>
  `,
  standalone: true,
})
export class UserSkeletonComponent {}

@Component({
  selector: 'app-user',
  template: `
    <div
      class="rounded-md bg-user p-4 border border-black h-full flex flex-col justify-around"
    >
      @if (user$ | async; as user) {
        <span class="font-bold text-xl">{{ user.user }}</span>

        <span>
          @if (user.favourite; as favourite) {
            Najdraži: {{ favourite }}
          } @else {
            Nema najdražeg još
          }
        </span>
      }
    </div>
  `,
  standalone: true,
  imports: [AsyncPipe],
})
export class UserComponent {
  private pokemonService = inject(PokemonService);

  public user$ = this.pokemonService.getCurrentUser();
}
