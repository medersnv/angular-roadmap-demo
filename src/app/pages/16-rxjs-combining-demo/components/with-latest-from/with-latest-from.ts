import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, startWith, withLatestFrom } from 'rxjs/operators';

interface Registration {
  email: string;
  plan: string;
}

/** Живой пример withLatestFrom: submit-поток тянет ПОСЛЕДНЕЕ валидное состояние формы. */
@Component({
  selector: 'app-with-latest-from',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './with-latest-from.html',
  styleUrl: '../../../shared/compare.scss',
})
export class WithLatestFrom {
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    plan: ['free', Validators.required],
  });

  protected readonly plans = ['free', 'pro', 'team'];

  // Поток-«триггер»: только сам факт клика, без данных.
  private readonly submitSubject = new Subject<void>();

  // Накопленные принятые заявки — приватный BehaviorSubject, наружу read-only.
  private readonly acceptedSubject = new BehaviorSubject<Registration[]>([]);
  readonly accepted$ = this.acceptedSubject.asObservable();

  constructor() {
    // Поток данных формы: всегда есть «последнее» значение (startWith со снимка).
    const formValue$ = this.form.valueChanges.pipe(startWith(this.form.getRawValue()));

    this.submitSubject
      .pipe(
        // withLatestFrom, а НЕ combineLatest: ведущий поток — клик. Эмиссия происходит
        // ТОЛЬКО когда кликнули; форма лишь «подмешивает» своё последнее значение.
        // combineLatest стрелял бы на каждое изменение формы — нам это не нужно.
        withLatestFrom(formValue$),
        map(([, value]) => value),
        // валидность проверяем в момент клика по актуальному состоянию формы
        filter(() => this.form.valid),
        map((value): Registration => ({ email: value.email!, plan: value.plan! })),
        takeUntilDestroyed(),
      )
      .subscribe((reg) => {
        this.acceptedSubject.next([reg, ...this.acceptedSubject.value]);
        this.form.reset({ email: '', plan: 'free' });
      });
  }

  protected submit(): void {
    this.form.markAllAsTouched();
    this.submitSubject.next();
  }
}
