package com.back.guessgame.services;

import com.back.guessgame.configuration.Utils;
import com.back.guessgame.repository.BetOptionRepository;
import com.back.guessgame.repository.BetRepository;
import com.back.guessgame.repository.UserBetRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.BetPojo;
import com.back.guessgame.repository.dto.UserDto;
import com.back.guessgame.repository.entities.User;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Log
//NOT USED (YET?)
public class UserService implements UserDetailsService {
	private UserRepository userRepository;
	@Autowired
	private BetRepository gamblingRepository;
	@Autowired
	private BetOptionRepository betOptionRepository;
	@Autowired
	private UserBetRepository userBetRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}


	public List<UserDto> findAll() {

		List<UserDto> users = new ArrayList<>();
		for (User user : userRepository.findAll()) {
			users.add(new UserDto(user));
		}
		return users;
	}

	public Optional<UserDto> findById(Long id) {
		return Optional.of(new UserDto(userRepository.findById(id).orElseThrow(null)));
	}

	public Integer setDayStreak(Long id) {
		User user = userRepository.findById(id).orElseThrow(null);
		Date today = new Date();
		Date yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
		log.info("today : " + today);
		log.info("yesterday : " + yesterday);

		Date lastConnection = user.getLastConnection();
		if (lastConnection == null) {
			user.setLastConnection(today);
			user.setDaySteak(1);
			userRepository.save(user);
			return 1;
		} else
		if(lastConnection.before(yesterday)) {
			user.setDaySteak(0);
		} else if(Utils.isYesterday(lastConnection)) {
			user.setDaySteak(user.getDaySteak() + 1);
			int nbCoinBonus = user.getNbCoin() + user.getDaySteak()*10;
			if(user.getIsVip()){
				nbCoinBonus = user.getDaySteak() * 50;
			}
			user.setNbCoin(nbCoinBonus);

		}
		user.setLastConnection(today);
		userRepository.save(user);
		return user.getDaySteak();
	}

	public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
		User user = userRepository.findByMail(mail).orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + mail));
		Set<GrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("USER"));
		return new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(), authorities);
	}

	public long createBet(BetPojo bet, User user) {
		GamblingService gamblingService = new GamblingService(gamblingRepository, betOptionRepository, userBetRepository);
		if(user.getNbCoin() < bet.getBetAmount()) {
			throw new RuntimeException("User does not have enough coins to bet");
		}
		gamblingService.addGamblerToBetOption(bet.getBetOptionId(), user, bet.getBetAmount());
		user.setNbCoin(user.getNbCoin() - bet.getBetAmount());
		userRepository.save(user);
		return bet.getBetOptionId();
	}

}