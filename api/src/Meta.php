<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE");
header("Access-Control-Allow-Headers:Origin,X-Requested-With,Content-Type,Accept,Authorization");

$app->get('/meta', function (Request $request, Response $response) {
    $resultado = new stdClass();

    $params = $request->getQueryParams();

    $pdo = $this->get('PDO');

    $usuario = new usuario();
    $idusuario = $usuario->getUserId($pdo, $params['idtoken']);

    $sth = $pdo->prepare("SELECT * FROM meta WHERE usuario_id_usuario = :idusuario AND concluido = 0 ".$params['condicao']);
    try
    {
        $sth->bindValue("idusuario", $idusuario);
        $sth->execute();
    }
    catch(PDOException $e)
    {
        $resultado->retorno = "ERRO";
        $response->getBody()->write($e->getMessage());
        return $response->withHeader('Content-Type', 'application/json');
    }
    $resultado->dados = array();
    while($dados = $sth->fetch(PDO::FETCH_OBJ))
    {
        $resultado->dados[] = $dados;
    }

    $resultado->retorno = 'OK';
    $response->getBody()->write(json_encode($resultado));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/meta/gravar', function (Request $request, Response $response) {
    $resultado = new stdClass();

    $params = $request->getQueryParams();

    $pdo = $this->get('PDO');

    $usuario = new usuario();
    $idusuario = $usuario->getUserId($pdo, $params['idtoken']);

    $sth = $pdo->prepare("SELECT MAX(id_meta) AS CODIGO FROM meta");
    try
    {
        $sth->execute();
    }
    catch(PDOException $e)
    {
        $resultado->retorno = "ERRO";
        $response->getBody()->write($e->getMessage());
        return $response->withHeader('Content-Type', 'application/json');
    }
    $codigo = 1;
    if($dados = $sth->fetch(PDO::FETCH_OBJ))
    {
        if($dados->CODIGO == null)
        {
            $codigo = 1;
        }
        else
        {
            $codigo = (int) $dados->CODIGO + 1;
        }
    }

    $sth = $pdo->prepare("INSERT INTO meta(id_meta, titulo, descricao, prazo, concluido, usuario_id_usuario) VALUES (:idmeta, :titulo, :descricao, :prazo, 0, :idusuario)");
    try
    {
        $sth->bindValue("idmeta", $codigo);
        $sth->bindValue("titulo", $params["titulo"]);
        $sth->bindValue("descricao", $params["descricao"]);
        $sth->bindValue("prazo", $params["prazo"]);
        $sth->bindValue("idusuario", $idusuario);
        $sth->execute();
    }
    catch(PDOException $e)
    {
        $resultado->retorno = "ERRO";
        $response->getBody()->write($e->getMessage());
        return $response->withHeader('Content-Type', 'application/json');
    }

    $resultado->retorno = 'OK';
    $response->getBody()->write(json_encode($resultado));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/meta/concluir', function (Request $request, Response $response) {
    $resultado = new stdClass();

    $params = $request->getQueryParams();

    $pdo = $this->get('PDO');

    $usuario = new usuario();
    $idusuario = $usuario->getUserId($pdo, $params['idtoken']);

    $sth = $pdo->prepare("UPDATE meta SET concluido = 1 WHERE usuario_id_usuario = :idusuario AND id_meta = :idmeta");
    try
    {
        $sth->bindValue("idmeta", $params["idmeta"]);
        $sth->bindValue("idusuario", $idusuario);
        $sth->execute();
    }
    catch(PDOException $e)
    {
        $resultado->retorno = "ERRO";
        $response->getBody()->write($e->getMessage());
        return $response->withHeader('Content-Type', 'application/json');
    }

    $resultado->retorno = 'OK';
    $response->getBody()->write(json_encode($resultado));
    return $response->withHeader('Content-Type', 'application/json');
});