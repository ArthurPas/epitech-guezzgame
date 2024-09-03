package com.back.guessgame.services;


import com.back.guessgame.repository.ItemRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.ItemDto;
import com.back.guessgame.repository.entities.Item;
import com.back.guessgame.repository.entities.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ItemService {
	private ItemRepository itemRepository;
	@Autowired
	private UserRepository userRepository;

	public ItemService(ItemRepository itemRepository) {
		this.itemRepository = itemRepository;
	}

	public List<Item> findAll() {
		return itemRepository.findAll();
	}

	public Item findById(Long id) {
		return itemRepository.findById(id).orElse(null);
	}

	public Item create(ItemDto itemDto) {
		Item newItem = new Item();
		newItem.setName(itemDto.getName());
		newItem.setDescription(itemDto.getDescription());
		newItem.setPrice(itemDto.getPrice());
		newItem.setRarity(itemDto.getRarity());
		newItem.setPicture(itemDto.getPicture());
		return itemRepository.save(newItem);
	}

	public Item update(Long id, Item itemDetails) {
		Item item = itemRepository.findById(id).orElse(null);
		if(item != null) {
			item.setName(itemDetails.getName());
			item.setDescription(itemDetails.getDescription());
			item.setPrice(itemDetails.getPrice());
			item.setRarity(itemDetails.getRarity());
			item.setPicture(itemDetails.getPicture());
			return itemRepository.save(item);
		}
		return null;
	}

	public void deleteById(Long id) {
		itemRepository.deleteById(id);
	}

	public List<ItemDto> findByName(String name) {
		return itemRepository.findByName(name).stream().map(ItemDto::new).toList();
	}

	public List<ItemDto> findMyItems(String login) {
		User user = userRepository.findByLoginOrMail(login, login).orElse(null);
		if(user == null) {
			return null;
		}
		return user.getItems().stream().map(ItemDto::new).toList();
	}

	public void buyItem(Long itemId, String login) {
		User user = userRepository.findByLoginOrMail(login, login).orElse(null);
		if(user == null) {
			return;
		}
		Item item = itemRepository.findById(itemId).orElse(null);
		log.info(item.getName());
		if(item == null) {
			return;
		}
		if(user.getNbCoin() < item.getPrice()) {
			return;
		}
		log.info("old coin: " + user.getNbCoin().toString());
		user.setNbCoin(user.getNbCoin() - item.getPrice());
		user.getItems().add(item);
		item.getUsers().add(user);
		userRepository.save(user);
		log.info("new coin :" + user.getNbCoin().toString());
	}
}
