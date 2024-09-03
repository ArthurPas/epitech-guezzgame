package com.back.guessgame.repository.dto;

import com.back.guessgame.repository.entities.UserBet;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class BetOptionDto {
	private Long betId;
	private String description;
	private float ods;
	private List<UserBetDto> gamblerBets = new ArrayList<>();

	public BetOptionDto(Long betId, String description, float ods, List<UserBet> gamblerBets) {
		this.betId = betId;
		this.description = description;
		this.ods = ods;
		if(gamblerBets == null) return;
		for (UserBet gamblerBet : gamblerBets) {
			this.gamblerBets.add(new UserBetDto(gamblerBet.getUser().getId(), gamblerBet.getBetAmount()));
		}
	}
}
