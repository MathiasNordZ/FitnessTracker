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
import { Scale, Activity, Heart, Zap, Timer, Move3D } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Checkbox } from "@radix-ui/react-checkbox";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState({});

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {currentStep === 1 && (
        <FormStepOne 
          onNext={nextStep} 
          onDataChange={setFormData}
          formData={formData}
        />
      )}
      {currentStep === 2 && (
        <FormStepTwo 
          onNext={nextStep} 
          onBack={prevStep}
          onDataChange={setFormData}
          formData={formData}
        />
      )}
      {currentStep === 3 && (
        <FormStepThree 
          onNext={nextStep} 
          onBack={prevStep}
          onDataChange={setFormData}
          formData={formData}
        />
      )}
    </div>
  );
}

const formSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerAge: z
    .number()
    .min(16, "Minimum age is 16")
    .max(150, "Maximum age is 150"),
  customerGender: z.string().min(1, "Gender is required"),
});

interface FormStepProps {
  onNext: () => void;
  onBack?: () => void;
  onDataChange: (data: any) => void;
  formData: any;
}

function FormStepOne({ onNext, onDataChange, formData }: FormStepProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: formData.customerName || "",
      customerAge: formData.customerAge || 18,
      customerGender: formData.customerGender || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      onDataChange({ ...formData, ...values });
      toast.success("Step 1 completed!");
      onNext();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="flex flex-col items-center justify-center">
        <ProgressBar initialState={0} currentState={20} delay={10} />
        <p className="mt-2 text-gray-600">Step 1 of 5 - 20%</p>
      </div>
      
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold">Welcome to the Onboarding Process</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We are excited to have you on board! Please follow the steps below
          to complete your onboarding.
        </p>
      </div>

      <div className="flex justify-center mt-10">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Your full name as it appears on official documents</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="customerAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your age"
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>Must be 16 or older</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerGender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>This helps us personalize your experience</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" className="px-8">
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FormStepTwo({ onNext, onBack, onDataChange, formData }: FormStepProps) {
  const [selected, setSelected] = React.useState<string[]>(formData.fitnessGoals || []);
  
  const options = [
    "Weight Loss",
    "Muscle Gain", 
    "Cardio Health",
    "Strength",
    "Endurance",
    "Flexibility",
  ];

  const icons: Record<string, React.ReactNode> = {
    "Weight Loss": <Scale className="w-8 h-8 text-blue-600" />,
    "Muscle Gain": <Zap className="w-8 h-8 text-orange-600" />,
    "Cardio Health": <Heart className="w-8 h-8 text-red-600" />,
    "Strength": <Activity className="w-8 h-8 text-purple-600" />,
    "Endurance": <Timer className="w-8 h-8 text-green-600" />,
    "Flexibility": <Move3D className="w-8 h-8 text-pink-600" />,
  };

  function handleCardSelect(option: string) {
    setSelected((prev) => 
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  }

  function handleSubmit() {
    if (selected.length === 0) {
      toast.error("Please select at least one fitness goal");
      return;
    }
    
    onDataChange({ ...formData, fitnessGoals: selected });
    toast.success("Fitness goals saved!");
    onNext();
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="flex flex-col items-center justify-center">
        <ProgressBar initialState={0} currentState={40} delay={10} />
        <p className="mt-2 text-gray-600">Step 2 of 5 - 40%</p>
      </div>
      
      <div className="text-center mt-8">
        <h1 className="text-3xl font-bold">What are your fitness goals?</h1>
        <p className="text-gray-600 mt-4">
          Select all options that apply to you. You can choose multiple goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
        {options.map((option) => (
          <Card
            key={option}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selected.includes(option) 
                ? "ring-2 ring-blue-500 bg-blue-50 border-blue-200" 
                : "hover:shadow-md"
            }`}
            onClick={() => handleCardSelect(option)}
          >
            <CardContent className="flex flex-col items-center justify-center p-6 text-center min-h-[140px]">
              <div className="mb-3">
                {icons[option]}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{option}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center mt-10 max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="px-8"
        >
          Back
        </Button>
        <div className="text-sm text-gray-500">
          {selected.length} goal{selected.length !== 1 ? 's' : ''} selected
        </div>
        <Button 
          onClick={handleSubmit}
          className="px-8"
          disabled={selected.length === 0}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

function FormStepThree({ onNext, onBack, onDataChange, formData }: FormStepProps) {
  // Placeholder for the third step
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="flex flex-col items-center justify-center">
        <ProgressBar initialState={0} currentState={40} delay={10} />
        <p className="mt-2 text-gray-600">Step 2 of 5 - 40%</p>
      </div>
      <ul>
        <li>
          <p>www</p>
          <Checkbox className="w-10 h-10" />
        </li>
      </ul>
    </div>
  );
}