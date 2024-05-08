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
import {
  TodoPriority,
  TodoStatus,
} from "../../types";
import { Button } from "../ui/button";
import {
  getPriorityClassname,
  getStatusClassname,
  formatString,
} from "../../utils";
import {
  CheckCircledIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-icons/vue";
import { ref } from "vue";
import FormTodo from "./FormTodo.vue";
import { useToast } from "../ui/toast";

const store = useStore();
const { toast } = useToast();
const isEdit = ref(false);

const todo = computed(
  () => store.getters.getTask
);
const open = computed(
  () => store.getters.isDialogOpen
);

const handleOnChange = () => {
  store.commit("setDialog", null);
  isEdit.value = false;
};

const toggleEdit = () => {
  isEdit.value = !isEdit.value;
};

const deleteTask = async (taskId: number) => {
  const id = await store.dispatch(
    "deleteTask",
    taskId
  );

  toast({
    title: "Task deleted id: " + id,
    class: "bg-green-600 text-white",
    duration: 2000,
  });
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
            getStatusClassname(todo?.isComplete)
          "
          >{{
            todo &&
            "Status: " +
              formatString(todo.isComplete)
          }}</Badge
        >
      </div>

      <DialogDescription v-if="isEdit">
        <FormTodo
          :todo="todo"
          :toggleEdit="toggleEdit"
          :isEdit="isEdit"
        />
      </DialogDescription>

      <DialogDescription
        v-else-if="!isEdit && todo"
      >
        {{ todo.content }}
      </DialogDescription>

      <DialogDescription v-else="!todo">
        <FormTodo
          :todo="todo"
          :toggleEdit="toggleEdit"
          :isEdit="isEdit"
        />
      </DialogDescription>

      <DialogFooter v-show="!isEdit && todo">
        <div class="grow">
          <Button
            :onclick="
              () => deleteTask(todo?.id ?? 0)
            "
            size="icon"
            variant="destructive"
          >
            <TrashIcon class="w-full h-4" />
          </Button>
        </div>
        <Button
          :onclick="() => toggleEdit()"
          size="sm"
        >
          <Pencil2Icon class="mr-1" />
          Edit
        </Button>
        <Button
          size="sm"
          v-show="todo !== null"
          class="bg-green-600 hover:bg-green-600/80"
          :onclick="
            () => {
              todo?.isComplete ===
                TodoStatus.DONE;
              store.dispatch('updateTask', todo);
            }
          "
        >
          <CheckCircledIcon class="mr-1 mt-0.5" />
          Check Done
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
