import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import Home from "@/components/pages/Home.vue";
import About from "@/components/pages/About.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: DashboardLayout,
    children: [
      { path: "", component: Home },
      { path: "about", component: About },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
