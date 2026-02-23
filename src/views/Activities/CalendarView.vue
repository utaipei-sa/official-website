<script setup>
import { ref, computed, onMounted } from "vue";
// import page header banner image
import headerImage from './assets/img/活動行事曆橫幅.jpg';

import NavbarDefault from "../../examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../examples/footers/FooterDefault.vue";
import ActivityCard from "./components/ActivityCard.vue";

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
    url: "https://example.com/welcome-tea",
  }, {
    id: 1,
    date: "2025-09-03",
    title: "迎新茶會",
    time: "14:00",
    location: "活動中心",
    description: "迎新與學長姐交流",
    tag: "社交",
    url: "https://example.com/welcome-tea",
  },
  {
    id: 1,
    date: "2025-09-03",
    title: "迎新晚會",
    time: "17:00",
    location: "活動中心",
    description: "迎新與學長姐交流",
    tag: "社交",
    url: "https://example.com/welcome-party",
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
// decide initial selectedDay based on whether we're on mobile; do a safe runtime check
let initialSelectedDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
try {
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 992px)").matches) {
    // on mobile, don't auto-open today's drawer
    initialSelectedDay = null;
  }
} catch (e) {
  // ignore (e.g., SSR or test env without window)
}
const selectedDay = ref(initialSelectedDay);

// month / year quick selector helpers
const monthNames = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

const years = computed(() => {
  const y = today.getFullYear();
  const arr = [];
  // range: current year -5 .. current year +5
  for (let i = y - 5; i <= y + 5; i++) arr.push(i);
  return arr;
});

const selectedMonth = computed({
  get() {
    return current.value.getMonth();
  },
  set(m) {
    current.value = new Date(current.value.getFullYear(), Number(m), 1);
  },
});

const selectedYear = computed({
  get() {
    return current.value.getFullYear();
  },
  set(y) {
    current.value = new Date(Number(y), current.value.getMonth(), 1);
  },
});

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

