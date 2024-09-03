package com.back.guessgame.repository.dto;

import com.back.guessgame.repository.entities.User;
import lombok.Data;

@Data
public class SocketScoreResult {
	private String login;
	private int score;
	private String profilePicture;

	public SocketScoreResult(User user, int i) {
		this.login = user.getLogin();
		this.score = i;
		this.profilePicture = user.getPicture();
	}
}
