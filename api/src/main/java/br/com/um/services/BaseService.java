package br.com.um.services;

import br.com.um.domains.shared.BaseFilterRequest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public abstract class BaseService {

    protected Pageable getPageableForSearch(BaseFilterRequest filter) {
        Sort sort = filter.getSortDirection().equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(filter.getSortField()).ascending()
                : Sort.by(filter.getSortField()).descending();
        return PageRequest.of(filter.getNumber(), filter.getSize(), sort);
    }

}
