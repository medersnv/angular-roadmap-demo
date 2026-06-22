import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

export interface AppConfig {
  theme: string;
  primaryColor: string;
  features: string[];
  locale: string;
  loadedFiles: number;
}

/**
 * Состояние конфигурации живёт в приватном BehaviorSubject, наружу — read-only поток.
 * Несколько JSON-файлов нужно загрузить параллельно и собрать в один объект ровно
 * один раз на старте приложения.
 */
@Injectable()
export class AppConfigService {
  private readonly configSubject = new BehaviorSubject<AppConfig | null>(null);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);

  readonly config$ = this.configSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();

  /**
   * forkJoin, потому что это набор КОНЕЧНЫХ запросов, и результат нужен, только когда
   * пришли ВСЕ. forkJoin ждёт complete каждого источника и отдаёт последний снимок
   * единым кортежем — идеально для «загрузить N файлов и слить в один config».
   * combineLatest здесь не годится: он эмитил бы промежуточные частичные комбинации.
   */
  load(): void {
    this.loadingSubject.next(true);

    forkJoin({
      theme: this.readJson('theme.json', { theme: 'dark', primaryColor: '#6a1b9a' }),
      features: this.readJson('features.json', { flags: ['offline', 'beta-search'] }),
      i18n: this.readJson('i18n.json', { locale: 'ru-RU' }),
    })
      .pipe(
        map(({ theme, features, i18n }): AppConfig => ({
          theme: theme.theme,
          primaryColor: theme.primaryColor,
          features: features.flags,
          locale: i18n.locale,
          loadedFiles: 3,
        })),
        tap(() => this.loadingSubject.next(false)),
      )
      // Один разовый bootstrap-запрос: подписку закрывать не нужно — forkJoin
      // завершится сам после первого (и единственного) значения.
      .subscribe((config) => this.configSubject.next(config));
  }

  /** Имитация HttpClient.get<T>('assets/config/...') с разной задержкой на файл. */
  private readJson<T>(file: string, payload: T): Observable<T> {
    const latency = 200 + Math.random() * 400;
    return of(payload).pipe(delay(latency));
  }
}
