<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
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
import { TestTodo } from "@/types";
import { useToast } from "@/components/ui/toast/use-toast";
import { h } from "vue";
import { cn } from "@/lib/utils";

const { toast } = useToast();

const props = defineProps<{
  toggleEdit: () => void;
  todo: TestTodo | null;
}>();

const formEditSchema = toTypedSchema(
  z.object({
    title: z
      .string({
        required_error: "Provide a title",
      })
      .min(2, "Minimum 5 char")
      .max(90, "Maximum 90 char"),
    priority: z.string({
      required_error: "Provide a priority",
    }),
    status: z.string({
      required_error: "Provide a status",
    }),
  })
);

const form = useForm({
  validationSchema: formEditSchema,
  initialValues: {
    title: props.todo?.title,
    priority: props.todo?.priority,
    status: props.todo?.status ?? 'todo',
  },
});

const onSubmit = form.handleSubmit((values) => {
  console.log("Form submitted!", values);
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      {
        class:
          "mt-2 w-[340px] rounded-md bg-slate-950 p-4",
      },
      h(
        "code",
        { class: "text-white" },
        JSON.stringify(values, null, 2)
      )
    ),
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
              <SelectItem value="high">
                High
              </SelectItem>
              <SelectItem value="medium">
                Medium
              </SelectItem>
              <SelectItem value="low">
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
      name="status"
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
              <SelectItem value="done">
                Done
              </SelectItem>
              <SelectItem value="in progress">
                In Progress
              </SelectItem>
              <SelectItem value="todo">
                Todo
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>
    <div :class="cn('flex justify-center', todo && 'space-x-5')">
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
