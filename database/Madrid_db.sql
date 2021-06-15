CREATE TABLE usuario(
    id INT(11) NOT NULL,
    nombre VARCHAR(45) NOT NULL,
    apellido VARCHAR(45) NOT NULL,
    edad INT(3) NOT NULL,
    email VARCHAR(60) NOT NULL,
    telefono VARCHAR(10) NOT NULL,
    gustos VARCHAR(70) NOT NULL
);

ALTER TABLE usuario
    ADD PRIMARY KEY (id);

ALTER TABLE usuario
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;


CREATE TABLE eventos(
id INT(11) NOT NULL,
Titulo VARCHAR(60) NOT NULL,
Descripción TEXT,
hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
usuario_id INT(11),
CONSTRAINT fk_usuario_id FOREIGN KEY (usuario_id) REFERENCES usuario(id)
); 
ALTER TABLE eventos
    ADD PRIMARY KEY (id);
ALTER TABLE eventos 
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;