import { Component, inject, input, OnInit } from '@angular/core';
import { PokemonService, User } from '../service/pokemon.service';
import { RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';

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
    @if (loading) {
      <app-user-skeleton />
    } @else if (error) {
      <span class="text-red-800">{{ error | json }}</span>
    } @else if (user) {
      <app-user-view [user]="user"></app-user-view>
    }
  `,
  standalone: true,
  imports: [UserSkeletonComponent, UserViewComponent, JsonPipe],
})
export class UserComponent implements OnInit {
  private pokemonService = inject(PokemonService);

  public user: User | null = null;
  public loading = true;
  public error = null;

  ngOnInit() {
    this.pokemonService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        this.error = error;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
