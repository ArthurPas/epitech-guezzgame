package com.back.guessgame.services;

import com.back.guessgame.repository.BetOptionRepository;
import com.back.guessgame.repository.BetRepository;
import com.back.guessgame.repository.UserBetRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.BetPojo;
import com.back.guessgame.repository.dto.UserDto;
import com.back.guessgame.repository.entities.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
//NOT USED (YET?)
public class UserService implements UserDetailsService {
	private final UserRepository userRepository;
	private final BetRepository gamblingRepository;
	private final BetOptionRepository betOptionRepository;

	private final UserBetRepository userBetRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, BetRepository gamblingRepository, BetOptionRepository betOptionRepository, UserBetRepository userBetRepository) {
		this.userRepository = userRepository;
		this.gamblingRepository = gamblingRepository;
		this.betOptionRepository = betOptionRepository;
		this.userBetRepository = userBetRepository;
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

	public User convertToUserFromDto(UserDto userDto) {
		ModelMapper modelMapper = new ModelMapper();
		User user = modelMapper.map(userDto, User.class);
		user.setMail(userDto.getMail());
		user.setPicture(userDto.getPicture());
		user.setNbCoin(userDto.getNbCoin());
		user.setXpPoint(userDto.getXpPoint());
		user.setMail(userDto.getMail());
		user.setIsVip(userDto.getIsVip());
		return user;
	}

	public UserDto newUser(User user, String password) {
		user.setPassword(passwordEncoder.encode(password));
		userRepository.save(user);
		return new UserDto(user);
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