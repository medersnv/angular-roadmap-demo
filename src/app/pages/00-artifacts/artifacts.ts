import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { ArtifactsService, formatFileSize, resolvePublicAssetUrl } from '../../artifacts/artifacts.service';
import { ArtifactCategory } from '../../artifacts/artifacts.types';

@Component({
  selector: 'app-artifacts',
  imports: [DatePipe],
  templateUrl: './artifacts.html',
  styleUrl: './artifacts.scss',
})
export class Artifacts {
  private readonly route = inject(ActivatedRoute);
  private readonly artifactsService = inject(ArtifactsService);

  protected readonly formatFileSize = formatFileSize;
  protected readonly resolvePublicAssetUrl = resolvePublicAssetUrl;
  protected readonly manifest = toSignal(this.artifactsService.getManifest(), {
    initialValue: null,
  });

  protected readonly selectedSlug = signal<string | null>(null);

  protected readonly categories = computed(() => this.manifest()?.categories ?? []);

  protected readonly selectedCategory = computed(() => {
    const slug = this.selectedSlug();
    const list = this.categories();

    if (!list.length) {
      return null;
    }

    return list.find((category) => category.slug === slug) ?? list[0];
  });

  protected readonly totalFiles = computed(() =>
    this.categories().reduce((sum, category) => sum + category.files.length, 0),
  );

  constructor() {
    const slugParam = this.route.snapshot.queryParamMap.get('category');
    if (slugParam) {
      this.selectedSlug.set(slugParam);
    }
  }

  protected selectCategory(category: ArtifactCategory): void {
    this.selectedSlug.set(category.slug);
  }

  protected fileCount(category: ArtifactCategory): number {
    return category.files.length;
  }

  protected categoryFolderPath(slug: string): string {
    return resolvePublicAssetUrl(`artifacts/${slug}/`);
  }
}
