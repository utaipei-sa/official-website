<script setup>
import logoDark from "@/assets/img/UTlogo.png";
defineProps({
  brand: {
    type: Object,
    name: String,
    logo: String,
    route: "",
    default: () => ({
      name: "不藏私！資訊通通報你災!", //標題，可改
      logo: logoDark,
      route: "/"
    })
  },
  socials: {
    type: Array,
    icon: String,
    link: String,
    default: () => [
      {
        icon: '<i class="fab fa-facebook text-lg opacity-8"></i>',
        link: "https://www.facebook.com/CreativeTim/"
      },
      {
        icon: '<i class="fab fa-twitter text-lg opacity-8"></i>',
        link: "https://twitter.com/creativetim"
      },
      {
        icon: '<i class="fab fa-dribbble text-lg opacity-8"></i>',
        link: "https://dribbble.com/creativetim"
      },
      {
        icon: '<i class="fab fa-github text-lg opacity-8"></i>',
        link: "https://github.com/creativetimofficial"
      },
      {
        icon: '<i class="fab fa-youtube text-lg opacity-8"></i>',
        link: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w"
      }
    ]
  },
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
        name: "法規",
        items: [
          { name: "法規", href: "#" },
          { name: "會議記錄", href: "#" },
          { name: "預決算書", href: "#" },
          { name: "總務帳目", href: "#" },
          { name: "法規", href: "#" },
          { name: "會議記錄", href: "#" },
          { name: "預決算書", href: "#" },
          { name: "總務帳目", href: "#" }
        ]
      },
      {
        name: "會議記錄",
        items: [
          { name: "法規", href: "#" },
          { name: "會議記錄", href: "#" },
          { name: "預決算書", href: "#" },
          { name: "總務帳目", href: "#" }
        ]
      },
      {
        name: "預決算書",
        items: [
          { name: "114-1預算", href: "#" },
          { name: "113-2結算", href: "#" },
          { name: "113-2預算", href: "#" },
          { name: "113-1結算", href: "#" }
        ]
      },
      {
        name: "總務帳目",
        items: [
          { name: "114-1期初", href: "#" },
          { name: "113-2期末", href: "#" },
          { name: "113-2預初", href: "#" },
          { name: "113-1期末帳目表ㄚㄚㄚ", href: "#" }
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
              <a class="nav-link footer-link" :href="item.href" target="_blank">
                <span class="footer-text">{{ item.name }}</span>
                <span class="tooltip-text">{{ item.name }}</span>
              </a>
            </li>

          </ul>
        </div>

        <div class="col-12">
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
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  .footer-link {
  position: relative;
  display: inline-block;
  max-width: 100%;
  text-decoration: none;
}

.footer-text {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: bottom;
}

/* 螢幕 >= 768px → 限制 7 個字 */
@media (min-width: 768px) {
  .footer-text {
    max-width: 7em;
  }
}

/* 螢幕 <= 767px → 限制 9 個字 */
@media (max-width: 767px) {
  .footer-text {
    max-width: 9em;
  }
}

/* tooltip 內容（預設隱藏） */
.tooltip-text {
  visibility: hidden;
  opacity: 0;
  white-space: nowrap;
  background-color: #DA847F;
  color: #fff;
  text-align: center;
  padding: 4px 8px;
  border-radius: 4px;
  position: absolute;
  bottom: -28px; /* 在文字下方 */
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  font-size: 14px;
  transition: opacity 0.2s;
  pointer-events: none; /* 不影響滑鼠事件 */
}

/* tooltip 箭頭 */
.tooltip-text::after {
  content: "";
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent #F9E0DD transparent;
}

/* hover 時顯示 tooltip */
.footer-link:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

</style>