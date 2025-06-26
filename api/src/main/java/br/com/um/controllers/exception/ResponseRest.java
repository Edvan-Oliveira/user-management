package br.com.um.controllers.exception;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Builder
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ResponseRest {
    private LocalDateTime timestamp;
    private Set<String> messages;
}
