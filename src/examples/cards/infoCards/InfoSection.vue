<script setup>
import InfoCard from "./InfoCard.vue";

const row1 = [
  
  {
    title: "法規",
    description: "連到 github",
    icon: "gavel",
    link: "https://github.com/xxx",
  },
  {
    title: "學生議會",
    description: "會議紀錄/資料",
    icon: "groups",
    link: "#",
  },
  
];

const row2 = [
  {
    title: "會費相關",
    description: "收費與用途",
    icon: "paid",
    link: "#",
  },
  {
    title: "預決算書",
    description: "財務透明",
    icon: "article",
    link: "#",  // 直接放檔案連結
  },
  {
    title: "收支公告",
    description: "每月收支明細",
    icon: "receipt_long",
    link: "#",  // 直接放檔案連結
  },
];
</script>

<template>
  <div class="space-y-8">
    <!-- 區塊標題 -->
    <h2 class="text-xl font-bold text-center">資訊公開</h2>

    <!-- 所有卡片用同一個 grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <InfoCard
        v-for="(item, idx) in [...row1, ...row2]"
        :key="idx"
        v-bind="item"
      />
    </div>
  </div>
</template>
