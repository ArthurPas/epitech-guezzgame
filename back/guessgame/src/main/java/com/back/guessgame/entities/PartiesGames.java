package com.back.guessgame.entities;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "games_parties")
public class PartiesGames {

	@Id
	private Long id;
	@ManyToOne
	@JoinColumn(name = "party_id")
	private Party party;

	@ManyToOne
	@JoinColumn(name = "game_id")
	private Game game;

}
