package com.ensias.spaceforces.contestparticipation;

import com.ensias.spaceforces.contestparticipation.dto.ContestParticipationDTO;
import com.ensias.spaceforces.quiz.dto.QuizDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/participations")
@RequiredArgsConstructor
public class ContestParticipationController {

    private final ContestParticipationService participationService;

    @PostMapping
    public ResponseEntity<ContestParticipation> createParticipation(@RequestBody ContestParticipationDTO dto) {
        return new ResponseEntity<>(
                participationService.createParticipation(dto),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<List<ContestParticipation>> getAllParticipations() {
        return new ResponseEntity<>(
                participationService.getAllParticipations(),
                HttpStatus.OK
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ContestParticipation>> getParticipationsByUser(
            @PathVariable Long userId) {
        return ResponseEntity.ok(participationService.getParticipationByUserId(userId));
    }

    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<List<ContestParticipation>> getParticipationsByQuiz(
            @PathVariable Long quizId) {
        return ResponseEntity.ok(participationService.getParticipationByQuizId(quizId));
    }

    @GetMapping("/user/{userId}/quiz/{quizId}")
    public ResponseEntity<Boolean> checkUserParticipation(
            @PathVariable Long userId,
            @PathVariable Long quizId) {
        return ResponseEntity.ok(
                participationService.hasUserParticipatedInQuiz(userId, quizId)
        );
    }

    @DeleteMapping("/{participationId}")
    public ResponseEntity<Void> deleteParticipation(
            @PathVariable Long participationId) {
        participationService.deleteParticipation(participationId);
        return ResponseEntity.noContent().build();
    }
}