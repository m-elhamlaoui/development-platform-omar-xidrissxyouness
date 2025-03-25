package com.ensias.spaceforces.quiz;

import com.ensias.spaceforces.question.dto.QuestionDTO;
import com.ensias.spaceforces.quiz.dto.QuizDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @PostMapping
    public ResponseEntity<QuizDTO> createQuiz(@RequestBody QuizDTO quizDTO) {
        return new ResponseEntity<>(
                quizService.createQuiz(quizDTO),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<QuizDTO>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuizzes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizDTO> getQuizById(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.getQuizById(id));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<QuizDTO>> getQuizzesByStatus(
            @PathVariable QuizStatus status) {
        return ResponseEntity.ok(quizService.getQuizzesByStatus(status));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<QuizDTO> updateQuizStatus(
            @PathVariable Long id,
            @RequestParam QuizStatus newStatus) {
        return ResponseEntity.ok(quizService.updateQuizStatus(id, newStatus));
    }

    @GetMapping("/{quizId}/questions")
    public ResponseEntity<List<QuestionDTO>> getQuizQuestions(
            @PathVariable Long quizId) {
        return ResponseEntity.ok(quizService.getQuizQuestions(quizId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<QuizDTO>> getQuizzesByUser(
            @PathVariable Long userId) {
        return ResponseEntity.ok(quizService.getQuizzesByUserId(userId));
    }

}