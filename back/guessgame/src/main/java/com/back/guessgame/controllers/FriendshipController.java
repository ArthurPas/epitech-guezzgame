package com.back.guessgame.controllers;

import com.back.guessgame.entities.Friendship;
import com.back.guessgame.repository.FriendshipRepository;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/friendship")
public class FriendshipController {

	@Autowired
	private FriendshipRepository friendshipRepository;

	@Hidden
	@PostMapping
	public Friendship createFriendship(@RequestBody Friendship friendship) {
		return friendshipRepository.save(friendship);
	}
}
