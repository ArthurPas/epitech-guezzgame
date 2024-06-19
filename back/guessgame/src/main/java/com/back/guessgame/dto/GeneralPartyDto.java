package com.back.guessgame.dto;

import com.back.guessgame.entities.Game;
import com.back.guessgame.entities.Party;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class GeneralPartyDto extends Party {
	private Long id;
	private Integer rank;
	private Integer nbPoints;
	private long userId;
	private Set<Long> gamesId;
	private long partyCode;


	public GeneralPartyDto(Party party) {
		Logger logger = LoggerFactory.getLogger(GeneralPartyDto.class);
		this.id = party.getId();
		this.partyCode = party.getPartyCode();
		this.rank = party.getRank();
		this.nbPoints = party.getNbPoints();
		this.userId = party.getUser().getId();
		this.gamesId = party.getGames().stream().map(Game::getId).collect(Collectors.toSet());
		/*Beau gosse nan ??*/
	}
}
