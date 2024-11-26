import { Routes } from '@angular/router';
import { WithIdComponent, WithoutIdComponent } from './with-id.component';

export const routes: Routes = [
  {
    path: '',
    component: WithoutIdComponent,
  },
  {
    path: 'pokemon/:id',
    component: WithIdComponent,
  },
];
