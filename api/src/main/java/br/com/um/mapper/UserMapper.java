package br.com.um.mapper;

import br.com.um.domains.user.User;
import br.com.um.domains.user.UserCreateRequest;
import br.com.um.domains.user.UserResponse;
import br.com.um.domains.user.UserUpdateRequest;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    User toUser(UserCreateRequest dto);

    User toUser(UserUpdateRequest dto);

    UserResponse toUserResponse(User entity);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id")
    void copyImmutableData(User source, @MappingTarget User destination);

    default User userToUpdate(UserUpdateRequest dto, User originalEntity) {
        User userToSave = toUser(dto);
        copyImmutableData(originalEntity, userToSave);
        return userToSave;
    }

}
