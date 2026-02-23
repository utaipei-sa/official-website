<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  action: {
    type: Object,
    color: String,
    route: String,
    label: String,
    default: () => ({
      color: "bg-gradient-success",
      label: "Find Out More",
    }),
  },
});
</script>
<template>
  <div class="card">
    <div
      class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 text-center"
    >
      <img :src="image" :alt="title" class="centered-blog-card-img" />
    </div>
    <div class="card-body text-center">
      <h5 class="font-weight-normal">
        {{ title }}
      </h5>
      <!--
      <p class="mb-0">
        {{ description }}
      </p>
      <button type="button" class="btn btn-sm mb-0 mt-3" :class="action.color">
        {{ action.label }}
      </button>
      -->
    </div>
  </div>
</template>
<style>
.centered-blog-card-img {
  width: 100%;
  aspect-ratio: 1 / 1; /* 保持正方形比例 */
  object-fit: contain;  /* 整張圖片都顯示出來，不裁切 */
  border-radius: 12px;  /* 可視需求保留 */
  display: block;
  margin: 0 auto;
  max-width: 200px;     /* 限制最大寬度，避免太大 */
  background-color: #ffffff; /* 加個淺灰底避免空白感 */
  padding: 8px;         /* 可選，讓圖片與邊框有間距 */
}
</style>
