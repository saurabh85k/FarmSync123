package org.infyntrek.farmsync.repository;

import java.util.List;

import org.infyntrek.farmsync.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

	List<Expense> findByCropCropId(Long cropId);
}
