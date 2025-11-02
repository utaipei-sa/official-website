<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  icon: {
    type: [String, Object],
    default: "",
  },
  image: {
    type: Object,
    default: null,
  },
  title: {
    type: [String, Object],
    required: true,
  },
  description: {
    type: [String, Object],
    default: "",
  },
  link: {
    type: String,
    default: "#",
  },
});

const router = useRouter();

function handleClick() {
  if (!props.link) return;

  if (props.link.startsWith("http")) {
    window.open(props.link, "_blank");
  } else {
    try {
      router.push(props.link);
    } catch (e) {
      console.warn("無法跳轉：", e);
    }
  }
}
</script>

<template>
  <a href="#" role="button" @click.prevent="handleClick" class="block no-underline">
    <div
      class="info bg-white border border-gray-200 p-6 rounded-xl shadow-sm 
             hover:shadow-md hover:-translate-y-1 transition-all duration-200"
    >
      <!-- Icon -->
      <i
        v-if="icon"
        class="material-icons"
        :class="`${
          typeof icon == 'object'
            ? `text-${icon.color} text-${icon.size}`
            : 'text-pink-500 text-4xl'
        }`"
      >
        {{ typeof icon == 'object' ? icon.component : icon }}
      </i>

      <!-- Image -->
      <img
        v-if="image"
        :src="image.src"
        :class="image.class || 'w-12 h-12 mb-2'"
      />

      <!-- Title：單行自動縮小 -->
      <h5 
        class="font-bold mt-3 text-gray-800 title-text"
      >
        {{ typeof title == 'string' ? title : title.text }}
      </h5>

      <!-- Description：可換行 -->
      <p 
        class="mt-1 text-gray-600 description-text"
      >
        {{ typeof description == 'string' ? description : description.text }}
      </p>
    </div>
  </a>
</template>

<style scoped>
/* === 🔠 標題：自動縮小、不換行、不出框 === */
.title-text {
  display: block;
  white-space: nowrap;
  font-weight: 700;
  text-align: center;
  width: 100%;
  font-size: clamp(14px, 2vw, 20px);
  /* transform-origin: center; */
  overflow: hidden;
  text-overflow: ellipsis;

}

/* 利用字體縮放動態適應：當容器太小時自動縮小 */
@supports (text-wrap: balance) {
  /* 若瀏覽器支援 text-wrap，可以更平衡字體縮放 */
  .title-text {
    text-wrap: balance;
  }
}

/* === 描述文字：與標題同大小，可換行 === */
.description-text {
  font-size: clamp(14px, 2vw, 20px);
  line-height: 1.5;
  white-space: normal;
  overflow-wrap: break-word;
  text-align: center;
}

/* hover 動畫 */
.info {
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

}

@media (hover: hover) {
  .info:hover {
    /* transform: translateY(-4px); */
    transform: translateY(-6px);
    /* box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); */
    box-shadow: 0 10px 20px rgba(0, 61, 121, 0.15);
  
  }
}
@media (max-width: 600px) {
  .title-text {
    white-space: normal;
    text-overflow: clip;
    line-height: 1.3;
  }
}

</style>
