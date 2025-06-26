package br.com.um.base;


import br.com.um.domains.user.UserCreateRequest;

public abstract class TestFactory {

    public static final String USER_API_ENDPOINT = "/api/users";

    protected UserCreateRequest getUserCreateRequest() {
        return UserCreateRequest.builder()
                .name("Teste")
                .email("teste@email.com")
                .password("123456")
                .passwordConfirmation("123456")
                .build();
    }

    protected UserCreateRequest getUserCreateRequestWithPasswordsDiffer() {
        return UserCreateRequest.builder()
                .name("Teste")
                .email("teste@email.com")
                .password("123456")
                .passwordConfirmation("654321")
                .build();
    }

}
