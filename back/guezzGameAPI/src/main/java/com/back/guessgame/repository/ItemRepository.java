package com.back.guessgame.repository;

import com.back.guessgame.repository.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
	List<Item> findByName(String name);
}
