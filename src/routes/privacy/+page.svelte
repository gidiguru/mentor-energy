<script lang="ts">
    import { writable } from 'svelte/store';
  
    interface PolicySection {
      title: string;
      content: string[];
    }
  
    const lastUpdated = new Date('2024-12-27');
  
    const privacyPolicySections: PolicySection[] = [
      {
        title: 'Information We Collect',
        content: [
          'Personal identification information',
          'Contact details',
          'Professional background',
          'Educational information',
          'Device and usage data',
          'IP address',
          'Browser type',
          'Login and authentication data'
        ]
      },
      {
        title: 'How We Use Your Information',
        content: [
          'Provide mentorship services',
          'User account management',
          'Personalized user experience',
          'Communicate platform updates',
          'Process payments',
          'Improve platform functionality',
          'Ensure platform security',
          'Comply with legal obligations'
        ]
      },
      {
        title: 'Information Sharing',
        content: [
          'Mentors and mentees within the platform',
          'Service providers and technology partners',
          'Legal requirements and law enforcement',
          'With user consent',
          'Aggregated anonymous data for analytics'
        ]
      },
      {
        title: 'Data Protection',
        content: [
          'Encrypted data storage',
          'Secure server infrastructure',
          'Regular security audits',
          'Access controls',
          'Data minimization practices'
        ]
      },
      {
        title: 'User Rights',
        content: [
          'Access personal data',
          'Request data correction',
          'Request data deletion',
          'Withdraw consent',
          'Export personal data',
          'Object to data processing'
        ]
      }
    ];
  
    const activeSection = writable<PolicySection | null>(null);
  
    function toggleSection(section: PolicySection): void {
      activeSection.update(current => current === section ? null : section);
    }
  </script>
  
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <h1 class="h1 font-bold mb-6 text-center">Privacy Policy</h1>
    
    <div class="card variant-soft-surface p-4 mb-6 text-center">
      <p class="text-sm text-surface-600">
        Last Updated: {lastUpdated.toLocaleDateString()}
      </p>
    </div>
  
    <div class="mb-6">
      <h2 class="h2 mb-4">1. Introduction</h2>
      <p class="text-base">
        mentor.energy is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our platform.
      </p>
    </div>
  
    {#each privacyPolicySections as section}
      <div class="mb-4 border-b border-surface-500/30">
        <button 
          class="w-full text-left py-4 flex justify-between items-center hover:variant-soft-primary transition-colors"
          on:click={() => toggleSection(section)}
        >
          <h3 class="h3">{section.title}</h3>
          <span class="text-2xl">
            {$activeSection === section ? '−' : '+'}
          </span>
        </button>
        
        {#if $activeSection === section}
          <div class="p-4 variant-soft-surface rounded-lg">
            <ul class="list-disc pl-5 space-y-2">
              {#each section.content as item}
                <li>{item}</li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    {/each}
  
    <div class="mt-8 text-center">
      <p class="text-sm text-surface-600">
        By using mentor.energy, you consent to this privacy policy.
      </p>
      <p class="text-sm text-surface-600 mt-2">
        Contact us at privacy@mentor.energy for any privacy concerns.
      </p>
    </div>
  </div>