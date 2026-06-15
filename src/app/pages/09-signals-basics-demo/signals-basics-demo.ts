import { Component } from '@angular/core';
import { getCurriculumItem } from '../../curriculum/curriculum';
import { ComputedMemo } from './components/computed-memo/computed-memo';
import { EffectCleanup } from './components/effect-cleanup/effect-cleanup';
import { EffectLog } from './components/effect-log/effect-log';
import { EqualitySignal } from './components/equality-signal/equality-signal';
import { UntrackedEffect } from './components/untracked-effect/untracked-effect';
import { SIGNALS_BASICS_ESSENTIALS, SIGNALS_BASICS_MOMENTS } from './signals-basics-info';

@Component({
  selector: 'app-signals-basics-demo',
  imports: [ComputedMemo, EffectLog, UntrackedEffect, EffectCleanup, EqualitySignal],
  templateUrl: './signals-basics-demo.html',
  styleUrl: '../shared/compare.scss',
})
export class SignalsBasicsDemo {
  protected readonly meta = getCurriculumItem('signals-basics')!;
  protected readonly essentials = SIGNALS_BASICS_ESSENTIALS;
  protected readonly moments = SIGNALS_BASICS_MOMENTS;
}
