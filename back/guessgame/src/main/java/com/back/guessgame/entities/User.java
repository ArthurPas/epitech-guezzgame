package com.back.guessgame.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.builder.HashCodeExclude;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("id")
	private Long id;

	@Column(nullable = false)
	@JsonProperty("mail")
	private String mail;

	@Column(nullable = false)
	@JsonProperty("login")
	private String login;

	@Column(nullable = false)
	@JsonProperty("password")
	private String password;
	@JsonProperty("picture")
	private String picture;
	@JsonProperty("nbCoin")
	private Integer nbCoin;
	@JsonProperty("isVip")
	private Boolean isVip;
	@JsonProperty("xpPoint")
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
