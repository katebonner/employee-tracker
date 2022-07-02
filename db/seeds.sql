INSERT INTO department (name)
VALUES 
    ("engineering"),
    ("creative"),
    ("finance"),
    ("sales"),
    ("legal"),
    ("human resources");

INSERT INTO job (title, salary, department_id)
VALUES 
    ("junior engineer", 110000.00, 1),
    ("senior engineer", 150000.00, 1),
    ("lead engineer", 200000.00, 1),
    ("creative consultant", 75000.00, 2),
    ("creative manager", 90000.00, 2),
    ("creative director", 120000.00, 2),
    ("financial analyst", 120000.00, 3),
    ("financial manager", 170000.00, 3),
    ("financial director", 120000.00, 3),
    ("account executive", 60000.00, 4),
    ("sales manager", 90000.00, 4),
    ("sales lead", 120000.00, 4),
    ("legal assistant", 90000.00, 5),
    ("legal manager", 120000.00, 5),
    ("legal director", 140000.00, 5),
    ("recruiter", 60000.00, 6),
    ("HR director", 60000.00, 6);

INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES 
    ("lauren", "rutledge", 3, NULL),
    ("paige", "kelly", 1, 1),
    ("katherine", "mcdonald", 2, 1),
    ("capucine", "dubois", 6, NULL),
    ("chiara", "lewis", 5, 4),
    ("kate", "bonner", 4, 4),
    ("sara", "fares", 9, NULL),
    ("nicole", "flamen", 8, 7),
    ("drew", "nathenas", 7, 7),
    ("kyle", "ratner", 12, NULL),
    ("rodrigo", "ko", 10, 10),
    ("jack", "calderwood", 9, 10),
    ("anisha", "vora", 15, NULL),
    ("luiza", "mizrahi", 14, 13),
    ("gabi", "shey", 13, 13),
    ("jessica", "copeland", 17, NULL),
    ("erin", "mcclellan", 16, 16);


