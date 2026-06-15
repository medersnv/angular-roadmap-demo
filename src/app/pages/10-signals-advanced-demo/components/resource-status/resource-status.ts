import { Component, resource, signal } from '@angular/core';

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

function fetchProfile(id: number): Promise<Profile> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = DB[id];
      if (found) {
        resolve(found);
      } else {
        reject(new Error(`Профиль #${id} не найден`));
      }
    }, 700);
  });
}

/** Ручная стейт-машина loading/data/error против resource(). */
@Component({
  selector: 'app-resource-status',
  templateUrl: './resource-status.html',
  styleUrl: '../../../shared/compare.scss',
})
export class ResourceStatus {
  protected readonly ids = [1, 2, 3, 99];

  // --- Раньше: три поля, переключаем руками ---
  protected readonly legacyStatus = signal<'idle' | 'loading' | 'resolved' | 'error'>('idle');
  protected readonly legacyData = signal<Profile | null>(null);
  protected readonly legacyError = signal<string | null>(null);

  constructor() {
    this.legacyLoad(1); // стартуем так же, как resource() ниже
  }

  protected legacyLoad(id: number): void {
    this.legacyStatus.set('loading');
    this.legacyError.set(null);
    fetchProfile(id).then(
      (profile) => {
        this.legacyData.set(profile);
        this.legacyStatus.set('resolved');
      },
      (error: Error) => {
        this.legacyData.set(null);
        this.legacyError.set(error.message);
        this.legacyStatus.set('error');
      },
    );
  }

  // --- Сейчас: resource() (experimental) ---
  protected readonly userId = signal(1);
  protected readonly profile = resource({
    params: () => ({ id: this.userId() }),
    loader: ({ params }) => fetchProfile(params.id),
  });

  protected load(id: number): void {
    this.userId.set(id);
  }

  protected errorText(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}
