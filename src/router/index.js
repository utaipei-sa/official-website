import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "../views/Presentation/PresentationView.vue";
import AboutView from "../views/LandingPages/AboutUs/AboutView.vue";
import CalendarView from "../views/Activities/CalendarView.vue";

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
