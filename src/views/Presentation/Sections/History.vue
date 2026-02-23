<template>
  <div class="container mt-1">
    <div class="activities-wrapper">
      <div class="activity-column announcement">
        <div class="activity-header">
          <span style="font-weight: bold; 
              font-size: 32px;
              background: -webkit-linear-gradient(transparent 65%,#ffcbff 60%, #ffcbff 100%,transparent 100%);">
            歷史活動
          </span>
        </div>
        <div class="header-divider"></div>
        
        <div class="activity-list">
          <div
            class="activity-item"
            v-for="(item,index) in activeAnnouncements"
            :key="index"
            @click="openModal(item)" 
          >
            <strong>{{ item.date }} {{ item.title }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <Teleport to="body">
    <transition name="fade">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-box"> 
          <h3>{{ selectedItem.title }}</h3>
          <p style="color:#666;">{{ selectedItem.date }}</p>
          <div class="content-divider"></div>
          <div class="modal-content-wrapper">
            <p class="modal-content" v-html="formatContent(selectedItem.content)"></p>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
export default {
  name: "Announcement",
  data() {
    return {
      hoverIndex: null,
      announcements: [
        { title: "活動1", date: "2025/xx/xx",content:"我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n", status: "active" },
        { title: "活動2", date: "2025/xx/xx",content:"我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n", status: "active" }
      ],
      showModal: false, 
      selectedItem: {},
      // 🌟 移除 modalPosition 🌟
    }
  },
  computed: {
    activeAnnouncements() {
      return this.announcements.filter(a => a.status === "active");
    },
    // 🌟 移除 modalStyles 🌟
  },
  methods: {
    // 🌟 移除 event 參數和手動定位邏輯 🌟
    openModal(item) { 
      this.selectedItem = item;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      // 🌟 移除 modalPosition 的重置 🌟
    },
    formatContent(text) {
    return text.replace(/\n/g, "<br>");
    }
  }
}
</script>

<style scoped>

.activities-wrapper {
 display: flex;
 flex-direction: column;
 gap: 20px;
}

/* ... (其他原始樣式保持不變) ... */

.activity-item {
 font-size: 20px;
 color:#37526d;
 cursor: pointer; /* 增加鼠標指標，提示可點擊 */
}

/* ---------------------------------------------------- */
/* 彈窗部分：實現 Flexbox 居中、調整尺寸和內邊距 */
/* ---------------------------------------------------- */

.modal-overlay {
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 background: rgba(0, 0, 0, 0.5);
 
 /* 🌟 關鍵：使用 Flexbox 居中 🌟 */
 display: flex; 
 align-items: center; /* 垂直居中 */
 justify-content: center; /* 水平居中 */
 
 z-index: 999;
}


.modal-box {
 /* 確保服從 Flexbox 居中 */
 position: relative; 
 top: auto;
 left: auto;
 transform: none;

 background: white;
 /* 調整內邊距：垂直 30px，水平 40px */
 padding: 30px 40px; 
 border-radius: 12px;
 box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
 
 width: 85%;
 /* 設置尺寸 */
 max-width: 70%; 
 max-height: 70vh; 
 /* 🌟 設置最小高度，防止內容太少時彈窗過小並靠近導覽列 🌟 */
 min-height: 350px; 

 text-align: center;
 display: flex;
 flex-direction: column;
 margin: 0; 
}
.modal-content-wrapper {
 flex: 1; 
 overflow-y: auto;
 margin: 12px 0;
 text-align: center;
}

.modal-content {
 white-space: pre-line;
 line-height: 1.8; /* 調整行高 */
}

.content-divider {
  width: 100%;
  height: 1px;
  background-color: #FFCBFF; /* 淺灰色分隔線 */

}
</style>