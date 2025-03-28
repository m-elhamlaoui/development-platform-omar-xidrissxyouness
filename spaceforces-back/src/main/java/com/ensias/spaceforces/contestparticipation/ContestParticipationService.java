package com.ensias.spaceforces.contestparticipation;

import com.ensias.spaceforces.contestparticipation.dto.ContestParticipationDTO;
import com.ensias.spaceforces.contestparticipation.ContestParticipationRepository;
import com.ensias.spaceforces.quiz.Quiz;
import com.ensias.spaceforces.quiz.QuizRepository;
import com.ensias.spaceforces.quiz.dto.QuizDTO;
import com.ensias.spaceforces.user.User;
import com.ensias.spaceforces.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContestParticipationService {

    private final ContestParticipationRepository participationRepository;
    private final UserRepository userRepository;
    private final QuizRepository quizRepository;

    public ContestParticipation createParticipation(ContestParticipationDTO participationDto) {
        User user = userRepository.findById(participationDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Quiz quiz = quizRepository.findById(participationDto.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        if (participationRepository.existsByUserIdAndQuizId(participationDto.getUserId(), participationDto.getQuizId())) {
            throw new RuntimeException("User already participated in this quiz");
        }
        ContestParticipation participation = new ContestParticipation();
        participation.setUser(user);
        participation.setQuiz(quiz);
        participation.setScore(0);

        ContestParticipation saved = participationRepository.save(participation);
        return saved;
    }

    public List<ContestParticipation> getAllParticipations() {
        return participationRepository.findAll().stream()
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ContestParticipation> getParticipationByUserId(Long userId) {
        return participationRepository.findByUserId(userId).stream()
                .toList();
    }


    // In ContestParticipationService.java
    @Transactional(readOnly = true)
    public List<ContestParticipation> getParticipationByQuizId(Long quizId) {
        return participationRepository.findByQuizId(quizId).stream()
                .toList();
    }

    @Transactional(readOnly = true)
    public boolean hasUserParticipatedInQuiz(Long userId, Long quizId) {
        return participationRepository.existsByUserIdAndQuizId(userId, quizId);
    }

    @Transactional
    public void deleteParticipation(Long participationId) {
        if (!participationRepository.existsById(participationId)) {
            throw new RuntimeException("Participation not found with ID: " + participationId);
        }
        System.out.println("Deleting participation: " + participationId);
        participationRepository.deleteById(participationId);
    }
}