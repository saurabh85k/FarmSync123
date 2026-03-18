package org.infyntrek.farmsync.mapper;

import org.infyntrek.farmsync.dto.UserDTO;
import org.infyntrek.farmsync.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

	public UserDTO toDTO(User user) {
		if(user == null) {
			return null;
		}
		
		return UserDTO.builder()
				.userId(user.getUserId())
				.name(user.getName())
				.email(user.getEmail())
				.password(user.getPassword())
				.phone(user.getPhone())
				.role(user.getRole())
				.build();
	}
	
	public User toEntity(UserDTO userDTO) {
		if(userDTO == null) {
			return null;
		}
		
		User user = new User();
		
		user.setUserId(userDTO.getUserId());
		user.setName(userDTO.getName());
		user.setEmail(userDTO.getEmail());
		user.setPassword(userDTO.getPassword());
		user.setPhone(userDTO.getPhone());
		user.setRole(userDTO.getRole());
		
		return user;
	}
}
