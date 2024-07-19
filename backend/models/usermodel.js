const mysql = require('mysql2');
const config = require('../config');

const db = mysql.createConnection(config.database);

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

const createUser = (user, callback) => {
  const { email, password, name, company } = user;
  const sql = 'INSERT INTO user (email, password, name, company) VALUES (?, ?, ?, ?)';
  db.query(sql, [email, password, name, company], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM user WHERE email = ?';
  db.query(sql, [email], callback);
};

const findUserById = (id, callback) => {
  const sql = 'SELECT email, name, company FROM user WHERE id = ?';
  db.query(sql, [id], callback);
};

const updateUser = (id, user, callback) => {
  const { name, email, password, company } = user;
  const sql = 'UPDATE user SET name = ?, email = ?, password = ?, company = ? WHERE id = ?';
  db.query(sql, [name, email, password, company, id], callback);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser
};
