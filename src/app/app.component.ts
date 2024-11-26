import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    <div class="rounded-md bg-user p-4 border border-black h-full">
      <span>Marko Jerkiić</span>
    </div>
  `,
  standalone: true,
})
export class UserComponent {}

@Component({
  selector: 'app-pokemon-detail',
  template: `
    <div class="h-full rounded-md bg-detail p-4 border border-black">
      <span>Raichu</span>
    </div>
  `,
  standalone: true,
})
export class PokemonDetailComponent {}

@Component({
  selector: 'app-pokemon-list',
  template: `
    <div class="h-full rounded-md bg-list p-4 border border-black">
      <span>Pokemoni</span>
    </div>
  `,
  standalone: true,
})
export class PokemonListComponent {}

@Component({
  selector: 'app-root',
  template: `
    <div class="grid grid-rows-5 grid-cols-2 max-w-[70rem] mx-auto p-4 gap-10">
      <app-user />
      <app-pokemon-detail class="row-span-5 " />
      <app-pokemon-list class="row-span-4 h-full" />
    </div>
  `,
  standalone: true,
  imports: [PokemonListComponent, PokemonDetailComponent, UserComponent],
})
export class AppComponent {}
