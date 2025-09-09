import { useState, useCallback } from 'react';
import { AssessmentState, Answer, AssessmentResults, WiscarDimension } from '@/types/assessment';
import { questions } from '@/data/questions';

const initialState: AssessmentState = {
  currentSection: 'intro',
  currentQuestionIndex: 0,
  answers: [],
  startTime: null,
  sectionStartTime: null,
};

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>(initialState);

  const startAssessment = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentSection: 'psychometric',
      startTime: new Date(),
      sectionStartTime: new Date(),
    }));
  }, []);

  const nextSection = useCallback(() => {
    setState(prev => {
      const sections = ['psychometric', 'technical', 'wiscar', 'results'] as const;
      const currentIndex = sections.indexOf(prev.currentSection as any);
      const nextSectionName = sections[currentIndex + 1] || 'results';
      
      return {
        ...prev,
        currentSection: nextSectionName,
        currentQuestionIndex: 0,
        sectionStartTime: new Date(),
      };
    });
  }, []);

  const answerQuestion = useCallback((questionId: string, value: number | string) => {
    setState(prev => {
      const newAnswer: Answer = {
        questionId,
        value,
        timestamp: new Date(),
      };
      
      const updatedAnswers = prev.answers.filter(a => a.questionId !== questionId);
      updatedAnswers.push(newAnswer);
      
      return {
        ...prev,
        answers: updatedAnswers,
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));
  }, []);

  const calculateResults = useCallback((): AssessmentResults => {
    const { answers } = state;
    
    // Calculate psychometric fit score
    const psychometricAnswers = answers.filter(a => 
      questions.find(q => q.id === a.questionId)?.section === 'psychometric'
    );
    const psychScore = Math.round(
      (psychometricAnswers.reduce((sum, a) => sum + Number(a.value), 0) / 
       (psychometricAnswers.length * 5)) * 100
    );

    // Calculate technical readiness score
    const technicalAnswers = answers.filter(a => 
      questions.find(q => q.id === a.questionId)?.section === 'technical'
    );
    
    // Count correct technical answers (simplified scoring)
    const correctAnswers = technicalAnswers.filter(a => {
      const question = questions.find(q => q.id === a.questionId);
      if (question?.id === 'tech_1') return a.value === 'Particulate matter (PM2.5) and gas sensors';
      if (question?.id === 'tech_2') return a.value === 'LoRaWAN';
      if (question?.id === 'tech_3') return a.value === 'Check if sensors are in direct sunlight and add shading';
      if (question?.id === 'tech_4') return a.value === 'Use interpolation based on nearby sensors and time patterns';
      if (question?.id === 'tech_5') return a.value === 'Python';
      return false;
    }).length;
    
    const techScore = Math.round((correctAnswers / technicalAnswers.length) * 100);

    // Calculate WISCAR dimensions
    const wiscarAnswers = answers.filter(a => 
      questions.find(q => q.id === a.questionId)?.section === 'wiscar'
    );
    
    const wiscarDimensions: WiscarDimension[] = [
      {
        dimension: 'will',
        score: Number(wiscarAnswers.find(a => a.questionId === 'wiscar_1')?.value || 5) * 10,
        label: 'Will',
        description: 'Persistence and commitment to goals'
      },
      {
        dimension: 'interest',
        score: Number(wiscarAnswers.find(a => a.questionId === 'wiscar_2')?.value || 5) * 10,
        label: 'Interest',
        description: 'Genuine passion for the field'
      },
      {
        dimension: 'skill',
        score: Number(wiscarAnswers.find(a => a.questionId === 'wiscar_3')?.value || 5) * 10,
        label: 'Skill',
        description: 'Current technical capabilities'
      },
      {
        dimension: 'cognitive',
        score: Number(wiscarAnswers.find(a => a.questionId === 'wiscar_4')?.value || 5) * 10,
        label: 'Cognitive Readiness',
        description: 'Analytical and problem-solving abilities'
      },
      {
        dimension: 'ability',
        score: Number(wiscarAnswers.find(a => a.questionId === 'wiscar_5')?.value || 5) * 10,
        label: 'Learning Ability',
        description: 'Capacity to acquire new skills'
      },
      {
        dimension: 'realWorld',
        score: Number(wiscarAnswers.find(a => a.questionId === 'wiscar_6')?.value || 3) * 20,
        label: 'Real-World Alignment',
        description: 'Understanding of career demands'
      }
    ];

    // Calculate overall confidence
    const overallConfidence = Math.round((psychScore + techScore + 
      wiscarDimensions.reduce((sum, d) => sum + d.score, 0) / 6) / 3);

    // Determine recommendation
    let recommendation: 'yes' | 'no' | 'maybe';
    let recommendationReason: string;
    
    if (overallConfidence >= 80) {
      recommendation = 'yes';
      recommendationReason = 'Excellent fit! You show strong motivation, good technical aptitude, and high readiness across all dimensions.';
    } else if (overallConfidence >= 60) {
      recommendation = 'maybe';
      recommendationReason = 'Good potential with some development. Focus on building technical skills and gaining more exposure to the field.';
    } else {
      recommendation = 'no';
      recommendationReason = 'Consider exploring foundational courses first or alternative environmental careers that match your current strengths.';
    }

    return {
      psychometricFit: {
        score: psychScore,
        interpretation: psychScore >= 80 ? 'Excellent natural fit' : 
                      psychScore >= 60 ? 'Good potential' : 'Needs development',
        strengths: psychScore >= 70 ? ['Strong motivation', 'Good analytical mindset'] : ['Room for growth'],
        weaknesses: psychScore < 70 ? ['Need stronger motivation', 'Develop analytical skills'] : []
      },
      technicalReadiness: {
        score: techScore,
        interpretation: techScore >= 80 ? 'Ready to advance quickly' :
                      techScore >= 60 ? 'Solid foundation' : 'Beginner level',
        strengths: techScore >= 70 ? ['Good technical understanding', 'Problem-solving skills'] : ['Basic awareness'],
        weaknesses: techScore < 70 ? ['Need technical fundamentals', 'Learn IoT basics'] : []
      },
      wiscarDimensions,
      overallConfidence,
      recommendation,
      recommendationReason,
      nextSteps: recommendation === 'yes' ? [
        'Enroll in IoT fundamentals course',
        'Start with Arduino/Raspberry Pi projects',
        'Learn Python programming basics',
        'Study environmental science concepts'
      ] : recommendation === 'maybe' ? [
        'Take introductory programming course',
        'Explore environmental science basics',
        'Try simple IoT tutorials online',
        'Join environmental tech communities'
      ] : [
        'Consider environmental science technician roles',
        'Explore data entry positions in environmental orgs',
        'Build foundational technical skills first'
      ],
      careerPaths: [
        'Environmental IoT Analyst',
        'IoT Data Scientist (Environmental)',
        'Environmental Monitoring Specialist',
        'Smart City IoT Engineer',
        'Climate Data Analyst',
        'Sustainability Technology Consultant'
      ],
      learningPath: [
        'IoT & Environmental Science Basics',
        'Programming Fundamentals (Python)',
        'Sensor Networks & Data Collection',
        'Data Analysis & Visualization',
        'Real-world Project Implementation'
      ]
    };
  }, [state]);

  const getCurrentSectionQuestions = useCallback(() => {
    return questions.filter(q => q.section === state.currentSection);
  }, [state.currentSection]);

  const getProgress = useCallback(() => {
    const sectionQuestions = getCurrentSectionQuestions();
    return {
      current: state.currentQuestionIndex + 1,
      total: sectionQuestions.length,
      percentage: Math.round(((state.currentQuestionIndex + 1) / sectionQuestions.length) * 100)
    };
  }, [state.currentQuestionIndex, getCurrentSectionQuestions]);

  return {
    state,
    startAssessment,
    nextSection,
    answerQuestion,
    nextQuestion,
    calculateResults,
    getCurrentSectionQuestions,
    getProgress,
  };
};