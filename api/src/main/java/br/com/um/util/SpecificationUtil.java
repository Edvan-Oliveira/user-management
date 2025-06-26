package br.com.um.util;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.ObjectUtils;

public final class SpecificationUtil {

    private SpecificationUtil() {}

    public static <T> Specification<T> equals(String attribute, Object value) {
        return (root, query, criteriaBuilder) ->
                ObjectUtils.isEmpty(value) ? null : criteriaBuilder.equal(root.get(attribute), value);
    }

    public static <T> Specification<T> contains(String attribute, String value) {
        return (root, query, criteriaBuilder) ->
                ObjectUtils.isEmpty(value) ? null
                        : criteriaBuilder.like(criteriaBuilder.lower(root.get(attribute)), "%" + value.toLowerCase() + "%");
    }

}