package com.back.guessgame.repository.dto;

import lombok.Data;

@Data
public class ItemDto {

	private Long id;
	private String name;
	private String description;
	private Integer price;
	private Float rarity;
	private String picture;
}
