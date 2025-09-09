import { useAssessment } from '@/hooks/useAssessment';
import { IntroSection } from './IntroSection';
import { QuestionCard } from './QuestionCard';
import { SectionTransition } from './SectionTransition';
import { ResultsSection } from './ResultsSection';

export const AssessmentApp = () => {
  const {
    state,
    startAssessment,
    nextSection,
    answerQuestion,
    nextQuestion,
    calculateResults,
    getCurrentSectionQuestions,
    getProgress,
  } = useAssessment();

  // Show intro section
  if (state.currentSection === 'intro') {
    return <IntroSection onStartAssessment={startAssessment} />;
  }

  // Show results section
  if (state.currentSection === 'results') {
    const results = calculateResults();
    return (
      <ResultsSection 
        results={results} 
        onRestart={() => window.location.reload()} 
      />
    );
  }

  const sectionQuestions = getCurrentSectionQuestions();
  const currentQuestion = sectionQuestions[state.currentQuestionIndex];
  const progress = getProgress();

  // Show section transition if we've completed the current section
  if (!currentQuestion) {
    return (
      <SectionTransition 
        currentSection={state.currentSection as any}
        onContinue={nextSection}
      />
    );
  }

  // Show question card
  return (
    <QuestionCard
      question={currentQuestion}
      questionNumber={progress.current}
      totalQuestions={progress.total}
      onAnswer={(value) => answerQuestion(currentQuestion.id, value)}
      onNext={() => {
        if (state.currentQuestionIndex + 1 >= sectionQuestions.length) {
          // Complete section, show transition
          nextQuestion();
        } else {
          nextQuestion();
        }
      }}
    />
  );
};