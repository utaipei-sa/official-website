<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
});
</script>

<template>
  <div class="back back-background">
    <div class="card-body text-center items-center justify-center">
      <h3 class="text-dark card-title" v-html="title"></h3>
      <p class="text-dark opacity-8">{{ description }}</p>
    </div>
  </div>
</template>

<style>
.back.back-background {
  width: 100%;
  height: 100%;
  background: linear-gradient(215deg, #fadadd, #fbccdf) !important;
  background-size: cover;
  background-position: center;
  background-color: transparent !important;
}

.rotating-card-container .card .back::after {
  content: none !important;
}

.back .card-body {
  position: relative;
  z-index: 1;
}

.text-dark {
  color: #344767 !important;
}

.card-title {
  font-size: 1.8rem; /* 比一般大 */
  font-weight: bold; /* 粗體 */
  letter-spacing: 2px; /* 增加字距 */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15); /* 字體陰影 */
  max-width: 350px; /* 限制每行最大寬度 (可以依卡片寬度調整) */
  margin: 0 auto; /* 讓文字區塊置中 */
  word-wrap: break-word; /* 長字超過寬度就斷行 */
  white-space: normal; /* 允許自動換行 */
}

.back .card-body p {
  font-size: 1.5rem; /* 調整字體大小 */
  max-width: 300px; /* 限制每行最大寬度 (可以依卡片寬度調整) */
  margin: 0 auto; /* 讓文字區塊置中 */
  word-wrap: break-word; /* 長字超過寬度就斷行 */
  white-space: normal; /* 允許自動換行 */
}
</style>
