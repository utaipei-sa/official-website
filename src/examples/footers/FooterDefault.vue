<script setup>
import logoDark from "@/assets/img/logo.png";
defineProps({
  brand: {
    type: Object,
    name: String,
    logo: String,
    route: "",
    default: () => ({
      name: "臺北市立大學系學會",
      logo: logoDark,
      route: "/"
    })
  },
  // socials: {
  //   type: Array,
  //   icon: String,
  //   link: String,
  //   default: () => [
  //     {
  //       icon: '<i class="fab fa-facebook text-lg opacity-8"></i>',
  //       link: "https://www.facebook.com/CreativeTim/"
  //     },
  //     {
  //       icon: '<i class="fab fa-twitter text-lg opacity-8"></i>',
  //       link: "https://twitter.com/creativetim"
  //     },
  //     {
  //       icon: '<i class="fab fa-dribbble text-lg opacity-8"></i>',
  //       link: "https://dribbble.com/creativetim"
  //     },
  //     {
  //       icon: '<i class="fab fa-github text-lg opacity-8"></i>',
  //       link: "https://github.com/creativetimofficial"
  //     },
  //     {
  //       icon: '<i class="fab fa-youtube text-lg opacity-8"></i>',
  //       link: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w"
  //     }
  //   ]
  // },
  menus: {
    type: Array,
    name: String,
    items: {
      type: Array,
      name: String,
      href: String
    },
    default: () => [
      
      {
        name: "",
        items: [
          {
            name: "",
            // href: "utsa@go.utaipei.edu.tw"
          }
        ]
      },
      {
        name: "",
        items: [
          {
            name: "",
            // href: "utsa@go.utaipei.edu.tw"
          }
        ]
      },
      {
        name: "合作/申訴/聯絡，請來信",
        items: [
          {
            name: "📧 utsa@go.utaipei.edu.tw",
            // href: "utsa@go.utaipei.edu.tw"
          }
        ]
      },
      {
        name: "Follow Us",
        items: [
          {
            name: "Instagram",
            href: "https://www.instagram.com/utaipei_sa"
          },
          {
            name: "Facebook",
            href: "https://www.facebook.com/Utaipeisa2.0"
          }
        ]
      }
    ]
  }
});
</script>
<template>
  <footer class="footer pt-5 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-3 mb-4 ms-auto">
          <div>
            <a :href="brand.route">
              <img :src="brand.logo" class="mb-3 footer-logo" alt="main_logo" />
            </a>
            <h6 class="font-weight-bolder mb-4">{{ brand.name }}</h6>
          </div>
          <div>
            <ul class="d-flex flex-row ms-n3 nav">
              <li
                class="nav-item"
                v-for="{ icon, link } of socials"
                :key="link"
              >
                <a
                  class="nav-link pe-1"
                  :href="link"
                  target="_blank"
                  v-html="icon"
                >
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="col-md-2 col-sm-6 col-6 mb-4"
          v-for="{ name, items } of menus"
          :key="name"
        >
          <h6 class="text-sm">{{ name }}</h6>
          <ul class="flex-column ms-n3 nav">
            <li class="nav-item" v-for="item of items" :key="item.name">
              <a class="nav-link" :href="item.href" target="_blank">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- <div class="col-12">
          <div class="text-center">
            <p class="text-dark my-4 text-sm font-weight-normal">
              All rights reserved. Copyright ©
              {{ new Date().getFullYear() }}
              Material Kit by
              <a href="https://www.creative-tim.com" target="_blank"
                >Creative Tim</a
              >.
            </p>
          </div>
        </div> -->
      </div>
    </div>
  </footer>
</template>
