package com.example.todoapp.web;

import com.example.todoapp.model.TodoUserDetails;
import com.example.todoapp.model.User;
import com.example.todoapp.model.UserRepository;
import com.example.todoapp.utils.AuthenticationException;
import com.example.todoapp.utils.JwtTokenRequest;
import com.example.todoapp.utils.JwtTokenResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import com.example.todoapp.utils.JwtTokenUtil;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Objects;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Value("${jwt.http.request.header}")
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtTokenRequest authenticationRequest) throws AuthenticationException {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final TodoUserDetails userDetails = (TodoUserDetails) userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        ResponseEntity<?> response = ResponseEntity.ok(new JwtTokenResponse(token, userDetails.getUserDetails()));
        return response;
    }

    @RequestMapping(value = "/refresh", method = RequestMethod.GET)
    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
        String authToken = request.getHeader(tokenHeader);
        final String token = authToken.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        TodoUserDetails user = (TodoUserDetails) userDetailsService.loadUserByUsername(username);

        if (jwtTokenUtil.canTokenBeRefreshed(token)) {
            String refreshedToken = jwtTokenUtil.refreshToken(token);
            return ResponseEntity.ok(new JwtTokenResponse(refreshedToken));
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public ResponseEntity<?> signup(@RequestBody JwtTokenRequest request) {
        try {
            User newUser = new User(request.getUsername(), request.getPassword());
            userRepository.save(newUser);

            authenticate(request.getUsername(), request.getPassword());

            final TodoUserDetails userDetails = (TodoUserDetails) userDetailsService.loadUserByUsername(request.getUsername());

            final String token = jwtTokenUtil.generateToken(userDetails);
            return ResponseEntity.status(HttpStatus.CREATED).body(new JwtTokenResponse(token, userDetails.getUserDetails()));
        } catch (Exception ex){
            System.out.println("Error in signup Reason: " + ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Didn't work");
        }

    }

    @RequestMapping(value = "/me", method = RequestMethod.GET)
    public ResponseEntity<?> getSelf(Principal principal) {
        String username = principal.getName();
        TodoUserDetails userDetails = (TodoUserDetails) userDetailsService.loadUserByUsername(username);
        return ResponseEntity.ok(userDetails.getUserDetails());
    }

    @ExceptionHandler({ AuthenticationException.class })
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }


    private void authenticate(String username, String password) {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new AuthenticationException("USER_DIASBLED", e);
        } catch (BadCredentialsException e) {
            throw new AuthenticationException("INVALID_CREDENTIALS", e);
        }
    }
}
