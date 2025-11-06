<template>
  <Teleport to="body">
    <div class="modal-backdrop" @click.self="close">
      <div class="modal-content">
        <!-- 標題區 -->
        <div class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
        </div>

        <!-- 內容滾動區 -->
        <div class="content">
          <div v-if="details" class="modal-details" v-html="details"></div>
        </div>

        <!-- 按鈕區固定底部 -->
        <div class="buttons">
          <button class="confirm-button" @click="close">返回</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

onMounted(() => {
  // 彈窗開啟時禁止背景滾動
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  // 彈窗關閉時恢復背景滾動
  document.body.style.overflow = "";
});

const props = defineProps({
  title: String,
  details: String
})
const emit = defineEmits(['close'])
function close() {
  emit('close')
}
</script>

<style scoped>
/* 背景遮罩 */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 80px;  
  z-index: 1000;
  backdrop-filter: blur(2px);
  animation: fadeIn 0.2s ease-in;
}

/* Modal 內容區 */
.modal-content {
  display: flex;
  flex-direction: column;
  width: 950px; /* 加寬 */
  max-width: 95%;
  height: 650px;
  max-height: 90vh;
  background: #fff; 
  border-radius: 20px;
  overflow: hidden;
  font-family: 'Noto Sans', sans-serif;
  animation: slideUp 0.3s ease-out;
  /* 陰影簡化 */
  box-shadow: 0 6px 12px rgba(255,182,193,0.2);
}

/* 標題區 */
.modal-header {
  min-height: 60px;
  background-color: #fff0f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 700;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

/* 標題文字 */
.modal-title {
  color: #ffb6c1 !important;
}

/* 內容滾動區 */
.content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #fff;
}

/* 詳細內容 */
.modal-details {
  font-size: 0.95rem;
  color: #333;
  line-height: 1.6;
  white-space: pre-line;
  border-radius: 12px;
}

/* iframe / PDF 自動縮放置中顯示 */
.iframe-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #fff;
}

/* 自動縮放 Google Sheet 以符合彈窗大小 */
.iframe-wrapper iframe {
  width: 1200px;
  height: 800px;
  border: none;
  border-radius: 12px;
  transform-origin: top center;

  /* 根據視窗大小自動縮放（取最小比例） */
  transform: scale(calc(min(0.9 * (95vw / 1200),0.9 * (85vh / 800)))
  );
}



/* 按鈕固定底部 */
.buttons {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding: 15px;
  border-top: 1px solid #ffc0cb;
  background: #fff0f5;
}

.confirm-button {
  min-width: 120px;
  height: 40px;
  background: #ffc0cb;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.confirm-button:hover {
  background-color: #ffb6c1;
}

/* 動畫 */
@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}

@keyframes slideUp {
  from {transform: translateY(20px); opacity: 0;}
  to {transform: translateY(0); opacity: 1;}
}

/* === 小螢幕優化 === */
@media (max-width: 768px) {
  .modal-content {
    width: 92%;
    height: auto; /* 改為自動高度，內容多時可滾動 */
    max-height: 85vh;
    margin: 20px; /* 🔹 增加邊距，避免太貼邊 */
    border-radius: 16px;
  }

  .modal-header {
    font-size: 1.3rem;
    padding: 0.75rem;
  }

  .content {
    padding: 15px;
  }

  .modal-details {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .buttons {
    padding: 12px 10px;
  }

  .confirm-button {
    min-width: 90px;
    height: 36px;
    font-size: 0.9rem;
  }

  /*  讓內嵌的 Google Sheet / PDF 自動縮放以適應手機寬度 */
  .iframe-wrapper iframe {
    width: 100%;
    height: 70vh;
    transform: none; /* 手機不再縮放，直接塞滿寬度 */
  }
}

/* === 更小裝置 (小於 480px) 再進一步優化 === */
@media (max-width: 480px) {
  .modal-content {
    width: 95%;
    margin: 15px;
    border-radius: 14px;
  }

  .modal-header {
    font-size: 1.2rem;
  }

  .confirm-button {
    width: 100%;
    height: 38px;
    border-radius: 10px;
  }
}

</style>
