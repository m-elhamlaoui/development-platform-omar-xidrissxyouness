"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useQuizCreationStore } from "@/lib/store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const quizSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  question: z.string().min(5, "Question must be at least 5 characters"),
  answers: z.array(z.string()).min(2, "At least 2 answers are required"),
  correctAnswer: z.number().min(0, "Please select the correct answer"),
});

type QuizForm = z.infer<typeof quizSchema>;

interface CreateQuizSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateQuizSidebar({ open, onClose }: CreateQuizSidebarProps) {
  const { title, category, difficulty, questions, setTitle, setCategory, setDifficulty, addQuestion, resetQuiz } =
    useQuizCreationStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuizForm>({
    resolver: zodResolver(quizSchema),
  });

  const createQuizMutation = useMutation({
    mutationFn: async (data: QuizForm) => {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      toast.success("Quiz created successfully!");
      resetQuiz();
      onClose();
    },
    onError: () => {
      toast.error("Failed to create quiz. Please try again.");
    },
  });

  const onSubmit = (data: QuizForm) => {
    createQuizMutation.mutate(data);
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create New Quiz</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Quiz Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter quiz title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => setCategory(value)}
                defaultValue={category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="geography">Geography</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                onValueChange={(value: "easy" | "medium" | "hard") =>
                  setDifficulty(value)
                }
                defaultValue={difficulty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Questions</Label>
              {questions.map((q, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">{q.question}</p>
                  <ul className="mt-2 space-y-1">
                    {q.answers.map((answer, i) => (
                      <li
                        key={i}
                        className={`text-sm ${
                          i === q.correctAnswer ? "text-green-600 font-medium" : ""
                        }`}
                      >
                        {answer}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={createQuizMutation.isPending}
            >
              {createQuizMutation.isPending ? "Creating..." : "Create Quiz"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}