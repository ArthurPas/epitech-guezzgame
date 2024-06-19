package com.back.guessgame.services;

import com.back.guessgame.entities.User;
import com.back.guessgame.dto.UserDto;
import com.back.guessgame.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService implements UserDetailsService {
	@Autowired
	private PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;

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

	public long newUser(UserDto user, String password) {
		User newUser = new User();
		newUser.setPassword(passwordEncoder.encode(password));
		newUser.setMail(user.getMail());
		newUser.setPicture(user.getPicture());
		newUser.setNbCoin(user.getNbCoin());
		newUser.setXpPoint(user.getXpPoint());
		newUser.setMail(user.getMail());
		newUser.setIsVip(user.getIsVip());
		userRepository.save(newUser);
		return newUser.getId();
	}

	public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
		User user = userRepository.findByMail(mail).orElseThrow(() -> new UsernameNotFoundException("User not found with username or email: " + mail));
		Set<GrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("USER"));
		return new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(), authorities);
	}


}