package com.back.guessgame.repository.dto;

import com.back.guessgame.repository.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FriendDto {
	private Long id;
	private String login;

	public FriendDto(User user) {
		this.id = user.getId();
		this.login = user.getLogin();
	}
}
