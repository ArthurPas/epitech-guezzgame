package com.back.guessgame.repository.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Entity
@Getter
@Setter
@Table(name = "item")
public class Item {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String description;
	private Integer price;
	private Float rarity;
	private String picture;

	@ManyToMany(mappedBy = "items")
	private List<User> users;
}
