import { Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/** Reactive Forms против модели на сигналах (идея Signal Forms). */
@Component({
  selector: 'app-forms-compare',
  imports: [ReactiveFormsModule],
  template: `
    <div class="compare-2">
      <article class="panel panel-before">
        <h4><span class="tag tag-before">Раньше</span> Reactive Forms</h4>
        <form [formGroup]="form" class="stack">
          <input class="field" type="text" formControlName="name" placeholder="имя (required)" />
          <input class="field" type="number" formControlName="age" placeholder="возраст" />
        </form>
        <p class="metric">
          valid:
          @if (form.valid) {
            <span class="pill pill-ok">да</span>
          } @else {
            <span class="pill pill-no">нет</span>
          }
        </p>
        <p class="metric">value = <strong>{{ form.value.name }} / {{ form.value.age }}</strong></p>
        <p class="hint">FormGroup + FormControl + Validators; значение — form.value / valueChanges.</p>
      </article>

      <article class="panel panel-after">
        <h4><span class="tag tag-after">Сейчас</span> сигналы + computed</h4>
        <div class="stack">
          <input
            class="field"
            type="text"
            placeholder="имя (required)"
            [value]="name()"
            (input)="name.set($any($event.target).value)"
          />
          <input
            class="field"
            type="number"
            placeholder="возраст"
            [value]="age()"
            (input)="setAge($any($event.target).value)"
          />
        </div>
        <p class="metric">
          valid:
          @if (valid()) {
            <span class="pill pill-ok">да</span>
          } @else {
            <span class="pill pill-no">нет</span>
          }
        </p>
        <p class="metric">value = <strong>{{ value().name }} / {{ value().age }}</strong></p>
        <p class="hint">Модель — signals, валидность — computed. Без подписок на valueChanges.</p>
      </article>
    </div>
  `,
  styleUrl: '../../../shared/compare.scss',
})
export class FormsCompare {
  // --- Раньше: Reactive Forms ---
  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    age: new FormControl(0, { nonNullable: true }),
  });

  // --- Сейчас: модель на сигналах ---
  protected readonly name = signal('');
  protected readonly age = signal(0);
  protected readonly valid = computed(() => this.name().trim().length > 0);
  protected readonly value = computed(() => ({ name: this.name(), age: this.age() }));

  protected setAge(raw: string): void {
    this.age.set(Number(raw) || 0);
  }
}
