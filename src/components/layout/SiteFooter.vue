<script setup>
import logoDark from "@/assets/images/13th/logo_text_nobg.png";
import logoWhite from "@/assets/images/12th/logo2_nobg.png";
defineProps({
  brands: {
    type: Array,
    name: String,
    logo: String,
    route: "",
    default: () => [
      {
        name: "臺北市立大學學生會",
        en: "UTSA 13th",
        logo: logoDark,
        route: "/",
      },
      {
        name: "臺北市立大學學生議會",
        en: "UTSP 13th",
        logo: logoWhite,
        route: "/",
      },
    ],
  },
  menus: {
    type: Array,
    name: String,
    items: {
      type: Array,
      name: String,
      href: String,
    },
    default: () => [
      /*{
        name: "",
        items: [
          {
            name: "",
            // href: "utsa@go.utaipei.edu.tw"
          },
        ],
      },
      {
        name: "",
        items: [
          {
            name: "",
            // href: "utsa@go.utaipei.edu.tw"
          },
        ],
      },*/
      {
        name: "會辦位置",
        items: [
          {
            name: "博愛校區：勤樸樓CB120",
            // href: "utsa@go.utaipei.edu.tw"
          },
          {
            name: "天母校區：鴻坦樓B411",
            // href: "utsa@go.utaipei.edu.tw"
          },
        ],
      },
      {
        name: "聯絡我們",
        items: [
          {
            name: "Mail : utsa@go.utaipei.edu.tw",
            href: "mailto:utsa@go.utaipei.edu.tw",
          },
          {
            name: "IG : @utaipei_sa",
            href: "https://www.instagram.com/utaipei_sa/",
          },
          {
            name: "FB : @Utaipeisa2.0",
            href: "https://www.facebook.com/Utaipeisa2.0/",
          },
        ],
      },
    ],
  },
});
</script>
<template>
  <footer class="footer pt-5 mt-5">
    <div class="container">
      <div class="row">
        <div
          class="col-xl-3 col-md-6 col-12 mb-4"
          v-for="brand in brands"
          :key="brand.name"
        >
          <img :src="brand.logo" class="mb-2 footer-logo" alt="main_logo" />

          <h6 class="font-weight-bolder mb-1">{{ brand.name }}</h6>
          <p class="text-sm">{{ brand.en }}</p>
        </div>

        <div
          class="col-xl-3 col-md-6 col-12 mb-4"
          v-for="{ name, items } of menus"
          :key="name"
        >
          <h6 class="text-sm">{{ name }}</h6>
          <ul class="flex-column ms-n3 nav">
            <li class="nav-item" v-for="item of items" :key="item.name">
              <a class="nav-link text-nowrap" :href="item.href" target="_blank">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>
.footer-logo {
  width: 80px !important; /* 你可以改成想要的大小 */
  height: auto !important;
  max-width: none !important;
  object-fit: contain; /* 確保圖片不被壓縮 */
  display: block;
}

@media (max-width: 767.98px) {
  .footer .container {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }

  .footer .row {
    justify-content: center;
    text-align: center;
  }

  .footer .col-12 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer .nav {
    align-items: center;
    margin-left: 0;
  }

  .footer .nav-link {
    white-space: normal !important;
  }
}
</style>
