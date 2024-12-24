<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import AIChatPreview from '$lib/components/AIChatPreview.svelte';
	
	// Stats for the platform
	const stats = [
	  { label: 'Active Mentors', value: '50+' },
	  { label: 'Universities', value: '6' },
	  { label: 'Success Rate', value: '85%' },
	  { label: 'Student Projects', value: '200+' }
	];
  
	// Features of the platform
	const features = [
	  {
		title: 'Industry Mentorship',
		description: 'Connect with experienced professionals in geology and energy sectors',
		icon: '👥'
	  },
	  {
		title: 'Virtual Labs',
		description: 'Access state-of-the-art virtual geology laboratories and simulations',
		icon: '🔬'
	  },
	  {
		title: 'Software Training',
		description: 'Learn industry-standard software like Petrel through guided tutorials',
		icon: '💻'
	  },
	  {
		title: 'Field Experience',
		description: 'Participate in virtual field trips and real-world projects',
		icon: '🌍'
	  }
	];
  
	// Testimonials
	const testimonials = [
	  {
		quote: "The mentorship program helped me secure my dream role at a leading energy company.",
		author: "Chioma O.",
		role: "300-level Geology Student",
		university: "University of Ibadan"
	  },
	  {
		quote: "Being a mentor has been incredibly rewarding. The platform makes it easy to share knowledge.",
		author: "Dr. Adeyemi S.",
		role: "Senior Geologist",
		company: "Major Energy Company"
	  }
	];
  
	let visible = false;
	onMount(() => {
	  visible = true;
	});
  </script>
  
  <!-- Hero Section -->
  <div class="container mx-auto px-4 py-8 md:py-24">
	{#if visible}
	  <div class="grid md:grid-cols-2 gap-6 md:gap-8 items-center" in:fade>
		<div class="space-y-4 md:space-y-6">
		  <h1 class="h1 font-bold !text-3xl sm:!text-4xl md:!text-5xl">
			Build Your Future in Nigeria's Energy Sector
		  </h1>
		  <p class="text-lg sm:text-xl">
			Connect with industry mentors, access virtual labs, and gain practical experience 
			while still in university. Bridge the gap between education and industry.
		  </p>
		  <div class="flex flex-col sm:flex-row gap-4">
			<a href="/register" class="btn variant-filled-primary">Get Started</a>
			<a href="/mentors" class="btn variant-ghost-surface">Browse Mentors</a>
		  </div>
		</div>
		<div class="relative" in:fly="{{ y: 50, duration: 1000 }}">
		  <div class="rounded-lg shadow-xl bg-surface-200-700-token p-8 h-[400px] flex items-center justify-center">
			<!-- Hero illustration as a background pattern -->
			<div class="text-center">
			  <span class="text-6xl mb-4 block">🎓🌍</span>
			  <p class="text-xl font-medium">Connecting Students with Industry Experts</p>
			</div>
		  </div>
		</div>
	  </div>
	{/if}
  </div>
  
  <!-- Stats Section -->
  <div class="bg-surface-100-800-token py-12">
	<div class="container mx-auto px-4">
	  <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
		{#each stats as stat}
		  <div class="text-center">
			<p class="h2 font-bold text-primary-500">{stat.value}</p>
			<p class="text-lg">{stat.label}</p>
		  </div>
		{/each}
	  </div>
	</div>
  </div>
  
  <!-- AI Assistant Preview -->
  <div class="container mx-auto px-4 py-16">
	<h2 class="h2 text-center mb-4">Get Instant Career Guidance</h2>
	<p class="text-center text-lg mb-8">Try our AI career assistant. Ask about geology careers, required skills, or industry trends.</p>
	<AIChatPreview />
  </div>
  
  <!-- Features Section -->
  <div class="container mx-auto px-4 py-16">
	<h2 class="h2 text-center mb-12">Why Choose mentor.energy?</h2>
	<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
	  {#each features as feature}
		<div class="card p-6 text-center">
		  <div class="text-4xl mb-4">{feature.icon}</div>
		  <h3 class="h3 mb-2">{feature.title}</h3>
		  <p>{feature.description}</p>
		</div>
	  {/each}
	</div>
  </div>
  
  <!-- Testimonials Section -->
  <div class="bg-surface-100-800-token py-16">
	<div class="container mx-auto px-4">
	  <h2 class="h2 text-center mb-12">What Our Community Says</h2>
	  <div class="grid md:grid-cols-2 gap-8">
		{#each testimonials as testimonial}
		  <div class="card p-6">
			<p class="italic text-lg mb-4">"{testimonial.quote}"</p>
			<div>
			  <p class="font-bold">{testimonial.author}</p>
			  <p>{testimonial.role}</p>
			  <p class="text-sm">{testimonial.university || testimonial.company}</p>
			</div>
		  </div>
		{/each}
	  </div>
	</div>
  </div>
  
  <!-- CTA Section -->
  <div class="container mx-auto px-4 py-16 text-center">
	<h2 class="h2 mb-6">Ready to Start Your Journey?</h2>
	<p class="text-xl mb-8 max-w-2xl mx-auto">
	  Join mentor.energy today and take the first step towards a successful career 
	  in Nigeria's energy sector.
	</p>
	<div class="flex flex-col sm:flex-row gap-4 justify-center">
	  <a href="/register" class="btn variant-filled-primary">Sign Up as Student</a>
	  <a href="/become-mentor" class="btn variant-ghost-surface">Become a Mentor</a>
	</div>
  </div>
  
  <style lang="postcss">
	.card {
	  @apply backdrop-blur-lg border border-surface-500/30 rounded-lg;
	}
  </style>