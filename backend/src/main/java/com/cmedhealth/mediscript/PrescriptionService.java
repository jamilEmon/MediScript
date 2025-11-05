package com.cmedhealth.mediscript;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.LinkedHashMap;
import java.util.Optional;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionService(PrescriptionRepository prescriptionRepository) {
        this.prescriptionRepository = prescriptionRepository;
    }

    public Page<Prescription> getAllPrescriptions(Pageable pageable) {
        return prescriptionRepository.findAll(pageable);
    }

    public Optional<Prescription> getPrescriptionById(Long id) {
        return prescriptionRepository.findById(id);
    }

    public Prescription savePrescription(Prescription prescription) {
        return prescriptionRepository.save(prescription);
    }

    @Transactional
    public Prescription updatePrescription(Long id, Prescription updatedPrescription) {
        return prescriptionRepository.findById(id).map(prescription -> {
            prescription.setDate(updatedPrescription.getDate());
            prescription.setPatientName(updatedPrescription.getPatientName());
            prescription.setAge(updatedPrescription.getAge());
            prescription.setGender(updatedPrescription.getGender());
            prescription.setDiagnosis(updatedPrescription.getDiagnosis());
            prescription.setMedicines(updatedPrescription.getMedicines());
            prescription.setNextVisitDate(updatedPrescription.getNextVisitDate());
            return prescriptionRepository.save(prescription);
        }).orElseThrow(() -> new RuntimeException("Prescription not found with id " + id));
    }

    public void deletePrescription(Long id) {
        prescriptionRepository.deleteById(id);
    }

    public Map<LocalDate, Long> getDayWisePrescriptionCount(int lastDays) {
        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(lastDays - 1);

        List<Prescription> prescriptions = prescriptionRepository.findAll();

        Map<LocalDate, Long> dayWiseCount = prescriptions.stream()
                .filter(p -> !p.getDate().isBefore(startDate) && !p.getDate().isAfter(endDate))
                .collect(Collectors.groupingBy(Prescription::getDate, Collectors.counting()));

        Map<LocalDate, Long> result = new LinkedHashMap<>();
        for (int i = 0; i < lastDays; i++) {
            LocalDate date = startDate.plusDays(i);
            result.put(date, dayWiseCount.getOrDefault(date, 0L));
        }
        return result;
    }
}
