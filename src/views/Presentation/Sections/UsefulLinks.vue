<template>
  <div class="container mt-1">
    <div class="activities-wrapper">
      <div class="activity-column announcement">
        <div class="activity-header">
          <span>常用連結</span>
        </div>
        <div class="header-divider"></div>

        <div class="activity-list">
          <div
            class="activity-item"
            v-for="(item, index) in usefulLinksData"
            :key="index"
          >
            <a
              :href="item.url"
              target="_blank"
              style="font-weight: bold; text-decoration: none"
            >
              {{ item.title }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { readItems } from "@directus/sdk";
import directus from "@/db/directus";

// 使用 ref 定義響應式資料 (取代原先的 data)
const usefulLinksData = ref([]);

onMounted(async () => {
  let usefulLinks = await directus.request(
    readItems("useful_links", {
      sort: ["priority"],
    })
  );
  usefulLinksData.value = usefulLinks;
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
  gap: 12px;
}

.activity-item {
  font-size: 20px;
  color: #37526d;
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
</style>
