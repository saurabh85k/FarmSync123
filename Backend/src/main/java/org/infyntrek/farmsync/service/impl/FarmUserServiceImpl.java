package org.infyntrek.farmsync.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.infyntrek.farmsync.dto.FarmUserDTO;
import org.infyntrek.farmsync.entity.FarmUser;
import org.infyntrek.farmsync.mapper.FarmUserMapper;
import org.infyntrek.farmsync.repository.FarmUserRepository;
import org.infyntrek.farmsync.service.FarmUserService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FarmUserServiceImpl implements FarmUserService {
	
	private final FarmUserRepository userRepository;
	private final FarmUserMapper userMapper;

	@Override
	public FarmUserDTO createUser(FarmUserDTO userDTO) {
		FarmUser user = userMapper.toEntity(userDTO);
		FarmUser savedUser = userRepository.save(user);
		
		return userMapper.toDTO(savedUser);
	}

	@Override
	public FarmUserDTO getUserById(Long userId) {
		FarmUser user = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
		return userMapper.toDTO(user);
	}

	@Override
	public List<FarmUserDTO> getAllUsers() {
		List<FarmUser> users = userRepository.findAll();
		
		return users.stream()
				.map(userMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Override
	public FarmUserDTO updateUser(Long userId, FarmUserDTO userDTO) {
		FarmUser existingUser = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
		
		existingUser.setName(userDTO.getName());
		existingUser.setEmail(userDTO.getEmail());
		existingUser.setPassword(userDTO.getPassword());
		existingUser.setPhone(userDTO.getPhone());
		existingUser.setRole(userDTO.getRole());
		
		FarmUser updatedUser = userRepository.save(existingUser);
		
		return userMapper.toDTO(updatedUser);
	}

	@Override
	public void deleteUser(Long userId) {
		FarmUser user = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
		
		userRepository.delete(user);
	}

}
