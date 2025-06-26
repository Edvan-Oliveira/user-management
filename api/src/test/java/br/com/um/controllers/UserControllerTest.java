package br.com.um.controllers;

import br.com.um.base.AbstractIntegrationTest;
import br.com.um.domains.user.UserCreateRequest;
import br.com.um.domains.user.UserResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class UserControllerTest extends AbstractIntegrationTest {

    @Test
    @DisplayName("Deve criar um usuário com sucesso")
    void shouldCreateUserSuccessfully() throws Exception {
        UserCreateRequest request = getUserCreateRequest();
        UserResponse response = performPostRequest(USER_API_ENDPOINT, request, UserResponse.class, status().isCreated());
        assertNotNull(response);
        assertNotNull(response.getId());
        assertEquals(request.getName(), response.getName());
        assertEquals(request.getEmail(), response.getEmail());
    }
}