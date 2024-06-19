package com.back.guessgame.controllers;

import com.back.guessgame.entities.Item;
import com.back.guessgame.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/items")
public class ItemController {

	@Autowired
	private ItemRepository itemRepository;

	@GetMapping
	public List<Item> getAllItems() {
		return itemRepository.findAll();
	}

	@GetMapping("/{id}")
	public Item getItemById(@PathVariable Long id) {
		return itemRepository.findById(id).orElse(null);
	}

	@PostMapping
	public Item createItem(@RequestBody Item item) {
		return itemRepository.save(item);
	}

	@PutMapping("/{id}")
	public Item updateItem(@PathVariable Long id, @RequestBody Item itemDetails) {
		Item item = itemRepository.findById(id).orElse(null);
		if (item != null) {
			item.setName(itemDetails.getName());
			item.setDescription(itemDetails.getDescription());
			item.setPrice(itemDetails.getPrice());
			item.setRarity(itemDetails.getRarity());
			item.setPicture(itemDetails.getPicture());
			return itemRepository.save(item);
		}
		return null;
	}

	@DeleteMapping("/{id}")
	public void deleteItem(@PathVariable Long id) {
		itemRepository.deleteById(id);
	}
}
