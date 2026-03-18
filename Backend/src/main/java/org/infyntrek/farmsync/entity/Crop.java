package org.infyntrek.farmsync.entity;

import java.time.LocalDate;
import java.util.List;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
public class Crop {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cropId;
	
	private String cropName;
	private String season;
	private LocalDate sowingDate;
	private LocalDate expectedHarvest;
	
	@ManyToOne
	@JoinColumn(name = "farm_id")
	private Farm farm;
	
	@OneToMany(mappedBy = "crop")
	private List<Expense> expenses;
	
	@OneToMany(mappedBy = "crop")
	private List<Activity> activities;
	
	@OneToMany(mappedBy = "crop")
	private List<Yield> yields;
	
}
