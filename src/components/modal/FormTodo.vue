<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { SymbolIcon } from "@radix-icons/vue";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Task,
  TodoPriority,
  TodoStatus,
} from "@/types";
import { useToast } from "@/components/ui/toast/use-toast";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";

const { toast } = useToast();

const props = defineProps<{
  toggleEdit: () => void;
  todo: Task | null;
  isEdit: boolean;
}>();

console.log(props.todo);

const formEditSchema = toTypedSchema(
  z.object({
    id: z.number(),
    title: z
      .string({
        required_error: "Provide a title",
      })
      .max(50, "Maximum 50 char"),
    content: z
      .string({
        required_error: "Provide a description",
      })
      .max(90, "Maximum 90 char"),
    priority: z.nativeEnum(TodoPriority),
    isComplete: z.nativeEnum(TodoStatus),
  })
);

const form = useForm({
  validationSchema: formEditSchema,
  initialValues: {
    title: props.todo?.title,
    priority: props.todo?.priority,
    isComplete:
      props.todo?.isComplete ?? TodoStatus.TODO,
    content: props.todo?.content,
    id: props.todo?.id ?? 0,
  },
});

const store = useStore();

const onSubmit = form.handleSubmit((values) => {
  console.log("Form submitted!", values);
  if (props.isEdit) {
    store.dispatch("updateTask", values);
    return;
  }
  //@ts-ignore
  store.dispatch("addTask", values);
  toast({
    title: "Task Created!",
    class: "bg-green-600 text-white",
    duration: 2000,
  });
});
</script>

<template>
  <form
    @submit="onSubmit"
    class="space-y-4 text-primary"
  >
    <FormField
      v-slot="{ componentField }"
      name="title"
    >
      <FormItem>
        <FormLabel>Task Title</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Fix prod conflicts"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ componentField }"
      name="content"
    >
      <FormItem>
        <FormLabel>Task Description</FormLabel>
        <FormControl>
          <Textarea
            type="text"
            placeholder="Fix prod conflicts"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="priority"
    >
      <FormItem>
        <FormLabel>Task Priority</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue
                placeholder="Select task priority"
              />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="HIGH">
                High
              </SelectItem>
              <SelectItem value="MEDIUM">
                Medium
              </SelectItem>
              <SelectItem value="LOW">
                Low
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="isComplete"
    >
      <FormItem>
        <FormLabel>Status</FormLabel>
        <Select
          v-bind="componentField"
          default-value="in progress"
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue
                placeholder="Select task status"
              />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="COMPLETED">
                Done
              </SelectItem>
              <SelectItem value="BEING">
                In Progress
              </SelectItem>
              <SelectItem value="STARTED">
                Todo
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <div
      :class="
        cn(
          'flex justify-center',
          todo && 'space-x-5'
        )
      "
    >
      <Button
        size="sm"
        v-show="todo"
        @click="props.toggleEdit"
        type="button"
      >
        Cancel
      </Button>
      <Button
        class="bg-green-600"
        size="sm"
        type="submit"
        :disabled="form.isSubmitting.value"
      >
        <SymbolIcon
          v-show="form.isSubmitting.value"
          class="w-4 h-4 mr-2 animate-spin"
        />
        Submit
      </Button>
    </div>
  </form>
</template>
