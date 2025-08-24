<script setup>
import { onMounted, onUnmounted } from "vue";

//example components
import NavbarDefault from "../..//examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../../examples/footers/FooterDefault.vue";
import Header from "../../examples/Header.vue";
import FilledInfoCard from "../../examples/cards/infoCards/FilledInfoCard.vue";


// sections
import Announcement from "./Sections/Announcement.vue";


//images
import vueMkHeader from "@/assets/img/banner.jpg";
import UsefulLinks from "./Sections/UsefulLinks.vue";

//hooks
const body = document.getElementsByTagName("body")[0];
onMounted(() => {
  body.classList.add("presentation-page");
  body.classList.add("bg-gray-200");
});
onUnmounted(() => {
  body.classList.remove("presentation-page");
  body.classList.remove("bg-gray-200");
});

</script>

<template>
  <!-- <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" />
      </div>
    </div>
  </div> -->
  <Header>
    <div
      class="page-header min-vh-75"
      :style="`
        background: 
          linear-gradient(rgba(255,255,255,0.6), rgba(255,192,203,0.55)), 
          url(${vueMkHeader});
        background-size: cover;
        background-position: center;
      `"
      loading="lazy"
    >
    <!-- :style="{ backgroundColor: '#e3f2fd' }" -->
      <div class="container">
        <div class="row">
          <div class="col-lg-7 text-center mx-auto position-relative">
            <h1
              class="text-black pt-3 mt-n5 me-2"
              :style="{ display: 'inline-black ' }"
            >
              臺北市立大學學生會
            </h1>
            <p class="lead text-gray px-5 mt-3" :style="{ fontWeight: '500' }">
              我們是一群熱心的學生組成的組織 ❤️<br>為學生謀福利、為學生顧權益 💪
            </p>
          </div>
        </div>
      </div>
    </div>
  </Header>

  <div class="card custom-shadow mx-5 mx-md-7 mt-n6">
    <div class="container mt-5">
      <div class="row">
        <div class="col-12">
          <Announcement />
        </div>
      </div>
    
      <hr class="my-4" />
    
      <div class="row" >
        <div class="col-12" >
            <UsefulLinks />
        </div>
      </div>
    </div>

    <!-- <div class="container">
      <div class="row">
        <div class="d-flex flex-column w-100 text-center p-5 mb-8">
          <h3>聯絡方式</h3>
          <div class="d-flex justify-content-center mt-3 flex-wrap">
            <a
              href="https://www.instagram.com/utaipei_sa"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Instagram"
            >
              <img
                src="@/assets/img/logos/IG.jpg"
                alt="Instagram"
                loading="lazy"
                style="height: 40px; width: 40px;"
              />
            </a>
            <a
              class="opacity-5 ms-3"
              href="#"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Coming Soon"
            >
              <img
                :src="logoTailwind"
                alt="title"
                loading="lazy"
                :style="{ height: '90px' }"
              />
            </a>
            <a
              href="https://www.creative-tim.com/product/vue-material-kit-pro"
              class="mx-3"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Vue.js - Is a Progressive JavaScript Framework"
            >
              <img
                :src="logoVue"
                alt="title"
                loading="lazy"
                :style="{ height: '90px' }"
              />
            </a>
            <a
              class="opacity-5"
              href="#"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Coming Soon"
            >
              <img
                :src="logoAngular"
                alt="title"
                loading="lazy"
                :style="{ height: '90px' }"
              />
            </a>
            <a
              href="https://www.creative-tim.com/product/material-kit-react-pro"
              class="mx-3"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="React – A JavaScript library for building user interfaces"
            >
              <img
                :src="logoReact"
                alt="title"
                loading="lazy"
                :style="{ height: '90px' }"
              />
            </a>
            <a
              class="opacity-5"
              href="#"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Coming Soon"
            >
              <img
                :src="logoSketch"
                alt="title"
                loading="lazy"
                :style="{ height: '90px' }"
              />
            </a>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-5 ms-auto">
            <h4 class="mb-1">Thank you for your support!</h4>
            <p class="lead mb-0">We deliver the best web products</p>
          </div>
          <div class="col-lg-5 me-lg-auto my-lg-auto text-lg-end mt-5">
            <MaterialSocialButton
              route="https://twitter.com/intent/tweet?text=Check%20Material%20Design%20System%20made%20by%20%40CreativeTim%20%23webdesign%20%23designsystem%20%23bootstrap5&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fmaterial-design-system-pro"
              component="twitter"
              color="twitter"
              label="Tweet"
            />
            <MaterialSocialButton
              route="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-design-system-pro"
              component="facebook-square"
              color="facebook"
              label="Share"
            />
            <MaterialSocialButton
              route=""
              component="pinterest"
              color="pinterest"
              label="Pin it"
            />
          </div>
        </div>
      </div>
    </div> -->
  </div>
  <DefaultFooter />
</template>
<style scoped>
.custom-shadow {
  /* 多層疊加陰影 */
  padding: 2rem;
  box-shadow: 
    0 10px 15px rgba(0, 0, 0, 0.2),
    0 20px 40px rgba(0, 0, 0, 0.3);

  /* 保留模糊背景效果 */
  backdrop-filter: blur(10px);
  
  /* 可選：圓角讓卡片更柔和 */
  border-radius: 16px;
}
</style>