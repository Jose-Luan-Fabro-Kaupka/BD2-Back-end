-- a)Criar alguns usuários.
CREATE USER Victor WITH PASSWORD 'senha123';
CREATE USER Diogo WITH PASSWORD 'senha123';
CREATE USER Jose WITH PASSWORD 'senha123';
CREATE USER Ricardo WITH PASSWORD 'senha123';
CREATE USER Pedro WITH PASSWORD 'senha123';


-- b)Criar alguns grupos
CREATE GROUP gerentes;
CREATE GROUP compradores;
CREATE GROUP vendedores;
CREATE GROUP socios;


-- c)Conceder diferentes privilégios aos grupos.
-- Conceder privilégios para o grupo de gerentes
GRANT SELECT, INSERT, UPDATE, DELETE ON itens TO gerentes;
GRANT SELECT, INSERT, UPDATE, DELETE ON produtos TO gerentes;
GRANT SELECT, INSERT, UPDATE, DELETE ON vendas TO gerentes;
GRANT SELECT, INSERT, UPDATE, DELETE ON funcionarios TO gerentes;

-- Conceder privilégios para o grupo de compradores
GRANT SELECT, INSERT, UPDATE ON itens TO compradores;
GRANT SELECT, INSERT, UPDATE ON produtos TO compradores;
GRANT SELECT, INSERT, UPDATE ON vendas TO compradores;

-- Conceder privilégios para o grupo de vendedores
GRANT SELECT, INSERT, UPDATE ON vendas TO vendedores;

-- Conceder privilégios para o grupo de sócios
GRANT SELECT, INSERT, UPDATE, DELETE ON itens TO socios;
GRANT SELECT, INSERT, UPDATE, DELETE ON produtos TO socios;
GRANT SELECT, INSERT, UPDATE, DELETE ON vendas TO socios;
GRANT SELECT, INSERT, UPDATE, DELETE ON funcionarios TO socios;



-- d)Adicionar os usuários aos grupos.
GRANT gerentes TO Victor;
GRANT compradores TO Diogo;
GRANT vendedores TO Jose;
GRANT socios TO Ricardo;
GRANT compradores TO Pedro;


-- e.Conceder um “novo” privilégio a um usuário que já está em algum grupo. 
GRANT DELETE ON VENDAS TO Diogo

-- f.Testar se outro usuário pertencente ao mesmo grupo da questão ‘e’ também recebeu o “novo” privilégio.
--Usuário Pedro tentar rodar o comando Delete 

--insert tabela funcionário
insert into funcionarios (nome, cpf, senha, funcao) values ('Victor', '091.936.749-61', 'senha123', 1);
insert into funcionarios (nome, cpf, senha, funcao) values ('Diogo', '123.456.789-01', 'senha123', 2);
insert into funcionarios (nome, cpf, senha, funcao) values ('Pedro', '123.456.789-02', 'senha123', 2);
insert into funcionarios (nome, cpf, senha, funcao) values ('Ricardo', '123.456.789-03', 'senha123', 4);
insert into funcionarios (nome, cpf, senha, funcao) values ('Jose', '123.456.789-04', 'senha123', 3);
