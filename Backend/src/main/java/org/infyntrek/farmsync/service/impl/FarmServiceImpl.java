package org.infyntrek.farmsync.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.infyntrek.farmsync.dto.FarmDTO;
import org.infyntrek.farmsync.entity.Farm;
import org.infyntrek.farmsync.entity.User;
import org.infyntrek.farmsync.mapper.FarmMapper;
import org.infyntrek.farmsync.repository.FarmRepository;
import org.infyntrek.farmsync.repository.UserRepository;
import org.infyntrek.farmsync.service.FarmService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FarmServiceImpl implements FarmService {
	
	private final FarmRepository farmRepository;
	private final FarmMapper farmMapper;
	private final UserRepository userRepository;

	@Override
	public FarmDTO createFarm(FarmDTO farmDTO) {
		Farm farm = farmMapper.toEntity(farmDTO);
		Farm savedFarm = farmRepository.save(farm);
		
		return farmMapper.toDTO(savedFarm);
	}

	@Override
	public FarmDTO getFarmById(Long farmId) {
		Farm farm = farmRepository.findById(farmId)
				.orElseThrow(() -> new RuntimeException("Farm not found with: " + farmId));
		return farmMapper.toDTO(farm);
	}

	@Override
	public List<FarmDTO> getAllFarms() {
		List<Farm> farms = farmRepository.findAll();
				
		return farms.stream()
				.map(farmMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Override
	public List<FarmDTO> getFarmsByUserId(Long userId) {
		List<Farm> farms = farmRepository.findByUserUserId(userId);
		
		return farms.stream()
				.map(farmMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Override
	public FarmDTO updateFarm(Long farmId, FarmDTO farmDTO) {
		Farm existingFarm = farmRepository.findById(farmId)
				.orElseThrow(() -> new RuntimeException("Farm not found with id: " + farmId));
		
		existingFarm.setFarmName(farmDTO.getFarmName());
		existingFarm.setAreaSize(farmDTO.getAreaSize());
		existingFarm.setLocation(farmDTO.getLocation());
		
		// if userId is present then set user
		if(farmDTO.getUserId() != null) {
			User user = userRepository.findById(farmDTO.getUserId())
					.orElseThrow(() -> new RuntimeException("User not found with id: " + farmDTO.getUserId()));
			existingFarm.setUser(user);
		}
		
		Farm updatedFarm = farmRepository.save(existingFarm);
		
		return farmMapper.toDTO(updatedFarm);
	}

	@Override
	public void deleteFarm(Long farmId) {
		Farm farm = farmRepository.findById(farmId)
				.orElseThrow(() -> new RuntimeException("Farm not found with: " + farmId));
		farmRepository.delete(farm);
	}

}
