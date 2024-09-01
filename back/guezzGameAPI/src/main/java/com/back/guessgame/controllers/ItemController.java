package com.back.guessgame.controllers;

import com.back.guessgame.repository.ItemRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.BuyItemLoginDto;
import com.back.guessgame.repository.dto.ItemDto;
import com.back.guessgame.repository.entities.Item;
import com.back.guessgame.repository.entities.User;
import com.back.guessgame.services.ItemService;
import com.back.guessgame.services.JwtService;
import io.swagger.v3.core.util.Json;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
@Slf4j
public class ItemController {

	@Autowired
	private ItemRepository itemRepository;

	private ItemService itemService;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private UserRepository userRepository;

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

	@GetMapping("/mine")
	public List<ItemDto> getMyInfos(@RequestHeader(name = "Authorization") String token) {
		String login = jwtService.extractUsername(token);
		User user = userRepository.findByLoginOrMail(login, "").orElse(null);

		assert user != null;
		return itemService.findMyItems(user.getLogin());
	}


	@PostMapping("/buy/{itemId}")
	public ResponseEntity<String> buyItem(@RequestBody BuyItemLoginDto buy, @PathVariable Long itemId) {
		itemService.buyItem(itemId, buy.getLogin());
		return new ResponseEntity<>(Json.pretty(itemId), null, 200);
	}
}
