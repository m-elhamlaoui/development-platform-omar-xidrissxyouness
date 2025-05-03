"use client";

import { Filter, SpaceIcon as Planet, Search } from "lucide-react";
import { useEffect, useState } from "react";
import LeaderboardSidebar from "@/components/sidebar/leaderboard-sidebar";
import SpaceStatsSidebar from "@/components/sidebar/space-stats-sidebar";
import { getQuizzes, type GetQuizzesResponse } from "@/services/getQuizzes";
import HomePageParticles from "@/components/HomePageParticles";
import { QuizStatusModal } from "@/components/quiz-status-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QuizCard from "@/components/quiz-card";

export default function SpaceforcesHome() {
  const [selectedQuiz, setSelectedQuiz] = useState<GetQuizzesResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState<GetQuizzesResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    difficulty: "all",
    category: "all",
    sortBy: "newest",
  });
  const [liveQuizzes, setLiveQuizzes] = useState<GetQuizzesResponse[]>([]);

  useEffect(() => {
    // Set dark mode by default
    if (!document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
    }

    const fetchQuizzes = async () => {
      setLoading(true);
      const quizzes = await getQuizzes();
      const _liveQuizzes = quizzes.filter((quiz) => quiz.status === "LIVE").slice(0, 5);
      const allQuizzes = quizzes.filter((quiz) => quiz.status !== "LIVE");
      setAllQuizzes(allQuizzes);
      //@ts-ignore
      setLiveQuizzes(_liveQuizzes);
      setLoading(false);
    };

    fetchQuizzes();
  }, []);

  const handleQuizSelect = (quiz: GetQuizzesResponse) => {
    setSelectedQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilterOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getFilteredQuizzes = () => {
    if (!allQuizzes) return [];

    return allQuizzes
      .filter((quiz) => {
        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesTitle = quiz.title.toLowerCase().includes(query);
          const matchesDescription = quiz.description?.toLowerCase().includes(query) || false;
          const matchesAuthor = quiz.createdBy.username?.toLowerCase().includes(query) || false;
          const matchesTags = quiz.topic?.some((tag) => tag.toLowerCase().includes(query)) || false;

          if (!(matchesTitle || matchesDescription || matchesAuthor || matchesTags)) {
            return false;
          }
        }

        // Difficulty filter
        if (filterOptions.difficulty !== "all" && quiz.difficulty.diff !== filterOptions.difficulty) {
          return false;
        }

        // Category filter
        if (filterOptions.category !== "all" && !quiz.topic?.includes(filterOptions.category)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sort by selected option
        if (filterOptions.sortBy === "newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (filterOptions.sortBy === "difficulty") {
          const difficultyOrder = { EASY: 1, MEDIUM: 2, HARD: 3 };
          return (
            difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
            difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
          );
        }
        return 0;
      });
  };

  const filteredQuizzes = getFilteredQuizzes();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        <div className="min-h-screen text-white relative overflow-hidden">
          <div className="fixed inset-0 z-0">
            <HomePageParticles id="tsparticles" />
          </div>
          <div className="relative z-10 px-2">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 flex items-center text-white">
                <Planet className="mr-2 h-6 w-6 text-[#E6E6FA]" />
                Space Quiz Explorer
              </h1>
              <p className="text-white/70">Discover and conquer space-themed quizzes to test your cosmic knowledge</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
                <Input
                  type="search"
                  placeholder="Search quizzes by title, tag, or author..."
                  className="w-full pl-8 bg-[#4B0082]/30 border-[#9370DB]/30 text-white placeholder:text-white/50"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#9370DB]/30 text-white hover:bg-[#4B0082]/20 hover:text-white"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#1E0035] border border-[#9370DB]/30 z-20 hidden group-hover:block hover:block">
                    <div className="p-2">
                      <div className="mb-2">
                        <label className="block text-sm text-white/70 mb-1">Difficulty</label>
                        <select
                          className="w-full h-8 rounded-md border border-[#9370DB]/30 bg-[#4B0082]/30 px-2 text-sm text-white"
                          value={filterOptions.difficulty}
                          onChange={(e) => handleFilterChange("difficulty", e.target.value)}
                        >
                          <option value="all">All Difficulties</option>
                          <option value="EASY">Easy</option>
                          <option value="MEDIUM">Medium</option>
                          <option value="HARD">Hard</option>
                        </select>
                      </div>
                      <div className="mb-2">
                        <label className="block text-sm text-white/70 mb-1">Category</label>
                        <select
                          className="w-full h-8 rounded-md border border-[#9370DB]/30 bg-[#4B0082]/30 px-2 text-sm text-white"
                          value={filterOptions.category}
                          onChange={(e) => handleFilterChange("category", e.target.value)}
                        >
                          <option value="all">All Categories</option>
                          <option value="astronomy">Astronomy</option>
                          <option value="physics">Physics</option>
                          <option value="space-exploration">Space Exploration</option>
                          <option value="planets">Planets</option>
                          <option value="stars">Stars</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <select
                  className="h-9 rounded-md border border-[#9370DB]/30 bg-[#4B0082]/30 px-3 py-1 text-sm text-white"
                  value={filterOptions.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="difficulty">Difficulty</option>
                </select>
              </div>
            </div>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : filteredQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} onQuizSelect={handleQuizSelect} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-white/70 mb-2">No quizzes match your search criteria.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterOptions({
                      difficulty: "all",
                      category: "all",
                      sortBy: "newest",
                    });
                  }}
                  className="border-[#9370DB]/30 text-white hover:bg-[#4B0082]/20 hover:text-white"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-8 lg:sticky lg:top-24">
          {/* <LiveQuizzesSidebar liveQuizzes={liveQuizzes} /> */}
          <LeaderboardSidebar />
          <SpaceStatsSidebar />
        </div>
        <QuizStatusModal quiz={selectedQuiz} open={isModalOpen} onOpenChange={setIsModalOpen} />
      </div>
    </main>
  );
}
