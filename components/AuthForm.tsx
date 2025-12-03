"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";


const authFormSchema = (type: FormType) =>{
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.email(), // string().email()
    password: z.string().min(3),
  });
}

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        console.log("Sign Up", values);
        toast.success("Account Created Successful. Please Sign In")
        router.push("/sign-in")
      } else {
        toast.success("Sign In Successful")
        router.push("/")
        console.log("Sign In", values);
      }
    } catch (error) {
      console.log("err", error);
      toast.error(`There was an error ${error}`);
    }
  }
  const isSingIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="./logo.svg" height={32} width={38} alt="logo" />
          <h2 className="text-primary-100"> Prep</h2>
        </div>

        <h3>Practise job interview</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-4 form  space-y-8"
          >
            {!isSingIn && (
              <FormField
                name="name"
                control={form.control}
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}
            <FormField
              name="email"
              control={form.control}
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              name="password"
              control={form.control}
              label="Password"
              placeholder="Enter Your Password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSingIn ? "SignIn" : "Create an Account"}
            </Button>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <p className="text-center">
          {isSingIn ? "No Account yet" : "Have an account already"}

          <Link
            className="font-bold text-user-primary ml-1"
            href={!isSingIn ? "/sign-in" : "/sign-up"}
          >
            {!isSingIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;


