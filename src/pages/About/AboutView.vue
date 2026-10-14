<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import AppLayout from "@/components/layout/AppLayout.vue";

//image
import bg0 from "@/assets/images/sportField.jpg";

//dep
import Typed from "typed.js";

//sections
import Information from "@/pages/About/Sections/AboutInformation.vue";
import Information_13th from "@/pages/About/Sections/AboutInformation_13th.vue";
import Featuring from "@/pages/About/Sections/AboutFeaturing.vue";
import Featuring_13th from "@/pages/About/Sections/AboutFeaturing_13th.vue";

const route = useRoute();
const body = document.getElementsByTagName("body")[0];
const term = ref("13"); // 預設為 13
let typed;

//hooks
onMounted(() => {
  body.classList.add("about-us");
  body.classList.add("bg-gray-200");

  if (document.getElementById("typed")) {
    typed = new Typed("#typed", {
      stringsElement: "#typed-strings",
      typeSpeed: 250,
      backSpeed: 200,
      backDelay: 350,
      startDelay: 500,
      loop: true,
    });
  }

  term.value = route.query.term || "13"; // 初始化 term 的值，若沒有 query 則預設為 13
});

onUnmounted(() => {
  typed?.destroy();
  body.classList.remove("about-us");
  body.classList.remove("bg-gray-200");
});

watch(
  () => route.query.term,
  (newVal) => {
    term.value = newVal;
  }
);
</script>

<template>
  <AppLayout>
    <template #header>
      <header class="bg-gradient-dark">
        <div
          class="page-header min-vh-75"
          :style="{ backgroundImage: `url(${bg0})` }"
        >
          <span class="mask bg-gradient-dark opacity-6"></span>
          <div class="container w-100">
            <div class="row justify-content-center">
              <div class="col-lg-8 text-center mx-auto my-auto">
                <h1 class="text-white">
                  臺北市立大學<span class="text-white" id="typed"></span>
                </h1>
                <div id="typed-strings">
                  <span>學生會</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </template>

    <template #default>
      <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6 about-content">
        <Information_13th v-if="term === '13'" />
        <Information v-else-if="term === '12'" />
        <!--<AboutTeam />-->
        <Featuring_13th v-if="term === '13'" />
        <Featuring v-else-if="term === '12'" />
      </div>
    </template>
  </AppLayout>
</template>

<style scoped>
@media (max-width: 600px) {
  .about-content {
    margin-right: 0 !important;
    margin-left: 0 !important;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
  }
}
</style>
