package com.ensias.spaceforces.option.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OptionInfosDTO {
    private Long id;
    @NotNull(message = "Specify if it's valid or not")
    private boolean valid;
    @NotNull(message = "Text is required")
    private String optionText;
}