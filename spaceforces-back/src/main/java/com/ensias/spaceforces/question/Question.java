package com.ensias.spaceforces.question;

import com.ensias.spaceforces.quiz.Quiz;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "questions")
@Data
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @Column(nullable = false)
    private int points;

    @Column(length = 255)
    private String tags;

    @Column(name = "question_text", nullable = false)
    private String questionText;

    @Column(name = "correct_option", nullable = false)
    private char correctOption;

}