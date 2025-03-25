package com.ensias.spaceforces.option.dto;

import lombok.Data;

@Data
public class OptionDTO {
    private Long id;
    private Long questionId;
    private boolean valid;
    private String optionText;
}