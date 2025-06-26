package br.com.um.domains.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private Integer id;
    private String name;
    private String email;
    private String password;
}
