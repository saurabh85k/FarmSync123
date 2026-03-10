package org.infyntrek.farmsync.service;

import java.util.List;

import org.infyntrek.farmsync.dto.UserDTO;

public interface UserService {

	UserDTO createUser(UserDTO userDTO);
	
	UserDTO getUserById(Long userId);
	
	List<UserDTO> getAllUsers();
	
	UserDTO updateUser(Long userId, UserDTO userDTO);
	
	void deleteUser(Long userId);
}
