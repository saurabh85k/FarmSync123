package org.infyntrek.farmsync.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.infyntrek.farmsync.dto.YieldDTO;
import org.infyntrek.farmsync.entity.Crop;
import org.infyntrek.farmsync.entity.Yield;
import org.infyntrek.farmsync.mapper.YieldMapper;
import org.infyntrek.farmsync.repository.CropRepository;
import org.infyntrek.farmsync.repository.YieldRepository;
import org.infyntrek.farmsync.service.YieldService;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class YieldServiceImpl implements YieldService {
	
	private final YieldRepository yieldRepository;
	private final YieldMapper yieldMapper;
	private final CropRepository cropRepository;

	@Override
	public YieldDTO createYield(YieldDTO yieldDTO) {
		Yield yield = yieldMapper.toEntity(yieldDTO);
		Yield savedYield = yieldRepository.save(yield);
		
		return yieldMapper.toDTO(savedYield);
	}

	@Override
	public YieldDTO getYieldById(Long yieldId) {
		Yield yield = yieldRepository.findById(yieldId)
				.orElseThrow(() -> new RuntimeException("Yield not found with id: " + yieldId));
		
		return yieldMapper.toDTO(yield);
	}

	@Override
	public List<YieldDTO> getYieldsByCropId(Long cropId) {
		List<Yield> yields = yieldRepository.findByCropCropId(cropId);
		
		return yields.stream()
				.map(yieldMapper::toDTO)
				.collect(Collectors.toList());
	}

	@Override
	public YieldDTO updateYield(Long yieldId, YieldDTO yieldDTO) {
		Yield existingYield = yieldRepository.findById(yieldId)
				.orElseThrow(() -> new RuntimeException("Yield not found with id: " + yieldId));
		
		existingYield.setIncome(yieldDTO.getIncome());
		existingYield.setQuantity(yieldDTO.getQuantity());
		existingYield.setHarvestDate(yieldDTO.getHarvestDate());
		
		// update crop if needed
		if(yieldDTO.getCropId() != null) {
			Crop crop = cropRepository.findById(yieldDTO.getCropId())
					.orElseThrow(() -> new RuntimeException("Crop not found with id: " + yieldDTO.getCropId()));
			
			existingYield.setCrop(crop);
		}
		
		Yield updatedYield = yieldRepository.save(existingYield);
		
		return yieldMapper.toDTO(updatedYield);
	}

	@Override
	public void deleteYield(Long yieldId) {
		Yield yield = yieldRepository.findById(yieldId)
				.orElseThrow(() -> new RuntimeException("Yield not found with id: " + yieldId));
		
		yieldRepository.delete(yield);
	}

}
