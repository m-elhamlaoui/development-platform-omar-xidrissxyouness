package com.ensias.spaceforces.question.dto;
import com.ensias.spaceforces.option.dto.OptionInfosDTO;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

@Data
public class QuestionWithOptionsDTO {
    @Min(1)
    private int points;
    private String tags;
    @NotNull(message = "Text is required")
    private String questionText;
    private char correctOption;
    private List<OptionInfosDTO> options;  // List of options for this question
}