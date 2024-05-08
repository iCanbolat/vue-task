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
    <DataTable
      :data="realTasks"
      :columns="columns"
    />
  </div>
  <Toaster />
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { columns } from "../../table/components/columns";
import DataTable from "@/table/components/DataTable.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useStore } from "@/store";
import { Task } from "@/types";
// import { TodoPriority } from "@/types";

const store = useStore();

const fetchTodos = () => {
  store.dispatch("getTasks", {});
};

const realTasks = ref<Task[]>([]);

onMounted(fetchTodos);

watchEffect(() => {
  const currentTasks = store.getters.taskList;
  realTasks.value = currentTasks;
});
</script>
