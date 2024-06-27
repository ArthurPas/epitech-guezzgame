package com.back.guessgame.dto;

import com.back.guessgame.entities.Game;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameDto {
	private Long id;

	private String name;
	private Integer nbPlayerMax;
	private Integer nbPlayerMin;
	private String rules;
	private Boolean isRemoteCompatible;

	public GameDto(Game game) {
		this.id = game.getId();
		this.name = game.getName();
		this.nbPlayerMax = game.getNbPlayerMax();
		this.nbPlayerMin = game.getNbPlayerMin();
		this.rules = game.getRules();
		this.isRemoteCompatible = game.getIsRemoteCompatible();
	}
}
