package com.back.guessgame.repository.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Set;

@Data
@AllArgsConstructor
public class NewPartyDto {
	private String userLogin;
	private Long partyCode;
	private String gameName;
}
