package com.back.guessgame.controllers;

import com.back.guessgame.dto.FriendDto;
import com.back.guessgame.dto.UserDto;
import com.back.guessgame.entities.Friendship;
import com.back.guessgame.entities.User;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;

	@Autowired
	private UserService userService;

	Logger logger = LoggerFactory.getLogger(UserController.class);

	public UserController(UserRepository userRepository) {
		this.userRepository = userRepository;
		this.userService = new UserService(userRepository);
	}

	@GetMapping("/list")
	public List<UserDto> getAllUsers() {

		return userService.findAll();
	}

	@GetMapping("/{id}")
	public UserDto getUserById(@PathVariable Long id) {
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
			Set<Friendship> friendships = user.getFriendships();
			for (Friendship friendship : friendships) {
				FriendDto friend = new FriendDto();
				friend.setId(friendship.getFriend().getId());
				friend.setLogin(friendship.getFriend().getLogin());
				friendDtos.add(friend);
			}
		}
		return friendDtos;
	}
	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable Long id) {
		userRepository.deleteById(id);
	}
}
