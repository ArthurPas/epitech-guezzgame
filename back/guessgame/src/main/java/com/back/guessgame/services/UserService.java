package com.back.guessgame.services;

import com.back.guessgame.entities.User;
import com.back.guessgame.entities.dto.UserDto;
import com.back.guessgame.services.repository.UserRepository;
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


}