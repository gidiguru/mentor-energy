<script lang="ts">
    import ModuleNavigator from '$lib/components/learning/ModuleNavigator.svelte';
    import type { ModuleContent } from '$lib/types/media';
  
    const courseModules: ModuleContent[] = [
      {
        title: "Introduction to Petroleum Systems",
        content: "Understanding the fundamentals of petroleum systems...",
        media: [
          {
            type: 'video',
            url: '/videos/intro.mp4',
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
      },
      // Add more modules...
    ];
  
    function handleCourseComplete() {
      // Handle course completion
      console.log('Course completed!');
    }
  </script>
  
  <ModuleNavigator 
    modules={courseModules} 
    onComplete={handleCourseComplete} 
  />