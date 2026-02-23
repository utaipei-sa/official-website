<script setup>
import { RouterLink , useRouter} from "vue-router";
import { ref, watch } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";

// images
import ArrDark from "@/assets/img/down-arrow-dark.svg";
import downArrow from "@/assets/img/down-arrow.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";
import NavbarImage from "@/assets/img/UTSAicon_NavbarImage.png";
const router = useRouter();

function scrollToIntro() {
  // 如果不在首頁，先跳回首頁
  if (router.currentRoute.value.name !== 'presentation') {
    router.push({ name: 'presentation' }).then(() => {
      // 等頁面渲染完再滾動
      setTimeout(() => {
        const el = document.getElementById("intro");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  } else {
    // 如果已在首頁，直接滾動
    const el = document.getElementById("intro");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}
const props = defineProps({
  action: {
    type: Object,
    route: String,
    color: String,
    label: String,
    default: () => ({

    })
  },
  transparent: {
    type: Boolean,
    default: false
  },
  light: {
    type: Boolean,
    default: false
  },
  dark: {
    type: Boolean,
    default: false
  },
  sticky: {
    type: Boolean,
    default: false
  },
  darkText: {
    type: Boolean,
    default: false
  }
});

// set arrow  color
function getArrowColor() {
  if (props.transparent && textDark.value) {
    return ArrDark;
  } else if (props.transparent) {
    return DownArrWhite;
  } else {
    return ArrDark;
  }
}

// set text color
const getTextColor = () => {
  let color;
  if (props.transparent && textDark.value) {
    color = "text-dark";
  } else if (props.transparent) {
    color = "text-white";
  } else {
    color = "text-dark";
  }

  return color;
};
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// set nav color on mobile && desktop

let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

if (type.value === "mobile") {
  textDark.value = true;
} else if (type.value === "desktop" && textDark.value == false) {
  textDark.value = false;
}

watch(
  () => type.value,
  (newValue) => {
    if (newValue === "mobile") {
      textDark.value = true;
    } else {
      textDark.value = false;
    }
  }
);
</script>
<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <RouterLink
        class="navbar-brand d-none d-md-block"
        :class="[
          (props.transparent && textDark.value) || !props.transparent
            ? 'text-dark font-weight-bolder ms-sm-3'
            : 'text-white font-weight-bolder ms-sm-3'
        ]"
        :to="{ name: 'presentation' }"
        @click="scrollToTop"
      >
      <img :src="NavbarImage" alt="學生會Logo" class="navbar-logo me-2" />
        臺北市立大學學生會
      </RouterLink>
      <RouterLink
        class="navbar-brand d-block d-md-none"
        :class="
          props.transparent || props.dark
            ? 'text-white'
            : 'font-weight-bolder ms-sm-3'
        "
        :to="{ name: 'presentation' }"
        @click="scrollToTop"
      >
      <img :src="NavbarImage" alt="學生會Logo" class="navbar-logo me-2" />
        北市大學生會
      </RouterLink>
      <button
        class="navbar-toggler shadow-none ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon mt-2">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div
        class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
        id="navigation"
      >
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuPages"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >dashboard</i
              >
              關於我們
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div class="dropdown-menu dropdown-menu-animation border-radius-xl mt-0 mt-lg-3"
              aria-labelledby="dropdownMenuPages"
            >
              <div class="row d-none d-lg-block">
                <div class="col-12 px-2 py-2">
                  <RouterLink
                    :to="{ name: 'about' }"
                    class="dropdown-item border-radius-md"
                    :class="getTextColor()"
                  >
                    <span>第十二屆學生會</span>
                  </RouterLink>
                </div>
              </div>

              <div class="d-lg-none">
                <RouterLink
                  :to="{ name: 'about' }"
                  class="dropdown-item border-radius-md"
                  :class="getTextColor()"
                >
                  <span>第十二屆學生會</span>
                </RouterLink>
              </div>
            </div>
          </li>       
          <li class="nav-item mx-2">
            <a
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              @click.prevent="scrollToIntro"
            >
              <i class="material-icons opacity-6 me-2 text-md" :class="getTextColor()">view_day</i>
              資訊公開
            </a>
          </li>

          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuDocs"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >article</i
              >
              活動行事曆
            </a>
           
          </li>
          
        </ul>
        <ul class="navbar-nav d-lg-block d-none">
          <li class="nav-item">
            <a
              :href="action.route"
              class="btn btn-sm mb-0"
              :class="action.color"
              onclick="smoothToPricing('pricing-soft-ui')"
              >{{ action.label }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>
<style scoped>
@media (max-width: 991.98px) {
  .navbar .dropdown-menu .d-lg-none {
    background-color: transparent !important;
    padding-left: 0 !important;
    margin-left: 25px !important;
  }
  .navbar .dropdown-menu .dropdown-item {
    background-color: transparent !important;
    text-align: left !important;
    color: inherit !important;
  }
  .navbar .dropdown-menu-animation.show {
    background-color: transparent !important;
    backdrop-filter: blur(8px); 
    height: auto !important; 
    padding: 0.25rem 0 !important; 
    overflow: hidden !important; 

 }
}
.navbar .dropdown-menu {
  background-color: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(8px); 
  border: none !important; 
  border-radius: 0 !important;
  box-shadow: none !important;
  padding: 0.3rem 0.6rem !important;
  width: fit-content !important;
  min-width: auto !important;
}
.navbar .dropdown-menu::before,
.navbar .dropdown-menu::after {
  display: none !important;
  content: none !important;
}
.navbar .dropdown-menu .row,
.navbar .dropdown-menu .col-12,
.navbar .dropdown-menu .position-relative {
  background-color: transparent !important;
}
.navbar .container-fluid {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar-brand {
  font-size: 1.4rem !important;
  font-weight: 700;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
}
.navbar-logo {
  height: 35px; /* 根據您的需求調整高度 */
  width: auto;
  vertical-align: middle;
}
.navbar .dropdown-item {
  padding: 0.1rem 0.1rem !important;
  font-size: 0.95rem;
  color: #333 !important;
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
  position: relative;
  overflow: hidden;
}
.navbar .dropdown-item.active,
.navbar .dropdown-menu .dropdown-item.router-link-active,
.navbar .dropdown-item.router-link-active {
  background-color: transparent !important; 
  color: #333 !important; 
  box-shadow: none !important;
}
.navbar .dropdown-item:hover,
.navbar .dropdown-item:focus {
  background-color: rgba(0, 0, 0, 0.1) !important; 
  color: #333 !important;
}
.navbar {
  position: fixed;
  top: 0;
  left: 50%;
  width:95% !important; 
  margin: 2px !important;
  transform: translateX(-50%);
  border-radius: 0 !important;
  background-color: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(8px);
  z-index: 1000;
  border-radius: 0.75rem !important; /* 添加圓角 */
}
.navbar-brand {
  font-size: 1.4rem !important; 
  font-weight: 700; 
  letter-spacing: 0.5px; 
}
.dropdown-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: #FFCBFF;
  transition: width 0.3s ease;
}
.dropdown-item {
  position: relative;
  color: #333 !important;
  background: none !important;
  overflow: hidden;
}
.dropdown-item:hover::after {
  width: 100%;
}
</style>