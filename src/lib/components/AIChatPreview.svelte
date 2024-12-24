<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { onMount } from 'svelte';
  
    let messages = [
      {
        role: 'assistant',
        content: "👋 Hi! I'm your energy career assistant. Try asking me about geology careers, industry skills, or mentorship opportunities."
      }
    ];
    
    let inputValue = '';
    let loading = false;
    let demoMode = true;
    let chatContainer: HTMLDivElement;
  
    // Pre-defined demo responses for common questions
    const demoResponses = {
      'skills': "Based on our industry analysis, the most in-demand skills for geology graduates in Nigeria's energy sector are:\n\n1. Software proficiency (Petrel, GIS)\n2. Field mapping and analysis\n3. Data interpretation\n4. Project management\n\nWant to develop these skills? Our mentors can guide you! Sign up to get matched with industry experts.",
      'career': "There are several exciting career paths in Nigeria's energy sector for geology graduates:\n\n• Exploration Geologist\n• Reservoir Geologist\n• Environmental Consultant\n• Mining Geologist\n\nOur mentors work in these roles and can help guide your career journey. Ready to connect with them?",
      'default': "That's a great question! Our mentors specialize in providing detailed guidance on topics like this. Sign up to get personalized answers and connect with industry experts who can help guide your career journey."
    };
  
    function scrollToBottom() {
      if (chatContainer) {
        setTimeout(() => {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 100);
      }
    }
  
    async function handleSubmit() {
      if (!inputValue.trim() || loading) return;
  
      const userMessage = {
        role: 'user',
        content: inputValue.trim()
      };
  
      messages = [...messages, userMessage];
      loading = true;
      inputValue = '';
      scrollToBottom();
  
      // In demo mode, simulate response based on keywords
      if (demoMode) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        let response;
        if (userMessage.content.toLowerCase().includes('skill')) {
          response = demoResponses.skills;
        } else if (userMessage.content.toLowerCase().includes('career')) {
          response = demoResponses.career;
        } else {
          response = demoResponses.default;
        }
  
        messages = [...messages, {
          role: 'assistant',
          content: response
        }];
        
        loading = false;
        scrollToBottom();
        return;
      }
  
      // Real API call for production
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: messages.slice(-3) })
        });
  
        if (!response.ok) throw new Error('Failed to get response');
  
        const data = await response.json();
        messages = [...messages, {
          role: 'assistant',
          content: data.message
        }];
      } catch (error) {
        messages = [...messages, {
          role: 'assistant',
          content: "I'm having trouble connecting right now. Sign up to access the full AI assistant and mentorship platform!"
        }];
      } finally {
        loading = false;
        scrollToBottom();
      }
    }
  </script>
  
  <div class="card p-3 sm:p-4 w-full max-w-2xl mx-auto bg-surface-100-800-token">
    <div 
      class="h-[250px] sm:h-[300px] overflow-y-auto mb-3 sm:mb-4 space-y-3 sm:space-y-4 p-2 sm:p-4"
      bind:this={chatContainer}
    >
      {#each messages as message}
        <div
          class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}"
          in:fade={{ duration: 150 }}
        >
          <div
            class="max-w-[80%] rounded-lg p-3 {
              message.role === 'user'
                ? 'bg-primary-500 text-white'
                : 'bg-surface-200-700-token'
            }"
          >
            {message.content}
          </div>
        </div>
      {/each}
      
      {#if loading}
        <div class="flex justify-start" in:fade>
          <div class="bg-surface-200-700-token rounded-lg p-3">
            Thinking...
          </div>
        </div>
      {/if}
    </div>
  
    <form 
      on:submit|preventDefault={handleSubmit}
      class="flex gap-2"
    >
      <input
        type="text"
        bind:value={inputValue}
        placeholder="Ask about geology careers, skills, or mentorship..."
        class="input"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        class="btn variant-filled-primary"
      >
        Send
      </button>
    </form>
  
    <p class="text-sm mt-4 text-center">
      Note: This is a preview. Sign up for full AI assistance and mentor connections!
    </p>
  </div>