package com.gonzaguinha.demo.alunos;

import jakarta.persistence.Embeddable;


@Embeddable
public class InfoMedica {

    private int faltasMed;
    private int totalFaltas;
    private String condSaude; // Descrição da condição

    private boolean restricaoAlim;
    private boolean medicacao;
    private boolean deficiencia;
    private boolean atencaoPsico;
    private boolean outros;


}
