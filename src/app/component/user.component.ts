import { Component, inject, input } from '@angular/core';
import { PokemonService, User } from '../service/pokemon.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { BehaviorSubject, catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-user-skeleton',
  template: `
    <div
      class="rounded-md bg-user p-4 border border-black h-full flex flex-col justify-around"
    >
      <span
        class="font-bold text-xl h-[4rem] bg-gray-300 animate-pulse bg-opacity-70"
      ></span>
      <span class=" h-[2rem] bg-gray-300 animate-pulse bg-opacity-70"> </span>
    </div>
  `,
  standalone: true,
})
export class UserSkeletonComponent {}

@Component({
  selector: 'app-user-view',
  template: `
    <div
      class="rounded-md bg-user p-4 border border-black h-full flex flex-col justify-around"
    >
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
    </div>
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
    @if (loading$ | async) {
      <app-user-skeleton />
    }
    @if (error$ | async; as error) {
      <span class="text-red-800">{{ error | json }}</span>
    }
    @if (user$ | async; as user) {
      <app-user-view [user]="user"></app-user-view>
    }
  `,
  standalone: true,
  imports: [UserSkeletonComponent, UserViewComponent, JsonPipe, AsyncPipe],
})
export class UserComponent {
  private pokemonService = inject(PokemonService);

  public loading$ = new BehaviorSubject(true);
  public error$ = new BehaviorSubject(null);

  public user$ = this.pokemonService.getCurrentUser().pipe(
    catchError((error) => {
      this.error$.next(error);
      return of(null);
    }),
    finalize(() => {
      this.loading$.next(false);
    }),
  );
}
