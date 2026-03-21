package org.infyntrek.farmsync.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.infyntrek.farmsync.dto.UserDTO;
import org.infyntrek.farmsync.entity.User;
import org.infyntrek.farmsync.mapper.UserMapper;
import org.infyntrek.farmsync.repository.UserRepository;
import org.infyntrek.farmsync.service.UserService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserRepository userRepository;
	private final UserMapper userMapper;

	@Override
	public UserDTO createUser(UserDTO userDTO) {
		User user = userMapper.toEntity(userDTO);
		User savedUser = userRepository.save(user);
		
		return userMapper.toDTO(savedUser);
	}

	@Override
	public UserDTO getUserById(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
		return userMapper.toDTO(user);
	}

	@Override
	public List<UserDTO> getAllUsers() {
		List<User> users = userRepository.findAll();
		
		return users.stream()
				.map(userMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Override
	public UserDTO updateUser(Long userId, UserDTO userDTO) {
		User existingUser = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
		
		existingUser.setName(userDTO.getName());
		existingUser.setEmail(userDTO.getEmail());
		existingUser.setPassword(userDTO.getPassword());
		existingUser.setPhone(userDTO.getPhone());
		existingUser.setRole(userDTO.getRole());
		
		User updatedUser = userRepository.save(existingUser);
		
		return userMapper.toDTO(updatedUser);
	}

	@Override
	public void deleteUser(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
		
		userRepository.delete(user);
	}

}
