package com.back.guessgame.services;

import com.back.guessgame.controllers.PartyController;
import com.back.guessgame.repository.PartyRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.GeneralPartyDto;
import com.back.guessgame.repository.dto.PartyResultDto;
import com.back.guessgame.repository.dto.Score;
import com.back.guessgame.repository.entities.Game;
import com.back.guessgame.repository.entities.Party;
import com.back.guessgame.repository.entities.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PartyService {
	private final PartyRepository partyRepository;
	Logger logger = LoggerFactory.getLogger(PartyController.class);
	@Autowired
	private UserRepository userRepository;

	public PartyService(PartyRepository partyRepository) {
		this.partyRepository = partyRepository;
	}

	public Set<GeneralPartyDto> findAll() {
		Set<GeneralPartyDto> parties = new HashSet<>();
		Map<Long, Set<User>> usersInSameParty = new HashMap<>();
		for (Party party : partyRepository.findAll()) {
			parties.add(new GeneralPartyDto(party));
		}

		return parties;
	}
	/*return userRepository.findAll().stream().map(PartyDto::new).collect(Collectors.toSet());*/

	public Optional<GeneralPartyDto> findById(Long id) {
		return partyRepository.findById(id).map(GeneralPartyDto::new).stream().findFirst();
	}

	public List<GeneralPartyDto> getPartyByPartyCode(long partyCode) {
		List<GeneralPartyDto> toto = partyRepository.findAll().stream().filter(party -> party.getPartyCode() == partyCode).map(GeneralPartyDto::new).collect(Collectors.toList());
		logger.info(toto.toString());
		return toto;

	}

	public PartyResultDto getResultScores(long partyCode) {
		List<GeneralPartyDto> parties = getPartyByPartyCode(partyCode);
		List<Score> scores = new ArrayList<>();

		for (GeneralPartyDto party : parties) {
			Score score = new Score(party.getUserId(), "", party.getNbPoints());
			scores.add(score);
		}
		return new PartyResultDto(scores, parties.get(0).getPartyCode());
	}

	public long newParty(GeneralPartyDto partyDto, User user, List<Game> games) {
		Party party = new Party();
		party.setPartyCode(partyDto.getPartyCode());
		party.setUser(user);
		party.setLeaderRank(partyDto.getLeaderRank());
		for (Game game : games) {
			party.getGames().add(game);
		}
		logger.warn(games.get(0).getId().toString() + " " + games.get(1).getId().toString());
		party.setNbPoints(partyDto.getNbPoints());
		partyRepository.save(party);
		return party.getId();
	}

	public long updateParty(Party party, GeneralPartyDto partyDetails) {
		if(party != null) {
			party.setLeaderRank(partyDetails.getLeaderRank());
			party.setNbPoints(partyDetails.getNbPoints());
			party.setUser(userRepository.findById(partyDetails.getUserId()).orElse(null));
			partyRepository.save(party);
			return party.getId();
		}
		throw HttpClientErrorException.create(HttpStatus.NOT_FOUND, "Party not found", null, null, null);
	}
}
