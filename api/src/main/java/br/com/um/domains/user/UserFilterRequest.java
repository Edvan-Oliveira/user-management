package br.com.um.domains.user;

import br.com.um.domains.shared.BaseFilterRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserFilterRequest extends BaseFilterRequest {
    private String userId;
    private String userName;
    private String userEmail;
}
