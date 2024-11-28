import { Component, inject, input } from '@angular/core';
import { PokemonService, User } from '../service/pokemon.service';
import { RouterLink } from '@angular/router';

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
  selector: 'app-user-view',
  template: `
    <span class="font-bold text-xl">{{ user().user }}</span>

    <span>
      @if (user().favourite; as favourite) {
        Najdraži:
        <a
          [routerLink]="['/pokemon', favourite]"
          class="font-semibold text-green-800 hover:underline underline-offset-2"
        >
          {{ favourite }}
        </a>
      } @else {
        Nema najdražeg još
      }
    </span>
  `,
  standalone: true,
  imports: [RouterLink],
})
export class UserViewComponent {
  public user = input.required<User>();
}

@Component({
  selector: 'app-user',
  template: `
    <div
      class="rounded-md bg-user p-4 border border-black h-full flex flex-col justify-around"
    ></div>
  `,
  standalone: true,
  imports: [UserSkeletonComponent, UserViewComponent],
})
export class UserComponent {
  private pokemonService = inject(PokemonService);

  // Trebamo koristiti funkciju this.pokemonService.getCurrentUser()
  // @result {Observable<User>}
}
