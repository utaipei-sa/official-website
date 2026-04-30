<script setup>
import { ref, onMounted } from "vue";
import { readItems } from "@directus/sdk";
import InfoCard from "./InfoCard.vue";
import InfoModal from "./InfoModal.vue";

import directus from "@/db/directus";

// const iframeStyle = `style="width:100%; max-height:500px; border:none; overflow:auto;"`;
const items = ref([]);

//狀態
const showModal = ref(false);
const selectedItem = ref(null);

//開啟彈窗
function openModal(item) {
  selectedItem.value = item;
  showModal.value = true;
}
//關閉彈窗
function closeModal() {
  selectedItem.value = null;
  showModal.value = false;
}

onMounted(async () => {
  let allData = await directus.request(
    readItems("public_data", {
      sort: ["priority"],
    })
  );

  items.value = allData;
  console.log(items.value);
});
</script>

<template>
  <section class="info-section">
    <div class="info-container">
      <h2 class="section-title">資訊公開</h2>
      <div class="cards-grid">
        <InfoCard
          v-for="(item, i) in items"
          :key="i"
          v-bind="item"
          @click="
            item.type === 'popup' || item.type === 'collection'
              ? openModal(item)
              : null
          "
        />
      </div>
    </div>

    <InfoModal
      v-if="showModal"
      :title="selectedItem?.title"
      :details="selectedItem?.content"
      @close="closeModal"
    />
  </section>
</template>

<style scoped>
/* ===== 容器設定 ===== */
.info-container {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}

/* ===== 標題樣式 ===== */
.section-title {
  color: #003d79;
  font-weight: 700;
  font-size: clamp(1.6rem, 2.5vw, 2rem);
  margin-bottom: 2.5rem;
  letter-spacing: 0.5px;
}

/* ===== 卡片區塊 ===== */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8rem;

  /* 關鍵：讓同一排的卡片等高 */
  align-items: stretch;
}

/* ===== InfoCard 卡片統一設定 ===== */
.cards-grid :deep(.info) {
  display: flex;
  flex-direction: column;
  justify-content: center;

  background: white;
  border-radius: 16px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  padding: 1.75rem;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.25s ease;

  /* 等高處理核心 */
  height: 100%;
  min-height: 160px;
  box-sizing: border-box;
}

/* 滑鼠懸停動畫 */
.cards-grid :deep(.info:hover) {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 61, 121, 0.15);
}

/* ===== 文字置中 + 對齊 ===== */
.cards-grid :deep(.title-text),
.cards-grid :deep(.description-text) {
  text-align: center;
}

/* ===  手機畫面保持等高 === */
@media (max-width: 900px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  /* 手機版也保持等高 */
  .cards-grid :deep(.info) {
    min-height: 140px; /* 稍微縮短讓畫面更平衡 */
    height: auto;
  }

  /* 標題自動換行但不撐高 */
  .cards-grid :deep(.title-text) {
    white-space: normal;
    word-break: break-word;
    line-height: 1.3;
  }
}
</style>
