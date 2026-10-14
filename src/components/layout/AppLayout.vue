<template>
  <div>
    <!-- Fixed navbar container -->
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
          <SiteNavbar :sticky="false" />
        </div>
      </div>
    </div>

    <!-- Slot for header -->
    <slot name="header" />

    <!-- Slot for main content -->
    <slot name="default" />

    <!-- Default footer -->
    <SiteFooter />
  </div>
</template>

<script setup>
import SiteFooter from "@/components/layout/SiteFooter.vue";
import SiteNavbar from "@/components/layout/SiteNavbar.vue";
</script>
