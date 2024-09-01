package com.back.guessgame.repository.dto;

import lombok.Data;

@Data
public class UserBetDto {
	private long userId;
	private Integer betAmount;

	public UserBetDto(long userId, Integer betAmount) {
		this.userId = userId;
		this.betAmount = betAmount;
	}
}
