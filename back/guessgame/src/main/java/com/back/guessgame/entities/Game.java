package com.back.guessgame.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "game")
public class Game {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private Integer nbPlayerMax;
	private Integer nbPlayerMin;
	private String rules;
	private Boolean isRemoteCompatible;

	@OneToMany(mappedBy = "id")
	private List<Party> parties;
}
