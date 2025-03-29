"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  PlusCircle,
  Trash2,
  Save,
  ArrowLeft,
  ChevronRight,
  Menu,
  Rocket,
  Sparkles,
  Upload,
  X,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

interface QuizQuestion {
  id: string;
  title: string;
  options: string[];
  correctOption: number;
  image?: {
    url: string;
    file?: File;
  };
}

export default function QuizCreator() {
  const [quizTitle, setQuizTitle] = useState("Untitled Quiz");
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      id: "q1",
      title: "What is the question?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctOption: 0,
    },
  ]);
  const [activeQuestionId, setActiveQuestionId] = useState("q1");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `q${questions.length + 1}`,
      title: "New Question",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctOption: 0,
    };
    setQuestions([...questions, newQuestion]);
    setActiveQuestionId(newQuestion.id);
  };

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((q) => q.id !== id);
      setQuestions(newQuestions);

      // Set active question to the previous one or the first one
      const index = questions.findIndex((q) => q.id === id);
      const newActiveId = index > 0 ? questions[index - 1].id : newQuestions[0].id;
      setActiveQuestionId(newActiveId);
    }
  };

  const updateQuestionTitle = (id: string, title: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, title } : q)));
  };

  const updateQuestionOption = (id: string, optionIndex: number, value: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const updateCorrectOption = (id: string, optionIndex: number) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, correctOption: optionIndex } : q)));
  };

  const handleImageUpload = (id: string, files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, GIF, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          return { ...q, image: { url: imageUrl, file } };
        }
        return q;
      })
    );
  };

  const removeImage = (id: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id && q.image) {
          // Revoke the object URL to avoid memory leaks
          URL.revokeObjectURL(q.image.url);
          const { image, ...rest } = q;
          return rest;
        }
        return q;
      })
    );
  };

  const triggerImageUpload = (id: string) => {
    setActiveQuestionId(id);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const saveQuiz = () => {
    // Convert images to a format suitable for sending to the server
    const quizData = {
      title: quizTitle,
      questions: questions.map((q) => {
        const { image, ...rest } = q;
        // In a real app, you would upload the image file to your server/storage
        // and store the resulting URL instead of the File object
        return {
          ...rest,
          imageUrl: image?.url, // Just store the URL for now
        };
      }),
    };

    console.log("Quiz saved:", quizData);
    toast({
      title: "Quiz saved",
      description: "Your quiz has been saved successfully",
    });
    // Here you would typically send this data to your backend
  };

  const scrollToQuestion = (id: string) => {
    setActiveQuestionId(id);
    if (questionRefs.current[id]) {
      questionRefs.current[id]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Close mobile sidebar after selection
    setSidebarOpen(false);
  };

  // Handle drag events for image upload
  const handleDrag = (e: React.DragEvent, id: string, isDragActive: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (id === activeQuestionId) {
      setDragActive(isDragActive);
    }
  };

  const handleDrop = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (id === activeQuestionId) {
      handleImageUpload(id, e.dataTransfer.files);
    }
  };

  // Update active question based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      // Find the question that's most visible in the viewport
      let closestQuestion = questions[0]?.id;
      let closestDistance = Number.POSITIVE_INFINITY;

      Object.entries(questionRefs.current).forEach(([id, ref]) => {
        if (ref) {
          const distance = Math.abs(ref.getBoundingClientRect().top);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestQuestion = id;
          }
        }
      });

      if (closestQuestion && closestQuestion !== activeQuestionId) {
        setActiveQuestionId(closestQuestion);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [questions, activeQuestionId]);

  // Timeline sidebar component
  const TimelineSidebar = () => (
    <div className="h-screen flex flex-col border-r border-[#9370DB]/30 bg-[#2E0854]">
      <div className="p-4 border-b border-[#9370DB]/30">
        <Link
          href="/home"
          className="flex items-center mb-4 px-3 py-2 rounded-md bg-[#6A0DAD]/20 hover:bg-[#6A0DAD]/40 text-white transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Rocket className="h-5 w-5 text-[#E6E6FA] rotate-45" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-3 w-3 text-[#E6E6FA]" />
            </div>
          </div>
          <h2 className="font-semibold truncate text-white">{quizTitle || "Untitled Quiz"}</h2>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-1">
            <h3 className="text-sm font-medium text-white/70 mb-2">Questions</h3>
            {questions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => scrollToQuestion(question.id)}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                  "hover:bg-[#4B0082]/50 flex items-center",
                  activeQuestionId === question.id ? "bg-[#6A0DAD]/30 text-[#E6E6FA] font-medium" : "text-white/70"
                )}
              >
                <span className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#4B0082]/50 text-xs">
                  {index + 1}
                </span>
                <span className="truncate flex-1">{question.title || `Question ${index + 1}`}</span>
                {question.image && <ImageIcon className="h-3 w-3 mr-1 text-[#E6E6FA]/70" />}
                {activeQuestionId === question.id && <ChevronRight className="h-4 w-4 ml-1 text-[#E6E6FA]" />}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="p-4 border-t border-[#9370DB]/30 mt-auto">
        <Button onClick={addQuestion} className="w-full justify-start bg-[#4B0082] hover:bg-[#4B0082]/80 text-white">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Question
        </Button>
        <Button
          onClick={saveQuiz}
          className="w-full mt-2 justify-center bg-[#6A0DAD] hover:bg-[#6A0DAD]/80 text-[#E6E6FA]"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Quiz
        </Button>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-[#2E0854] text-white">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleImageUpload(activeQuestionId, e.target.files)}
        />

        <div className="hidden md:block md:w-64 lg:w-72 shrink-0">
          <TimelineSidebar />
        </div>

        <div className="flex-1 overflow-auto bg-gradient-to-b from-[#2E0854] to-[#4B0082]/90">
          <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
            <div className="flex items-center justify-between md:hidden mb-6">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-[#9370DB]/30 text-white hover:bg-[#4B0082]/20 hover:text-white"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[280px] sm:w-[320px] border-[#9370DB]/30 bg-[#2E0854]">
                  <TimelineSidebar />
                </SheetContent>
              </Sheet>

              <Link
                href="/home"
                className="flex items-center px-3 py-1.5 rounded-md bg-[#6A0DAD]/20 hover:bg-[#6A0DAD]/40 text-white transition-colors"
              >
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                <span className="text-sm font-medium">Back</span>
              </Link>

              <Button
                size="icon"
                variant="ghost"
                onClick={saveQuiz}
                className="text-white hover:bg-[#4B0082]/20 hover:text-[#E6E6FA]"
              >
                <Save className="h-5 w-5" />
                <span className="sr-only">Save Quiz</span>
              </Button>
            </div>

            <div className="hidden md:block mb-8 space-y-4">
              <Input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="text-2xl font-bold border-none text-center focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-white placeholder:text-white/50"
              />
              <p className="text-center text-white/70">Create your space quiz by adding questions and answers below</p>
            </div>

            <div className="space-y-6 pb-20">
              {questions.map((question, questionIndex) => (
                <div
                  key={question.id}
                  ref={(el) => (questionRefs.current[question.id] = el)}
                  className={cn(
                    "transition-all duration-200",
                    activeQuestionId === question.id ? "ring-2 ring-[#9370DB]/40 rounded-lg" : ""
                  )}
                  onDragEnter={(e) => handleDrag(e, question.id, true)}
                  onDragLeave={(e) => handleDrag(e, question.id, false)}
                  onDragOver={(e) => handleDrag(e, question.id, true)}
                  onDrop={(e) => handleDrop(e, question.id)}
                >
                  <Card
                    className={cn(
                      "shadow-md bg-[#4B0082]/30 border-[#9370DB]/30 backdrop-blur-sm",
                      dragActive && activeQuestionId === question.id ? "ring-2 ring-dashed ring-[#E6E6FA]/50" : ""
                    )}
                  >
                    <CardHeader className="pb-2">
                      <div className="text-sm font-medium text-white/70 mb-1">Question {questionIndex + 1}</div>
                      <div className="relative flex flex-1 items-center justify-between gap-1">
                        <Input
                          type="text"
                          value={question.title}
                          onChange={(e) => updateQuestionTitle(question.id, e.target.value)}
                          className="w-full text-lg font-medium focus-visible:ring-1 bg-[#4B0082]/30 border-[#9370DB]/30 text-white placeholder:text-white/50"
                          placeholder="Question title"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeQuestion(question.id)}
                          disabled={questions.length <= 1}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="mb-4">
                          {question.image ? (
                            <div className="relative rounded-lg overflow-hidden border border-[#9370DB]/30">
                              <div className="aspect-video relative">
                                <Image
                                  src={question.image.url || "/placeholder.svg"}
                                  alt="Question image"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="absolute top-2 right-2 flex space-x-2">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 bg-black/50 border-white/20 hover:bg-black/70"
                                      onClick={() => triggerImageUpload(question.id)}
                                    >
                                      <Upload className="h-4 w-4 text-white" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Replace image</p>
                                  </TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 bg-black/50 border-white/20 hover:bg-black/70"
                                      onClick={() => removeImage(question.id)}
                                    >
                                      <X className="h-4 w-4 text-white" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Remove image</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="border-2 border-dashed border-[#9370DB]/30 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#9370DB]/50 transition-colors"
                              onClick={() => triggerImageUpload(question.id)}
                            >
                              <div className="mb-2 rounded-full bg-[#6A0DAD]/20 p-2">
                                <ImageIcon className="h-6 w-6 text-[#E6E6FA]" />
                              </div>
                              <p className="text-sm text-white/70 text-center">
                                Click to upload an image or drag and drop
                              </p>
                              <p className="text-xs text-white/50 text-center mt-1">PNG, JPG, GIF up to 5MB</p>
                            </div>
                          )}
                        </div>

                        <div className="grid gap-2">
                          <Label className="text-base text-white">Answer options</Label>
                          <RadioGroup
                            value={question.correctOption.toString()}
                            onValueChange={(value) => updateCorrectOption(question.id, Number.parseInt(value))}
                            className="space-y-3"
                          >
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value={optionIndex.toString()}
                                  id={`${question.id}-option-${optionIndex}`}
                                  className="border-[#9370DB]/50 text-[#E6E6FA]"
                                />
                                <Input
                                  type="text"
                                  value={option}
                                  onChange={(e) => updateQuestionOption(question.id, optionIndex, e.target.value)}
                                  className="flex-1 bg-[#4B0082]/30 border-[#9370DB]/30 text-white placeholder:text-white/50"
                                  placeholder={`Option ${optionIndex + 1}`}
                                />
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="md:hidden fixed bottom-4 right-4">
              <Button
                onClick={addQuestion}
                size="icon"
                className="h-12 w-12 rounded-full shadow-lg bg-[#6A0DAD] hover:bg-[#6A0DAD]/80 text-[#E6E6FA]"
              >
                <PlusCircle className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
