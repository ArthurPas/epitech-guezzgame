package com.back.guessgame.services;

import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.FriendDto;
import com.back.guessgame.repository.entities.User;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;

public class FriendService {
	private final UserRepository friendRepository;

	public FriendService(UserRepository friendRepository) {
		this.friendRepository = friendRepository;
	}

	public Long addFriend(Long userId, Long friendId) {
		User user = friendRepository.findById(userId).orElse(null);
		User friend = friendRepository.findById(friendId).orElse(null);
		if(user != null && friend != null) {
			user.getFriendships().add(friend);
			friendRepository.save(user);
			return userId;
		}
		throw HttpClientErrorException.create(HttpStatus.NOT_FOUND, "User not found", null, null, null);
	}

	public List<FriendDto> getFriends(Long userId) {
		User user = friendRepository.findById(userId).orElse(null);
		if(user != null) {
			List<FriendDto> friends = new ArrayList<>();
			for (User friend : user.getFriendships()) {
				friends.add(new FriendDto(friend));
			}
			return friends;
		}
		return null;
	}
}
