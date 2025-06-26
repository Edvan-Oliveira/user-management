package br.com.um.domains.shared;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Arrays;
import java.util.Optional;

@Slf4j
@Getter
@AllArgsConstructor
public enum ConstraintsEnum {

    USER_EMAIL_UNIQUE("E-mail já cadastrado!");

    private final String message;

    public static String searchConstraintMessage(String messageConstraint, DataIntegrityViolationException ex) {
        Optional<ConstraintsEnum> constraint = Arrays.stream(values())
                .filter(constraintsEnum -> messageConstraint.contains(constraintsEnum.name().toLowerCase()))
                .findFirst();

        if (constraint.isPresent()) {
            return constraint.get().getMessage();
        }

        log.error(messageConstraint, ex);

        return "Um erro de integridade ocorreu. Verifique os dados informados.";
    }

}
