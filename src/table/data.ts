import { h } from "vue";
import { ArrowDownIcon } from "@radix-icons/vue";
import { ArrowRightIcon } from "@radix-icons/vue";
import { ArrowUpIcon } from "@radix-icons/vue";
import { CheckCircledIcon } from "@radix-icons/vue";
import { CircleIcon } from "@radix-icons/vue";
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
  {
    value: "STARTED",
    label: "Todo",
    icon: h(CircleIcon),
  },
  {
    value: "BEING",
    label: "In Progress",
    icon: h(StopwatchIcon),
  },
  {
    value: "COMPLETED",
    label: "Done",
    icon: h(CheckCircledIcon),
  },
];

export const priorities = [
  {
    label: "Low",
    value: "LOW",
    icon: h(ArrowDownIcon),
  },
  {
    label: "Medium",
    value: "MEDIUM",
    icon: h(ArrowRightIcon),
  },
  {
    label: "High",
    value: "HIGH",
    icon: h(ArrowUpIcon),
  },
];
