package com.back.guessgame.repository;

import com.back.guessgame.repository.entities.BetOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BetOptionRepository extends JpaRepository<BetOption, Long> {
}
