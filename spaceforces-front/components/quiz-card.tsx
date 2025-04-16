import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { Quiz, QuizMode, QuizStatus } from "@/types";
import { Button } from "./ui/button";
import { GetQuizzesResponse } from "@/services/getQuizzes";

interface QuizCardProps {
  quiz: GetQuizzesResponse;
  compact?: boolean;
}

export default function QuizCard({ quiz, compact = false }: QuizCardProps) {
  // Convert difficultyId to text
  const getDifficultyText = (difficultyId: number): string => {
    switch (difficultyId) {
      case 1:
        return "Easy";
      case 2:
        return "Intermediate";
      case 3:
        return "Hard";
      case 4:
        return "Expert";
      default:
        return "Unknown";
    }
  };

  // Get color based on difficulty
  const getDifficultyColor = (difficultyId: number) => {
    switch (difficultyId) {
      case 1: // Easy
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case 2: // Intermediate
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
      case 3: // Hard
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case 4: // Expert
        return "bg-purple-300/10 text-purple-300 hover:bg-purple-300/20";
      default:
        return "bg-primary/10 text-primary hover:bg-primary/20";
    }
  };

  // Get color based on status
  const getStatusColor = (status?: QuizStatus) => {
    switch (status) {
      case QuizStatus.LIVE:
        return "bg-green-500/10 text-green-500";
      case QuizStatus.FINISHED:
        return "bg-gray-500/10 text-gray-400";
      case QuizStatus.CREATED:
      default:
        return "bg-blue-500/10 text-blue-400";
    }
  };

  // Format duration to hours and minutes
  const formatDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  // Format date
  const formatDate = (dateString?: Date): string => {
    if (!dateString) return "N/A";
    return dateString.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (compact) {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-md hover:bg-[#4B0082]/30 border-[#9370DB]/30">
        <CardHeader className="p-3 pb-0">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className={getDifficultyColor(quiz.difficultyId)}>
              {getDifficultyText(quiz.difficultyId)}
            </Badge>
            <Badge variant="outline" className={getStatusColor(quiz.status)}>
              {quiz.status || "CREATED"}
            </Badge>
          </div>
          <CardTitle className="mt-1 text-base line-clamp-1 text-white">{quiz.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-1">
          <div className="flex items-center text-xs text-white/70">
            <span className="font-medium text-white">{formatDuration(quiz.duration)}</span>
            <span className="mx-1">•</span>
            <span className="text-xs">{quiz.mode}</span>
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xs text-white/70">{quiz.topic || "General"}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-[#E6E6FA] hover:bg-[#4B0082]/50 hover:text-[#E6E6FA]"
            asChild
          >
            <Link href={`/quiz/${quiz.id}`}>
              Take
              <ChevronRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md hover:bg-[#4B0082]/30 border-[#9370DB]/30">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={getDifficultyColor(quiz.difficultyId)}>
            {getDifficultyText(quiz.difficultyId)}
          </Badge>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getStatusColor(quiz.status)}>
              {quiz.status || "CREATED"}
            </Badge>
            <Badge variant="secondary" className="bg-[#4B0082]/30 text-white/90 hover:bg-[#4B0082]/50">
              {quiz.mode}
            </Badge>
          </div>
        </div>
        <CardTitle className="mt-2 line-clamp-1 text-white">{quiz.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {quiz.description && <p className="text-sm text-white/70 mb-3 line-clamp-2">{quiz.description}</p>}
        <div className="flex flex-wrap gap-1 mb-3">
          {quiz.topic && (
            <Badge variant="secondary" className="text-xs bg-[#4B0082]/30 text-white/90 hover:bg-[#4B0082]/50">
              {quiz.topic}
            </Badge>
          )}
        </div>
        <div className="flex items-center text-sm text-white/70">
          <span className="font-medium text-white">{formatDuration(quiz.duration)}</span>
          <span className="mx-2">•</span>
          {quiz.startDateTime && (
            <>
              <span>Starts: {formatDate(quiz.startDateTime)}</span>
              <span className="mx-2">•</span>
            </>
          )}
          <span>Created: {formatDate(quiz.createdAt)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-sm text-white/70">ID: {quiz.id}</span>
        </div>
        <Button variant="default" size="sm" className="gap-1 bg-[#6A0DAD] hover:bg-[#6A0DAD]/80 text-[#E6E6FA]" asChild>
          <Link href={`/quiz/${quiz.id}`}>
            Take Quiz
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
