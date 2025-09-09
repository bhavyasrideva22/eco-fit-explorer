import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Question } from '@/types/assessment';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (value: number | string) => void;
  onNext: () => void;
}

export const QuestionCard = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer, 
  onNext 
}: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<number | string | null>(null);

  const handleAnswer = (value: number | string) => {
    setSelectedValue(value);
    onAnswer(value);
  };

  const handleNext = () => {
    if (selectedValue !== null) {
      onNext();
      setSelectedValue(null);
    }
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'likert':
      case 'self-rating':
        const scale = question.likertScale!;
        return (
          <div className="space-y-6">
            <div className="px-4">
              <Slider
                value={selectedValue ? [Number(selectedValue)] : [Math.floor((scale.max + scale.min) / 2)]}
                onValueChange={(value) => handleAnswer(value[0])}
                min={scale.min}
                max={scale.max}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground px-4">
              <span>{scale.minLabel}</span>
              <span className="font-semibold text-primary">
                {selectedValue || Math.floor((scale.max + scale.min) / 2)}
              </span>
              <span>{scale.maxLabel}</span>
            </div>
          </div>
        );

      case 'multiple-choice':
        return (
          <RadioGroup 
            value={selectedValue as string} 
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer text-sm"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'scenario':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-accent">
              <p className="text-sm text-muted-foreground mb-2">Scenario:</p>
              <p className="text-foreground">{question.scenario?.context}</p>
            </div>
            <RadioGroup 
              value={selectedValue as string} 
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option} id={`scenario-${index}`} />
                  <Label 
                    htmlFor={`scenario-${index}`} 
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round((questionNumber / totalQuestions) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-lg border-primary/20">
          <CardHeader>
            <CardDescription className="text-sm uppercase tracking-wider text-primary font-medium">
              {question.section} • {question.category}
            </CardDescription>
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderQuestionInput()}
            
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleNext}
                disabled={selectedValue === null}
                className="px-8"
              >
                {questionNumber === totalQuestions ? 'Complete Section' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};