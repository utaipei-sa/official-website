import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "@/pages/Home/PresentationView.vue";
import AboutView from "@/pages/About/AboutView.vue";
import CalendarView from "@/pages/Activities/CalendarView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "presentation",
      component: PresentationView,
    },
    {
      path: "/activities/calendar",
      name: "activities-calendar",
      component: CalendarView,
    },
    {
      path: "/about-us",
      name: "about",
      component: AboutView,
    },
  ],
});

export default router;
