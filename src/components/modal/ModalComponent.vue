<script setup lang="ts">
import { useStore } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { computed } from "vue";
import Badge from "../ui/badge/Badge.vue";
import { TodoPriority } from "../../types";
import { Button } from "../ui/button";
import {
  getPriorityClassname,
  getStatusClassname,
  formatString,
} from "../../utils";
import {
  CheckCircledIcon,
  Pencil2Icon,
} from "@radix-icons/vue";
import { ref } from "vue";
import FormTodo from "./FormTodo.vue";

const store = useStore();
const isEdit = ref(false);

const todo = computed(
  () => store.getters.getTodo
);
const open = computed(
  () => store.getters.dialogState
);

const handleOnChange = () => {
  store.commit("setDialog", null);
  isEdit.value = false;
};

const toggleEdit = () => {
  isEdit.value = !isEdit.value;
};

console.log(todo.value);
</script>

<template>
  <Dialog
    @update:open="handleOnChange"
    :open="open"
  >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{
          todo?.title ?? "Add Task"
        }}</DialogTitle>
      </DialogHeader>

      <div
        v-show="todo !== null"
        class="flex flex-row space-x-3"
      >
        <Badge
          :variant="todo && getPriorityClassname(todo?.priority as TodoPriority)"
          >{{
            todo &&
            "Priority: " +
              formatString(todo.priority)
          }}</Badge
        >
        <Badge
          :variant="
            todo &&
            getStatusClassname(todo?.status)
          "
          >{{
            todo &&
            "Status: " + formatString(todo.status)
          }}</Badge
        >
      </div>

      <DialogDescription v-if="isEdit">
        <FormTodo
          :todo="todo"
          :toggleEdit="toggleEdit"
        />
      </DialogDescription>

      <DialogDescription
        v-else-if="!isEdit && todo"
      >
        Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Aliquam elementum orci
        tellus, id viverra nisi aliquam sed.
      </DialogDescription>

      <DialogDescription v-else="!todo">
        <FormTodo
          :todo="todo"
          :toggleEdit="toggleEdit"
        />
      </DialogDescription>

      <DialogFooter v-show="!isEdit && todo">
        <Button
          :onclick="() => toggleEdit()"
          size="sm"
        >
          <Pencil2Icon class="mr-1" />
          Edit
        </Button>
        <Button
          size="sm"
          class="bg-green-600 hover:bg-green-600/80"
        >
          <CheckCircledIcon class="mr-1 mt-0.5" />
          Check Done
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
