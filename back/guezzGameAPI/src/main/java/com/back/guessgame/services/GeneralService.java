package com.back.guessgame.services;

import com.back.guessgame.repository.GameRepository;
import com.back.guessgame.repository.PartyRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.GameDto;
import com.back.guessgame.repository.dto.GuezzGameEntity;
import com.back.guessgame.repository.dto.UserDto;
import com.back.guessgame.repository.entities.Game;
import com.back.guessgame.repository.entities.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GeneralService<T> {

	private final GameRepository gameRepository;

	private final UserRepository userRepository;

	private final PartyRepository partyRepository;

	public GeneralService(GameRepository gameRepository, UserRepository userRepository, PartyRepository partyRepository) {
		this.gameRepository = gameRepository;
		this.userRepository = userRepository;
		this.partyRepository = partyRepository;
	}

	public List<T> searchAll(String term, List<GuezzGameEntity> filter) {
		List<GameDto> gameMatches = new ArrayList<>();
		List<UserDto> userMatches = new ArrayList<>();
		if(filter != null) {
			return null;
			//TODO: Implement search with filter
		} else {
			for (Game game : gameRepository.findAllByNameContainingIgnoreCase(term)) {
				gameMatches.add(new GameDto(game));
			}
			for (User user : userRepository.findAllByLoginContainingIgnoreCase(term)) {
				userMatches.add(new UserDto(user));
			}
			List<T> result = new ArrayList<>();
			result.addAll((List<T>) gameMatches);
			result.addAll((List<T>) userMatches);
			return result;
		}
	}
}
