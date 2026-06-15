import { Component, computed, linkedSignal, signal } from '@angular/core';

type Region = 'РФ' | 'ЕС';

const METHODS: Record<Region, string[]> = {
  'РФ': ['Почта', 'СДЭК', 'Самовывоз'],
  'ЕС': ['DHL', 'DPD'],
};

/** При смене региона linkedSignal сбрасывает выбор; обычный signal — нет. */
@Component({
  selector: 'app-linked-reset',
  templateUrl: './linked-reset.html',
  styleUrl: '../../../shared/compare.scss',
})
export class LinkedReset {
  protected readonly regions: Region[] = ['РФ', 'ЕС'];

  // --- Раньше: signal без авто-сброса ---
  protected readonly legacyRegion = signal<Region>('РФ');
  protected readonly legacyMethods = computed(() => METHODS[this.legacyRegion()]);
  protected readonly legacySelected = signal<string>(METHODS['РФ'][0]);
  protected readonly legacyValid = computed(() => this.legacyMethods().includes(this.legacySelected()));

  protected setLegacyRegion(region: Region): void {
    this.legacyRegion.set(region); // selected не трогаем — он может стать невалидным
  }

  protected pickLegacy(method: string): void {
    this.legacySelected.set(method);
  }

  // --- Сейчас: linkedSignal сбрасывается при смене источника ---
  protected readonly region = signal<Region>('РФ');
  protected readonly methods = computed(() => METHODS[this.region()]);
  protected readonly selected = linkedSignal(() => this.methods()[0]);

  protected setRegion(region: Region): void {
    this.region.set(region);
  }

  protected pick(method: string): void {
    this.selected.set(method);
  }
}
