INSERT INTO PRESCRIPTION (DATE, PATIENT_NAME, AGE, GENDER, DIAGNOSIS, MEDICINES, NEXT_VISIT_DATE) VALUES
(CURRENT_DATE(), 'Alice Smith', 30, 'Female', 'Fever', 'Paracetamol', CURRENT_DATE() + 7),
(CURRENT_DATE(), 'Bob Johnson', 45, 'Male', 'Headache', 'Ibuprofen', CURRENT_DATE() + 5),
(CURRENT_DATE() - 1, 'Charlie Brown', 25, 'Male', 'Cold', 'Cough Syrup', CURRENT_DATE() + 3),
(CURRENT_DATE() - 2, 'Diana Prince', 35, 'Female', 'Flu', 'Antiviral', CURRENT_DATE() + 10),
(CURRENT_DATE() - 3, 'Eve Adams', 50, 'Female', 'Hypertension', 'Lisinopril', CURRENT_DATE() + 14),
(CURRENT_DATE() - 4, 'Frank White', 60, 'Male', 'Diabetes', 'Metformin', CURRENT_DATE() + 21),
(CURRENT_DATE() - 5, 'Grace Kelly', 28, 'Female', 'Allergy', 'Antihistamine', CURRENT_DATE() + 7),
(CURRENT_DATE() - 6, 'Harry Potter', 15, 'Male', 'Asthma', 'Inhaler', CURRENT_DATE() + 30),
(CURRENT_DATE() - 7, 'Ivy Green', 40, 'Female', 'Migraine', 'Sumatriptan', CURRENT_DATE() + 14),
(CURRENT_DATE() - 8, 'Jack Black', 55, 'Male', 'Arthritis', 'Naproxen', CURRENT_DATE() + 28);
