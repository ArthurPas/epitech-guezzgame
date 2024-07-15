package com.back.guessgame.repository;

import com.back.guessgame.repository.entities.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
	public List<Game> findAllByNameContainingIgnoreCase(String name);
}
