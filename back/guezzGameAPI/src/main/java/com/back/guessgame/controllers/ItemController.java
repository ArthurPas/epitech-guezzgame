package com.back.guessgame.controllers;

import com.back.guessgame.repository.ItemRepository;
import com.back.guessgame.repository.dto.BuyItemLoginDto;
import com.back.guessgame.repository.dto.ItemDto;
import com.back.guessgame.repository.entities.Item;
import com.back.guessgame.services.ItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
@Slf4j
public class ItemController {

	@Autowired
	private ItemRepository itemRepository;

	private ItemService itemService;

	private ItemController(ItemRepository itemRepository, ItemService itemService) {
		this.itemRepository = itemRepository;
		this.itemService = itemService;
	}

	@GetMapping("/list")
	public List<ItemDto> getAllItems() {
		return itemService.findAll().stream().map(ItemDto::new).toList();
	}

	@GetMapping("/list/{name}")
	public List<ItemDto> getItemsByName(@PathVariable String name) {
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

	@GetMapping("user/{login}")
	public List<ItemDto> getMyItems(@PathVariable String login) {
		return itemService.findMyItems(login);
	}

	@PostMapping("/buy")
	public void buyItem(@RequestBody BuyItemLoginDto buy) {
		itemService.buyItem(buy.getItemId(), buy.getLogin());
	}
}
