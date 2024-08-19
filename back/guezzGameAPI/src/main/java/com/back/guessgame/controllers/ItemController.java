package com.back.guessgame.controllers;

import com.back.guessgame.repository.ItemRepository;
import com.back.guessgame.repository.dto.ItemDto;
import com.back.guessgame.repository.entities.Item;
import com.back.guessgame.services.ItemService;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
@Hidden
public class ItemController {

	@Autowired
	private ItemRepository itemRepository;

	private ItemService itemService;

	private ItemController(ItemRepository itemRepository, ItemService itemService) {
		this.itemRepository = itemRepository;
		this.itemService = itemService;
	}

	@GetMapping("/list")
	public List<Item> getAllItems() {
		return itemService.findAll();
	}

	@GetMapping("/list/{name}")
	public List<Item> getItemsByName(@PathVariable String name) {
		return itemService.findByName(name);
	}

	@GetMapping("/{id}")
	public Item getItemById(@PathVariable Long id) {
		return itemService.findById(id);
	}

	@PostMapping
	public Item createItem(@RequestBody ItemDto item) {
		return itemService.create(item);
	}

	@PutMapping("/{id}")
	public Item updateItem(@PathVariable Long id, @RequestBody Item itemDetails) {
		return itemService.update(id, itemDetails);
	}

	@DeleteMapping("/{id}")
	public void deleteItem(@PathVariable Long id) {
		itemService.deleteById(id);
	}
}
