const mysql = require('mysql2');
const config = require('../../../../config/app');

const getConnection = () => {
  const connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    database: 'usersSystem',
    password: config.password
  }).promise();

  const createUsersTable = `
    create table if not exists users(
      id int primary key auto_increment,
      name varchar(255) not null,
      email varchar(255) not null,
      password varchar(255) not null,
      phones varchar(255),
      date_of_birth varchar(255),
      education varchar(255),
      is_admin BOOLEAN not null);`;

  const createAdmin = `INSERT INTO users (name, email, password, phones, date_of_birth, education, is_admin )
  VALUES('admin', 'admin@gmail.com', 'admin','+3805575781', '12/12/12', 'LNU', true );`;

  return connection.query(createUsersTable)
    .then(result => {
      return connection.query('SELECT COUNT(*) as Count FROM users')
        .then(usersCountResult => {
          if (usersCountResult[0][0].Count == 0) {
            connection.query(createAdmin).then(res => {
              return connection;
            })
          } else {
            return connection;
          }
        })
    });
}

const getAll = () => {
  return getConnection()
    .then(connection => {
      return connection.query("SELECT * FROM users")
        .then(result => {
          connection.close()
          let users = result[0];
          // todo: create separate table for storing phones instead of this hack
          users.forEach(user => user.phones = (user.phones  + '').split(','));
          return users;
        });
    }).catch(err => {
      return Promise.reject({
        code: 500,
        description: `Error getting users from the database. ${err.message}`
      });
    });
};

const getUser = (userId) => {
  return getConnection()
    .then(connection => {
      const selectSql = 'SELECT * FROM users WHERE id=?'
      return connection.query(selectSql, [userId])
        .then(selectedResult => {
          let user = selectedResult[0][0];
          if (!user) {
            return Promise.reject({
              code: 404,
              description: 'Specified user doesn\'t exist'
            });
          }
          // todo: create separate table for storing phones instead of this hack
          user.phones = (user.phones  + '').split(',');
          return user;
        })
    }).catch(err => {
      if (typeof err.code == 'number') {
        return Promise.reject(err);
      } else {
        return Promise.reject({
          code: 500,
          description: `Error getting user by id from the database. ${err.message}`
        });
      }
    });
}


const getUserByCredentials = (email, password) => {
  return getConnection()
    .then(connection => {
      const selectSql = 'SELECT * FROM users WHERE email=? AND password=?'
      return connection.query(selectSql, [email, password])
        .then(selectedResult => {
          let user = selectedResult[0][0];
          if (!user) {
            return null;
          }
          // todo: create separate table for storing phones instead of this hack
          user.phones = (user.phones  + '').split(',');
          return user
        })
    }).catch(err => {
      return Promise.reject({
        code: 500,
        description: `Error getting user by id from the database. ${err.message}`
      });
    });
}

const createUser = (user) => {
  return getConnection()
    .then(connection => {
      const sql = `INSERT INTO users(name, email, password,phones,date_of_birth,education, is_admin ) VALUES (?,?,?,?,?,?,?)`;
      return connection.query(sql, [user.name, user.email, user.password, user.phones.join(','), user.date_of_birth, user.education, false])
        .then(userResult => {
          connection.close();
          return userResult;
        })
    }).catch(err => {
      return Promise.reject({
        code: 500,
        description: `Error creating user in the database. ${err.message}`
      });
    });
}

const updateUser = (userId, user) => {
  return getConnection()
    .then(connection => {
      return connection.query('SELECT COUNT(*) as Count FROM users WHERE id=?', [userId]).then(checkUserResult => {
        if (checkUserResult[0][0].Count == 0) {
          connection.close();
          return Promise.reject({
            code: 404,
            description: 'Specified user doesn\'t exist'
          });

        } else {
          const sql = `UPDATE users SET name=?, email=?, password=?, phones=?, date_of_birth=?, education=? WHERE id=? `;
          const data = [user.name, user.email, user.password, user.phones.join(','), user.date_of_birth, user.education, userId];
          return connection.query(sql, data)
            .then(userResult => {
              connection.close();
              return true;
            })
        }
      });
    }).catch(err => {
      if (typeof err.code == 'number') {
        return Promise.reject(err);
      } else {
        return Promise.reject({
          code: 500,
          description: `Error updating user in the database. ${err.message}`
        });
      }
    });
}

const deleteUser = (userId) => {
  return getConnection()
    .then(connection => {
      const sql = "DELETE FROM users WHERE id=?";
      const data = [userId]
      return connection.query(sql, data)
        .then(result => {
          connection.close()
          return result[0].affectedRows;
        })
    }).catch(err => {
      return Promise.reject({
        code: 500,
        description: `Error deleting user in the database. ${err.message}`
      });
    });
}


module.exports = {
  getAll,
  updateUser,
  createUser,
  deleteUser,
  getUser,
  getUserByCredentials
}