export interface ArtifactFile {
  name: string;
  relativePath: string;
  url: string;
  size: number;
  extension: string;
  updatedAt: string;
}

export interface ArtifactCategory {
  order: number;
  slug: string;
  title: string;
  files: ArtifactFile[];
}

export interface ArtifactsManifest {
  generatedAt: string;
  categories: ArtifactCategory[];
}
