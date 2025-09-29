<script setup>
import { useRouter } from "vue-router";
defineProps({
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
  /*col: {
    type: String,
    default: "col-md-4 col-sm-6 col-12",
  },*/
});

const router = useRouter();

function handleClick() {
  if (!props.link) return;

  // 外部連結
  if (props.link.startsWith("http")) {
    window.open(props.link, "_blank");
  } 
  // 內部路由
  else {
    router.push(props.link);
  }
}
</script>

<template>
    <a
      :href="link"
      target="_blank"
      class="block no-underline"
    >
      <div
        class="info bg-white border border-gray-200 p-6 rounded-xl shadow-sm 
               hover:shadow-md hover:-translate-y-1 transition-all duration-200"
      >
        <!-- icon -->
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

        <!-- image -->
        <img
          v-if="image"
          :src="image.component"
          :class="image.class || 'w-12 h-12 mb-2'"
        />

        <!-- title -->
        <h5 class="font-bold mt-3 text-lg text-gray-800">
          {{ typeof title == 'string' ? title : title.text }}
        </h5>

        <!-- description -->
        <p class="text-sm text-gray-600 mt-1">
          {{ typeof description == 'string' ? description : description.text }}
        </p>
      </div>
    </a>

</template>
