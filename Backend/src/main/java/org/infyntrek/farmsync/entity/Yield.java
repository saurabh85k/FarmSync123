package org.infyntrek.farmsync.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Yield {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long yieldId;
	
	private Double quantity;
	private Double income;
	private LocalDate harvestDate;
	
	@ManyToOne
	@JoinColumn(name = "crop_id")
	private Crop crop;
}
