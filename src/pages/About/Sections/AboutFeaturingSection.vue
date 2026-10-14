<script setup>
import CenteredBlogCard from "@/components/content/CenteredBlogCard.vue";

defineProps({
  resources: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <section class="pt-4 pb-6" id="resources">
    <div class="container">
      <div class="row mt-4 mb-4">
        <h2 class="w-auto title-shift">素材專區</h2>
        <div
          class="row mt-6 align-items-stretch justify-content-center text-center"
        >
          <div
            v-for="resource in resources"
            :key="resource.title + resource.image"
            class="col-md-3 mb-6"
          >
            <CenteredBlogCard
              class="centered-card"
              :image="resource.image"
              :title="resource.title"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.centered-card {
  max-width: 250px;
  margin: 0 auto;
}
</style>
