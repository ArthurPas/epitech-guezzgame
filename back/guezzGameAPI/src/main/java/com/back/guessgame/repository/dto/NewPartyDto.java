package com.back.guessgame.repository.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Set;

@Data

public class NewPartyDto {

	@JsonProperty("usersId")
	private Set<Long> users;
	private Long partyCode;
	@JsonProperty("gamesId")
	private Set<Long> gamesId;

	public NewPartyDto(Long partyCode) {
		this.partyCode = partyCode;
	}
}
