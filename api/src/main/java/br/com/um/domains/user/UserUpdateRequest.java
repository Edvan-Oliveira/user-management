package br.com.um.domains.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequest {

    @NotBlank(message = "Nome é obrigatório.")
    @Size(min = 3, max = 50, message = "Nome precisa ter entre {min} e {max} caracteres")
    private String name;

    @NotBlank(message = "E-mail é obrigatório.")
    @Email(message = "E-mail inválido.")
    @Size(max = 60, message = "E-mail precisa ter até {max} caracteres")
    private String email;

    @NotBlank(message = "Senha é obrigatória.")
    @Size(min = 3, max = 50, message = "Senha precisa ter entre {min} e {max} caracteres")
    private String password;

    @NotBlank(message = "Confirmação da senha é obrigatório.")
    @Size(min = 3, max = 50, message = "Confirmação de senha precisa ter entre {min} e {max} caracteres")
    private String passwordConfirmation;

}
