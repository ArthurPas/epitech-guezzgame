package com.back.guessgame.repository.dto;

import com.back.guessgame.repository.entities.Game;
import com.back.guessgame.repository.entities.Party;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.transaction.Transactional;
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
@Transactional
public class GeneralPartyDto {
	private Long id;
	private Integer leaderRank;
	private Integer nbPoints;
	private Long userId;
	@JsonProperty("gamesId")
	private Set<Long> gamesId;
	private Long partyCode;


	public GeneralPartyDto(Party party) {
		this.gamesId = new HashSet<>();
		Logger logger = LoggerFactory.getLogger(GeneralPartyDto.class);
		this.id = party.getId();
		this.userId = party.getUser().getId();
		this.partyCode = party.getPartyCode();
		this.leaderRank = party.getLeaderRank();
		this.nbPoints = party.getNbPoints();
		for (Game game : party.getGames()) {
			this.gamesId.add(game.getId());
		}
		logger.warn(this.getGamesId().toString());
	}
}
