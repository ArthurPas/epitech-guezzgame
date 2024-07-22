package com.back.guessgame.repository.dto;

import lombok.Data;

@Data
public class BetDto {
	Long userId;
	Long betId;
	Long betOptionId;
	Integer betAmount;

}
