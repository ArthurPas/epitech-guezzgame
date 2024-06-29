package com.back.guessgame.services.repository;

import com.back.guessgame.entities.PartiesGames;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartiesGamesRepository extends JpaRepository<PartiesGames, Long> {
}
