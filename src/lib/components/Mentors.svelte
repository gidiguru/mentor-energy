<script lang="ts">
    // Sample mentor data from personas
    const mentors = [
      {
        name: "Oluwatomijogun Ogedengbe",
        role: "Exploration Advisor",
        company: "Chevron Nigeria Limited",
        expertise: "Geology and Geophysics",
        experience: "20+ years",
        education: "Masters, Applied Geophysics",
        image: "https://media.licdn.com/dms/image/v2/C4E03AQH5OqAKqfvOjA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1556618584090?e=2147483647&v=beta&t=UsFqYhy2gpkYsb_9rN-Cwxfkf9I2xq0CfbFvxBJgus0"
      },

    ];
  </script>
  
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Meet Our Industry Mentors</h1>
      <p class="text-xl text-surface-600-300-token">
        Connect with experienced professionals in Nigeria's energy sector
      </p>
    </div>
  
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each mentors as mentor}
        <div class="card p-6">
          <div class="text-center mb-4">
            <img 
              src={mentor.image} 
              alt={mentor.name}
              class="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 class="h3">{mentor.name}</h3>
            <p class="text-surface-600-300-token">
              {mentor.role} at {mentor.company}
            </p>
          </div>
          <div class="space-y-2">
            <p><strong>Expertise:</strong> {mentor.expertise}</p>
            <p><strong>Experience:</strong> {mentor.experience}</p>
            <p><strong>Education:</strong> {mentor.education}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <style lang="postcss">
    .card {
      @apply backdrop-blur-lg border border-surface-500/30 rounded-lg;
    }
  </style>