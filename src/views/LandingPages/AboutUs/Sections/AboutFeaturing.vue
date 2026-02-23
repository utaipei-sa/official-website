<script setup>
// image
import logo1 from "@/assets/img/logo1.png";
import logo1_2 from "@/assets/img/logo1_2.png";
import logo2 from "@/assets/img/logo2.png";
// example component
import CenteredBlogCard from "../../../../examples/cards/blogCards/CenteredBlogCard.vue";
</script>
<template>
  <section class="pt-4 pb-6" id="count-stats">
    <div class="container">
      <div class="row mt-4 mb-4">
        <h2 class="title-shift">素材專區</h2>
        <div
          class="row mt-6 align-items-stretch justify-content-center text-center"
        >
          <div class="col-md-3 mb-6">
            <CenteredBlogCard
              class="centered-card"
              :image="logo1"
              title="學生會 LOGO"
            />
          </div>
          <div class="col-md-3 mb-6">
            <CenteredBlogCard
              class="centered-card"
              :image="logo1_2"
              title="學生會 LOGO"
            />
          </div>
          <div class="col-md-3 mb-6">
            <CenteredBlogCard
              class="centered-card"
              :image="logo2"
              title="學生議會 LOGO"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.centered-card {
  max-width: 250px;
  margin: 0 auto;
}

.title-shift {
  margin-left: 10%; /* 可以改數值調整，20% 大概就是介於左邊跟中間 */
  /*text-shadow: 3px 3px 2px rgba(0, 0, 0, 0.3); /* X位移 Y位移 模糊程度 顏色 */
}

.row.mt-6.align-items-stretch.justify-content-center.text-center {
  justify-content: center; /* row 置中 */
}
</style>
