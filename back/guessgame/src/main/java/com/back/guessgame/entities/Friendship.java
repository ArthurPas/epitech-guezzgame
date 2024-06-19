package com.back.guessgame.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "friendship")
@IdClass(FriendshipId.class)
public class Friendship {
	@Id
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	@Id
	@ManyToOne
	@JoinColumn(name = "user_id_friend")
	private User friend;

	@Id
	private Long id;
}
