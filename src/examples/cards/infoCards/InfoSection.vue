<script setup>
import{ ref } from "vue";
import InfoCard from "./InfoCard.vue";
import InfoModal from "./InfoModal.vue";

const iframeStyle = `style="width:100%; max-height:500px; border:none; overflow:auto;"`
const items = [
  { 
    title: "學權事件",
    description: "處理進度查詢",
    modalContent: `
      <iframe
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTX-mPMOoi0OczAT2HT2R7O0cgiorZ-QAxIPIEXlF6TVZqcdnkSTPFueshnf1003lxacnw7gQt5pIaP/pubhtml?widget=true&amp;headers=false"
        width="100%"
        height="100%"
        style="border:none;">
      </iframe>
    `
  },
    
  { title: "法規", description: "GitHub 文件", link: "https://github.com/utaipei-sa/regulations" },
  { 
    title: "學生議會", 
    description: "會議紀錄與資料", 
    modalContent: `
      <object 
        data="https://example.com/student-council.pdf" 
        type="application/pdf" 
        width="100%" 
        height="80vh">
        <p>你的瀏覽器不支援 PDF。請 <a href="https://example.com/student-council.pdf" target="_blank">點此下載 PDF</a></p>
      </object>
    `
  },
  { 
    title: "會費相關", 
    description: "收費與用途", 
    modalContent: `
      <p>只要你是本校在學的大學部學生，你就是學生會的當然會員！</p>

      <p>身為會員，你可以：</p>
      <ol>
        <li>免費優待參加學生會舉辦的各項活動與事務，豐富你的大學生活！</li>
        <li>投票、參選學生會長、副會長與學生議員，為學生自治盡一份力。</li>
        <li>受邀擔任學生會幹部，一起推動學校的大小事。</li>
        <li>對重要議題進行投票決定，讓你的意見真正被看見。</li>
        <li>享有依照學生會章程與宗旨而來的各項權益。</li>
      </ol>

      <p>同時，會員也有以下小小責任：</p>
      <ol>
        <li>一起遵守學生會章程與議會決議，維護公平運作。</li>
        <li>繳交學生會費：每學年 175 元，由學校在註冊時代收。</li>
      </ol>

      <p>這筆會費將用於學生會的活動經費、公共服務與校園建設。<br>
      支持我們，讓每一位同學都能受益，一起打造更好的校園環境！</p>
    `
  },
  { 
    title: "預決算書", 
    description: "財務透明化文件", 
    modalContent: `
      <iframe
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vR-mkjrwlZJgrs_QcIIn1p7QjvuSPI388oa2Nq_q4zMpbQVxY1BCX08NDNRahVzpw/pubhtml?widget=true&amp;headers=false"
        width="100%"
        height="100%"
        style="border:none;">
      </iframe>
    `
  },
  { 
    title: "素材專區", 
    description: "素材都在這裡！", 
    link:"#",
  }
];

//狀態
const showModal = ref(false);
const selectedItem = ref(null);

//開啟彈窗
function openModal(item){
  selectedItem.value = item;
  showModal.value = true;
}
//關閉彈窗
function closeModal(){
  selectedItem.value = null;
  showModal.value = false;
}
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
          @click="item.modalContent ? openModal(item) : null"
        />
      </div>
    </div>

    <InfoModal
      v-if="showModal"
      :title="selectedItem?.title"
      :description="selectedItem?.description"
      :details="selectedItem?.modalContent"
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
