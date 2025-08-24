<script setup>
defineProps({
  icon: { type: String, default: "" },
  title: { type: String, required: true },
});
</script>

<template>
  <div class="front front-background">
    <div class="card-body py-7 text-center">
      <i v-if="icon" class="material-icons text-dark text-6xl my-3">{{
        icon
      }}</i>
      <h3 class="text-dark card-title" v-html="title" />
    </div>
  </div>
</template>

<style>
.front.front-background {
  width: 100%;
  height: 100%;
  background: linear-gradient(175deg, #fadadd, #fbccdf) !important;
  background-size: cover;
  background-position: center;
  background-color: transparent !important;
}

.rotating-card-container .card .front::after {
  content: none !important;
}

.front .card-body {
  position: relative;
  z-index: 1;
}

.text-dark {
  color: #344767 !important;
}

.card-title {
  font-size: 1.75rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
}
</style>
