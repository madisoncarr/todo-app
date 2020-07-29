package com.example.todoapp.web;

import com.example.todoapp.model.TodoUserDetails;
import com.example.todoapp.model.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpSession;

@SessionAttributes({"currentUser"})
@RestController
public class LoginController {
    private static final Logger log = LogManager.getLogger(LoginController.class);
//TODO: may need to get rid of this controller
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    @RequestMapping(value = "/loginFailed", method = RequestMethod.GET)
    public String loginError(Model model) {
        log.info("Login attempt failed");
        model.addAttribute("error", "true");
        return "login failed";
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public String logout(SessionStatus session) {
        SecurityContextHolder.getContext().setAuthentication(null);
        session.setComplete();
        return "redirect:/welcome";
    }

    @RequestMapping(value = "/postLogin", method = RequestMethod.POST)
    public String postLogin(Model model, HttpSession session) {
        log.info("postLogin()");

        // read principal out of security context and set it to session
        UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        validatePrincipal(authentication.getPrincipal());
        User loggedInUser = ((TodoUserDetails) authentication.getPrincipal()).getUserDetails();

        model.addAttribute("currentUser", loggedInUser.getEmail());
        session.setAttribute("userId", loggedInUser.getId());
        return "redirect:/wallPage";
    }

    private void validatePrincipal(Object principal) {
        if (!(principal instanceof User)) {
            throw new IllegalArgumentException("Principal cannot be null!");
        }
    }
}
