import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Code, Target } from 'lucide-react';

interface SectionTransitionProps {
  currentSection: 'psychometric' | 'technical' | 'wiscar';
  onContinue: () => void;
}

export const SectionTransition = ({ currentSection, onContinue }: SectionTransitionProps) => {
  const getSectionInfo = () => {
    switch (currentSection) {
      case 'psychometric':
        return {
          icon: <Brain className="h-12 w-12 text-primary" />,
          title: 'Psychometric Analysis Complete!',
          description: 'Great job! You\'ve completed the personality and motivation assessment.',
          nextSection: 'Technical Aptitude Test',
          nextDescription: 'Next, we\'ll evaluate your technical knowledge and problem-solving skills related to IoT and environmental science.'
        };
      case 'technical':
        return {
          icon: <Code className="h-12 w-12 text-secondary" />,
          title: 'Technical Assessment Complete!',
          description: 'Excellent! You\'ve finished the technical knowledge evaluation.',
          nextSection: 'WISCAR Framework Analysis',
          nextDescription: 'Finally, we\'ll assess your readiness across six key dimensions: Will, Interest, Skill, Cognitive ability, learning Ability, and Real-world alignment.'
        };
      case 'wiscar':
        return {
          icon: <Target className="h-12 w-12 text-accent" />,
          title: 'WISCAR Analysis Complete!',
          description: 'Perfect! You\'ve completed all assessment sections.',
          nextSection: 'Your Personalized Results',
          nextDescription: 'Get your comprehensive career recommendation, detailed insights, and personalized learning path.'
        };
    }
  };

  const info = getSectionInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 py-12 px-4 flex items-center justify-center">
      <Card className="max-w-2xl w-full shadow-lg border-primary/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {info.icon}
          </div>
          <CardTitle className="text-2xl">{info.title}</CardTitle>
          <CardDescription className="text-lg">
            {info.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="p-6 bg-muted/30 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Up Next:</h3>
            <h4 className="text-lg font-medium text-primary mb-2">{info.nextSection}</h4>
            <p className="text-muted-foreground">{info.nextDescription}</p>
          </div>
          
          <Button 
            onClick={onContinue}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 
                     text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl 
                     transition-all duration-300 transform hover:scale-105"
          >
            Continue to Next Section
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};