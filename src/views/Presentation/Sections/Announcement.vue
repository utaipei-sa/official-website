<template>
  <div class="container mt-1">
    <div class="activities-wrapper">
      <div class="activity-column announcement">
        <div class="activity-header">
          <span>最新公告</span>
        </div>
        <div class="header-divider"></div>
        
        <div class="activity-list">
          <div
            class="activity-item"
            v-for="(item, index) in announcementsData"
            :key="index"
            @click="openModal(item)"
          >
            <strong>{{ formatDate(item.created_at) }} {{ item.title }}</strong>
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
          <p style="color: #666">
            發布時間：{{ formatDate(selectedItem.created_at) }}
          </p>
          <div class="content-divider"></div>
          <div class="modal-content-wrapper">
            <div class="modal-content">
              <p>發布單位：{{ selectedItem.department }}</p>
              <p v-html="formatContent(selectedItem.content)"></p>
              <br />
              <div v-for="image in selectedItem.images" :key="image">
                <img
                  :src="image"
                  style="width: 100%; max-width: 600px"
                  alt="附圖"
                />
              </div>
              <div v-if="selectedItem.attachments">
                <h5>附件</h5>
                <ul class="list-group">
                  <li
                    class="list-group-item"
                    v-for="(attachment, index) in selectedItem.attachments"
                    :key="attachment"
                  >
                    <a
                      :href="attachment.url"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ attachment.name || `附件 ${index + 1}` }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "@/db/supabase";

// 響應式資料 (取代原先的 data)
const announcementsData = ref([]);

const showModal = ref(false);
const selectedItem = ref({});

// 方法 (取代原先的 methods)
const openModal = (item) => {
  selectedItem.value = item;
  showModal.value = true;
};


const closeModal = () => {
  showModal.value = false;
};

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatContent = (text) => {
  return text ? text.replaceAll("\n", "<br>") : "";
};

onMounted(async () => {
  let { data: announcements, error: announcementError } = await supabase
    .from("announcements")
    .select("id,title,content,images,attachments,department,created_at");

  if (announcementError) {
    console.log(announcementError);
  } else {
    announcementsData.value = announcements
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 15);
  }
});
</script>

<style scoped>
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
  color: #37526d;
  cursor: pointer; /* 增加鼠標指標，提示可點擊 */
}

.activity-item:hover {
  color: var(--bs-link-hover-color);
}

.activity-header span {
  color: #37526d;
  font-weight: bold;
  font-size: 32px;
  background: -webkit-linear-gradient(
    transparent 65%,
    #ffcbff 60%,
    #ffcbff 100%,
    transparent 100%
  );
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
  text-align: left;
  white-space: pre-line;
  line-height: 1.6;
  color: #333 !important;
}

.modal-content p {
  font-weight: 400 !important;
}

.content-divider {
  width: 100%;
  height: 1px;
  background-color: #ffcbff;
}

.list-group {
  font-size: 1rem;
}
</style>
