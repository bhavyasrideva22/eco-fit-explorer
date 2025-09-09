import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AssessmentResults } from '@/types/assessment';
import { 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  BookOpen, 
  Briefcase,
  Target,
  Star
} from 'lucide-react';

interface ResultsSectionProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export const ResultsSection = ({ results, onRestart }: ResultsSectionProps) => {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes':
        return <CheckCircle2 className="h-8 w-8 text-success" />;
      case 'maybe':
        return <AlertCircle className="h-8 w-8 text-warning" />;
      case 'no':
        return <XCircle className="h-8 w-8 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'bg-success/10 border-success/20';
      case 'maybe':
        return 'bg-warning/10 border-warning/20';
      case 'no':
        return 'bg-destructive/10 border-destructive/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive analysis of your fit for Environmental IoT Analyst career
          </p>
        </div>

        {/* Main Recommendation */}
        <Card className={`shadow-lg ${getRecommendationColor()}`}>
          <CardHeader>
            <div className="flex items-center gap-4">
              {getRecommendationIcon()}
              <div>
                <CardTitle className="text-2xl">
                  {results.recommendation === 'yes' && 'Yes, Go For It!'}
                  {results.recommendation === 'maybe' && 'Maybe - With Preparation'}
                  {results.recommendation === 'no' && 'Consider Alternatives'}
                </CardTitle>
                <CardDescription className="text-lg">
                  Overall Confidence Score: {results.overallConfidence}%
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground mb-4">{results.recommendationReason}</p>
            <Progress 
              value={results.overallConfidence} 
              className="h-3"
            />
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Psychometric Fit */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                Psychometric Fit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Score:</span>
                <span className={`text-2xl font-bold ${getScoreColor(results.psychometricFit.score)}`}>
                  {results.psychometricFit.score}%
                </span>
              </div>
              <p className="text-muted-foreground mb-4">{results.psychometricFit.interpretation}</p>
              {results.psychometricFit.strengths.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-medium text-foreground mb-2">Strengths:</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.psychometricFit.strengths.map((strength, index) => (
                      <Badge key={index} variant="secondary" className="bg-success/10 text-success">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <Progress value={results.psychometricFit.score} className="h-2" />
            </CardContent>
          </Card>

          {/* Technical Readiness */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-secondary" />
                Technical Readiness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Score:</span>
                <span className={`text-2xl font-bold ${getScoreColor(results.technicalReadiness.score)}`}>
                  {results.technicalReadiness.score}%
                </span>
              </div>
              <p className="text-muted-foreground mb-4">{results.technicalReadiness.interpretation}</p>
              {results.technicalReadiness.strengths.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-medium text-foreground mb-2">Strengths:</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.technicalReadiness.strengths.map((strength, index) => (
                      <Badge key={index} variant="secondary" className="bg-success/10 text-success">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <Progress value={results.technicalReadiness.score} className="h-2" />
            </CardContent>
          </Card>
        </div>

        {/* WISCAR Radar */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              WISCAR Framework Analysis
            </CardTitle>
            <CardDescription>
              Six key dimensions of readiness for Environmental IoT Analyst career
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {results.wiscarDimensions.map((dimension) => (
                <div key={dimension.dimension} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{dimension.label}</span>
                    <span className={`font-bold ${getScoreColor(dimension.score)}`}>
                      {dimension.score}%
                    </span>
                  </div>
                  <Progress value={dimension.score} className="h-2" />
                  <p className="text-sm text-muted-foreground">{dimension.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps and Career Paths */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Next Steps */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Career Paths */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-accent" />
                Career Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.careerPaths.map((career, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{career}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              Suggested Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              {results.learningPath.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button onClick={onRestart} variant="outline" size="lg">
            Retake Assessment
          </Button>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            onClick={() => window.print()}
          >
            Save Results
          </Button>
        </div>
      </div>
    </div>
  );
};