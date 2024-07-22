package com.back.guessgame.controllers;

import com.back.guessgame.repository.BetOptionRepository;
import com.back.guessgame.repository.BetRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.BetDto;
import com.back.guessgame.repository.dto.FriendDto;
import com.back.guessgame.repository.dto.StatDto;
import com.back.guessgame.repository.dto.UserDto;
import com.back.guessgame.repository.entities.User;
import com.back.guessgame.services.StatService;
import com.back.guessgame.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
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
	private final BetRepository betRepository;
	private final BetOptionRepository betOptionRepository;
	private final StatService statService;
	Logger logger = LoggerFactory.getLogger(UserController.class);
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserService userService;
	@Autowired
	private AuthenticationManager authenticationManager;

	public UserController(UserRepository userRepository, BetRepository betRepository, BetOptionRepository betOptionRepository, BetRepository gamblingRepository) {
		this.userRepository = userRepository;
		this.betRepository = betRepository;
		this.betOptionRepository = betOptionRepository;
		this.userService = new UserService(userRepository, gamblingRepository, betOptionRepository);
		this.statService = new StatService(userRepository);
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

	@PostMapping("/placeBet")
	public void placeBet(@RequestBody BetDto betDto) {
		SecurityContext sc = SecurityContextHolder.getContext();
		Authentication auth = sc.getAuthentication();
		String login = auth.getPrincipal().toString();
		User user = userRepository.findByLoginOrMail(login, "").orElse(null);
		if(user != null) {
			userService.createBet(betDto, user);
		}
	}


}
