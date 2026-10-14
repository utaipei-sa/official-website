<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from 'vue-router';

//example components
import NavbarDefault from "@/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "@/examples/footers/FooterDefault.vue";

//image
import bg0 from "@/assets/img/sportField.jpg";

//dep
import Typed from "typed.js";

//sections
import Information from "./Sections/AboutInformation.vue";
import Information_13th from "./Sections/AboutInformation_13th.vue";
//import AboutTeam from "./Sections/AboutTeam.vue";
import Featuring from "./Sections/AboutFeaturing.vue";
import Featuring_13th from "./Sections/AboutFeaturing_13th.vue";
//import Newsletter from "./Sections/AboutNewsletter.vue";

const route = useRoute();
const body = document.getElementsByTagName("body")[0];
const term = ref("13"); // 預設為 13

//hooks
onMounted(() => {
  body.classList.add("about-us");
  body.classList.add("bg-gray-200");

  if (document.getElementById("typed")) {
    // eslint-disable-next-line no-unused-vars
    var typed = new Typed("#typed", {
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
  body.classList.remove("about-us");
  body.classList.remove("bg-gray-200");
});

watch(
  () => route.query.term,
  (newVal, oldVal) => {
    //console.log('term 改變為:', newVal);
    term.value = newVal;
  }
);
</script>
<template>
  <div
    class="container position-fixed z-index-sticky"
    style="
      top: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 100%;
    "
  >
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="false" />
      </div>
    </div>
  </div>

  <header class="bg-gradient-dark">
    <div
      class="page-header min-vh-75"
      :style="{ backgroundImage: `url(${bg0})` }"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container w-100">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center mx-auto my-auto">
            <h1 class="text-white">臺北市立大學<span class="text-white" id="typed"></span></h1>
            <div id="typed-strings">
              <span>學生會</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div class="card card-body shadow-xl mx-3 mx-md-4 mt-n6">
    <Information_13th v-if="term === '13'" />
    <Information v-else-if="term === '12'" />
    <!--<AboutTeam />-->
    <Featuring_13th v-if="term === '13'" />
    <Featuring v-else-if="term === '12'" />
  </div>
  <DefaultFooter />
</template>
