package com.ensias.spaceforces.option;

import com.ensias.spaceforces.option.dto.OptionDTO;
import com.ensias.spaceforces.question.Question;
import com.ensias.spaceforces.question.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OptionService {

    private final OptionRepository optionRepository;
    private final QuestionRepository questionRepository;

    public OptionDTO createOption(OptionDTO optionDTO) {
        Question question = questionRepository.findById(optionDTO.getQuestionId())
                .orElseThrow(() -> new RuntimeException("Question not found"));

        Option option = new Option();
        option.setQuestion(question);
        option.setValid(optionDTO.isValid());
        option.setOptionText(optionDTO.getOptionText());

        Option savedOption = optionRepository.save(option);
        return convertToDTO(savedOption);
    }

    public List<OptionDTO> getAllOptions() {
        return optionRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    public OptionDTO getOptionById(Long id) {
        Option option = optionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Option not found with id: " + id));
        return convertToDTO(option);
    }

    private OptionDTO convertToDTO(Option option) {
        OptionDTO dto = new OptionDTO();
        dto.setId(option.getId());
        dto.setQuestionId(option.getQuestion().getId());
        dto.setValid(option.isValid());
        dto.setOptionText(option.getOptionText());
        return dto;
    }
}