package com.back.guessgame.repository.dto;

import lombok.Data;

@Data
public class BetPojo {
	Long userId;
	Long betId;
	Long betOptionId;
	Integer betAmount;

}
