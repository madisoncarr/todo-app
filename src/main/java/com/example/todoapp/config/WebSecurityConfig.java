package com.example.todoapp.config;

import com.example.todoapp.model.UserRepository;
import com.example.todoapp.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsServiceImpl();
    }

    //TODO: left out passwordEncoder() and authenticationProvider() beans: https://dzone.com/articles/spring-security-5-form-login-with-database-provide

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests().antMatchers("/wallPage").authenticated()
                .and()
                .authorizeRequests().antMatchers("/login", "/resource/**").permitAll()
                .and()
                .formLogin().loginPage("/login").usernameParameter("email").permitAll()
                .loginProcessingUrl("/doLogin")
                .successForwardUrl("/postLogin")
                .failureUrl("/loginFailed")
                .and()
                .logout().logoutUrl("/doLogout").logoutSuccessUrl("/logout").permitAll();
//                .and()
//                .csrf().disable();
    }
}
