<script setup lang="ts">
import type { Table } from "@tanstack/vue-table";
import { computed } from "vue";

import { priorities, statuses } from "../data";
import DataTableFacetedFilter from "./DataTableFacetedFilter.vue";
import {
  Cross2Icon,
  PlusCircledIcon,
} from "@radix-icons/vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store";
import { Task } from "@/types";

interface DataTableToolbarProps {
  table: Table<Task>;
}

const props =
  defineProps<DataTableToolbarProps>();

const isFiltered = computed(
  () =>
    props.table.getState().columnFilters.length >
    0
);

const store = useStore();

function openDialog() {
  store.commit("setDialog", null);
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div
      class="flex flex-1 items-center space-x-2"
    >
      <Input
        placeholder="Filter tasks..."
        :model-value="(table.getColumn('title')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="
          table
            .getColumn('title')
            ?.setFilterValue($event.target.value)
        "
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :options="statuses"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('priority')"
        :column="table.getColumn('priority')"
        title="Priority"
        :options="priorities"
      />

      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <Cross2Icon class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <Button
      variant="outline"
      size="sm"
      class="h-8 px-2 lg:px-3"
      @click="openDialog()"
    >
      <PlusCircledIcon class="mr-2 h-4 w-4" />

      Add Task
    </Button>
  </div>
</template>
