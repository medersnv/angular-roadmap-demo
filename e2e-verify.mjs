import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'https://localhost:4300';
const SHOTS = '/tmp/pw-shots';
mkdirSync(SHOTS, { recursive: true });

const results = [];
function check(name, ok, detail = '') {
  results.push({ name, ok });
  console.log(`${ok ? '✅' : '❌'} ${name}${detail ? '  — ' + detail : ''}`);
}

async function launch() {
  try {
    return await chromium.launch({ channel: 'chrome', args: ['--no-sandbox'] });
  } catch {
    return await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  }
}

async function animCounts(locator) {
  const n = await locator.count();
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push(await locator.nth(i).evaluate((el) => el.getAnimations().length));
  }
  return out;
}

async function values(locator) {
  const n = await locator.count();
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push((await locator.nth(i).locator('strong').innerText()).trim());
  }
  return out;
}

const browser = await launch();
const ctx = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1300, height: 950 } });
const page = await ctx.newPage();
const errors = [];
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(m.text());
});
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

// ---------- Live CD-visualizer ----------
await page.goto(`${BASE}/signals-philosophy`, { waitUntil: 'networkidle' });
await page.locator('app-cd-visualizer').waitFor();
await page.waitForTimeout(1400); // дать начальным вспышкам погаснуть

const sigCells = page.locator('app-signals-tree app-signal-cell');
const defCells = page.locator('app-legacy-tree app-default-cell');
const sigPlus = page.locator('app-signals-tree').getByRole('button', { name: /\+1 ячейке/ });
const sigTick = page.locator('app-signals-tree').getByRole('button', { name: /тик/ });
const defPlus = page.locator('app-legacy-tree').getByRole('button', { name: /\+1 ячейке/ });
const defTick = page.locator('app-legacy-tree').getByRole('button', { name: /тик/ });

check('cd-visualizer: 6 signal-ячеек', (await sigCells.count()) === 6);
check('cd-visualizer: 6 default-ячеек', (await defCells.count()) === 6);
const base = await animCounts(sigCells);
check('базовая линия: анимаций нет', base.every((c) => c === 0), `counts=[${base}]`);

// Тест A: signals «+1 #3» → вспыхивает только #3
await sigPlus.click();
await page.waitForTimeout(90);
const aSig = await animCounts(sigCells);
const aDef = await animCounts(defCells);
await page.locator('app-signals-tree').screenshot({ path: `${SHOTS}/signals-plus3.png` });
const animatedSig = aSig.map((c, i) => (c > 0 ? i + 1 : 0)).filter((x) => x);
check('Signals «+1 #3»: вспыхнула ТОЛЬКО ячейка #3', JSON.stringify(animatedSig) === '[3]', `вспыхнули=[${animatedSig}]`);
check('Signals «+1 #3»: левая (Default) панель не тронута', aDef.every((c) => c === 0), `def=[${aDef}]`);
check('Signals «+1 #3»: значение #3 стало 31', (await values(sigCells))[2] === '31');
await page.waitForTimeout(900);

// Тест B: signals «тик» → ничего
await sigTick.click();
await page.waitForTimeout(90);
const bSig = await animCounts(sigCells);
check('Signals «тик»: не вспыхнуло ничего', bSig.every((c) => c === 0), `counts=[${bSig}]`);
await page.waitForTimeout(900);

// Тест C: default «тик» → вспыхивают ВСЕ
await defTick.click();
await page.waitForTimeout(90);
const cDef = await animCounts(defCells);
const cSig = await animCounts(sigCells);
await page.locator('app-legacy-tree').screenshot({ path: `${SHOTS}/legacy-tick.png` });
check('Default «тик»: вспыхнули ВСЕ 6 ячеек', cDef.every((c) => c > 0), `counts=[${cDef}]`);
check('Default «тик»: правая (Signals) панель не тронута', cSig.every((c) => c === 0), `sig=[${cSig}]`);
await page.waitForTimeout(900);

// Тест D: default «+1 #3» → вспыхивают все, значение 31
await defPlus.click();
await page.waitForTimeout(90);
const dDef = await animCounts(defCells);
check('Default «+1 #3»: вспыхнули ВСЕ 6 ячеек', dDef.every((c) => c > 0), `counts=[${dDef}]`);
check('Default «+1 #3»: значение #3 стало 31', (await values(defCells))[2] === '31');
await page.waitForTimeout(900);

await page.screenshot({ path: `${SHOTS}/philosophy-full.png`, fullPage: true });

// ---------- Смоук: все signals-страницы рендерятся без ошибок ----------
const pages = ['signals-basics', 'signals-advanced', 'signals-components', 'signals-dom', 'signals-philosophy', 'zoneless', 'zone'];
for (const p of pages) {
  const before = errors.length;
  await page.goto(`${BASE}/${p}`, { waitUntil: 'networkidle' });
  await page.locator('h2').first().waitFor();
  await page.waitForTimeout(500);
  const newErrs = errors.slice(before);
  check(`/${p} рендерится без console-ошибок`, newErrs.length === 0, newErrs.slice(0, 2).join(' | '));
  await page.screenshot({ path: `${SHOTS}/page-${p}.png` });
}

await browser.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`\n=== ИТОГ: ${results.length - failed}/${results.length} проверок прошли, console-ошибок: ${errors.length} ===`);
process.exit(failed ? 1 : 0);
