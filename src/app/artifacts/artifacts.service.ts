import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ARTIFACTS_MANIFEST } from './artifacts.manifest.generated';
import { ArtifactsManifest } from './artifacts.types';

@Injectable({ providedIn: 'root' })
export class ArtifactsService {
  getManifest(): Observable<ArtifactsManifest> {
    return of(ARTIFACTS_MANIFEST);
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
