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
            v-for="(item, index) in paginatedAnnouncements"
            :key="index"
            @click="openDetail(item)"
          >
            <strong>{{ formatDate(item.updated_at) }} {{ item.title }}</strong>
          </div>
        </div>
        <div
          v-if="announcementsData.length > 0"
          class="d-flex justify-content-center mt-3"
        >
          <button
            class="btn btn-sm btn-outline-primary me-2"
            @click="prevPage"
            :disabled="currentPage === 0"
          >
            上一頁
          </button>
          <p class="align-self-center">
            {{ currentPage + 1 }} / {{ totalPages }}
          </p>
          <button
            class="btn btn-sm btn-outline-primary ms-2"
            @click="nextPage"
            :disabled="currentPage >= totalPages - 1"
          >
            下一頁
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchAnnouncements } from "@/services/content";
import { formatDate } from "@/utils/date";

// 響應式資料 (取代原先的 data)
const announcementsData = ref([]);

const router = useRouter();

const currentPage = ref(0);
const itemsPerPage = 10;

const paginatedAnnouncements = computed(() => {
  const start = currentPage.value * itemsPerPage;
  const end = start + itemsPerPage;
  return announcementsData.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(announcementsData.value.length / itemsPerPage)
);

function nextPage() {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
}

// 方法 (取代原先的 methods)
const openDetail = (item) => {
  router.push({
    name: "content-detail",
    params: { type: "announcement", id: item.id },
  });
};

onMounted(async () => {
  try {
    announcementsData.value = await fetchAnnouncements();
  } catch (error) {
    console.error("Failed to load announcements.", error);
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

.list-group {
  font-size: 1rem;
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
