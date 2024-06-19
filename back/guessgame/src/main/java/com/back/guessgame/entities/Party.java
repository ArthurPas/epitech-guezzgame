package com.back.guessgame.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "party")
public class Party {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private Long id;

	private Integer rank;

	private Integer nbPoints;

	private long partyCode;

	@ManyToOne
	private User user;

	@OneToMany(mappedBy = "id")
	private Set<Game> games;
}
