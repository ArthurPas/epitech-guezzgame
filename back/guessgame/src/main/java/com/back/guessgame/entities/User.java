package com.back.guessgame.entities;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.HashCodeExclude;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String mail;

	@Column(nullable = false)
	private String login;

	@Column(nullable = false)
	private String password;

	private String picture;
	private Integer nbCoin;
	private Boolean isVip;
	private Integer xpPoint;


	@OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
	private Set<Friendship> friendships;

	@HashCodeExclude
	@OneToMany(mappedBy = "user")
	private List<Inventory> items;

	@HashCodeExclude
	@OneToMany(targetEntity = Party.class)
	private Set<Party> parties;
}
