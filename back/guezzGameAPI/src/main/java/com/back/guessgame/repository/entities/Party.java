package com.back.guessgame.repository.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "party")
public class Party {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private Long id;

	private Integer leaderRank;

	private Integer nbPoints;

	@Column(name = "party_code")
	private long partyCode = -1;

	@ManyToOne(targetEntity = User.class)
	private User user;

	@ManyToMany(targetEntity = Game.class)
	@JoinTable(name = "games_parties", joinColumns = @JoinColumn(name = "game_id"), inverseJoinColumns = @JoinColumn(name = "party_id"))
	private List<Game> games = new ArrayList<>();
}
