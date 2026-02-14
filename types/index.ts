export type DepthLevel = 'brief' | 'moderate' | 'comprehensive';
export type LearningModality = 'text' | 'code' | 'visual';

export interface GenerateTextRequest {
  topic: string;
  depth: DepthLevel;
}

export interface GenerateCodeRequest {
  topic: string;
  complexity: DepthLevel;
}

export interface GenerateVisualRequest {
  topic: string;
}

export interface GeneratedTextContent {
  title: string;
  sections: {
    heading: string;
    content: string;
  }[];
  summary: string;
}

export interface GeneratedCodeContent {
  title: string;
  language: string;
  code: string;
  dependencies: string[];
  explanation: string;
  executionInstructions: string;
}

export interface GeneratedVisualContent {
  title: string;
  descriptions: {
    label: string;
    description: string;
    svgContent: string;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type AudioLength = 'brief' | 'detailed';

export interface GeneratedAudioContent {
  title: string;
  script: string;
  duration: string;
}

export interface LearningSession {
  id: string;
  topic: string;
  modality: LearningModality;
  depth: DepthLevel;
  created_at: string;
}
