package com.ensias.spaceforces.option;

import com.ensias.spaceforces.question.Question;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "options")
@Data
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(nullable = false)
    private boolean valid;

    @Column(name = "option_text", nullable = false)
    private String optionText;

}
