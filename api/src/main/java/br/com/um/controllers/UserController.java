package br.com.um.controllers;

import br.com.um.domains.user.UserCreateRequest;
import br.com.um.domains.user.UserFilterRequest;
import br.com.um.domains.user.UserResponse;
import br.com.um.domains.user.UserUpdateRequest;
import br.com.um.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponse> insert(@RequestBody @Valid UserCreateRequest dto) {
        UserResponse response = userService.insert(dto);
        URI location = URI.create("/api/users/" + response.getId());
        return ResponseEntity.created(location).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> update(@PathVariable Integer id, @RequestBody @Valid UserUpdateRequest dto) {
        UserResponse response = userService.update(id, dto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<PagedModel<UserResponse>> search(@ModelAttribute UserFilterRequest filter) {
        Page<UserResponse> response = userService.search(filter);
        return ResponseEntity.ok(new PagedModel<>(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findById(@PathVariable Integer id) {
        UserResponse response = userService.findById(id);
        return ResponseEntity.ok(response);
    }

}
