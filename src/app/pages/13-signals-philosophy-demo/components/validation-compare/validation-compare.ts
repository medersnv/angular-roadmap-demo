import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/** Валидация: Reactive Forms Validators против signals + computed. */
@Component({
  selector: 'app-validation-compare',
  imports: [ReactiveFormsModule],
  templateUrl: './validation-compare.html',
  styleUrl: '../../../shared/compare.scss',
})
export class ValidationCompare {
  // --- Раньше: Reactive Forms + Validators ---
  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    age: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(18)],
    }),
  });
  protected readonly legacySent = signal(false);

  protected submitLegacy(): void {
    if (this.form.valid) {
      this.legacySent.set(true);
    }
  }

  // --- Сейчас: signals + computed ---
  protected readonly name = signal('');
  protected readonly age = signal<number | null>(null);
  protected readonly nameTouched = signal(false);
  protected readonly ageTouched = signal(false);
  protected readonly sent = signal(false);

  protected readonly nameError = computed(() => (this.name().trim() ? null : 'Имя обязательно'));
  protected readonly ageError = computed(() => {
    const a = this.age();
    if (a === null) return 'Возраст обязателен';
    if (a < 18) return 'Должно быть ≥ 18';
    return null;
  });
  protected readonly valid = computed(() => !this.nameError() && !this.ageError());

  protected setName(value: string): void {
    this.name.set(value);
    this.sent.set(false);
  }

  protected setAge(raw: string): void {
    this.age.set(raw === '' ? null : Number(raw));
    this.sent.set(false);
  }

  protected submit(): void {
    if (this.valid()) {
      this.sent.set(true);
    }
  }
}
