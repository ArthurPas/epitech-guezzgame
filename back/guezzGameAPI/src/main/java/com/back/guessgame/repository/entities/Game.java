package com.back.guessgame.repository.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
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

	@ManyToMany(mappedBy = "games")
	private List<Party> parties;
}
