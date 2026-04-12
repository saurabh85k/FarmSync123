package org.infyntrek.farmsync.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.infyntrek.farmsync.dto.CropDTO;
import org.infyntrek.farmsync.entity.Crop;
import org.infyntrek.farmsync.entity.Farm;
import org.infyntrek.farmsync.exception.ResourceNotFoundException;
import org.infyntrek.farmsync.mapper.CropMapper;
import org.infyntrek.farmsync.repository.CropRepository;
import org.infyntrek.farmsync.repository.FarmRepository;
import org.infyntrek.farmsync.service.CropService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CropServiceImpl implements CropService {
	
	private final CropRepository cropRepository;
	private final CropMapper cropMapper;
	private final FarmRepository farmRepository;

	@Override
	public CropDTO createCrop(CropDTO cropDTO) {
	    Crop crop = cropMapper.toEntity(cropDTO);

	    if (cropDTO.getFarmId() != null) {
	        Farm farm = farmRepository.findById(cropDTO.getFarmId())
	                .orElseThrow(() -> new ResourceNotFoundException("Farm not found with id: " + cropDTO.getFarmId()));
	        crop.setFarm(farm);
	    }

	    return cropMapper.toDTO(cropRepository.save(crop));
	}

	@Override
	public CropDTO getCropById(Long cropId) {
		Crop crop = cropRepository.findById(cropId)
				.orElseThrow(() -> new ResourceNotFoundException("Crop not found with id: " + cropId));
		
		return cropMapper.toDTO(crop);
	}

	@Override
	public List<CropDTO> getAllCrops() {
		List<Crop> crops = cropRepository.findAll();
		
		return crops.stream()
				.map(cropMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Override
	public List<CropDTO> getCropsByFarmId(Long farmId) {
		List<Crop> crops =cropRepository.findByFarmFarmId(farmId);
		
		return crops.stream()
				.map(cropMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Override
	@Transactional
	public CropDTO updateCrop(Long cropId, CropDTO cropDTO) {
		Crop existingCrop = cropRepository.findById(cropId)
				.orElseThrow(() -> new ResourceNotFoundException("Crop not found with id: " + cropId));
		
		existingCrop.setCropName(cropDTO.getCropName());
		existingCrop.setSeason(cropDTO.getSeason());
		existingCrop.setSowingDate(cropDTO.getSowingDate());
		existingCrop.setExpectedHarvest(cropDTO.getExpectedHarvest());
		
		// update farm if needed
		if(cropDTO.getFarmId() != null) {
			Farm farm = farmRepository.findById(cropDTO.getFarmId())
					.orElseThrow(() -> new ResourceNotFoundException("Farm not found with id: " + cropDTO.getFarmId()));
			
			existingCrop.setFarm(farm);
		}
		
		Crop updatedCrop = cropRepository.save(existingCrop);
		
		return cropMapper.toDTO(updatedCrop);
	}

	@Override
	@Transactional
	public void deleteCrop(Long cropId) {
		Crop crop = cropRepository.findById(cropId)
				.orElseThrow(() -> new ResourceNotFoundException("Crop not found with id: " + cropId));
		
		cropRepository.delete(crop);
	}

}
