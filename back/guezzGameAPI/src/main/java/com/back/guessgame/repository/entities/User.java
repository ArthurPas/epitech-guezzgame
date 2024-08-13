package com.back.guessgame.repository.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.builder.HashCodeExclude;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "user")
public class User implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("id")
	private Long id;

	@Column(nullable = false)
	@JsonProperty("mail")
	private String mail;

	@Column(nullable = false)
	@JsonProperty("login")
	private String login;

	@Column(nullable = false)
	@JsonProperty("password")
	private String password;
	@JsonProperty("picture")
	private String picture;
	@JsonProperty("nbCoin")
	private Integer nbCoin;
	@JsonProperty("isVip")
	private Boolean isVip;
	@JsonProperty("xpPoint")
	private Integer xpPoint = 0;


	@OneToMany()
	@JoinTable(name = "friendship", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "user_id_friend"))

	private List<User> friendships;

	@HashCodeExclude
	@OneToMany(mappedBy = "user")
	private List<Inventory> items;

	@HashCodeExclude
	@OneToMany(targetEntity = Party.class)
	private List<Party> parties;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of();
	}

	@Override
	public String getUsername() {
		return login;
	}


	@Override
	public boolean isAccountNonExpired() {
		return UserDetails.super.isAccountNonExpired();
	}

	@Override
	public boolean isAccountNonLocked() {
		return UserDetails.super.isAccountNonLocked();
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return UserDetails.super.isCredentialsNonExpired();
	}

	@Override
	public boolean isEnabled() {
		return UserDetails.super.isEnabled();
	}
}
