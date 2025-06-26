package br.com.um.services.impl;

import br.com.um.base.AbstractServiceUnitTest;
import br.com.um.domains.user.UserCreateRequest;
import br.com.um.services.exception.BusinessException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.catchThrowable;

class UserServiceImplTest extends AbstractServiceUnitTest {

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    @DisplayName("Deve lançar uma exceção quando tentar cadastrar usuário com senhas divergentes.")
    void shouldThrowBusinessExeptionWhenPasswordsDiffer() {
        UserCreateRequest dto = getUserCreateRequestWithPasswordsDiffer();
        Throwable throwable = catchThrowable(() -> userService.insert(dto));
        assertThat(throwable)
                .isInstanceOf(BusinessException.class)
                .hasMessage("Senhas divergentes!");
    }
}