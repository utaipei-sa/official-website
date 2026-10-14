<script setup>
import AboutInformationSection from "@/pages/About/Sections/AboutInformationSection.vue";
import content from "@/data/about/12th";

defineProps({
  content: {
    type: Object,
    default: () => content,
  },
});
</script>

<template>
  <AboutInformationSection :content="content" />
</template>
