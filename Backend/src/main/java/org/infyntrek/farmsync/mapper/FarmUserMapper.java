package org.infyntrek.farmsync.mapper;

import org.infyntrek.farmsync.dto.FarmUserDTO;
import org.infyntrek.farmsync.entity.FarmUser;
import org.springframework.stereotype.Component;

@Component
public class FarmUserMapper {

	public FarmUserDTO toDTO(FarmUser user) {
		if(user == null) {
			return null;
		}
		
		return FarmUserDTO.builder()
				.userId(user.getUserId())
				.name(user.getName())
				.email(user.getEmail())
				.password(user.getPassword())
				.phone(user.getPhone())
				.role(user.getRole())
				.build();
	}
	
	public FarmUser toEntity(FarmUserDTO userDTO) {
		if(userDTO == null) {
			return null;
		}
		
		FarmUser user = new FarmUser();
		
		user.setUserId(userDTO.getUserId());
		user.setName(userDTO.getName());
		user.setEmail(userDTO.getEmail());
		user.setPassword(userDTO.getPassword());
		user.setPhone(userDTO.getPhone());
		user.setRole(userDTO.getRole());
		
		return user;
	}
}
