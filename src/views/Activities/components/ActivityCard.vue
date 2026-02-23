<script setup>
import { ref, computed } from "vue";

// Props
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  events: {
    type: Array,
    required: true,
  },
});

// 分頁邏輯
const currentPage = ref(0);
const itemsPerPage = 5;

const paginatedEvents = computed(() => {
  const start = currentPage.value * itemsPerPage;
  const end = start + itemsPerPage;
  return props.events.slice(start, end);
});

const totalPages = computed(() => Math.ceil(props.events.length / itemsPerPage));

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

// 獲取星期幾
const getDayOfWeek = (dateString) => {
  const date = new Date(dateString);
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return days[date.getDay()];
};
</script>

<template>
  <div class="card p-3 mb-2">
    <h6 class="mb-2">{{ title }}</h6>
    <div class="event-list">
      <div v-for="group in paginatedEvents" :key="group.date" class="mb-3">
        <div class="fw-bold small mb-1">{{ group.date }} ({{ getDayOfWeek(group.date) }})</div>
        <ul class="list-unstyled mb-0">
          <li v-for="ev in group.events" :key="ev.id"
            class="d-flex justify-content-between align-items-start py-1 border-bottom">
            <div>
              <div class="fw-bold">
                <template v-if="ev.url">
                  <a :href="ev.url" target="_blank" rel="noopener" class="link-like text-primary">{{ ev.title }}
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="0.65rem" height="0.65rem" fill="currentColor"
                        class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                          d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                        <path fill-rule="evenodd"
                          d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                      </svg></span></a>
                </template>
                <template v-else>
                  <a href="#" @click.prevent="$emit('openDay', ev.date)" class="text-reset">{{ ev.title }}</a>
                </template>
              </div>
              <div class="text-sm text-muted">
                {{ ev.time }} • {{ ev.location }}
              </div>
            </div>
            <span class="badge event-category-badge">{{ ev.tag }}</span>
          </li>
        </ul>
      </div>
      <div v-if="props.events.length === 0" class="text-muted">
        無活動
      </div>
      <div v-if="props.events.length > 0" class="d-flex justify-content-center mt-3">
        <button class="btn btn-sm btn-outline-primary me-2" @click="prevPage" :disabled="currentPage === 0">上一頁</button>
        <p class="align-self-center">{{ currentPage + 1 }} / {{ totalPages }}</p>
        <button class="btn btn-sm btn-outline-primary ms-2" @click="nextPage"
          :disabled="currentPage >= totalPages - 1">下一頁</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-list {
  overflow: hidden;
}

.event-list .fw-bold {
  font-size: 0.95rem;
}

/* link-like: green by default, red on hover */
.link-like {
  cursor: pointer;
  text-decoration: none;
}

.link-like:hover {
  color: var(--bs-danger, #dc3545) !important;
  text-decoration: underline;
}

.event-category-badge {
  background-color: #ff71a7;
  align-self: center;
}
</style>
