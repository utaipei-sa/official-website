import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "@/pages/Home/PresentationView.vue";
import AboutView from "@/pages/About/AboutView.vue";
import CalendarView from "@/pages/Activities/CalendarView.vue";
import ContentDetailView from "@/pages/Content/ContentDetailView.vue";

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
    {
      path: "/content/:type/:id",
      name: "content-detail",
      component: ContentDetailView,
    },
  ],
});

export default router;