function goToToday() {
  // jump the calendar to today's month and select today
  current.value = new Date(today.getFullYear(), today.getMonth(), 1);
  selectedDay.value = new Date(today.getFullYear(), today.getMonth(), today.getDate());
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
// helper: parse an event's date + time into a Date object
function eventDateTime(ev) {
  // ev.date expected as YYYY-MM-DD
  const parts =
    ev && ev.date ? ev.date.split("-").map((p) => parseInt(p, 10)) : [];
  if (parts.length < 3) return null;
  let hh = 0,
    mm = 0,
    ss = 0;
  if (ev && ev.time) {
    const tparts = String(ev.time)
      .split(":")
      .map((p) => parseInt(p, 10));
    if (!isNaN(tparts[0])) hh = tparts[0];
    if (!isNaN(tparts[1])) mm = tparts[1];
    if (!isNaN(tparts[2])) ss = tparts[2];
  }
  // months are 0-based
  return new Date(parts[0], parts[1] - 1, parts[2], hh, mm, ss);
}

// groupedEvents: only include events whose datetime >= now (precision to time)
const groupedEvents = computed(() => {
  const now = new Date();
  const copy = events.value
    .slice()
    .filter((ev) => {
      const dt = eventDateTime(ev);
      return dt && dt >= now;
    })
    .sort((a, b) => {
      const da = eventDateTime(a);
      const db = eventDateTime(b);
      if (!da) return 1;
      if (!db) return -1;
      return da - db;
    });
  const map = new Map();
  copy.forEach((ev) => {
    if (!map.has(ev.date)) map.set(ev.date, []);
    map.get(ev.date).push(ev);
  });
  return Array.from(map.entries()).map(([date, evs]) => ({
    date,
    events: evs,
  }));
});

// groupedPastEvents: only include events whose datetime < now (precision to time)
const groupedPastEvents = computed(() => {
  const now = new Date();
  const copy = events.value
    .slice()
    .filter((ev) => {
      const dt = eventDateTime(ev);
      return dt && dt < now;
    })
    .sort((a, b) => {
      const da = eventDateTime(a);
      const db = eventDateTime(b);
      if (!da) return 1;
      if (!db) return -1;
      return db - da; // 歷史活動按日期降序
    });
  const map = new Map();
  copy.forEach((ev) => {
    if (!map.has(ev.date)) map.set(ev.date, []);
    map.get(ev.date).push(ev);
  });
  return Array.from(map.entries()).map(([date, evs]) => ({
    date,
    events: evs,
  }));
});

// the next upcoming single event (earliest datetime >= now)
const nextUpcoming = computed(() => {
  const now = new Date();
  const future = events.value
    .slice()
    .filter((e) => {
      const dt = eventDateTime(e);
      return dt && dt >= now;
    })
    .sort((a, b) => {
      const da = eventDateTime(a);
      const db = eventDateTime(b);
      if (!da) return 1;
      if (!db) return -1;
      return da - db;
    });
  return future.length ? future[0] : null;
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

    <div class="page-header min-vh-25"
      :style="{ background:`linear-gradient(#ffffff99), url('${headerImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }">
      <div class="container py-5">
        <div class="box text-center mx-auto rounded"
          style="max-width: 400px; border-radius: 0.75rem; opacity: 0.9;">
          <h2 class="mb-1 mt-10 text-primary">學生會活動行事曆</h2>
          <p class="lead opacity-8 text-bold">學生會活動攏佇遮~</p>
        </div>
      </div>
    </div>

    <div class="container mt-4">
      <!-- desktop-only: show next upcoming event summary beside the calendar header -->
      <div class="next-upcoming d-none d-lg-block mb-3">
        <div v-if="nextUpcoming" class="py-2 px-3 border border-1 rounded border-primary">
          <div class="text-bold">即將到來</div>
          <div class="mt-1">
            <template v-if="nextUpcoming.url">
              <a :href="nextUpcoming.url" target="_blank" rel="noopener" class="link-like text-primary text-2xl">{{
                nextUpcoming.title }}</a>
            </template>
            <template v-else>
              <a href="#" @click.prevent="openDay(nextUpcoming.date)" class="text-reset">{{ nextUpcoming.title }}</a>
            </template>
          </div>
          <div class="small">
            {{ nextUpcoming.date }} · {{ nextUpcoming.time }} ·
            {{ nextUpcoming.location }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-8 order-2 order-lg-1 mb-1">
          <div class="card p-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="mx-auto d-flex align-items-baseline month-year-controls">
                <button class="btn btn-sm btn-outline-dark control-btn me-2" @click="prevMonth" aria-label="上個月">
                  ‹
                </button>
                <div class="d-flex align-items-center mx-2 selectors">
                  <select class="form-select form-select-sm year-select me-2" v-model="selectedYear" aria-label="選擇年份">
                    <option v-for="y in years" :key="y" :value="y">{{ y }} 年</option>
                  </select>
                  <select class="form-select form-select-sm month-select" v-model="selectedMonth" aria-label="選擇月份">
                    <option v-for="(m, idx) in monthNames" :key="idx" :value="idx">{{ m }}</option>
                  </select>
                </div>
                <button class="btn btn-sm btn-outline-dark control-btn ms-2" @click="nextMonth" aria-label="下個月">
                  ›
                </button>
                <button class="btn btn-sm btn-primary ms-3" @click="goToToday" aria-label="回到今日">
                  回到今日
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
                    <td v-for="(day, di) in week" :key="di" :class="[
                      { 'bg-light': !day },
                      selectedDay &&
                        day &&
                        isoDate(day) === isoDate(selectedDay)
                        ? 'selected-day'
                        : '',
                      day && (new Date().toDateString() === day.toDateString()) ? 'is-today' : ''
                    ]" class="p-0 align-top">
                      <div class="cell-inner">
                        <div v-if="day" class="cell-content p-2 d-flex flex-column clickable" @click="openDay(day)">
                          <div class="d-flex justify-content-between align-items-start">
                            <strong class="date-number">{{ day.getDate() }}</strong>
                            <small class="today-label text-warning">{{
                              new Date().toDateString() === day.toDateString()
                                ? "今天"
                                : ""
                            }}</small>
                          </div>
                          <div class="mt-1 event-preview">
                            <!-- mobile: single dot if there's any event on this day -->
                            <span v-if="eventsForDate(day).length" class="event-dot me-2 d-inline-block"
                              aria-hidden="true"></span>
                            <!-- desktop: show full event list -->
                            <div v-for="ev in eventsForDate(day)" :key="ev.id"
                              class="event-item d-flex align-items-center event-preview-detail">
                              <span class="badge bg-gradient-info event-time">{{ ev.time }}</span>
                              <template v-if="ev.url">
                                <a :href="ev.url" target="_blank" rel="noopener"
                                  class="ms-1 event-title text-primary link-like" @click.stop>{{ ev.title }}</a>
                              </template>
                              <template v-else>
                                <a href="#" @click.prevent.stop="openDay(day)" class="ms-1 event-title">{{ ev.title
                                }}</a>
                              </template>
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

        <div class="col-lg-4 order-1 order-lg-2">
          <div class="card p-3 mb-3 desktop-day-card">
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
                    <div class="fw-bold">
                      <template v-if="ev.url">
                        <a :href="ev.url" target="_blank" rel="noopener" class="text-primary link-like">{{ ev.title
                        }}</a>
                      </template>
                      <template v-else>
                        <a href="#" @click.prevent="openDay(ev.date)" class="text-reset">{{ ev.title }}</a>
                      </template>
                    </div>
                    <div class="text-sm text-muted">
                      {{ ev.time }} • {{ ev.location }}
                    </div>
                    <div class="text-sm mt-1">{{ ev.description }}</div>
                  </div>
                  <div>
                    <span class="badge event-category-badge">{{ ev.tag }}</span>
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
          </div>

          <ActivityCard :title="'近期活動'" :events="groupedEvents" @openDay="openDay" />

        </div>

      </div>
      <ActivityCard :title="'歷史活動'" :events="groupedPastEvents" @openDay="openDay" />
    </div>

    <!-- mobile drawer for selected day (only visible on small screens) -->
    <transition name="slide">
      <div class="mobile-day-drawer" v-show="selectedDay">
        <div class="drawer-header d-flex justify-content-between align-items-center p-3">
          <div>
            <strong>{{
              selectedDay
                ? selectedDay.getFullYear() +
                "-" +
                String(selectedDay.getMonth() + 1).padStart(2, "0") +
                "-" +
                String(selectedDay.getDate()).padStart(2, "0")
                : ""
            }}</strong>
            <div class="text-muted small">
              {{
                selectedDay
                  ? selectedDay.toLocaleDateString("zh-TW", { weekday: "long" })
                  : ""
              }}
            </div>
          </div>
          <button class="btn btn-sm btn-link text-dark" @click="selectedDay = null">
            關閉
          </button>
        </div>
        <div class="drawer-body p-3">
          <div v-if="selectedDay">
            <div v-for="ev in eventsForDate(selectedDay)" :key="ev.id" class="mb-3">
              <div class="fw-bold">
                <template v-if="ev.url">
                  <a :href="ev.url" target="_blank" rel="noopener" class="text-primary link-like">{{ ev.title }}</a>
                </template>
                <template v-else>
                  <a href="#" @click.prevent="openDay(ev.date)" class="text-reset">{{ ev.title }}</a>
                </template>
              </div>
              <div class="text-sm text-muted">
                {{ ev.time }} • {{ ev.location }}
              </div>
              <div class="text-sm mt-1">{{ ev.description }}</div>
            </div>
            <div v-if="eventsForDate(selectedDay).length === 0" class="text-muted">
              無活動
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="mobile-drawer-backdrop" v-show="selectedDay" @click="selectedDay = null"></div>

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

/* page header background styling */
.page-header {
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.page-header::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.18);
  z-index: 0;
}

.page-header .container {
  position: relative;
  z-index: 1;
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
    padding: 0.25rem;
  }

  .date-number {
    font-size: 0.8rem;
  }

  .event-dot {
    width: 6px;
    height: 6px;
  }

  .cell-inner {
    padding-top: 130%;
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

.event-list {
  height: 400px;
  overflow: hidden;
}

.event-list .fw-bold {
  font-size: 0.95rem;
}

/* make buttons change color on hover (don't require pressing) */
.btn {
  transition: background-color 0.15s ease, color 0.15s ease,
    border-color 0.15s ease;
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
  min-width: 2ch;
  text-align: right;
  font-family: inherit;
  font-variant-numeric: tabular-nums;
}

/* month/year select styling to match header buttons */
.month-select,
.year-select {
  min-width: 90px;
}

/* controls wrapper: ensure vertical alignment with buttons */
.month-year-controls {
  gap: 0.25rem;
  display: flex;
}

/* unify button sizes and subtle elevation */
.control-btn {
  min-width: 36px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border-radius: 6px;
}

/* selectors visual polish */
.selectors .form-select {
  border-radius: 8px;
  padding-top: 6px;
  padding-bottom: 6px;
  background: linear-gradient(180deg, #ffffff, #f8fafc);
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
  border: 1px solid rgba(16, 24, 40, 0.08);
  /* make selects match button height and vertically center their content */
  height: 34px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
}

.event-category-badge {
  background-color: #ff71a7;
}

/* reduce busy-ness on small screens */
@media (max-width: 576px) {
  .selectors .form-select {
    padding-top: 4px;
    padding-bottom: 4px;
    font-size: 0.85rem;
  }

  .control-btn {
    min-width: 32px;
    height: 32px;
    padding: 0 6px;
  }
}

@media (max-width: 576px) {

  .month-select,
  .year-select {
    min-width: 64px;
    font-size: 0.85rem;
  }
}

/* selected day highlight */
.selected-day .cell-content {
  background-color: var(--accent-color);
  border-left: 3px solid var(--primary-color);
}

/* clickable cell style */
.clickable {
  cursor: pointer;
}

.clickable:hover .cell-content {
  background-color: rgba(0, 0, 0, 0.03);
}

/* link-like: green by default, red on hover */
.link-like {
  color: var(--bs-success, #28a745);
  cursor: pointer;
  text-decoration: none;
}

.link-like:hover {
  color: var(--bs-danger, #dc3545);
  text-decoration: underline;
}

/* mobile drawer and responsive tweaks */
.mobile-day-drawer {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 92%;
  max-width: 420px;
  background: #fff;
  z-index: 1055;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.12);
  display: none;
  /* shown on small screens via media query */
  overflow: auto;
}

.mobile-drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 1050;
  display: none;
}

@media (max-width: 992px) {

  /* hide desktop day card on small screens */
  .desktop-day-card {
    display: none !important;
  }

  /* show drawer and backdrop on mobile when v-show toggles them */
  .mobile-day-drawer {
    display: block;
  }

  .mobile-drawer-backdrop {
    display: block;
  }

  /* show dots and hide detail preview on mobile */
  .event-dot {
    width: 8px;
    height: 8px;
    background: var(--bs-primary, #0d6efd);
    border-radius: 50%;
    display: inline-block !important;
    flex: 0 0 auto;
  }

  .event-preview-detail {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    overflow: hidden !important;
  }

  /* on mobile hide the '今天' label and instead color today's date number yellow */
  .today-label {
    display: none !important;
  }

  .is-today .date-number {
    color: #ffc107;
    font-weight: 700;
  }


  /* make recent events list taller on mobile so more items are visible before scrolling */
  /* Removed max-height for fixed height pagination */
}

/* slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.22s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0%);
}

@media (min-width: 992px) {

  /* desktop: hide dot, show detail preview */
  .event-preview-detail {
    display: inline-flex;
  }
}
</style>
