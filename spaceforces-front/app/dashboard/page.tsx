"use client";

import { useQuery } from "@tanstack/react-query";
import { PlusCircle, BookOpen, Trophy, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CreateQuizSidebar from "@/components/create-quiz-sidebar";
import QuizCard from "@/components/quiz-card";
import { Skeleton } from "@/components/ui/skeleton";

interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  creator: {
    username: string;
  };
}

async function fetchQuizzes(): Promise<Quiz[]> {
  // TODO: Replace with actual API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: "1",
      title: "Space Exploration Basics",
      category: "Science",
      difficulty: "easy",
      creator: { username: "SpaceMaster" },
    },
    {
      id: "2",
      title: "Advanced Astronomy",
      category: "Science",
      difficulty: "hard",
      creator: { username: "StarGazer" },
    },
    // Add more mock quizzes as needed
  ];
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: quizzes, isLoading } = useQuery({
    queryKey: ["quizzes"],
    queryFn: fetchQuizzes,
  });

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-blue-50">
              <div className="flex items-center space-x-4">
                <BookOpen className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Quizzes</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-green-50">
              <div className="flex items-center space-x-4">
                <Trophy className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-purple-50">
              <div className="flex items-center space-x-4">
                <Users className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Available Quizzes</h2>
          <Button
            onClick={() => setSidebarOpen(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Quiz
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="p-4">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes?.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </main>

      <CreateQuizSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}