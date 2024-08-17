package com.back.guessgame.repository.dto;

import com.back.guessgame.repository.entities.Game;
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
	private String urlPicture;

	public GameDto(Game game) {
		this.id = game.getId();
		this.urlPicture = game.getUrlPicture();
		this.name = game.getName();
		this.nbPlayerMax = game.getNbPlayerMax();
		this.nbPlayerMin = game.getNbPlayerMin();
		this.rules = game.getRules();
		this.isRemoteCompatible = game.getIsRemoteCompatible();
	}
}
