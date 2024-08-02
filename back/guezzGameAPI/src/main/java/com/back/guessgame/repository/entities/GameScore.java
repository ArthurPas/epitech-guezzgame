package com.back.guessgame.repository.entities;

import com.back.guessgame.repository.dto.ActionType;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
@Table(name = "game_score")
public class GameScore {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne(targetEntity = User.class)
	private User user;
	@ManyToOne(targetEntity = Game.class)
	private Game game;
	@ManyToOne(targetEntity = Party.class)
	private Party party;
	private int nbRound;
	private ActionType actionType;
	private int points;
	private Date date;


}
