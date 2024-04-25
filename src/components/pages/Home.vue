<template>
  <div
    class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex"
  >
    <div
      class="flex items-center justify-between space-y-2"
    >
      <div>
        <h2
          class="text-2xl font-bold tracking-tight"
        >
          Welcome back!
        </h2>
        <p class="text-muted-foreground">
          Here&apos;s a list of your tasks for
          this month!
        </p>
      </div>
    </div>
    <DataTable :data="tasks" :columns="columns" />
  </div>
  <Toaster />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { columns } from "../../table/components/columns";
import tasks from "../../table/tasks.json";
import DataTable from "@/table/components/DataTable.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";

console.log(tasks);

export default defineComponent({
  name: "Home",
  components: {
    DataTable,
    Toaster,
  },
  setup() {
    return {
      tasks,
      columns,
    };
  },
});
</script>
