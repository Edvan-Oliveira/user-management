package br.com.um.services.impl;

import br.com.um.domains.user.*;
import br.com.um.mapper.UserMapper;
import br.com.um.repositories.UserRepository;
import br.com.um.repositories.specification.UserSpecification;
import br.com.um.services.BaseService;
import br.com.um.services.UserService;
import br.com.um.services.exception.BusinessException;
import br.com.um.services.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl extends BaseService implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserResponse insert(UserCreateRequest dto) {
        validatePassword(dto.getPassword(), dto.getPasswordConfirmation());
        User user = userMapper.toUser(dto);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Override
    public UserResponse update(Integer id, UserUpdateRequest dto) {
        validatePassword(dto.getPassword(), dto.getPasswordConfirmation());
        User originalEntity = findEntityById(id);
        User userToUpdate = userMapper.userToUpdate(dto, originalEntity);
        return userMapper.toUserResponse(userRepository.save(userToUpdate));
    }

    @Override
    public void delete(Integer id) {
        User user = findEntityById(id);
        userRepository.delete(user);
    }

    @Override
    public Page<UserResponse> search(UserFilterRequest filter) {
        Pageable pageable = getPageableForSearch(filter);
        Specification<User> specification = getSearchSpecification(filter);
        Page<User> response = userRepository.findAll(specification, pageable);
        return response.map(userMapper::toUserResponse);
    }

    @Override
    public UserResponse findById(Integer id) {
        User user = findEntityById(id);
        return userMapper.toUserResponse(user);
    }

    private User findEntityById(Integer id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException("Usuário", id));
    }

    private Specification<User> getSearchSpecification(UserFilterRequest filter) {
        return UserSpecification.idEquals(filter.getUserId())
                .and(UserSpecification.nameContains(filter.getUserName()))
                .and(UserSpecification.emailContains(filter.getUserEmail()));
    }

    private void validatePassword(String password, String passwordConfirmation) {
        if (!password.equals(passwordConfirmation)) {
            throw new BusinessException("Senhas divergentes!");
        }
    }

}
