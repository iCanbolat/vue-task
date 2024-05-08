import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";

import {
  priorities,
  statuses,
} from "../data";
import DataTableColumnHeader from "./DataTableColumnHeader.vue";
// import Checkbox from "@/components/ui/checkbox/Checkbox.vue";
import { Task } from "@/types";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: "Task",
      }),
    cell: ({ row }) =>
      h(
        "div",
        { class: "w-20" },
        row.getValue("id")
      ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: "Title",
      }),

    cell: ({ row }) => {
      // const label = labels.find(
      //   (label) =>
      //     label.value === row.original.label
      // );

      return h(
        "div",
        { class: "flex space-x-2" },
        [
          h(
            "span",
            {
              class:
                "max-w-[500px] truncate font-medium",
            },
            row.getValue("title")
          ),
        ]
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: "Status",
      }),

    cell: ({ row }) => {
      const status = statuses.find(
        (status) =>
          status.value === row.original.isComplete
      );

      if (!status) return null;

      return h(
        "div",
        { class: "flex w-[100px] items-center" },
        [
          status.icon &&
            h(status.icon, {
              class:
                "mr-2 h-4 w-4 text-muted-foreground",
            }),
          h("span", status.label),
        ]
      );
    },
    filterFn: (row, id, value) => {
      console.log(row.original.isComplete);
      console.log("val", value);
      return value.includes(
        row.original.isComplete
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: "Priority",
      }),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) =>
          priority.value ===
          row.getValue("priority")
      );

      if (!priority) return null;

      return h(
        "div",
        { class: "flex items-center" },
        [
          priority.icon &&
            h(priority.icon, {
              class:
                "mr-2 h-4 w-4 text-muted-foreground",
            }),
          h("span", {}, priority.label),
        ]
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) =>
  //     h(DataTableRowActions, { row }),
  // },
];
