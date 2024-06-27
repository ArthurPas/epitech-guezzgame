package com.back.guessgame.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

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

	@ManyToOne
	private User user;

	@ManyToMany(mappedBy = "parties")
	private Set<Game> games;
}
