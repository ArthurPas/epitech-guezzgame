package com.back.guessgame.repository.dto;

import com.back.guessgame.repository.entities.Item;
import lombok.Data;

@Data
public class ItemDto {

	private Long id;
	private String name;
	private String description;
	private Integer price;
	private Float rarity;
	private String picture;

	public ItemDto(Item item) {
		this.id = item.getId();
		this.name = item.getName();
		this.description = item.getDescription();
		this.price = item.getPrice();
		this.rarity = item.getRarity();
		this.picture = item.getPicture();
	}
}
