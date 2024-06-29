package com.back.guessgame.entities.dto;

import com.back.guessgame.entities.Game;
import com.back.guessgame.entities.Party;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GeneralPartyDto {
	private Long id;
	private Integer leaderRank;
	private Integer nbPoints;
	private long userId;
	@JsonProperty("gamesId")
	private Set<Long> gamesId = new HashSet<>();
	private long partyCode;


	public GeneralPartyDto(Party party) {
		Logger logger = LoggerFactory.getLogger(GeneralPartyDto.class);
		this.id = party.getId();
		this.partyCode = party.getPartyCode();
		this.leaderRank = party.getLeaderRank();
		this.nbPoints = party.getNbPoints();
		this.userId = party.getUser().getId();
		for (Game game : party.getGames()) {
			logger.warn("titi" + game.getId());
			this.gamesId.add(game.getId());
		}
		logger.warn(this.getGamesId().toString() + "toto");
	}
}
