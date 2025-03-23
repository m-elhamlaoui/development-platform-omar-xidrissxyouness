"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuizCardProps {
  quiz: {
    id: string;
    title: string;
    category: string;
    difficulty: "easy" | "medium" | "hard";
    creator: {
      username: string;
    };
  };
}

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

export default function QuizCard({ quiz }: QuizCardProps) {
  const router = useRouter();

  return (
    <Card
      className="p-4 hover:shadow-lg transition-shadow cursor-pointer bg-white"
      onClick={() => router.push(`/quiz/${quiz.id}`)}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
            {quiz.title}
          </h3>
          <Badge
            variant="secondary"
            className={difficultyColors[quiz.difficulty]}
          >
            {quiz.difficulty}
          </Badge>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Brain className="h-4 w-4" />
          <span>{quiz.category}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <User className="h-4 w-4" />
          <span>Created by {quiz.creator.username}</span>
        </div>
      </div>
    </Card>
  );
}