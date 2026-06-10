# Artifacts

Материалы презентаций по **категориям курса**: слайды, PDF, скриншоты, заметки, записи.

## Структура

| Папка | Категория |
|-------|-----------|
| `00-general/` | Общие материалы, главная, регламент |
| `01-angular-core-internals/` | Angular Core Internals |
| `02-signals-modern-core/` | Signals (Modern Core) |
| `03-rxjs-deep-dive/` | RxJS (Deep Dive) |
| `04-standalone-architecture/` | Standalone Architecture |
| `05-routing-advanced/` | Routing (Advanced) |
| `06-state-management/` | State Management |
| `07-modern-control-flow/` | Modern Control Flow |
| `08-deferrable-views/` | Deferrable Views |
| `09-performance-optimization/` | Performance Optimization |
| `10-forms-advanced/` | Forms (Advanced) |
| `11-rendering-ssr/` | Rendering / SSR |
| `12-testing/` | Testing |
| `13-architecture-and-monorepos/` | Architecture & Monorepos |
| `14-design-system/` | Design System |
| `15-frontend-setup-and-ci-cd/` | Frontend Setup & CI/CD |
| `16-performance-metrics/` | Performance Metrics |
| `17-client-side-storage/` | Client-Side Storage |
| `18-storage-security/` | Storage Security |
| `19-javascript-core/` | JavaScript Core |
| `20-browser-rendering/` | Browser Rendering |
| `21-http-networking/` | HTTP / Networking |
| `22-advanced-security/` | Advanced Security |
| `23-observability-and-debugging/` | Observability & Debugging |
| `24-api-design-and-contracts/` | API Design & Contracts |
| `25-web-components/` | Web Components |
| `26-accessibility-a11y/` | Accessibility (A11y) |
| `27-build-internals/` | Build Internals |
| `28-ai-native-dev/` | AI-Native Dev |
| `29-typescript-advanced/` | TypeScript (Advanced) |

Внутри категории можно создавать подпапки по темам, например:

```
public/artifacts/01-angular-core-internals/
  lifecycle/
  onpush/
  slides.pdf
```

## URL

Файл `public/artifacts/01-angular-core-internals/slides.pdf` доступен как:

`/artifacts/01-angular-core-internals/slides.pdf`

После добавления файлов обнови список в интерфейсе:

```bash
npm run artifacts:manifest
```

Скрипт также запускается автоматически перед `npm start` и `npm run build`.

Список файлов попадает в `src/app/artifacts/artifacts.manifest.generated.ts` (Angular dev server не отдаёт `.json` из `public/`).

Страница **Артефакты** в меню приложения (`/artifacts`) читает этот manifest и показывает файлы по категориям.

Пустые папки держатся в git через `.gitkeep`.
