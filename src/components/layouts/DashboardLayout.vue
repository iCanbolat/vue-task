<template>
  <div class="flex text-sm font-semibold">
    <div class="group">
      <aside
        class="flex flex-col w-12 group-hover:w-24 transition-all ease-in-out justify-center items-center space-y-6 h-screen border-r"
      >
        <router-link
          to="/"
          class="flex-col justify-center cursor-pointer items-center"
        >
          <Home :size="18" class="m-auto" />
          <h5
            class="group-hover:flex hidden group-hover:transition-all opacity-0 group-hover:opacity-100"
          >
            Home
          </h5>
        </router-link>
        <router-link
          to="/about"
          class="flex-col justify-center cursor-pointer items-center"
        >
          <InfoIcon :size="18" class="m-auto" />
          <h5
            class="group-hover:flex hidden group-hover:transition-all opacity-0 group-hover:opacity-100"
          >
            About
          </h5>
        </router-link>
      </aside>
    </div>
    <main
      class="w-full justify-center flex items-center"
    >
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Home, InfoIcon } from "lucide-vue-next";

export default defineComponent({
  name: "DashboardLayout",
  components: {
    Home,
    InfoIcon,
  },
});
</script>
