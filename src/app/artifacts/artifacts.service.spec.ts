import { resolvePublicAssetUrl } from './artifacts.service';

describe('resolvePublicAssetUrl', () => {
  it('should prepend GitHub Pages base href to artifact paths', () => {
    const url = resolvePublicAssetUrl(
      'artifacts/01-angular-core-internals/file.pdf',
      'https://medersnv.github.io/angular-roadmap-demo/',
    );

    expect(url).toBe(
      'https://medersnv.github.io/angular-roadmap-demo/artifacts/01-angular-core-internals/file.pdf',
    );
  });

  it('should strip leading slash from asset path', () => {
    const url = resolvePublicAssetUrl(
      '/artifacts/test.pdf',
      'http://localhost:4200/',
    );

    expect(url).toBe('http://localhost:4200/artifacts/test.pdf');
  });
});
