import { Component, inject } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  template: `
    <div class="h-full rounded-md bg-detail p-4 border border-black">
      <span>Raichu</span>
    </div>
  `,
  standalone: true,
})
export class PokemonDetailComponent {
  private pokemonService = inject(PokemonService);
}
