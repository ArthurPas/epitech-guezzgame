package com.back.guessgame.controllers;

import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.StatDto;
import com.back.guessgame.services.StatService;
import io.swagger.v3.core.util.Json;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/stat")
public class StatController {
	private final UserRepository userRepository;
	private final StatService statService;

	public StatController(UserRepository userRepository) {
		this.userRepository = userRepository;
		this.statService = new StatService(userRepository);
	}

	@GetMapping("/userStat/{id}")
	public StatDto getStat(@PathVariable long id) {
		return statService.getStat(id);
	}

	@GetMapping("list")
	public List<StatDto> getAllStats() {
		return statService.findAll();
	}

	@GetMapping("/userStat/{userId}/nbWin")
	public ResponseEntity<String> getNbWin(@PathVariable long userId) {
		Map<String, Integer> nbWinsJson = new HashMap<>();
		nbWinsJson.put("nbWin", statService.getNbWin(userId));
		return new ResponseEntity<>(Json.pretty(nbWinsJson), null, 200);
	}

}
