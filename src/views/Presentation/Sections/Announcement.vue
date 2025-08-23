<template>
  <div class="container mt-5">

    <div class="activities-wrapper">
      <!-- 最新公告 -->
      <div class="activity-column announcement">
        <div class="activity-header">
          <h3>最新公告</h3>
        </div>
        <div class="activity-list">
          <div
            class="activity-card"
            v-for="(item,index) in activeAnnouncements"
            :key="index"
            @mouseenter="hoverIndex = index"
            @mouseleave="hoverIndex = null"
            :class="{ 'hovered': hoverIndex === index }"
          >
            <h5>{{ item.title }}</h5>
            <p>{{ item.content }}</p>
            <small>{{ item.date }}</small>
          </div>
        </div>
      </div>

      <!-- 歷史活動 -->
      <div class="activity-column history">
        <div class="activity-header">
          <h3>歷史活動</h3>
        </div>
        <div class="activity-list">
          <div
            class="activity-card"
            v-for="(item,index) in pastAnnouncements"
            :key="index"
            @mouseenter="hoverIndex = index + 1000"
            @mouseleave="hoverIndex = null"
            :class="{ 'hovered': hoverIndex === index + 1000 }"
          >
            <h5>{{ item.title }}</h5>
            <p>{{ item.content }}</p>
            <small>{{ item.date }}</small>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Announcement",
  data() {
    return {
      hoverIndex: null,
      announcements: [
        { title: "活動1", content: "即日起開放報名", date: "2025-xx-xx", status: "active" },
        { title: "活動2", content: "mm/yy 晚間系統升級", date: "2025-xx-xx", status: "active" },
        { title: "活動3", content: "mm/yy 起開放報名", date: "2025-xx-xx", status: "active" },
        { title: "活動4", content: "mm/yy 開始", date: "2025-xx-xx", status: "active" },
        { title: "活動5", content: "已順利舉辦，感謝參與！", date: "2025-xx-xx", status: "past" },
        { title: "活動6", content: "活動已結束", date: "2025-xx-xx", status: "past" },
      ]
    }
  },
  computed: {
    activeAnnouncements() {
      return this.announcements.filter(a => a.status === "active");
    },
    pastAnnouncements() {
      return this.announcements.filter(a => a.status === "past");
    }
  }
}
</script>

<style scoped>
.activities-wrapper {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 框框樣式，背景改成 #FFE6FF */
.activity-header {
  background-color: #FFE6FF;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 
    0 4px 8px rgba(0,0,0,0.1),
    0 8px 16px rgba(0,0,0,0.1);
  margin-bottom: 12px;

  /* 新增：置中標題文字 */
  text-align: center;
}

/* 置中標題文字大小、粗細可選 */
.activity-header h3 {
  margin: 0;
  font-weight: 600;
}

/* 滾動列表 */
.announcement .activity-list {
  max-height: 500px; 
  overflow-y: auto;
  padding-right: 4px;
}
.history .activity-list {
  max-height: 250px; 
  overflow-y: auto;
  padding-right: 4px;
}

/* 活動卡片 */
.activity-card {
  background-color: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  margin-bottom: 12px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

/* 滑鼠懸停浮動效果 */
.activity-card.hovered {
  box-shadow: 0 10px 20px rgba(0,0,0,0.2),
              0 20px 40px rgba(0,0,0,0.15);
  transform: translateY(-3px);
}
</style>

