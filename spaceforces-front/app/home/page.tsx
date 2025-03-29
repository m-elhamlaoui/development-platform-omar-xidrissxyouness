"use client";

import {
  ChevronRight,
  Filter,
  Menu,
  SpaceIcon as Planet,
  Rocket,
  Satellite,
  Search,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import HomePageParticles from "@/components/HomePageParticles";
import QuizCard from "@/components/quiz-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getQuizzes, GetQuizzesResponse } from "@/services/getQuizzes";

const leaderboardData = [
  { rank: 1, username: "CosmicConqueror", points: 12450, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 2, username: "StarGazer42", points: 11280, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 3, username: "AstroAce", points: 10890, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 4, username: "GalaxyGuru", points: 9675, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 5, username: "NebulaNinja", points: 8940, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 6, username: "OrbitalObserver", points: 8120, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 7, username: "PlanetaryPioneer", points: 7890, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 8, username: "StellarScholar", points: 7560, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 9, username: "MoonWalker", points: 7340, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 10, username: "RocketRanger", points: 7120, avatar: "/placeholder.svg?height=40&width=40" },
];

export default function SpaceforcesHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState<GetQuizzesResponse[]>([]);
  const [liveQuizzes, setLiveQuizzes] = useState<GetQuizzesResponse[]>([]);
  const [leaderboard, setLeaderboard] = useState(leaderboardData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set dark mode by default
    if (!document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
    }

    const fetchQuizzes = async () => {
      setLoading(true);
      const quizzes = await getQuizzes();
      const liveQuizzes = quizzes.filter((quiz) => quiz.status === "LIVE").slice(0, 5);
      const allQuizzes = quizzes.filter((quiz) => quiz.status !== "LIVE");
      setAllQuizzes(allQuizzes);
      setLiveQuizzes(liveQuizzes);
      setLoading(false);
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <HomePageParticles id="tsparticles" />
      </div>
      <div className="relative z-10">
        <header className="sticky top-0 z-20 backdrop-blur-md bg-black/40 border-b border-[#9370DB]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between py-4">
              <div className="flex items-center gap-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
                  <div className="relative">
                    <Rocket className="h-8 w-8 text-[#E6E6FA] rotate-45" />
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="h-4 w-4 text-[#E6E6FA]" />
                    </div>
                  </div>
                  <span className="bg-gradient-to-r from-[#9370DB] via-[#BA55D3] to-[#E6E6FA] bg-clip-text text-transparent">
                    Spaceforces
                  </span>
                </Link>
                <nav className="hidden md:flex gap-6">
                  <Link href="/" className="text-sm font-medium text-[#E6E6FA]">
                    Home
                  </Link>
                  <Link href="/my-quizzes" className="text-sm font-medium text-white/70 hover:text-white">
                    My Quizzes
                  </Link>
                  <Link href="/leaderboard" className="text-sm font-medium text-white/70 hover:text-white">
                    Leaderboard
                  </Link>
                  <Link href="/about" className="text-sm font-medium text-white/70 hover:text-white">
                    About
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative hidden md:block w-60">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
                  <Input
                    type="search"
                    placeholder="Search space quizzes..."
                    className="w-full rounded-lg pl-8 bg-[#4B0082]/30 border-[#9370DB]/30 text-white placeholder:text-white/50"
                  />
                </div>
                <Button className="hidden md:flex bg-[#6A0DAD] hover:bg-[#6A0DAD]/80 text-[#E6E6FA]" asChild>
                  <Link href="/home/create-quiz">
                    <Rocket className="mr-2 h-4 w-4" />
                    Create Quiz
                  </Link>
                </Button>
                <Avatar className="h-8 w-8 border border-[#9370DB]/50">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white hover:bg-[#4B0082]/20"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-[#9370DB]/30 bg-black/80 backdrop-blur-md">
              <div className="px-4 py-4 space-y-4 max-w-7xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
                  <Input
                    type="search"
                    placeholder="Search space quizzes..."
                    className="w-full rounded-lg pl-8 bg-[#4B0082]/30 border-[#9370DB]/30 text-white placeholder:text-white/50"
                  />
                </div>
                <nav className="flex flex-col space-y-3">
                  <Link href="/" className="text-sm font-medium text-[#E6E6FA] px-2 py-1">
                    Home
                  </Link>
                  <Link href="/my-quizzes" className="text-sm font-medium text-white/70 hover:text-white px-2 py-1">
                    My Quizzes
                  </Link>
                  <Link href="/leaderboard" className="text-sm font-medium text-white/70 hover:text-white px-2 py-1">
                    Leaderboard
                  </Link>
                  <Link href="/about" className="text-sm font-medium text-white/70 hover:text-white px-2 py-1">
                    About
                  </Link>
                </nav>
                <Button className="w-full bg-[#6A0DAD] hover:bg-[#6A0DAD]/80 text-[#E6E6FA]" asChild>
                  <Link href="/create-quiz">
                    <Rocket className="mr-2 h-4 w-4" />
                    Create Quiz
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
            {/* Main Quiz Feed (Left Column) */}
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 flex items-center text-white">
                  <Planet className="mr-2 h-6 w-6 text-[#E6E6FA]" />
                  Space Quiz Explorer
                </h1>
                <p className="text-white/70">Discover and conquer space-themed quizzes to test your cosmic knowledge</p>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
                  <Input
                    type="search"
                    placeholder="Search quizzes by title, tag, or author..."
                    className="w-full pl-8 bg-[#4B0082]/30 border-[#9370DB]/30 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#9370DB]/30 text-white hover:bg-[#4B0082]/20 hover:text-white"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <select className="h-9 rounded-md border border-[#9370DB]/30 bg-[#4B0082]/30 px-3 py-1 text-sm text-white">
                    <option value="newest">Newest</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              <Tabs defaultValue="all" className="mb-8">
                <TabsList className="bg-[#4B0082]/30 border border-[#9370DB]/30">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-[#6A0DAD] data-[state=active]:text-[#E6E6FA]"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="astronomy"
                    className="data-[state=active]:bg-[#6A0DAD] data-[state=active]:text-[#E6E6FA]"
                  >
                    Astronomy
                  </TabsTrigger>
                  <TabsTrigger
                    value="physics"
                    className="data-[state=active]:bg-[#6A0DAD] data-[state=active]:text-[#E6E6FA]"
                  >
                    Physics
                  </TabsTrigger>
                  <TabsTrigger
                    value="history"
                    className="data-[state=active]:bg-[#6A0DAD] data-[state=active]:text-[#E6E6FA]"
                  >
                    Space History
                  </TabsTrigger>
                  <TabsTrigger
                    value="technology"
                    className="data-[state=active]:bg-[#6A0DAD] data-[state=active]:text-[#E6E6FA]"
                  >
                    Technology
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-6">
                  {allQuizzes?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {allQuizzes.map((quiz) => (
                        <QuizCard key={quiz.id} quiz={quiz} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64">
                      <p className="text-white/70">No quizzes available at the moment.</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="astronomy" className="mt-6">
                  {allQuizzes?.filter((quiz) => quiz.topic.includes("Astronomy"))?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {allQuizzes
                        .filter((quiz) => quiz.topic.includes("Astronomy"))
                        .map((quiz) => (
                          <QuizCard key={quiz.id} quiz={quiz} />
                        ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64">
                      <p className="text-white/70">No quizzes available at the moment.</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="physics" className="mt-6">
                  {allQuizzes?.filter((quiz) => quiz.topic.includes("Astrophysics"))?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {allQuizzes
                        .filter((quiz) => quiz.topic.includes("Astrophysics"))
                        .map((quiz) => (
                          <QuizCard key={quiz.id} quiz={quiz} />
                        ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64">
                      <p className="text-white/70">No quizzes available at the moment.</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="history" className="mt-6">
                  {allQuizzes?.filter((quiz) => quiz.topic.includes("Space History"))?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {allQuizzes
                        .filter((quiz) => quiz.topic.includes("Space History"))
                        .map((quiz) => (
                          <QuizCard key={quiz.id} quiz={quiz} />
                        ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64">
                      <p className="text-white/70">No quizzes available at the moment.</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="technology" className="mt-6">
                  {allQuizzes?.filter((quiz) => quiz.topic.includes("Technology") || quiz.topic.includes("Engineering"))
                    ?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {allQuizzes
                        .filter((quiz) => quiz.topic.includes("Technology") || quiz.topic.includes("Engineering"))
                        .map((quiz) => (
                          <QuizCard key={quiz.id} quiz={quiz} />
                        ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64">
                      <p className="text-white/70">No quizzes available at the moment.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column (Trending + Leaderboard) */}
            <div className="space-y-8 lg:sticky lg:top-24">
              {/* Trending Quizzes Section */}
              <Card className="bg-black/40 border-[#9370DB]/30 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl text-white">
                    <Satellite className="mr-2 h-5 w-5 text-[#E6E6FA]" />
                    Live Quizzes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {liveQuizzes.map((quiz) => (
                      <QuizCard key={quiz.id} quiz={quiz} compact />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 px-4 pb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#9370DB]/30 text-white hover:bg-[#4B0082]/20 hover:text-white"
                    asChild
                  >
                    <Link href="/trending">
                      View All Live
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Leaderboard Section */}
              <Card className="bg-black/40 border-[#9370DB]/30 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-xl text-white">
                    <Trophy className="mr-2 h-5 w-5 text-[#E6E6FA]" />
                    Cosmic Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ScrollArea className="h-[400px] pr-4 -mr-4">
                    <div className="space-y-3">
                      {leaderboard.map((player) => (
                        <div
                          key={player.rank}
                          className="flex items-center justify-between p-2 rounded-md bg-[#6A0DAD]/20 hover:bg-[#6A0DAD]/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4B0082]/50">
                              {player.rank <= 3 ? (
                                <Trophy
                                  className={`h-3.5 w-3.5 ${
                                    player.rank === 1
                                      ? "text-[#E6E6FA]"
                                      : player.rank === 2
                                      ? "text-gray-300"
                                      : "text-amber-700"
                                  }`}
                                />
                              ) : (
                                <span className="text-xs font-medium text-white">{player.rank}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7 border border-[#9370DB]/50">
                                <AvatarImage src={player.avatar} alt={player.username} />
                                <AvatarFallback>{player.username.charAt(0).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-sm text-white">{player.username}</span>
                            </div>
                          </div>
                          <div className="font-bold text-sm text-[#E6E6FA]">{player.points.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="pt-0 px-4 pb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-[#9370DB]/30 text-white hover:bg-[#4B0082]/20 hover:text-white"
                    asChild
                  >
                    <Link href="/leaderboard">
                      View Full Leaderboard
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Quick Stats Card */}
              <Card className="bg-black/40 border-[#9370DB]/30 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white">Space Stats</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-white/70">Total Quizzes</p>
                      <p className="text-2xl font-bold text-[#E6E6FA]">248</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-white/70">Explorers</p>
                      <p className="text-2xl font-bold text-[#E6E6FA]">3,592</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-white/70">Quizzes Taken</p>
                      <p className="text-2xl font-bold text-[#E6E6FA]">42,567</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-white/70">Categories</p>
                      <p className="text-2xl font-bold text-[#E6E6FA]">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#9370DB]/30 py-6 md:py-0 bg-black/40 backdrop-blur-md mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
            <p className="text-center text-sm leading-loose text-white/70 md:text-left">
              © 2025 Spaceforces. Exploring the cosmos, one quiz at a time.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
