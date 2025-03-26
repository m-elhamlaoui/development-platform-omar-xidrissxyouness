import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Star, Link, ChevronRight } from "lucide-react";

interface QuizCardProps {
  quiz: {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    questions: number;
    completions: number;
    author: string;
    authorAvatar: string;
    rating: number;
    tags: string[];
    trending?: boolean;
  };
  compact?: boolean;
}

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

export default function QuizCard({ quiz, compact = false }: QuizCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "intermediate":
        return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
      case "hard":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case "expert":
        return "bg-purple-300/10 text-purple-300 hover:bg-purple-300/20";
      default:
        return "bg-primary/10 text-primary hover:bg-primary/20";
    }
  };

  if (compact) {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-md hover:bg-[#4B0082]/30 border-[#9370DB]/30">
        <CardHeader className="p-3 pb-0">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className={getDifficultyColor(quiz.difficulty)}>
              {quiz.difficulty}
            </Badge>
            <div className="flex items-center text-sm text-white/80">
              <Star className="h-3 w-3 fill-[#E6E6FA] text-[#E6E6FA] mr-1" />
              {quiz.rating}
            </div>
          </div>
          <CardTitle className="mt-1 text-base line-clamp-1 text-white">{quiz.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-1">
          <div className="flex items-center text-xs text-white/70">
            <span className="font-medium text-white">{quiz.questions}</span>
            <span className="ml-1">questions</span>
            <span className="mx-1">•</span>
            <span>{quiz.completions.toLocaleString()} completions</span>
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="h-5 w-5 mr-1 border border-[#9370DB]/50">
              <AvatarImage src={quiz.authorAvatar} alt={quiz.author} />
              <AvatarFallback>{quiz.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-white/70 truncate max-w-[100px]">{quiz.author}</span>
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
          <Badge variant="outline" className={getDifficultyColor(quiz.difficulty)}>
            {quiz.difficulty}
          </Badge>
          <div className="flex items-center text-sm text-white/80">
            <Star className="h-4 w-4 fill-[#E6E6FA] text-[#E6E6FA] mr-1" />
            {quiz.rating}
          </div>
        </div>
        <CardTitle className="mt-2 line-clamp-1 text-white">{quiz.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-white/70 mb-3 line-clamp-2">{quiz.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {quiz.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-[#4B0082]/30 text-white/90 hover:bg-[#4B0082]/50"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center text-sm text-white/70">
          <span className="font-medium text-white">{quiz.questions}</span>
          <span className="ml-1">questions</span>
          <span className="mx-2">•</span>
          <span>{quiz.completions.toLocaleString()} completions</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2 border border-[#9370DB]/50">
            <AvatarImage src={quiz.authorAvatar} alt={quiz.author} />
            <AvatarFallback>{quiz.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-white/70">{quiz.author}</span>
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
