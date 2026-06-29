export interface CompareMoment {
  id: string;
  title: string;
  desc: string;
  beforeCode: string;
  afterCode: string;
  note?: string;
}

export const GUARDS_ESSENTIALS = [
  'CanActivateFn — это обычная функция (route, state) => boolean | UrlTree | Observable<…>.',
  'Зависимости берутся через inject() прямо в теле функции — класс и providedIn не нужны.',
  'Вместо false возвращают router.createUrlTree([...]) — это и есть редирект (например, на /login).',
  'Гварды легко композировать: один проверяет авторизацию, другой — роль; вешаем массивом.',
];

export const GUARDS_MOMENTS: CompareMoment[] = [
  {
    id: 'class-to-fn',
    title: '1. Класс CanActivate → CanActivateFn',
    desc: 'Раньше гвард был классом с providedIn и методом canActivate. Теперь это чистая функция — меньше кода, проще тестировать (просто вызвать с моками).',
    beforeCode: `@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  canActivate(): boolean | UrlTree {
    return this.auth.isLoggedIn()
      ? true
      : this.router.parseUrl('/login');
  }
}

// route: { canActivate: [AuthGuard] }`,
    afterCode: `export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthStore);
  const router = inject(Router);

  return auth.isLoggedIn()
    ? true
    : router.createUrlTree(['/login']);
};

// route: { canActivate: [authGuard] }`,
    note: 'Функция выполняется в injection context роутера, поэтому inject() внутри работает без всякой обёртки.',
  },
  {
    id: 'redirect',
    title: '2. Редирект: UrlTree вместо false',
    desc: 'Просто вернуть false — навигация молча отменится. Вернуть UrlTree — роутер перенаправит пользователя. Часто добавляют returnUrl, чтобы вернуть его обратно после логина.',
    beforeCode: `// Голый отказ — пользователь «застрял»
canActivate(): boolean {
  return this.auth.isLoggedIn(); // false → ничего
}`,
    afterCode: `export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthStore);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};`,
    note: 'state.url — куда пользователь шёл. Сохраняем его в returnUrl и после входа возвращаем обратно.',
  },
  {
    id: 'compose',
    title: '3. Композиция: проверка роли отдельной функцией',
    desc: 'Гварды — функции, их удобно делать параметризованными фабриками и комбинировать: авторизация + нужная роль.',
    beforeCode: `// Раньше: отдельный класс RoleGuard
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  /* + конструктор, + DI, + метод */
}`,
    afterCode: `// Фабрика гвардов по роли
export function roleGuard(role: string): CanActivateFn {
  return () => {
    const auth = inject(AuthStore);
    const router = inject(Router);
    return auth.hasRole(role)
      ? true
      : router.createUrlTree(['/403']);
  };
}

// route: { canActivate: [authGuard, roleGuard('admin')] }`,
    note: 'Гварды в массиве проверяются по очереди; первый, вернувший не-true, останавливает навигацию.',
  },
];
