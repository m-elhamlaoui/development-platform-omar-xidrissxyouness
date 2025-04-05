package com.ensias.spaceforces.quiz;

import com.ensias.spaceforces.contestdifficulty.ContestDifficulty;
import com.ensias.spaceforces.contestdifficulty.ContestDifficultyRepository;
import com.ensias.spaceforces.option.OptionRepository;
import com.ensias.spaceforces.option.Option;
import com.ensias.spaceforces.option.dto.OptionInfosDTO;
import com.ensias.spaceforces.question.QuestionRepository;
import com.ensias.spaceforces.question.dto.QuestionWithOptionsDTO;
import com.ensias.spaceforces.quiz.dto.QuizCreateDTO;
import com.ensias.spaceforces.quiz.dto.QuizDTO;
import com.ensias.spaceforces.quiz.dto.QuizDetailsDTO;
import com.ensias.spaceforces.quiz.dto.QuizWithQuestionsDTO;
import com.ensias.spaceforces.user.User;
import com.ensias.spaceforces.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.quartz.SchedulerException;
import org.springframework.stereotype.Service;
import com.ensias.spaceforces.question.Question;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;
    private final ContestDifficultyRepository difficultyRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final QuizSchedulerService schedulerService;
    private final OptionRepository optionRepository;


    public Quiz createQuiz(QuizCreateDTO quizDTO, Long userId) {
        ContestDifficulty difficulty = difficultyRepository.findById(quizDTO.getDifficultyId())
                .orElseThrow(() -> new RuntimeException("Difficulty not found"));
        User createdBy = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!quizDTO.getStartDateTime().isAfter(LocalDateTime.now())) {
            throw new IllegalArgumentException(
                    String.format("Start DateTime (%s) must be in the future. Current time: %s",
                            quizDTO.getStartDateTime(),
                            LocalDateTime.now()
                    )
            );
        }
        Quiz quiz = Quiz.builder()
                .title(quizDTO.getTitle())
                .description(quizDTO.getDescription())
                .difficulty(difficulty)
                .topic(quizDTO.getTopic())
                .createdBy(createdBy)
                .startDateTime(quizDTO.getStartDateTime())
                .duration(quizDTO.getDuration())
                .status(QuizStatus.CREATED)
                .mode(quizDTO.getMode())
                .build();


        var savedQuiz = quizRepository.save(quiz);
        try {
            schedulerService.scheduleQuizStatusUpdate(savedQuiz);
        } catch (SchedulerException e) {
            throw new RuntimeException("Failed to schedule quiz start", e);
        }

        return savedQuiz;
    }

    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));
    }

    public List<Quiz> getAllQuizzes() {
        return new ArrayList<>(quizRepository.findAll());
    }

    @Transactional(readOnly = true)
    public List<Quiz> getQuizzesByUserId(Long userId) {
        return quizRepository.findByCreatedById(userId).stream()
                .toList();
    }

    public List<Quiz> getQuizzesByStatus(QuizStatus status) {
        return new ArrayList<>(quizRepository.findByStatus(status));
    }

    public Quiz updateQuizStatus(Long id, QuizStatus newStatus) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));

        quiz.setStatus(newStatus);
        return quizRepository.save(quiz);
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
        dto.setMode(quiz.getMode());
        return dto;
    }

    @Transactional(readOnly = true)
    public List<Question> getQuizQuestions(Long quizId) {
        return questionRepository.findByQuizId(quizId).stream()
                .toList();
    }


    @Transactional(readOnly = true)
    public List<Quiz> getQuizzesByMode(QuizMode mode) {
        return new ArrayList<>(quizRepository.findByMode(mode));
    }

    @Transactional(readOnly = true)
    public List<QuizDTO> getQuizzesByModeAndStatus(QuizMode mode, QuizStatus status) {
        return quizRepository.findByModeAndStatus(mode, status).stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Transactional
    public Quiz createQuizWithQuestions(QuizWithQuestionsDTO quizDTO, Long userId) {
        // 1. Create the Quiz
        ContestDifficulty difficulty = difficultyRepository.findById(quizDTO.getDifficultyId())
                .orElseThrow(() -> new RuntimeException("Difficulty not found"));
        User createdBy = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!quizDTO.getStartDateTime().isAfter(LocalDateTime.now())) {
            throw new IllegalArgumentException(
                    String.format("Start DateTime (%s) must be in the future. Current time: %s",
                            quizDTO.getStartDateTime(),
                            LocalDateTime.now()
                    )
            );
        }

        Quiz quiz = Quiz.builder()
                .title(quizDTO.getTitle())
                .description(quizDTO.getDescription())
                .difficulty(difficulty)
                .topic(quizDTO.getTopic())
                .createdBy(createdBy)
                .startDateTime(quizDTO.getStartDateTime())
                .duration(quizDTO.getDuration())
                .status(QuizStatus.CREATED)
                .mode(quizDTO.getMode())
                .build();

        Quiz savedQuiz = quizRepository.save(quiz);

        // 2. Create Questions and Options
        for (QuestionWithOptionsDTO questionDTO : quizDTO.getQuestions()) {
            Question question = new Question();
            question.setQuiz(savedQuiz);  // Link to the saved quiz
            question.setPoints(questionDTO.getPoints());
            question.setTags(questionDTO.getTags());
            question.setQuestionText(questionDTO.getQuestionText());
            question.setCorrectOption(questionDTO.getCorrectOption());
            question.setImageUrl(questionDTO.getImageUrl());  // Include image URL in DTO

            Question savedQuestion = questionRepository.save(question);

            // 3. Create Options for this Question
            for (OptionInfosDTO optionDTO : questionDTO.getOptions()) {
                Option option = new Option();
                option.setQuestion(savedQuestion);  // Link to the saved question
                option.setOptionText(optionDTO.getOptionText());
                option.setValid(optionDTO.isValid());

                optionRepository.save(option);
            }
        }

        // 4. Schedule Quiz Status Updates (if needed)
        try {
            schedulerService.scheduleQuizStatusUpdate(savedQuiz);
        } catch (SchedulerException e) {
            throw new RuntimeException("Failed to schedule quiz start", e);
        }

        return savedQuiz;
    }

    @Transactional(readOnly = true)
    public QuizDetailsDTO getQuizDetailsById(Long id) {
        // 1. Fetch the quiz
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));

        // 2. Fetch questions with their options
        List<QuestionWithOptionsDTO> questions = questionRepository.findByQuizId(id).stream()
                .map(question -> {
                    QuestionWithOptionsDTO dto = new QuestionWithOptionsDTO();
                    dto.setId(question.getId());
                    dto.setPoints(question.getPoints());
                    dto.setTags(question.getTags());
                    dto.setQuestionText(question.getQuestionText());
                    dto.setCorrectOption(question.getCorrectOption());
                    dto.setImageUrl(question.getImageUrl());
                    // Fetch options for this question
                    List<OptionInfosDTO> options = optionRepository.findByQuestionId(question.getId()).stream()
                            .map(option -> {
                                OptionInfosDTO optionDto = new OptionInfosDTO();
                                optionDto.setId(option.getId());
                                optionDto.setOptionText(option.getOptionText());
                                optionDto.setValid(option.isValid());
                                return optionDto;
                            })
                            .toList();

                    dto.setOptions(options);
                    return dto;
                })
                .toList();

        // 3. Build the response
        QuizDetailsDTO dto = new QuizDetailsDTO();
        dto.setId(quiz.getId());
        dto.setTitle(quiz.getTitle());
        dto.setDescription(quiz.getDescription());
        dto.setDifficultyId(quiz.getDifficulty());
        dto.setTopic(quiz.getTopic());
        dto.setCreatedById(quiz.getCreatedBy());
        dto.setCreatedAt(quiz.getCreatedAt());
        dto.setStartDateTime(quiz.getStartDateTime());
        dto.setDuration(quiz.getDuration());
        dto.setStatus(quiz.getStatus());
        dto.setMode(quiz.getMode());
        dto.setQuestions(questions);

        return dto;
    }



}