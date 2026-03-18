package org.infyntrek.farmsync.service;

import java.util.List;

import org.infyntrek.farmsync.dto.YieldDTO;

public interface YieldService {

	YieldDTO createYield(YieldDTO yieldDTO);
	
	YieldDTO getYieldById(Long yieldId);
	
	List<YieldDTO> getYieldsByCropId(Long cropId);
	
	YieldDTO updateYield(Long yieldId, YieldDTO yieldDTO);
	
	void deleteYield(Long yieldId);
}
