<script setup>
import { ref, computed } from "vue";

import NavbarDefault from "../../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../examples/footers/FooterDefault.vue";
// MaterialButton not used in this view

// sample events
const events = ref([
  {
    id: 1,
    date: "2025-08-03",
    title: "迎新茶會",
    time: "14:00",
    location: "活動中心",
    description: "迎新與學長姐交流",
    tag: "社交",
  },
  {
    id: 1,
    date: "2025-09-03",
    title: "迎新晚會",
    time: "17:00",
    location: "活動中心",
    description: "迎新與學長姐交流",
    tag: "社交",
  },
  {
    id: 2,
    date: "2025-09-10",
    title: "系學會例會",
    time: "18:30",
    location: "403教室",
    description: "本月例行會議",
    tag: "會議",
  },
  {
    id: 3,
    date: "2025-09-18",
    title: "志工說明會",
    time: "16:00",
    location: "多功能教室",
    description: "招募下學期志工",
    tag: "招募",
  },
  {
    id: 4,
    date: "2025-10-01",
    title: "月初籌備會",
    time: "12:00",
    location: "辦公室",
    description: "活動分工",
    tag: "內務",
  },
]);

const today = new Date();
const current = ref(new Date(today.getFullYear(), today.getMonth(), 1));
// default select today (date-only)
const selectedDay = ref(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

// formatMonthYear removed: header now uses separate year/month spans for better alignment

function prevMonth() {
  current.value = new Date(
    current.value.getFullYear(),
    current.value.getMonth() - 1,
    1
  );
}
function nextMonth() {
  current.value = new Date(
    current.value.getFullYear(),
    current.value.getMonth() + 1,
    1
  );
}

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function isoDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const weeks = computed(() => {
  const first = startOfMonth(current.value);
  const last = endOfMonth(current.value);
  const startWeekDay = first.getDay();
  const totalDays = last.getDate();

  const days = [];
  for (let i = 0; i < startWeekDay; i++) days.push(null);
  for (let d = 1; d <= totalDays; d++)
    days.push(
      new Date(current.value.getFullYear(), current.value.getMonth(), d)
    );
  while (days.length % 7 !== 0) days.push(null);

  const wk = [];
  for (let i = 0; i < days.length; i += 7) {
    wk.push(days.slice(i, i + 7));
  }
  return wk;
});

function eventsForDate(d) {
  if (!d) return [];
  const key = isoDate(d);
  return events.value.filter((e) => e.date === key);
}

function openDay(d) {
  selectedDay.value = d ? new Date(d) : null;
}

// grouped events for vertical list (sorted by date)
const groupedEvents = computed(() => {
  const todayKey = isoDate(new Date());
  const copy = events.value
    .slice()
    .filter((ev) => ev.date >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date));
  const map = new Map();
  copy.forEach((ev) => {
    if (!map.has(ev.date)) map.set(ev.date, []);
    map.get(ev.date).push(ev);
  });
  return Array.from(map.entries()).map(([date, evs]) => ({ date, events: evs }));
});
</script>

