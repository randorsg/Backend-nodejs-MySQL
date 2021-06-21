const mysql = require('mysql');

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    usuario: process.env.DB_usuario,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// View usuarios
exports.view = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        // usuario the connection
        connection.query('SELECT * FROM usuario WHERE status = "active"', (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                let removedusuario = req.query.removed;
                res.render('home', { rows, removedusuario });
            } else {
                console.log(err);
            }
            console.log('The data from usuario table: \n', rows);
        });
    });
}

// Find usuario by Search
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;
        // usuario the connection
        connection.query('SELECT * FROM usuario WHERE nombre LIKE ? OR apellido LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from usuario table: \n', rows);
        });
    });
}

exports.form = (req, res) => {
    console.log("red");
    res.render('add-usuario');
}

// Add new usuario
exports.create = (req, res) => {
    const { nombre, apellido, email, phone, gustos, comments } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;

        // usuario the connection
        connection.query('INSERT INTO usuario SET nombre = ?, apellido = ?, email = ?, phone = ?, gustos, comments = ?', [nombre, apellido, email, phone, gustos, comments], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.render('add-usuario', { alert: 'usuario added successfully.' });
            } else {
                console.log(err);
            }
            console.log('The data from usuario table: \n', rows);
        });
    });
}


// Edit usuario
exports.edit = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        // usuario the connection
        connection.query('SELECT * FROM usuario WHERE id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.render('edit-usuario', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from usuario table: \n', rows);
        });
    });
}


// Update usuario
exports.update = (req, res) => {
    const { nombre, apellido, email, phone, gustos, comments } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        // usuario the connection
        connection.query('UPDATE usuario SET nombre = ?, apellido = ?, email = ?, phone = ?, gustos= ?, comments = ? WHERE id = ?', [nombre, apellido, email, phone, gustos, comments, req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();

            if (!err) {

                pool.getConnection((err, connection) => {
                    if (err) throw err; // not connected!
                    console.log('Connected as ID ' + connection.threadId);
                    // usuario the connection
                    connection.query('SELECT * FROM usuario WHERE id = ?', [req.params.id], (err, rows) => {
                        // When done with the connection, release it
                        connection.release();
                        if (!err) {
                            res.render('edit-usuario', { rows, alert: `${nombre} has been updated.` });
                        } else {
                            console.log(err);
                        }
                        console.log('The data from usuario table: \n', rows);
                    });
                });

            } else {
                console.log(err);
            }
            console.log('The data from usuario table: \n', rows);
        });
    });
}

// Delete usuario
exports.delete = (req, res) => {

    // Delete a record
    // pool.getConnection((err, connection) => {
    //   if(err) throw err; // not connected!
    //   console.log('Connected as ID ' + connection.threadId);

    //   // usuario the connection
    //   connection.query('DELETE FROM usuario WHERE id = ?', [req.params.id], (err, rows) => {
    //     // When done with the connection, release it
    //     connection.release();
    //     if(!err) {
    //       res.redirect('/');
    //     } else {
    //       console.log(err);
    //     }
    //     console.log('The data from usuario table: \n', rows);

    //   });
    // });

    // Hide a record
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('UPDATE usuario SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                let removedusuario = encodeURIComponent('usuario successeflly removed.');
                res.redirect('/?removed=' + removedusuario);
            } else {
                console.log(err);
            }
            console.log('The data from beer table are: \n', rows);
        });
    });

}


// View usuarios
exports.viewall = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; // not connected!
        console.log('Connected as ID ' + connection.threadId);
        // usuario the connection
        connection.query('SELECT * FROM usuario WHERE id = ?', [req.params.id], (err, rows) => {
            // When done with the connection, release it
            connection.release();
            if (!err) {
                res.render('view-usuario', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from usuario table: \n', rows);
        });
    });
}