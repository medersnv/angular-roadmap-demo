# Angular Roadmap Demo

Интерактивная площадка для внутреннего обучения команды: **live-демо в коде**, навигация по roadmap, материалы презентаций и регламент выступлений (формула **30/70**).

## Для кого

- **Frontend-разработчики** — углубление в Angular и смежные темы (не «как пользоваться API», а «как это работает под капотом»).
- **Докладчики** — готовая структура презентации, демо-страницы и папки для артефактов.
- **Team lead / архитекторы** — единый план роста команды от Core Internals до TypeScript, SSR, CI/CD и безопасности.

## Что внутри

| Раздел | Описание |
|--------|----------|
| **Демо-страницы** | 79 тем с отдельными компонентами и роутами; 8 уже с интерактивными примерами |
| **Меню** | 29 категорий, сворачиваемые группы, переход по темам |
| **Главная** | Регламент презентации 30/70 и ссылка на [таблицу курса](https://docs.google.com/spreadsheets/d/1kWj05y_PaSIm6NTS_q3P_vfjmyVYEov0n7HEyp7E5H8/edit?gid=986032517#gid=986032517) |
| **Артефакты** | `/artifacts` — просмотр и скачивание PDF, слайдов и других файлов из `public/artifacts/` |

## Темы (29 категорий)

1. Angular Core Internals — lifecycle, change detection, Zone.js, DI  
2. Signals (Modern Core)  
3. RxJS (Deep Dive)  
4. Standalone Architecture  
5. Routing (Advanced)  
6. State Management  
7. Modern Control Flow  
8. Deferrable Views  
9. Performance Optimization  
10. Forms (Advanced)  
11. Rendering / SSR  
12. Testing  
13. Architecture & Monorepos  
14. Design System  
15. Frontend Setup & CI/CD  
16. Performance Metrics  
17. Client-Side Storage  
18. Storage Security  
19. JavaScript Core  
20. Browser Rendering  
21. HTTP / Networking  
22. Advanced Security  
23. Observability & Debugging  
24. API Design & Contracts  
25. Web Components  
26. Accessibility (A11y)  
27. Build Internals  
28. AI-Native Dev  
29. TypeScript (Advanced)  

**Готовые демо (модуль 1):** Lifecycle Hooks, OnPush, ChangeDetectorRef, Zoneless, Zone.js, `inject()`, Injectors, Providers.

Остальные темы — заглушки с роутом и компонентом; контент добавляется по мере прохождения курса.

## Быстрый старт

```bash
npm install
npm start
```

Открой [http://localhost:4200/](http://localhost:4200/).

После добавления файлов в `public/artifacts/`:

```bash
npm run artifacts:manifest
```

## Requirements

- **Node.js:** `^20.19.0`, `^22.12.0` or `^24.0.0` ([Angular 20](https://angular.dev/reference/versions))
- **npm:** bundled with Node (project tested with npm 11.x)

Check your version:

```bash
node -v
```

Locally verified with **Node 24.14.0** and **Angular 20.3.x**.

## Scripts

| Команда | Назначение |
|---------|------------|
| `npm start` | Dev-сервер (`http://localhost:4200`) |
| `npm run build` | Production-сборка |
| `npm test` | Unit-тесты (Karma) |
| `npm run artifacts:manifest` | Обновить список файлов артефактов |

Сгенерировано с [Angular CLI](https://github.com/angular/angular-cli) 20.3.27.