<template>
  <div>
    <div class="container position-sticky z-index-sticky top-0">
      <div class="row">
        <div class="col-12">
          <NavbarDefault :sticky="true" />
        </div>
      </div>
    </div>

    <div class="page-header min-vh-25" style="background: linear-gradient(195deg, #6b7a8f, #2b2f3a)">
      <div class="container py-5 text-white">
        <h2 class="mb-1">學生會 活動行事曆</h2>
        <p class="lead opacity-8">檢視與管理學生會活動</p>
      </div>
    </div>

    <div class="container mt-4">
      <div class="row">
        <div class="col-lg-8">
          <div class="card p-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <!-- <div>
                <small class="text-muted">點選日期以查看當日活動</small>
              </div> -->
              <div class="mx-auto d-flex align-items-center">
                <button class="btn btn-sm btn-outline-dark me-2" @click="prevMonth" aria-label="上個月">
                  ‹
                </button>
                <h5 class="mb-0 text-capitalize mx-3 text-center month-year">
                  <span class="month-year-year">{{ current.getFullYear() }}年</span>
                  <span class="month-year-month"><span class="month-num">{{ current.getMonth() + 1 }}</span>月</span>
                </h5>
                <button class="btn btn-sm btn-outline-dark ms-2" @click="nextMonth" aria-label="下個月">
                  ›
                </button>
              </div>
              <div style="width: 1px"></div>
            </div>
            <div class="table-responsive">
              <table class="table table-bordered mb-0 table-fixed">
                <thead>
                  <tr class="text-center">
                    <th>日</th>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(week, wi) in weeks" :key="wi">
                    <td v-for="(day, di) in week" :key="di"
                      :class="[{ 'bg-light': !day }, selectedDay && day && isoDate(day) === isoDate(selectedDay) ? 'selected-day' : '']"
                      class="p-0 align-top">
                      <div class="cell-inner">
                        <div v-if="day" class="cell-content p-2 d-flex flex-column clickable" @click="openDay(day)">
                          <div class="d-flex justify-content-between align-items-start">
                            <strong>{{ day.getDate() }}</strong>
                            <small class="today-label text-success">{{
                              new Date().toDateString() === day.toDateString()
                                ? "今天"
                                : ""
                            }}</small>
                          </div>
                          <div class="mt-1 event-preview">
                            <div v-for="ev in eventsForDate(day)" :key="ev.id" class="event-item">
                              <span class="badge bg-gradient-info event-time">{{
                                ev.time
                              }}</span>
                              <a href="#" @click.prevent.stop="openDay(day)" class="ms-1 event-title">{{ ev.title }}</a>
                            </div>
                          </div>
                          <div class="mt-auto text-end">
                            <!-- '查看' link removed; entire cell is clickable -->
                          </div>
                        </div>
                        <div v-else class="cell-content p-2"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card p-3">
            <h6>當日活動</h6>
            <div v-if="selectedDay">
              <div class="mb-2">
                <strong>{{ selectedDay.getFullYear() }}-{{
                  String(selectedDay.getMonth() + 1).padStart(2, "0")
                }}-{{
                    String(selectedDay.getDate()).padStart(2, "0")
                  }}</strong>
                <div class="text-muted small">
                  {{
                    selectedDay.toLocaleDateString("zh-TW", {
                      weekday: "long",
                    })
                  }}
                </div>
              </div>
              <div v-for="ev in eventsForDate(selectedDay)" :key="ev.id" class="mb-3">
                <div class="d-flex justify-content-between">
                  <div>
                    <div class="fw-bold">{{ ev.title }}</div>
                    <div class="text-sm text-muted">
                      {{ ev.time }} • {{ ev.location }}
                    </div>
                    <div class="text-sm mt-1">{{ ev.description }}</div>
                  </div>
                  <div>
                    <span class="badge bg-gradient-primary">{{ ev.tag }}</span>
                  </div>
                </div>
              </div>
              <div v-if="eventsForDate(selectedDay).length === 0" class="text-muted">
                無活動
              </div>
            </div>
            <div v-else class="text-muted">
              尚未選擇日期，或選擇日期沒有活動。
            </div>

            <hr class="my-3" />
            <h6 class="mb-2">近期活動</h6>
            <div class="event-list overflow-auto" style="max-height: 60vh">
              <div v-for="group in groupedEvents" :key="group.date" class="mb-3">
                <div class="fw-bold small mb-1">{{ group.date }}</div>
                <ul class="list-unstyled mb-0">
                  <li v-for="ev in group.events" :key="ev.id"
                    class="d-flex justify-content-between align-items-start py-1 border-bottom">
                    <div>
                      <div class="fw-bold">{{ ev.title }}</div>
                      <div class="text-sm text-muted">
                        {{ ev.time }} • {{ ev.location }}
                      </div>
                    </div>
                    <span class="badge bg-gradient-primary">{{ ev.tag }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-5">
      <DefaultFooter />
    </div>
  </div>
</template>

<style scoped>
/* make table cells equal width and use square aspect ratio */
.table-fixed {
  table-layout: fixed;
  width: 100%;
}

.table-fixed td,
.table-fixed th {
  padding: 0.25rem !important;
  vertical-align: top;
}

/* wrapper that creates a square by padding-top trick */
.cell-inner {
  position: relative;
  width: 100%;
  padding-top: 100%;
  /* 1:1 aspect ratio */
}

.cell-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* small screens: reduce cell padding */
@media (max-width: 576px) {
  .cell-content {
    padding: 0.5rem;
  }
}

/* event preview inside calendar cell: no scrolling, wrap and truncate */
.event-preview {
  display: flex;
  flex-direction: column;
  gap: 0.08rem;
}

.event-item {
  display: flex;
  align-items: center;
  gap: 0.12rem;
  font-size: 0.72rem;
  /* smaller font */
  line-height: 1.05;
}

.cell-content .date-row {
  margin-bottom: 0.12rem;
}

.event-time {
  flex: 0 0 auto;
  font-size: 0.64rem;
  padding: 0.12rem 0.24rem;
}

/* title: allow wrap and clamp to 2 lines with ellipsis */
.event-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  /* standard property for compatibility */
  line-clamp: 2;
}

.event-list .fw-bold {
  font-size: 0.95rem;
}

/* make buttons change color on hover (don't require pressing) */
.btn {
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

/* specific for outline dark buttons used in this view */
.btn-outline-dark:hover {
  background-color: rgba(43, 47, 58, 0.08);
  color: #2b2f3a;
  border-color: rgba(43, 47, 58, 0.2);
}

.btn-outline-dark:focus,
.btn-outline-dark:active {
  /* keep a consistent style when focused/active */
  background-color: rgba(43, 47, 58, 0.12);
  color: #2b2f3a;
  border-color: rgba(43, 47, 58, 0.25);
}

/* month-year header alignment: ensure 1-digit and 2-digit months don't shift layout */
.month-year {
  display: inline-block;
  min-width: 9ch;
  /* reserve enough width so single/two-digit months don't shift centering */
  text-align: center;
}

.month-year-month {
  text-align: right;
}

.month-num {
  display: inline-block;
  width: 2ch;
  text-align: right;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace;
  font-variant-numeric: tabular-nums;
}

/* selected day highlight */
.selected-day .cell-content {
  background-color: rgba(99, 150, 255, 0.12);
  border-left: 3px solid rgba(66, 133, 244, 0.9);
}

/* clickable cell style */
.clickable {
  cursor: pointer;
}

.clickable:hover .cell-content {
  background-color: rgba(0, 0, 0, 0.03);
}
</style>
