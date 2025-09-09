import { Question } from '@/types/assessment';

export const questions: Question[] = [
  // PSYCHOMETRIC SECTION
  {
    id: 'psych_1',
    type: 'likert',
    section: 'psychometric',
    category: 'interest',
    question: 'I enjoy learning about new environmental technologies and their impact on sustainability.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_2',
    type: 'likert',
    section: 'psychometric',
    category: 'personality',
    question: 'I am detail-oriented when managing technical data and documentation.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_3',
    type: 'likert',
    section: 'psychometric',
    category: 'motivation',
    question: 'I am motivated to pursue a career that helps protect the environment.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_4',
    type: 'likert',
    section: 'psychometric',
    category: 'grit',
    question: 'Challenges in learning new technology make me try harder rather than give up.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_5',
    type: 'likert',
    section: 'psychometric',
    category: 'analytical',
    question: 'I prefer structured data analysis tasks over creative, open-ended projects.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  },
  {
    id: 'psych_6',
    type: 'multiple-choice',
    section: 'psychometric',
    category: 'work_preference',
    question: 'Which work environment appeals to you most?',
    options: [
      'Field work collecting sensor data outdoors',
      'Office work analyzing data on computers',
      'Laboratory work calibrating equipment',
      'Mix of field work and data analysis'
    ]
  },

  // TECHNICAL SECTION
  {
    id: 'tech_1',
    type: 'multiple-choice',
    section: 'technical',
    category: 'sensors',
    question: 'Which sensor type would be most appropriate for measuring air quality in an urban environment?',
    options: [
      'Temperature and humidity sensor',
      'Particulate matter (PM2.5) and gas sensors',
      'Pressure and altitude sensors',
      'Light and UV sensors'
    ]
  },
  {
    id: 'tech_2',
    type: 'multiple-choice',
    section: 'technical',
    category: 'iot_protocols',
    question: 'Which communication protocol is most suitable for low-power, long-range IoT environmental sensors?',
    options: [
      'WiFi',
      'Bluetooth',
      'LoRaWAN',
      'Ethernet'
    ]
  },
  {
    id: 'tech_3',
    type: 'scenario',
    section: 'technical',
    category: 'problem_solving',
    question: 'You notice that temperature readings from outdoor sensors are consistently 5°C higher than expected. What would be your first troubleshooting step?',
    scenario: {
      context: 'You are managing a network of environmental sensors deployed across a city park.',
      question: 'What is the most likely cause and solution?'
    },
    options: [
      'Check if sensors are in direct sunlight and add shading',
      'Recalibrate all sensors immediately',
      'Replace the sensors with new ones',
      'Adjust the software to subtract 5°C from readings'
    ]
  },
  {
    id: 'tech_4',
    type: 'multiple-choice',
    section: 'technical',
    category: 'data_analysis',
    question: 'What is the best approach to handle missing data points from environmental sensors?',
    options: [
      'Delete all records with missing data',
      'Replace missing values with zeros',
      'Use interpolation based on nearby sensors and time patterns',
      'Ignore missing data and continue analysis'
    ]
  },
  {
    id: 'tech_5',
    type: 'multiple-choice',
    section: 'technical',
    category: 'programming',
    question: 'Which programming language is most commonly used for IoT data analysis and visualization?',
    options: [
      'Java',
      'Python',
      'C++',
      'PHP'
    ]
  },

  // WISCAR SECTION
  {
    id: 'wiscar_1',
    type: 'self-rating',
    section: 'wiscar',
    category: 'will',
    question: 'Rate your consistency in pursuing long-term technical and environmental goals.',
    likertScale: {
      min: 1,
      max: 10,
      minLabel: 'Very Inconsistent',
      maxLabel: 'Very Consistent'
    }
  },
  {
    id: 'wiscar_2',
    type: 'self-rating',
    section: 'wiscar',
    category: 'interest',
    question: 'Rate your genuine interest in environmental technology and IoT concepts.',
    likertScale: {
      min: 1,
      max: 10,
      minLabel: 'Low Interest',
      maxLabel: 'High Interest'
    }
  },
  {
    id: 'wiscar_3',
    type: 'self-rating',
    section: 'wiscar',
    category: 'skill',
    question: 'Rate your current technical skills in programming, data analysis, or electronics.',
    likertScale: {
      min: 1,
      max: 10,
      minLabel: 'Beginner',
      maxLabel: 'Expert'
    }
  },
  {
    id: 'wiscar_4',
    type: 'self-rating',
    section: 'wiscar',
    category: 'cognitive',
    question: 'Rate your ability to solve complex analytical problems and think systematically.',
    likertScale: {
      min: 1,
      max: 10,
      minLabel: 'Struggles',
      maxLabel: 'Excels'
    }
  },
  {
    id: 'wiscar_5',
    type: 'self-rating',
    section: 'wiscar',
    category: 'ability',
    question: 'Rate your ability to learn new technical concepts and adapt to feedback.',
    likertScale: {
      min: 1,
      max: 10,
      minLabel: 'Slow Learner',
      maxLabel: 'Fast Learner'
    }
  },
  {
    id: 'wiscar_6',
    type: 'likert',
    section: 'wiscar',
    category: 'realWorld',
    question: 'I understand what Environmental IoT Analysts do day-to-day and am excited about this type of work.',
    likertScale: {
      min: 1,
      max: 5,
      minLabel: 'Strongly Disagree',
      maxLabel: 'Strongly Agree'
    }
  }
];