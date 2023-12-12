-- 3. Processamento de Transações e Controle de concorrência
-- 3a.
CREATE OR REPLACE FUNCTION verifica_produto_disponivel(
  IN codigo_produto INTEGER,
  IN quantidade_desej NUMERIC
)
RETURNS BOOLEAN AS $$
DECLARE
  quantidade_dispo NUMERIC;
BEGIN
  -- Seleciona a quantidade disponível do produto com o código fornecido
  SELECT quantidade INTO quantidade_dispo FROM produtos WHERE codigo = codigo_produto;

  -- Verifica se a quantidade disponível é suficiente
  IF quantidade_dispo >= quantidade_desej THEN
    RETURN TRUE; -- Retorna verdadeiro se houver quantidade suficiente
  ELSE
    RAISE EXCEPTION 'Essa quantidade do produto não está disponível'; -- Lança uma exceção se a quantidade for insuficiente
  END IF;
END;
$$ LANGUAGE plpgsql;

SELECT verifica_produto_disponivel(1, 1) -- Exemplo produto disponível

SELECT verifica_produto_disponivel(1, 100) -- Exemplo produto não disponível


-- 3b.
-- Transação 1
BEGIN;

-- Inicia a transação 1 e atualiza o nome do funcionário
UPDATE funcionarios
SET nome = 'João Silva'
WHERE codigo = 1; -- Substitua pelo código do funcionário desejado

COMMIT;

-- Transação 2
BEGIN;

-- Inicia a transação 2 e atualiza o nome do mesmo funcionário
UPDATE funcionarios
SET nome = 'Maria Silva'
WHERE codigo = 1; -- Substitua pelo código do funcionário desejado

COMMIT;

-- 4. Recuperação 
-- 4a.
CREATE OR REPLACE FUNCTION fazer_venda(
  IN codigo_produto INTEGER,
  IN quantidade_desej NUMERIC,
  IN codigo_funcionario INTEGER
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Inicia uma transação
  BEGIN
    -- Verifica se o produto está disponível usando a função anterior
    IF verifica_produto_disponivel(codigo_produto, quantidade_desej) THEN
      -- Atualiza a quantidade disponível do produto
      UPDATE produtos SET quantidade = quantidade - quantidade_desej WHERE codigo = codigo_produto;
      
      -- Registra a venda
      INSERT INTO vendas (horario, valor_total, funcionarios_cod)
      VALUES (CURRENT_TIMESTAMP, (SELECT valor * quantidade_desej FROM produtos WHERE codigo = codigo_produto), codigo_funcionario);

      RETURN TRUE;
    ELSE
      -- Se a verificação falhar, a exceção será lançada e o rollback será realizado
      RETURN FALSE;
    END IF;
  EXCEPTION
    -- Captura exceções e realiza rollback
    WHEN OTHERS THEN
      RAISE;
      RETURN FALSE;
  END;
END;
$$ LANGUAGE plpgsql;

-- Exemplo de chamada da função realizar_venda
DO $$ 
DECLARE
  resultado BOOLEAN;
BEGIN
  resultado := fazer_venda(1, 5, 123); -- Parâmetros: codigo_produto, quantidade_desej, codigo_funcionario
  -- resultado := fazer_venda(1, 100, 123);
  IF resultado THEN
    RAISE NOTICE 'Venda foi realizada com sucesso!';
  ELSE
    RAISE NOTICE 'Ocorreu uma falha durante a venda!';
  END IF;
END $$;