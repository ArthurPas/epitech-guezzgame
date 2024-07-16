package com.back.guessgame.controllers;

import com.back.guessgame.repository.dto.GuezzGameEntity;
import com.back.guessgame.services.GeneralService;
import io.swagger.v3.core.util.Json;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
public class GeneralController {

	private final GeneralService generalService;


	public GeneralController(GeneralService generalService) {
		this.generalService = generalService;
	}

	@GetMapping("/search/{term}")
	public ResponseEntity<String> searchAll(@PathVariable String term, @RequestBody(required = false) List<GuezzGameEntity> filter) {
		Map<String, List<Objects>> jsonResponse = new HashMap<>();
		jsonResponse.put("results", generalService.searchAll(term, filter));
		//TODO: Implement search with filter + better json
		return new ResponseEntity<>(Json.pretty(jsonResponse), null, 200);
	}
}
