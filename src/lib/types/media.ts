export type MediaType = 'video' | 'image' | 'audio' | 'text';

export interface MediaContent {
  type: MediaType;
  url?: string;
  title?: string;
  alt?: string;
  captionsUrl?: string;
  descriptionsUrl?: string;
  content?: string;
}

export interface ModuleContent {
  title: string;
  content: string;
  media?: MediaContent[];
}