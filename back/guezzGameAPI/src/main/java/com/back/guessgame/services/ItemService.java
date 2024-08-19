package com.back.guessgame.services;

import com.back.guessgame.repository.ItemRepository;
import com.back.guessgame.repository.dto.ItemDto;
import com.back.guessgame.repository.entities.Item;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
	private ItemRepository itemRepository;

	public ItemService(ItemRepository itemRepository) {
		this.itemRepository = itemRepository;
	}

	public List<Item> findAll() {
		return itemRepository.findAll();
	}

	public Item findById(Long id) {
		return itemRepository.findById(id).orElse(null);
	}

	public Item create(ItemDto itemDto) {
		Item newItem = new Item();
		newItem.setName(itemDto.getName());
		newItem.setDescription(itemDto.getDescription());
		newItem.setPrice(itemDto.getPrice());
		newItem.setRarity(itemDto.getRarity());
		newItem.setPicture(itemDto.getPicture());
		return itemRepository.save(newItem);
	}

	public Item update(Long id, Item itemDetails) {
		Item item = itemRepository.findById(id).orElse(null);
		if(item != null) {
			item.setName(itemDetails.getName());
			item.setDescription(itemDetails.getDescription());
			item.setPrice(itemDetails.getPrice());
			item.setRarity(itemDetails.getRarity());
			item.setPicture(itemDetails.getPicture());
			return itemRepository.save(item);
		}
		return null;
	}

	public void deleteById(Long id) {
		itemRepository.deleteById(id);
	}

	public List<Item> findByName(String name) {
		return itemRepository.findByName(name);
	}
}
