package com.back.guessgame.repository.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
}
