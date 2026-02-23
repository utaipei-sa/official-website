<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  profile: {
    type: Object,
    required: true,
    name: String,
    link: String,
  },
  description: {
    type: String,
    required: true,
  },
  reverse: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="card card-profile team-card">
    <div class="row g-0" :class="{ 'flex-row-reverse': reverse }">
      <div class="col-auto d-flex align-items-center">
        <a :href="profile.link">
          <div class="p-2">
            <img class="shadow-sm" :src="image" :alt="profile.name" />
          </div>
        </a>
      </div>
      <div class="col my-auto">
        <div class="card-body py-2">
          <h5 class="mb-1">{{ profile.name }}</h5>
          <p v-html="description"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.team-card {
  padding: 15px;
  width: 80%;
  max-width: 1000px;
  margin: 0 auto; /* 水平置中 */
}
.team-card img {
  max-width: 100px; /* 圖片縮小 */
  max-height: 100px;
  object-fit: cover; /* 保持比例 */
  border-radius: 8px;
}

.team-card p {
  font-size: 1rem; /* 文字縮小、簡化 */
  line-height: 1.3;
  color: #555; /* 顏色淺一點 */
  overflow: hidden; /* 避免太長撐高 */
  text-overflow: ellipsis;
  display: -webkit-box;
  /*-webkit-line-clamp: 2; /* 最多兩行 */
  -webkit-box-orient: vertical;
}

@media (max-width: 600px) {
  /* 強制將 Flex 佈局改為垂直方向 */
  .team-card .row {
    flex-direction: column !important; 
  }

  /* 針對圖片所在的區塊 (col-auto) */
  .team-card .col-auto {
    width: 100%; /* 讓它佔滿整行 */
    justify-content: center; /* 讓內部的 flex 圖片置中 */
    margin-bottom: 15px; /* 增加圖片與下方文字的距離 */
  }

  /* 針對文字所在的區塊 (col) */
  .team-card .col {
    text-align: center; /* 文字置中 */
    width: 100%; /* 確保文字區塊也佔滿寬度 */
  }

  /* 在手機版時，如果原本有設定 reverse (左右互換)，這裡要取消互換的效果，
     確保圖片永遠在上面，文字在下面 */
  .team-card .flex-row-reverse {
    flex-direction: column !important;
  }
}
</style>
