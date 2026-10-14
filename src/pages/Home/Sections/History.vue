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
            @click="openDetail(item)"
          >
            <strong>{{ formatDate(item.start_time) }} {{ item.title }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchHistoricalActivities } from "@/services/content";
import { formatDate } from "@/utils/date";

// 響應式資料 (取代原先的 data)
const activitiesData = ref([]);

const router = useRouter();

// 方法 (取代原先的 methods)
// 🌟 移除 event 參數和手動定位邏輯 🌟
const openDetail = (item) => {
  router.push({
    name: "content-detail",
    params: { type: "activity", id: item.id },
  });
};

onMounted(async () => {
  try {
    activitiesData.value = await fetchHistoricalActivities();
  } catch (error) {
    console.error("Failed to load historical activities.", error);
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

@media (max-width: 768px) {
  .container {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }

  .activity-header span {
    font-size: clamp(1.6rem, 8vw, 2rem);
  }

  .activity-item {
    font-size: clamp(1rem, 4.2vw, 1.25rem);
    line-height: 1.55;
  }
}
</style>
