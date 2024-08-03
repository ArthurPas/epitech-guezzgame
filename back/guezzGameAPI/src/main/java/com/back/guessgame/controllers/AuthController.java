package com.back.guessgame.controllers;

import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.LoginDto;
import com.back.guessgame.repository.dto.LoginResponse;
import com.back.guessgame.repository.dto.SignUpDto;
import com.back.guessgame.repository.entities.User;
import com.back.guessgame.services.JwtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

	Logger logger = LoggerFactory.getLogger(UserController.class);
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	public AuthController(JwtService jwtService) {
		this.jwtService = jwtService;
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> authenticateUser(@RequestBody LoginDto loginDto) {

		UsernamePasswordAuthenticationToken authReq = new UsernamePasswordAuthenticationToken(loginDto.getLogin(), loginDto.getPassword());
		Authentication auth = authenticationManager.authenticate(authReq);
		SecurityContext sc = SecurityContextHolder.getContext();
		sc.setAuthentication(auth);
		String jwtToken = jwtService.generateToken(userRepository.findByLoginOrMail(loginDto.getLogin(), "").orElse(null));

		LoginResponse loginResponse = new LoginResponse();
		loginResponse.setToken(jwtToken);
		loginResponse.setExpiresIn(jwtService.getExpirationTime());
		return ResponseEntity.ok(loginResponse);
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody SignUpDto signUpDto) {

		// add check for username exists in a DB
		if(userRepository.existsByMail(signUpDto.getLogin())) {
			return new ResponseEntity<>("Login is already taken!", HttpStatus.BAD_REQUEST);
		}

		// add check for email exists in DB
		if(userRepository.existsByMail(signUpDto.getMail())) {
			return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
		}

		// create user object
		User user = new User();
		user.setLogin(signUpDto.getLogin());
		user.setMail(signUpDto.getMail());
		user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
		user.setPicture(signUpDto.getPicture());
		userRepository.save(user);
		String jwtToken = jwtService.generateToken(userRepository.findByLoginOrMail(signUpDto.getLogin(), "").orElse(null));

		LoginResponse loginResponse = new LoginResponse();
		loginResponse.setToken(jwtToken);
		loginResponse.setExpiresIn(jwtService.getExpirationTime());
		return ResponseEntity.ok(loginResponse);
	}
}