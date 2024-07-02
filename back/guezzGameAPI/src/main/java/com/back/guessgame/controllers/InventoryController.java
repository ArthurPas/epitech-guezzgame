package com.back.guessgame.controllers;

import com.back.guessgame.repository.InventoryRepository;
import com.back.guessgame.repository.entities.Inventory;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventorie")

@Hidden
public class InventoryController {

	@Autowired
	private InventoryRepository inventoryRepository;

	@GetMapping("/list")
	public List<Inventory> getAllInventories() {
		return inventoryRepository.findAll();
	}

	@GetMapping("/{id}")
	public Inventory getInventoryById(@PathVariable Long id) {
		return inventoryRepository.findById(id).orElse(null);
	}

	@PostMapping
	public Inventory createInventory(@RequestBody Inventory inventory) {
		return inventoryRepository.save(inventory);
	}

	@PutMapping("/{id}")
	public Inventory updateInventory(@PathVariable Long id, @RequestBody Inventory inventoryDetails) {
		Inventory inventory = inventoryRepository.findById(id).orElse(null);
		if(inventory != null) {
			inventory.setUser(inventoryDetails.getUser());
			inventory.setItem(inventoryDetails.getItem());
			inventory.setAcquiredDate(inventoryDetails.getAcquiredDate());
			return inventoryRepository.save(inventory);
		}
		return null;
	}

	@DeleteMapping("/{id}")
	public void deleteInventory(@PathVariable Long id) {
		inventoryRepository.deleteById(id);
	}
}
