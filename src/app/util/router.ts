import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

export function injectRouterParam(paramId: string) {
  const route = inject(ActivatedRoute);

  const param = toSignal<string | undefined>(
    route.params.pipe(map((params) => params[paramId])),
  );

  return param;
}
