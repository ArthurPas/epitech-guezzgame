package com.back.guessgame.dto;

import com.back.guessgame.entities.Party;
import com.back.guessgame.entities.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class PartyResultDto {

	private long partyCode;
	private List<Score> scores;

	public PartyResultDto(List<Score> scores, long partyCode) {
		this.scores = scores;
		this.partyCode = partyCode;
	}

}
