package com.back.guessgame.repository.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "inventory")
@IdClass(InventoryId.class)
public class Inventory {

	@Id
	private Long id;

	@ManyToOne
	@Id
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@Id
	@JoinColumn(name = "item_id")
	private Item item;

	@JoinColumn(name = "acquired_date")
	private Date acquiredDate;
}
