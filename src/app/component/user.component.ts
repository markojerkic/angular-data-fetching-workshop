import { Component, inject } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user',
  template: `
    <div class="rounded-md bg-user p-4 border border-black h-full">
      <span>Marko Jerkić</span>
    </div>
  `,
  standalone: true,
})
export class UserComponent {
  private pokemonService = inject(PokemonService);
}
