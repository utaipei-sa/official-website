<script setup>
import { onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import AppLayout from "@/components/layout/AppLayout.vue";
import PageHeader from "@/components/layout/PageHeader.vue";
import {
  fetchAnnouncement,
  fetchHistoricalActivity,
  fetchPublicInformation,
} from "@/services/content";
import { formatDate, formatDateRange } from "@/utils/date";

const route = useRoute();
const item = ref(null);
const error = ref("");
const loading = ref(true);

const loaders = {
  announcement: fetchAnnouncement,
  activity: fetchHistoricalActivity,
  public: fetchPublicInformation,
};

const typeLabels = {
  announcement: "最新公告",
  activity: "歷史活動",
  public: "資訊公開",
};

const contentType = route.params.type;
const loadContent = loaders[contentType];

function activityDate(item) {
  return formatDateRange(item.start_time, item.end_time);
}

onMounted(async () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  if (!loadContent) {
    error.value = "找不到此內容類型。";
    loading.value = false;
    return;
  }

  try {
    item.value = await loadContent(route.params.id);
  } catch (loadError) {
    console.error("Failed to load content detail.", loadError);
    error.value = "內容載入失敗，請稍後再試。";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <AppLayout>
    <template #header>
      <PageHeader>
        <div class="detail-header">
          <div class="container">
            <p class="detail-eyebrow">
              <RouterLink :to="{ name: 'presentation' }">首頁</RouterLink>
              &gt;
              {{ typeLabels[contentType] }}
            </p>
            <h1>{{ item?.title || "內容詳情" }}</h1>
          </div>
        </div>
      </PageHeader>
    </template>

    <template #default>
      <main class="detail-page">
        <div v-if="loading" class="detail-state">載入中...</div>
        <div v-else-if="error" class="detail-state detail-error">
          {{ error }}
        </div>
        <article v-else-if="item" class="detail-card">
          <div
            class="detail-meta"
            v-if="contentType === 'announcement' || contentType === 'activity'"
          >
            <template v-if="contentType === 'announcement'">
              <span class="detail-meta-line"
                >發布時間：{{
                  formatDate(item.updated_at || item.created_at)
                }}</span
              >
              <span v-if="item.author" class="detail-meta-line"
                >發布單位：{{ item.author }}</span
              >
            </template>
            <template v-else-if="contentType === 'activity'">
              {{ activityDate(item) }}
            </template>
          </div>

          <div
            v-if="contentType === 'public' || contentType === 'announcement'"
            class="wysiwyg-content"
            v-html="item.content || '目前沒有詳細內容。'"
          ></div>
          <div
            v-else
            class="wysiwyg-content"
            v-html="item.description || '本活動無詳細資訊。'"
          ></div>

          <section
            v-if="contentType === 'announcement' && item.attachments?.length"
            class="attachments"
          >
            <h2>附件</h2>
            <ul>
              <li
                v-for="(attachment, index) in item.attachments"
                :key="attachment.id"
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
          </section>

          <section
            v-if="contentType === 'activity' && item.url"
            class="attachments"
          >
            <h2>相關連結</h2>
            <a :href="item.url" target="_blank" rel="noopener noreferrer"
              >請點我</a
            >
          </section>
        </article>
      </main>
    </template>
  </AppLayout>
</template>

<style scoped>
.detail-header {
  display: flex;
  align-items: end;
  min-height: 240px;
  padding: 7rem 1rem 3rem;
  color: #003d79;
  background: linear-gradient(135deg, #fff8fc, #f4f8ff);
}

.detail-header .container {
  width: min(100%, 1200px);
  max-width: none;
}

.detail-eyebrow {
  margin-bottom: 0.75rem;
  color: #37526d;
  font-weight: 700;
}

.detail-header h1 {
  margin: 0;
  text-align: justify;
  overflow-wrap: anywhere;
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1.3;
}

.detail-page {
  width: min(100% - 2rem, 1200px);
  margin: -2rem auto 4rem;
  position: relative;
}

.detail-card {
  --detail-card-padding: clamp(1.25rem, 4vw, 3rem);
  padding: var(--detail-card-padding);
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 12px 35px rgba(0, 61, 121, 0.12);
}

.detail-meta {
  padding-bottom: 1rem;
  color: #667085;
  border-bottom: 1px solid #f0d7e7;
  line-height: 1.7;
}

.detail-meta-line {
  display: block;
}

.wysiwyg-content {
  min-width: 0;
  padding-top: 1.5rem;
  color: #333;
  font-size: 1.05rem;
  line-height: 1.8;
  overflow-wrap: anywhere;
}

.wysiwyg-content :deep(*) {
  max-width: 100%;
}

.wysiwyg-content :deep(img),
.wysiwyg-content :deep(video) {
  height: auto;
  object-fit: contain;
}

.wysiwyg-content :deep(iframe) {
  width: 100%;
  min-height: min(70vh, 720px);
  border: 0;
}

.wysiwyg-content :deep(tbody),
.wysiwyg-content :deep(tr),
.wysiwyg-content :deep(td),
.wysiwyg-content :deep(th) {
  max-width: none !important;
}

.wysiwyg-content :deep(tbody),
.wysiwyg-content :deep(tr) {
  height: auto !important;
}

.wysiwyg-content :deep(td),
.wysiwyg-content :deep(th) {
  min-width: 7rem;
  height: auto !important;
  padding: 0.6rem;
  border: 1px solid #e5e7eb;
}

.attachments {
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid #f0d7e7;
}

.attachments h2 {
  margin-bottom: 0.75rem;
  color: #003d79;
  font-size: 1.25rem;
}

.back-link {
  display: inline-block;
  margin-top: 1.5rem;
  color: #003d79;
  font-weight: 700;
}

.detail-state {
  padding: 4rem 1rem;
  text-align: center;
}

.detail-error {
  color: #a33a3a;
}

@media (max-width: 600px) {
  .detail-header {
    min-height: 200px;
    padding: 6rem 1rem 2.5rem;
  }

  .detail-header .container {
    padding-left: 0;
    padding-right: 0;
  }

  .detail-page {
    width: min(100% - 1rem, 1200px);
    margin-top: -1rem;
  }

  .detail-card {
    border-radius: 0.75rem;
  }

  .wysiwyg-content {
    font-size: 1rem;
    line-height: 1.7;
  }

  .wysiwyg-content :deep(table) {
    width: 100% !important;
    margin-left: 0 !important;
  }
}
</style>
