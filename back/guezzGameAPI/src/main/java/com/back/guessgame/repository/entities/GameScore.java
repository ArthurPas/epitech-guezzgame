package com.back.guessgame.repository.entities;

import com.back.guessgame.repository.dto.ActionType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
	private Long id;
	@ManyToOne(targetEntity = User.class)
	private Long userId;
	@ManyToOne(targetEntity = Game.class)
	private Long gameId;
	@ManyToOne(targetEntity = Party.class)
	private Long partyId;
	private ActionType actionType;
	private int points;
	private Date date;


}
