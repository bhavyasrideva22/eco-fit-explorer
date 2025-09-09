import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Cpu, BarChart3, Clock, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-assessment.jpg';

interface IntroSectionProps {
  onStartAssessment: () => void;
}

export const IntroSection = ({ onStartAssessment }: IntroSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-2xl">
            <img 
              src={heroImage} 
              alt="Environmental IoT Analyst working with sensor data and environmental monitoring technology"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent flex items-end justify-center pb-8">
              <div className="flex items-center gap-3">
                <Leaf className="h-12 w-12 text-white" />
                <Cpu className="h-8 w-8 text-accent" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Is Environmental IoT Analyst Right for Me?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover if you have the passion, skills, and mindset to become an Environmental IoT Analyst 
            and help create a more sustainable future through technology.
          </p>
        </div>

        {/* What is Environmental IoT */}
        <Card className="mb-8 shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BarChart3 className="h-6 w-6 text-primary" />
              What Is Environmental IoT?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Environmental IoT combines environmental science with Internet of Things (IoT) technologies 
              to collect real-time data from sensors deployed in natural or urban settings. This data 
              drives smarter decisions for sustainability, climate monitoring, and ecological research.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Typical Careers:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Environmental IoT Analyst</li>
                  <li>• IoT Data Scientist (Environmental focus)</li>
                  <li>• Environmental Monitoring Specialist</li>
                  <li>• Smart City IoT Engineer</li>
                  <li>• Climate Data Analyst</li>
                  <li>• Sustainability Technology Consultant</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Success Traits:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Strong analytical skills</li>
                  <li>• Passion for environmental science</li>
                  <li>• Curiosity for new technology</li>
                  <li>• Problem-solving mindset</li>
                  <li>• Patience for fieldwork</li>
                  <li>• Programming & data visualization skills</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Overview */}
        <Card className="mb-8 shadow-lg border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Clock className="h-6 w-6 text-accent" />
              Assessment Overview
            </CardTitle>
            <CardDescription>
              Complete assessment in 25-30 minutes across three key areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-primary/5">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-2">Psychometric Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Evaluate your personality fit, motivation, and interest in environmental technology
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/5">
                <CheckCircle className="h-8 w-8 text-secondary mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-2">Technical Aptitude</h4>
                <p className="text-sm text-muted-foreground">
                  Test your technical knowledge and problem-solving abilities in IoT and environmental science
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-accent/5">
                <CheckCircle className="h-8 w-8 text-accent mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-2">WISCAR Framework</h4>
                <p className="text-sm text-muted-foreground">
                  Assess your Will, Interest, Skill, Cognitive ability, learning Ability, and Real-world alignment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <div className="text-center">
          <Button 
            onClick={onStartAssessment}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 
                     text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl 
                     transition-all duration-300 transform hover:scale-105"
          >
            Start Assessment
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Get personalized insights and career recommendations
          </p>
        </div>
      </div>
    </div>
  );
};