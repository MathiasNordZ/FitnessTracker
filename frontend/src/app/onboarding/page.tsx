"use client";

import { ProgressBar } from "@/components/progress-bar";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";

export default function OnboardingPage() {
  return (
    <div>
      <FormStepOne /> 
      <FormStepTwo />
    </div>
  );
}

const formSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerAge: z
    .number()
    .min(16, "Minimum age is 16")
    .max(150, "Maximum age is 150"),
  customerGender: z.string(),
});

function FormStepOne() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerAge: 16,
      customerGender: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div>
      <div>
        <div className="flex flex-col items-center justify-center mt-10">
          <ProgressBar initialState={0} currentState={50} delay={10} />
          <div>
            <p className="mt-2">Step 1 out of 5 - 20%</p>
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-center mt-10">
            Welcome to the Onboarding Process
          </h1>
          <p className="text-center mt-4">
            We are excited to have you on board! Please follow the steps below
            to complete your onboarding.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center mt-10">
        <Card className="w-1/2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-3xl mx-auto py-10"
            >
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please input your name here"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Your full name</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="customerAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please input your age here"
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>Your age</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="customerGender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Please enter your gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Your gender</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center justify-start space-x-2">
                <Button type="submit">Back</Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}

function FormStepTwo() {
  const cardStyle =
    "flex items-center col-span-1 aspect-square bg-gray-100 rounded-lg shadow-md hover:shadow-lg hover:cursor-pointer transition-shadow duration-300";

  function handleCardSelect()


  return (
    <div>
      <div>
        <div className="flex flex-col items-center justify-center mt-10">
          <ProgressBar initialState={0} currentState={50} delay={10} />
          <div>
            <p className="mt-2">Step 1 out of 5 - 20%</p>
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-center mt-10">
            What are your fitness goals?
          </h1>
          <p className="text-center mt-4">
            Select all options that apply to you. You can select multiple
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-10 px-110 gap-4">
        <Card className={cardStyle}>
          <CardContent>Weightloss</CardContent>
        </Card>
        <Card className={cardStyle}>
          <CardContent>Muscle Gain</CardContent>
        </Card>
        <Card className={cardStyle}>
          <CardContent>Cardio Health</CardContent>
        </Card>
        <Card className={cardStyle}>
          <CardContent>Strength</CardContent>
        </Card>
        <Card className={cardStyle}>
          <CardContent>Endurance</CardContent>
        </Card>
        <Card className={cardStyle}>
          <CardContent>Flexibility</CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-start space-x-2">
                <Button type="submit">Back</Button>
                <Button type="submit">Continue</Button>
              </div>
    </div>
  );
}
