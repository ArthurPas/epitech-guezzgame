package com.back.guessgame.controllers;

import com.back.guessgame.entities.Friendship;
import com.back.guessgame.repository.FriendshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/friendships")
public class FriendshipController {

	@Autowired
	private FriendshipRepository friendshipRepository;

	@PostMapping
	public Friendship createFriendship(@RequestBody Friendship friendship) {
		return friendshipRepository.save(friendship);
	}
}
