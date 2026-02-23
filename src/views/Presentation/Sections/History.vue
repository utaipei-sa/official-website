<template>
  <div class="container mt-1">
    <div class="activities-wrapper">
      <div class="activity-column announcement">
        <div class="activity-header">
          <span>歷史活動</span>
        </div>
        <div class="header-divider"></div>
        <div class="activity-list">
          <div
            class="activity-item"
            v-for="(item, index) in activitiesData"
            :key="index"
            @click="openModal(item)"
          >
            <strong>{{ formatDate(item.start_time) }} {{ item.title }}</strong>
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
            {{ formatStartEnd(selectedItem.start_time, selectedItem.end_time) }}
          </p>
          <div class="content-divider"></div>
          <div class="modal-content-wrapper">
            <p
              class="modal-content"
              v-html="formatContent(selectedItem.description)"
            ></p>
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
const activitiesData = ref([]);

const showModal = ref(false);
const selectedItem = ref({});

// 方法 (取代原先的 methods)
// 🌟 移除 event 參數和手動定位邏輯 🌟
const openModal = (item) => {
  selectedItem.value = item;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  // 🌟 移除 modalPosition 的重置 🌟
};

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatStartEnd = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  const sYear = s.getFullYear();
  const sMonth = String(s.getMonth() + 1).padStart(2, "0");
  const sDay = String(s.getDate()).padStart(2, "0");
  const eYear = e.getFullYear();
  const eMonth = String(e.getMonth() + 1).padStart(2, "0");
  const eDay = String(e.getDate()).padStart(2, "0");
  if (sYear === eYear && sMonth === eMonth && sDay === eDay) {
    return `${sYear}-${sMonth}-${sDay}`;
  }
  return `${sYear}-${sMonth}-${sDay} ~ ${eYear}-${eMonth}-${eDay}`;
};

const formatContent = (text) => {
  // 加上空值保護，避免 text 為空時使用 replace 報錯
  return text ? text.replaceAll("\n", "<br>") : "";
};

onMounted(async () => {
  let { data: activities, error: activityError } = await supabase
    .from("activities")
    .select("id,title,start_time,end_time,description")
    .lte("end_time", new Date().toISOString())
    .eq("show_in_home", true);

  if (activityError) {
    console.log(activityError);
  } else {
    activitiesData.value = activities
      .sort((a, b) => new Date(b.end_time) - new Date(a.end_time))
      .slice(0, 5);
  }
});
</script>

<style scoped>
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
</style>
