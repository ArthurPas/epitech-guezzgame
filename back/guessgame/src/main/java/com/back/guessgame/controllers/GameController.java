package com.back.guessgame.controllers;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
public class GameController {

	public GameController() {
	}

	@GetMapping("")
	public void getAllMethod() {
		return;
	}

	@GetMapping("")
	public void getOneMethod() {
		return;
	}

	@PostMapping
	public void postMethod() {
		return;
	}

	@PutMapping("")
	public void updateMethod() {
		return;
	}

	@DeleteMapping("")
	public void deleteMethod() {
		return;
	}
}
