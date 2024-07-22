package com.back.guessgame.repository;

import com.back.guessgame.repository.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByMail(String mail);

	Optional<User> findByLoginOrMail(String login, String mail);

	Boolean existsByMail(String mail);

	List<User> findAllByLoginContainingIgnoreCase(String login);
}
