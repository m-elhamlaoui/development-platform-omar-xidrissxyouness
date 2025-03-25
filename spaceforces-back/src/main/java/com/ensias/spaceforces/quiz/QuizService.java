package com.ensias.spaceforces.quiz;

import com.ensias.spaceforces.contestdifficulty.ContestDifficulty;
import com.ensias.spaceforces.contestdifficulty.ContestDifficultyRepository;
import com.ensias.spaceforces.question.QuestionRepository;
import com.ensias.spaceforces.quiz.dto.QuizDTO;
import com.ensias.spaceforces.user.User;
import com.ensias.spaceforces.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.ensias.spaceforces.question.dto.QuestionDTO;
import com.ensias.spaceforces.question.Question;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;
    private final ContestDifficultyRepository difficultyRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;

    public QuizDTO createQuiz(QuizDTO quizDTO) {
        ContestDifficulty difficulty = difficultyRepository.findById(quizDTO.getDifficultyId())
                .orElseThrow(() -> new RuntimeException("Difficulty not found"));
        User createdBy = userRepository.findById(quizDTO.getCreatedById())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Quiz quiz = Quiz.builder()
                .title(quizDTO.getTitle())
                .description(quizDTO.getDescription())
                .difficulty(difficulty)
                .topic(quizDTO.getTopic())
                .createdBy(createdBy)
                .startDateTime(quizDTO.getStartDateTime())
                .duration(quizDTO.getDuration())
                .status(quizDTO.getStatus())
                .mode_quiz(quizDTO.getMode())
                .build();

        Quiz savedQuiz = quizRepository.save(quiz);
        return convertToDTO(savedQuiz);
    }

    public QuizDTO getQuizById(Long id) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));
        return convertToDTO(quiz);
    }

    public List<QuizDTO> getAllQuizzes() {
        return quizRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<QuizDTO> getQuizzesByUserId(Long userId) {
        return quizRepository.findByCreatedById(userId).stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<QuizDTO> getQuizzesByStatus(QuizStatus status) {
        return quizRepository.findByStatus(status).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public QuizDTO updateQuizStatus(Long id, QuizStatus newStatus) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));

        quiz.setStatus(newStatus);
        Quiz updatedQuiz = quizRepository.save(quiz);
        return convertToDTO(updatedQuiz);
    }

    private QuizDTO convertToDTO(Quiz quiz) {
        QuizDTO dto = new QuizDTO();
        dto.setId(quiz.getId());
        dto.setTitle(quiz.getTitle());
        dto.setDescription(quiz.getDescription());
        dto.setDifficultyId(quiz.getDifficulty().getId());
        dto.setTopic(quiz.getTopic());
        dto.setCreatedById(quiz.getCreatedBy().getId());
        dto.setCreatedAt(quiz.getCreatedAt());
        dto.setStartDateTime(quiz.getStartDateTime());
        dto.setDuration(quiz.getDuration());
        dto.setStatus(quiz.getStatus());
        dto.setMode(quiz.getMode_quiz());
        return dto;
    }

    // In QuizService.java
    @Transactional(readOnly = true)
    public List<QuestionDTO> getQuizQuestions(Long quizId) {
        return questionRepository.findByQuizId(quizId).stream()
                .map(this::convertToQuestionDTO)
                .toList();
    }


    private QuestionDTO convertToQuestionDTO(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setQuizId(question.getQuiz().getId());
        dto.setPoints(question.getPoints());
        dto.setTags(question.getTags());
        dto.setQuestionText(question.getQuestionText());
        dto.setCorrectOption(question.getCorrectOption());
        return dto;
    }


}