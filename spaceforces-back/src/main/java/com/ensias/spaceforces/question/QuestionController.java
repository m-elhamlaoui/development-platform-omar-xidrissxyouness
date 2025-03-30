package com.ensias.spaceforces.question;

import com.ensias.spaceforces.option.dto.OptionInfosDTO;
import com.ensias.spaceforces.question.dto.QuestionDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping
    public ResponseEntity<QuestionDTO> createQuestion(@RequestBody QuestionDTO questionDTO) {
        return new ResponseEntity<>(
                questionService.createQuestion(questionDTO),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return new ResponseEntity<>(
                questionService.getAllQuestions(),
                HttpStatus.OK
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.getQuestionById(id));
    }
    @GetMapping("/{questionId}/options")
    public ResponseEntity<List<OptionInfosDTO>> getQuestionOptions(
            @PathVariable Long questionId) {
        return ResponseEntity.ok(questionService.getQuestionOptions(questionId));
    }

}