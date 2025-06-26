package br.com.um.repositories.specification;

import br.com.um.domains.user.User;
import br.com.um.util.SpecificationUtil;
import org.springframework.data.jpa.domain.Specification;

public class UserSpecification {

    private UserSpecification() {
    }

    public static Specification<User> idEquals(String id) {
        return SpecificationUtil.equals("id", id);
    }

    public static Specification<User> nameContains(String name) {
        return SpecificationUtil.contains("name", name);
    }

    public static Specification<User> emailContains(String email) {
        return SpecificationUtil.contains("email", email);
    }

}
