package com.back.guessgame.controllers;

import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.BetPojo;
import com.back.guessgame.repository.dto.FriendDto;
import com.back.guessgame.repository.dto.StatDto;
import com.back.guessgame.repository.dto.UserDto;
import com.back.guessgame.repository.entities.User;
import com.back.guessgame.services.JwtService;
import com.back.guessgame.services.StatService;
import com.back.guessgame.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	private final UserRepository userRepository;
	private final StatService statService;
	Logger logger = LoggerFactory.getLogger(UserController.class);
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserService userService;

	@Autowired
	private JwtService jwtService;

	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
		this.userService = new UserService(userRepository);
		this.statService = new StatService(userRepository);
	}

	@GetMapping("/list")
	public List<UserDto> getAllUsers() {

		return userService.findAll();
	}

	@GetMapping("/{id}")
	public UserDto getUserById(@PathVariable Long id) {
		logger.info(SecurityContextHolder.getContext().toString());
		return userService.findById(id).orElse(null);
	}

	//TODO: put route for changing password
	@PutMapping("/{id}")
	public UserDto updateUser(@PathVariable Long id, @RequestBody UserDto userDetails) {
		User user = userRepository.findById(id).orElse(null);
		if(user != null) {
			user.setMail(userDetails.getMail());
			user.setLogin(userDetails.getLogin());
			user.setPicture(userDetails.getPicture());
			user.setNbCoin(userDetails.getNbCoin());
			user.setIsVip(userDetails.getIsVip());
			user.setXpPoint(userDetails.getXpPoint());
			userRepository.save(user);
			return new UserDto(user);
		}
		return null;
	}


	@GetMapping("/friends/{id}")
	public Set<FriendDto> getFriend(@PathVariable long id) {
		User user = userRepository.findById(id).orElse(null);
		Set<FriendDto> friendDtos = new HashSet<>();
		if(user != null) {
			List<User> friendships = user.getFriendships();
			for (User otherUser : friendships) {
				FriendDto friend = new FriendDto();
				friend.setId(otherUser.getId());
				friend.setLogin(otherUser.getLogin());
				friendDtos.add(friend);
			}
		}
		return friendDtos;
	}

	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable Long id) {
		userRepository.deleteById(id);
	}


	@GetMapping("/stats/{id}")
	public StatDto getStats(@PathVariable long id) {
		return statService.getStat(id);
	}

	@GetMapping("/getMe")
	public UserDto getMyInfos(@RequestHeader(name = "Authorization") String token) {

		String login = jwtService.extractUsername(token);
		User user = userRepository.findByLoginOrMail(login, "").orElse(null);
		return new UserDto(user);
	}

	@PostMapping("/placeBet")
	public UserDto placeBet(@RequestHeader(name = "Authorization") String token, @RequestBody BetPojo betPojo) {

		String login = jwtService.extractUsername(token);
		User user = userRepository.findByLoginOrMail(login, "").orElse(null);

		assert user != null;
		logger.info("token : " + token);
		logger.info("user : " + user);
		userService.createBet(betPojo, user);
		return new UserDto(user);
	}
}
