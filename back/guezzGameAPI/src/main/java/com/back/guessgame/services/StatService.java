package com.back.guessgame.services;

import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.FriendDto;
import com.back.guessgame.repository.dto.StatDto;
import com.back.guessgame.repository.entities.Party;
import com.back.guessgame.repository.entities.User;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;

public class StatService {
	private final UserRepository userRepository;

	public StatService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public StatDto getStat(Long userId) {
		User user = userRepository.findById(userId).orElse(null);
		if(user != null) {
			StatDto stat = new StatDto();
			stat.setUser(new FriendDto(user));
			stat.setNbWin(getNbWin(user));
			stat.setNbParties(getNbParties(user));
			stat.setNbPoints(getNbPoints(user));
			stat.setNbDayStreak(getNbDayStreak(user));
			stat.setNbBestDayStreak(getNbBestDayStreak(user));
			return stat;
		}
		throw HttpClientErrorException.create(HttpStatus.NOT_FOUND, "User not found", null, null, null);
	}

	private Integer getNbBestDayStreak(User user) {
		//TODO: implement in database the date of connection
		return (user.getDaySteak());
	}

	private Integer getNbDayStreak(User user) {
		//TODO: implement in database the date of connection
		return (int) (Math.random() * 100);
	}

	private Integer getNbPoints(User user) {
		return user.getParties().stream().map(Party::getNbPoints).reduce(0, Integer::sum);
	}

	private Integer getNbParties(User user) {
		return user.getParties().size();
	}

	public Integer getNbParties(long userId) {
		User user = userRepository.findById(userId).orElse(null);
		if(user == null) {
			throw HttpClientErrorException.create(HttpStatus.NOT_FOUND, "User not found", null, null, null);
		}
		return user.getParties().size();
	}

	private Integer getNbWin(User user) {
		List<Party> parties = user.getParties();
		int nbWin = 0;
		for (Party party : parties) {
			if(party.getLeaderRank() == 1) {
				nbWin++;
			}
		}
		return nbWin;
	}

	public Integer getNbWin(long userId) {
		User user = userRepository.findById(userId).orElse(null);
		if(user == null) {
			throw HttpClientErrorException.create(HttpStatus.NOT_FOUND, "User not found", null, null, null);
		}
		List<Party> parties = user.getParties();
		int nbWin = 0;
		for (Party party : parties) {
			if(party.getLeaderRank() == 1) {
				nbWin++;
			}
		}
		return nbWin;
	}

	public List<StatDto> findAll() {
		List<User> users = userRepository.findAll();
		List<StatDto> stats = new ArrayList<>();
		for (User user : users) {
			stats.add(getStat(user.getId()));
		}
		return stats;
	}
}
