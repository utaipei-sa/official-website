<template>
  <div class="container mt-1">
    <div class="activities-wrapper">
      <div class="activity-column announcement">
        <div class="activity-header">
          <span style="font-weight: bold; 
              font-size: 32px;
              background: -webkit-linear-gradient(transparent 65%,#ffcbff 60%, #ffcbff 100%,transparent 100%);">
            最新公告
          </span>
        </div>
        <div class="header-divider"></div>
        
        <div class="activity-list">
          <div
            class="activity-item"
            v-for="(item,index) in activeAnnouncements"
            :key="index"
            @click="openModal(item)" >
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
      announcements: [
        { title: "活動1", date: "2025/xx/xx",content:"我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n", status: "active" },
        { title: "活動2", date: "2025/xx/xx",content:"我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n", status: "active" },
        { title: "活動3", date: "2025/xx/xx",content:"我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n", status: "active" },
        { title: "活動4", date: "2025/xx/xx",content:"我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n我是內文\n", status: "active" }
      ],
      showModal: false, 
      selectedItem: {},
      // 移除 modalPosition 及其在 data 中的初始化
    }
  },
  computed: {
    activeAnnouncements() {
      return this.announcements.filter(a => a.status === "active");
    },
    // 移除 modalStyles
  },
  methods: {
    // 移除 event 參數和定位邏輯
    openModal(item) { 
      this.selectedItem = item;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      // 移除 modalPosition 的重置
    },
    formatContent(text) {
    return text.replace(/\n/g, "<br>");
    }
  }
}
</script>

<style>
/* 保持原有樣式 */
.activities-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.activity-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.activity-header h3 {
  margin: 0;
  font-weight: 600;
  position: relative;
  padding-left: 12px; 
}

.header-divider {
  width: 100%;             
  height: 2px;             
  background-color: #ffdbf0; 
  margin: 8px 0;             
  border-radius: 1px;        
}

.announcement .activity-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.activity-item {
  font-size: 20px;
  color:#37526d;
  cursor: pointer; /* 增加鼠標指標，提示可點擊 */
}
.activity-header span {
  color: #37526d; 
  font-weight: bold;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  /* 關鍵修改：移除 flex 居中屬性，讓 modal-box 獨立定位 */
  display: flex ; /* 強制覆蓋任何可能的 display 設置 */
  align-items: center ; /* 強制垂直居中 */
  justify-content: center ; /* 強制水平居中 */
  z-index: 999;
}


/* 彈窗主體樣式：修改為居中定位 */
.modal-box {
  position: relative ; 
  /* top: auto !important;
  left: auto !important;
  margin: 0 !important; 
  transform: none !important; */

  background: white;
  padding: 24px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  width: 85%;
  max-width: 70%; /* 增加 max-width 提升可讀性 */
  max-height: 70vh; /* 確保內容不會超出視窗 */
  min-height: 350px;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 0; 
  top: auto;
  left: auto;
  transform: none;
}

.modal-content-wrapper {
  flex: 1;           
  overflow-y: auto;    
  margin: 12px 0;
  text-align: center;
}

.modal-content {
  white-space: pre-line;
  line-height: 1.6;
}

.content-divider {
  width: 100%;
  height: 1px;
  background-color: #FFCBFF; 

}
</style>