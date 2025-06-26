package br.com.um.services;

import br.com.um.domains.user.UserCreateRequest;
import br.com.um.domains.user.UserFilterRequest;
import br.com.um.domains.user.UserResponse;
import br.com.um.domains.user.UserUpdateRequest;
import org.springframework.data.domain.Page;

public interface UserService {

    UserResponse insert(UserCreateRequest dto);

    UserResponse update(Integer id, UserUpdateRequest dto);

    void delete(Integer id);

    Page<UserResponse> search(UserFilterRequest filter);

    UserResponse findById(Integer id);
}
