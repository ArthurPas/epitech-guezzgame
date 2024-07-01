package com.back.guessgame.repository.dto;

import lombok.Data;

import java.util.List;

@Data
public class PartyResultDto {

	private long partyCode;
	private List<Score> scores;

	public PartyResultDto(List<Score> scores, long partyCode) {
		this.scores = scores;
		this.partyCode = partyCode;
	}

}
