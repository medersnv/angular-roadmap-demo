import { Component } from '@angular/core';

export const COURSE_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1kWj05y_PaSIm6NTS_q3P_vfjmyVYEov0n7HEyp7E5H8/edit?gid=986032517#gid=986032517';

export interface PresentationSection {
  title: string;
  description: string;
  example?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly courseSheetUrl = COURSE_SHEET_URL;

  protected readonly sections: PresentationSection[] = [
    {
      title: 'The Problem (Проблема)',
      description:
        'Какую боль или уязвимость решает эта технология? Что будет, если её не использовать?',
      example: 'Без OnPush Angular при каждом клике шуршит по всему дереву компонентов — покажи бенчмарк.',
    },
    {
      title: 'How it Works (Механика)',
      description: 'Краткий разбор концепта «под капотом»: схемы, анимации, очереди Event Loop.',
    },
    {
      title: 'Live Coding / Demo (Демонстрация)',
      description:
        'Живой код в IDE. Никаких скриншотов кода на слайдах, если можно открыть проект.',
    },
    {
      title: 'Pitfalls & Anti-patterns (Грабли)',
      description:
        'Как этим можно выстрелить себе в ногу: утечки памяти, блокировка потока, скрытые регрессии.',
    },
    {
      title: 'Application in our Project (Применение у нас)',
      description:
        'Где конкретно в нашем проекте — таможенные модули, ERP, формы — мы уже используем или внедрим этот подход.',
    },
  ];
}
