const express = require('express');
const inquirer = require("inquirer");
const cTable = require('console.table')
const db = require('./db/connection');

// SPECIFY A PORT FOR THE APPLICATION
const PORT = process.env.PORT || 3001;

const app = express();

// EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// START SERVER AFTER DATABASE CONNECTION
db.connect(err => {
    if (err) throw err;
    console.log('database connected');
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
      console.log(`
      =============================
            EMPLOYEE TRACKER
      =============================
      `)
      menu();
    });
  });

// function which prompts the user for what action they should take
function menu() {
  inquirer
    .prompt({
      type: "list",
      name: "operation",
      message: "please select one of the following: ",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
        "exit"]
    })
    .then((choiceObj) => {
      choice = choiceObj.operation;
      switch (choice) {
        case "view all departments":
          viewDepartments();
          break;

        case "view all roles":
          viewRoles();
          break;
      
        case "view all employees":
          viewEmployees();
          break;

        case "add a department":
          addDepartment();
          break;

        case "add a role":
          // user is prompted to enter the name, salary, and department for the role and that role is added to the database
          break;

        case "add an employee":
          addEmployee();
          break;

        case "update an employee role":
          // user is prompted to select an employee to update and their new role and this information is updated in the database
          break;

        case "exit":
          db.end();
          break;
      }
    });
}

// present a formatted table showing department names and department ids
viewDepartments = () => {
  console.log(`viewing departments... \n`);
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.table(res);
    menu();
  });
}

// present a formatted table showing the job title, role id, the department that role belongs to, and the salary for that role
viewRoles = () => {
  console.log(`viewing roles... \n`);
  const query = `
  SELECT 
    job.title AS title, 
    job.id AS id, 
    job.salary AS salary, 
    department.name AS department
  FROM job
  JOIN department ON job.department_id = department.id
  `;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    menu();
  });
}

 // present a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
 viewEmployees = () => {
  console.log(`viewing employees... \n`);
  const query = `
  SELECT 
    a.id AS id, 
    a.first_name AS "first name", 
    a.last_name AS "last name",
    d.first_name AS "manager first name", 
    b.title AS "job title",
    b.salary AS salary,
    c.name AS department
  FROM employee a
  JOIN job b ON a.job_id = b.id
  JOIN department c ON b.department_id = c.id
  JOIN employee d ON a.manager_id = d.id
  `;
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    menu();
  });
 }

// user is prompted to enter the name of the department and that department is added to the database
addDepartment = () => {

}

// user is prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
addEmployee= () => {

  // QUERY FOR ROLES
    const roleQuery =
    `SELECT job.title
      FROM job`;
    db.query(roleQuery, (err, res) => {
      if (err) throw err
      const roleChoices = res.map(({title}) => (`${title}`));
      
  // QUERY FOR MANAGERS
    const managerQuery =
      `SELECT 
        employee.first_name,
        employee.id
      FROM employee
      WHERE manager_id IS NULL`;
  
    db.query(managerQuery, (err, res) => {
      if (err) throw err;
      const managerChoices = res.map(({first_name}) => (`${first_name}`));
      
          // COLLECT USER INPUT
          inquirer.prompt([
            {
              type: "input",
              name: "first_name",
              message: "please enter the employee's first name:"
            },
            {
              type: "input",
              name: "last_name",
              message: "please enter the employee's last name:"
            },
            {
              type: "list",
              name: "title",
              message: "please select the employee's role:",
              choices: roleChoices
            },
            {
              type: "list",
              name: "manager_name",
              message: "please select the employee's manager:",
              choices: managerChoices
            }
          ])
          .then((responses) => {

            let managerName = responses.manager_name;
            let title = responses.title;
           
            // QUERY FOR MANAGERS
            const managerIdQuery =
              `SELECT 
                employee.id
              FROM employee
              WHERE employee.first_name = ?`;
            db.query(managerIdQuery, [managerName], (err, res) => {
              if (err) throw err;
              const managerId = res[0].id;

              // QUERY FOR MANAGERS
              const roleIdQuery =
                `SELECT 
                  job.id
                FROM job
                WHERE job.title = ?`;
              db.query(roleIdQuery, [title], (err, res) => {
                if (err) throw err;
                const roleId = res[0].id;
                console.log(roleId);
                console.log(managerId);

                const insertQuery = `
                  INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES (?,?,?,?)`;
                const params = [responses.first_name, responses.last_name, roleId, managerId];

                db.query(insertQuery, params, (err, res) => {
                if (err) throw err;
                })
              menu();
              });
          });
        });
      });
    });
  };  

