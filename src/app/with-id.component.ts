import { Component } from '@angular/core';
import { UserComponent } from './component/user.component';
import { PokemonListComponent } from './component/pokemon-list.component';
import { PokemonDetailComponent } from './component/pokemon-detail.component';

@Component({
  selector: 'app-with-id',
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
export class WithIdComponent {}

@Component({
  selector: 'app-with-id',
  template: `
    <div class="grid grid-rows-5 grid-cols-1 max-w-[70rem] mx-auto p-4 gap-10">
      <app-user />
      <app-pokemon-list class="row-span-4 h-full" />
    </div>
  `,
  standalone: true,
  imports: [PokemonListComponent, UserComponent],
})
export class WithoutIdComponent {}
