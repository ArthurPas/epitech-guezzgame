package com.back.guessgame.controllers;

import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.FriendDto;
import com.back.guessgame.repository.entities.User;
import com.back.guessgame.services.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friendship")
public class FriendshipController {

	@Autowired
	private UserRepository userRepository;

	private FriendService friendService;

	public FriendshipController(UserRepository userRepository) {
		this.userRepository = userRepository;
		this.friendService = new FriendService(userRepository);
	}

	@PostMapping("/new/{personalId}")
	public Long createFriendship(@PathVariable long personalId, @RequestBody FriendDto newFriend) {
		return friendService.addFriend(personalId, newFriend.getId());
	}

	@GetMapping("/{id}")
	public List<FriendDto> getFriendshipById(@PathVariable Long id) {
		User user = userRepository.findById(id).orElse(null);
		return friendService.getFriends(id);
	}
}
