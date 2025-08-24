<script setup>
// example component
import HorizontalTeamCard from "@/examples/cards/teamCards/HorizontalTeamCard.vue";

// images
import UTSA_LiuEncheng from "@/assets/img/UTSA_LiuEncheng.jpg";
import UTSA_ChenYinhua from "@/assets/img/UTSA_ChenYinhua.jpg";
import UTSA_LaiHuanjin from "@/assets/img/UTSA_LaiHuanjin.jpg";
</script>

<template>
  <section class="pb-5 position-relative pink-theme mx-n3">
    <div class="container">
      <div class="row">
        <div class="col-md-8 text-start mb-5 mt-5">
          <h3 class="z-index-1 position-relative">👔 長級幹部</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4"
            :image="UTSA_LiuEncheng"
            :profile="{ name: '劉恩誠', link: 'javascript:;' }"
            :position="{ label: '學生會會長', color: 'success' }"
          />
        </div>
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-lg-4 mt-5"
            :image="UTSA_ChenYinhua"
            :profile="{ name: '陳胤華', link: 'javascript:;' }"
            :position="{ label: '學生會博愛校區副會長', color: 'success' }"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-lg-6 col-12">
          <HorizontalTeamCard
            class="mt-4 z-index-2"
            :image="UTSA_LaiHuanjin"
            :profile="{ name: '賴桓津', link: 'javascript:;' }"
            :position="{ label: '學生會天母校區副會長', color: 'success' }"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.pink-theme .team-card {
  background: #fff0f6; /* 淺粉背景 */
  border: 1px solid #f5a6c5; /* 粉紅邊框 */
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pink-theme .team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(251, 204, 223, 0.6);
}

.pink-theme .team-card h6 {
  color: #f77fb3 !important; /* 職位小標籤 */
}
</style>
