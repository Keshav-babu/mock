"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const questionsFormSchema = () => {
  return z.object({
    userid: z.string(),
    amount: z
      .number({ error: "Amount is required" })
      .min(1, "Amount must be at least 1"),
    techstack: z.string(),
    level: z.enum(["beginner", "intermediate", "senior"], {
      required_error: "Level is required",
      invalid_type_error: "Level must be beginner, intermediate, or senior",
    }),
    type: z.string(),
    role: z.string(),
  });
};

const InterviewTypeForm = ({
  userId,
  userName,
}: {
  userId: string;
  userName: string;
}) => {
  const formSchema = questionsFormSchema();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 1,
      level: undefined,
      role: "",
      techstack: "",
      type: "",
      userid: userId,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { amount, level, role, techstack, type, userid } = data;

    const payload = {
      type,
      role,
      level,
      techstack,
      amount,
      userid,
    };

    try {
      const res = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Interview questions generated successfully");
        router.push("/");
      }
      if (!res.ok) {
        toast.error("Sorry something went wring");

        router.push("/");
      }
    } catch (error) {
      toast.error(`There was an error ${error}`);
      router.push("/");
    }
  };

  return (
    <div className="m-auto w-96 p-2 border rounded-2xl">
      <h3>Help to to create your Interview questions.</h3>
      <Form {...form}>
        <form
          className="w-full space-y-6 mt-4 form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Role</FormLabel>
                <FormDescription>
                  What position are you preparing for? (e.g. “Frontend
                  Developer”)
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="e.g. Frontend Developer"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\s{2,}/g, " ")
                        .trimStart();
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="techstack"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies / Tech Stack</FormLabel>
                <FormDescription>
                  Separate multiple technologies with commas. (e.g. React,
                  Node.js)
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="e.g. React, Node.js, SQL"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\s{2,}/g, " ")
                        .trimStart();
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interview Focus</FormLabel>
                <FormDescription>
                  What type of questions do you prefer?
                </FormDescription>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select interview focus" />
                    </SelectTrigger>
                    <SelectContent>
                      {["technical", "behavioral", "mixed"].map((item) => (
                        <SelectItem
                          key={item}
                          className="capitalize"
                          value={item}
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <FormDescription>
                  Choose your approximate experience level.
                </FormDescription>
                <FormControl>
                  <Select
                    name={field.name}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {["beginner", "intermediate", "senior"].map((item) => (
                        <SelectItem
                          key={item}
                          className="capitalize"
                          value={item}
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Questions</FormLabel>
                <FormDescription>
                  How many interview questions should we generate?
                </FormDescription>
                {/* <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) => {
                      const num = Number(e.target.value);
                      field.onChange(num < 1 ? 1 : num);
                    }}
                  />
                </FormControl> */}
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        field.onChange(Math.max(1, field?.value - 1))
                      }
                    >
                      −
                    </Button>

                    <Input
                      type="number"
                      min={1}
                      className="text-center"
                      {...field}
                      value={field.value ?? 1}
                      onChange={(e) => {
                        const num = Number(e.target.value);
                        field.onChange(num < 1 ? 1 : num);
                      }}
                    />

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => field.onChange(field?.value + 1)}
                    >
                      +
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="btn" type="submit">
            Create Interview
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InterviewTypeForm;
