import { Component, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, delay, of, throwError } from 'rxjs';

interface Profile {
  id: number;
  name: string;
  role: string;
}

const DB: Record<number, Profile> = {
  1: { id: 1, name: 'Анна', role: 'Admin' },
  2: { id: 2, name: 'Борис', role: 'Editor' },
  3: { id: 3, name: 'Вера', role: 'Viewer' },
};

function fetchProfile$(id: number): Observable<Profile> {
  const found = DB[id];
  return found
    ? of(found).pipe(delay(700))
    : throwError(() => new Error(`Профиль #${id} не найден`)).pipe(delay(700));
}

/** rxResource: загрузчик возвращает Observable (как HttpClient). */
@Component({
  selector: 'app-rx-resource',
  templateUrl: './rx-resource.html',
  styleUrl: '../../../shared/compare.scss',
})
export class RxResource {
  protected readonly ids = [1, 2, 3, 99];
  protected readonly userId = signal(1);

  protected readonly profile = rxResource({
    params: () => ({ id: this.userId() }),
    stream: ({ params }) => fetchProfile$(params.id),
  });

  protected load(id: number): void {
    this.userId.set(id);
  }

  protected errorText(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}
