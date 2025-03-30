package com.ensias.spaceforces.question;

import com.ensias.spaceforces.option.dto.OptionInfosDTO;
import com.ensias.spaceforces.question.dto.QuestionDTO;
import com.ensias.spaceforces.quiz.Quiz;
import com.ensias.spaceforces.quiz.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ensias.spaceforces.option.*;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;
    private final OptionRepository optionRepository;



    public QuestionDTO createQuestion(QuestionDTO questionDTO) {
        Quiz quiz = quizRepository.findById(questionDTO.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        Question question = new Question();
        question.setQuiz(quiz);
        question.setPoints(questionDTO.getPoints());
        question.setTags(questionDTO.getTags());
        question.setQuestionText(questionDTO.getQuestionText());
        question.setCorrectOption(questionDTO.getCorrectOption());

        Question savedQuestion = questionRepository.save(question);
        return convertToDTO(savedQuestion);
    }

    public List<Question> getAllQuestions() {
        return new ArrayList<>(questionRepository.findAll());
    }
    public Question getQuestionById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
    }

    private QuestionDTO convertToDTO(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setQuizId(question.getQuiz().getId());
        dto.setPoints(question.getPoints());
        dto.setTags(question.getTags());
        dto.setQuestionText(question.getQuestionText());
        dto.setCorrectOption(question.getCorrectOption());

        return dto;
    }

    @Transactional(readOnly = true)
    public List<OptionInfosDTO> getQuestionOptions(Long questionId) {
        return optionRepository.findByQuestionId(questionId).stream()
                .map(this::convertToOptionDTO)
                .toList();
    }


    private OptionInfosDTO convertToOptionDTO(Option option) {
        OptionInfosDTO dto = new OptionInfosDTO();
        dto.setId(option.getId());
        dto.setOptionText(option.getOptionText());
        dto.setValid(option.isValid());
        return dto;
    }
}
