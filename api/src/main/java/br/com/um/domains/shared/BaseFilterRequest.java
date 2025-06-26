package br.com.um.domains.shared;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class BaseFilterRequest {
    private int number = 0;
    private int size = 10;
    private String sortField = "id";
    private String sortDirection = "asc";
}
