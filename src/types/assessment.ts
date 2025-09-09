export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'scenario' | 'self-rating';
  section: 'psychometric' | 'technical' | 'wiscar';
  category: string;
  question: string;
  options?: string[];
  likertScale?: {
    min: number;
    max: number;
    minLabel: string;
    maxLabel: string;
  };
  scenario?: {
    context: string;
    question: string;
  };
}

export interface Answer {
  questionId: string;
  value: number | string;
  timestamp: Date;
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  answers: Answer[];
  startTime: Date | null;
  sectionStartTime: Date | null;
}

export interface SectionScore {
  score: number;
  interpretation: string;
  strengths: string[];
  weaknesses: string[];
}

export interface WiscarDimension {
  dimension: 'will' | 'interest' | 'skill' | 'cognitive' | 'ability' | 'realWorld';
  score: number;
  label: string;
  description: string;
}

export interface AssessmentResults {
  psychometricFit: SectionScore;
  technicalReadiness: SectionScore;
  wiscarDimensions: WiscarDimension[];
  overallConfidence: number;
  recommendation: 'yes' | 'no' | 'maybe';
  recommendationReason: string;
  nextSteps: string[];
  careerPaths: string[];
  learningPath: string[];
}