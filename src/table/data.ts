import { h } from "vue";
import { ArrowDownIcon } from "@radix-icons/vue";
import { ArrowRightIcon } from "@radix-icons/vue";
import { ArrowUpIcon } from "@radix-icons/vue";
import { CheckCircledIcon } from "@radix-icons/vue";
import { CircleIcon } from "@radix-icons/vue";
import { CrossCircledIcon } from "@radix-icons/vue";
import { QuestionMarkCircledIcon } from "@radix-icons/vue";
import { StopwatchIcon } from "@radix-icons/vue";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  // {
  //   value: "backlog",
  //   label: "Backlog",
  //   icon: h(QuestionMarkCircledIcon),
  // },
  {
    value: "todo",
    label: "Todo",
    icon: h(CircleIcon),
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: h(StopwatchIcon),
  },
  {
    value: "done",
    label: "Done",
    icon: h(CheckCircledIcon),
  },
  // {
  //   value: "canceled",
  //   label: "Canceled",
  //   icon: h(CrossCircledIcon),
  // },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: h(ArrowDownIcon),
  },
  {
    label: "Medium",
    value: "medium",
    icon: h(ArrowRightIcon),
  },
  {
    label: "High",
    value: "high",
    icon: h(ArrowUpIcon),
  },
];
