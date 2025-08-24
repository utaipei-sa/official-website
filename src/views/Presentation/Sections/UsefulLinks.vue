<template>
  <div style="padding:20px; background:#FFE6FF; border-radius:8px;">
    <h3 class="mb-3">常用連結</h3>
    <div class="d-flex flex-column gap-3">
      <div
        v-for="(link, index) in usefulLinks"
        :key="index"
        style="
          display:flex;
          align-items:center;
          background:white;
          padding:10px;
          border-radius:6px;
          box-shadow:0 2px 6px rgba(0,0,0,0.1);
        "
      >
        <div style="width:36px; height:36px; background:#FF79BC; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:18px; margin-right:12px;">
          🔗
        </div>
        <div>
          <a :href="link.url" target="_blank" style="font-weight:bold;  text-decoration:none;">
            {{ link.name }}
          </a>
          <div style="font-size:13px; color:#555;">{{ link.desc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  name: "UsefulLinks",
  data() {
    return {
      usefulLinks: [
        { name: "常用1", url: "https://school.example.com/example1", desc: "\t簡介1" },
        { name: "常用2", url: "https://school.example.com/example2", desc: "\t簡介2" },
        { name: "常用3", url: "https://school.example.com/example3", desc: "\t簡介3" },
      ],
    };
  },
};
</script>
