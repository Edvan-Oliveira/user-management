package br.com.um.controllers.exception;

import br.com.um.domains.shared.ConstraintsEnum;
import br.com.um.services.exception.BaseException;
import br.com.um.services.exception.BusinessException;
import br.com.um.services.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseRest> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        ResponseRest response = ResponseRest.builder()
                .messages(getValidationMessages(ex))
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(BAD_REQUEST).body(response);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ResponseRest> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        ResponseRest response = ResponseRest.builder()
                .messages(Set.of(ConstraintsEnum.searchConstraintMessage(ex.getMessage(), ex)))
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(BAD_REQUEST).body(response);
    }

    @ExceptionHandler({BusinessException.class, NotFoundException.class})
    public ResponseEntity<ResponseRest> handleBusinessException(BaseException ex) {
        ResponseRest response = ResponseRest.builder()
                .messages(Set.of(ex.getMessage()))
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(ex.getHttpStatus()).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseRest> handleGeneralException(Exception ex) {
        log.error(ex.getMessage(), ex);
        ResponseRest response = ResponseRest.builder()
                .messages(Set.of("Ocorreu um erro inesperado."))
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    private Set<String> getValidationMessages(MethodArgumentNotValidException ex) {
        return ex.getBindingResult().getAllErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage).collect(Collectors.toSet());
    }

}
