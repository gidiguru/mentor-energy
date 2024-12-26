<script lang="ts">
    import { page } from '$app/stores';
    
    async function testConnection() {
      const { supabase } = $page.data;
      const { data, error } = await supabase.from('test').select('*');
      
      if (error) {
        console.error('Connection error:', error);
      } else {
        console.log('Successfully connected! Data:', data);
      }
    }
  </script>
  
  <button on:click={testConnection} class="btn variant-filled-primary">
    Test Supabase Connection
  </button>