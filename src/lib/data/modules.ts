import type { ModuleContent } from '$lib/types/media';

export const moduleContents: Record<string, ModuleContent[]> = {
  'intro-petro-geology': [
    {
      title: "Introduction to Petroleum Geology",
      content: "Understanding the fundamentals of petroleum geology and its importance in the energy industry...",
      media: [
        {
          type: 'video',
          url: '/videos/intro.mp4',
          title: 'Introduction to Petroleum Geology'
        }
      ]
    },
    {
      title: "Basic Concepts",
      content: "Exploring the essential concepts of petroleum geology...",
      media: [
        {
          type: 'image',
          url: '/images/basic-concepts.jpg',
          alt: 'Basic concepts in petroleum geology'
        },
        {
          type: 'audio',
          url: '/audio/expert-basics.mp3',
          title: 'Expert Walkthrough'
        }
      ]
    }
  ],
  'structural-geology': [
    {
      title: "Introduction to Structural Geology",
      content: "Understanding the fundamental concepts of structural geology...",
      media: [
        {
          type: 'video',
          url: '/videos/structural-intro.mp4',
          title: 'Introduction to Structural Geology'
        }
      ]
    },
    {
      title: "Folds and Faults",
      content: "Exploring different types of geological structures...",
      media: [
        {
          type: 'image',
          url: '/images/folds-faults.jpg',
          alt: 'Types of folds and faults'
        },
        {
          type: 'audio',
          url: '/audio/expert-structural.mp3',
          title: 'Expert Analysis of Structures'
        }
      ]
    }
  ],

  'seismic-interpretation': [
    {
      title: "Seismic Data Basics",
      content: "Understanding the fundamentals of seismic data...",
      media: [
        {
          type: 'video',
          url: '/videos/seismic-intro.mp4',
          title: 'Introduction to Seismic Data'
        }
      ]
    },
    {
      title: "Seismic Attributes",
      content: "Exploring different seismic attributes and their applications...",
      media: [
        {
          type: 'image',
          url: '/images/seismic-attributes.jpg',
          alt: 'Common seismic attributes'
        },
        {
          type: 'audio',
          url: '/audio/expert-seismic.mp3',
          title: 'Expert Analysis'
        }
      ]
    }
  ],

  'petroleum-geology': [
    {
      title: "Introduction to Petroleum Systems",
      content: "Understanding the fundamentals of petroleum systems...",
      media: [
        {
          type: 'video',
          url: '/videos/petro-intro.mp4',
          title: 'Introduction'
        }
      ]
    },
    {
      title: "Source Rocks",
      content: "Exploring different types of source rocks...",
      media: [
        {
          type: 'image',
          url: '/images/source-rocks.jpg',
          alt: 'Types of source rocks'
        },
        {
          type: 'audio',
          url: '/audio/expert-source-rocks.mp3',
          title: 'Expert Analysis'
        }
      ]
    }
  ]
};