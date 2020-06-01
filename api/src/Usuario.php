<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE");
header("Access-Control-Allow-Headers:Origin,X-Requested-With,Content-Type,Accept,Authorization");

$app->get('/usuario', function (Request $request, Response $response) {
    $resultado = new stdClass();

    $params = $request->getQueryParams();

    $pdo = $this->get('PDO');

    $sth = $pdo->prepare("SELECT id_usuario FROM usuario WHERE email = :email");
    try
    {
        $sth->bindValue("email", $params["email"]);
        $sth->execute();
    }
    catch(PDOException $e)
    {
        $resultado->retorno = "ERRO";
        $response->getBody()->write($e->getMessage());
        return $response->withHeader('Content-Type', 'application/json');
    }
    if($dados = $sth->fetch(PDO::FETCH_OBJ))
    {
        $resultado->dados = $dados;

        $sth2 = $pdo->prepare("UPDATE usuario SET token_usuario = :idtoken, nome = :nome WHERE id_usuario = :idusuario");
        try
        {
            $sth2->bindValue("idusuario", $dados->id_usuario);
            $sth2->bindValue("idtoken", $params["idtoken"]);
            $sth2->bindValue("nome", $params["nome"]);
            $sth2->execute();
        }
        catch(PDOException $e)
        {
            $resultado->retorno = "ERRO";
            $response->getBody()->write($e->getMessage());
            return $response->withHeader('Content-Type', 'application/json');
        }
    }
    else
    {
        $sth2 = $pdo->prepare("SELECT MAX(id_usuario) AS CODIGO FROM usuario");
        try
        {
            $sth2->execute();
        }
        catch(PDOException $e)
        {
            $resultado->retorno = "ERRO";
            $response->getBody()->write($e->getMessage());
            return $response->withHeader('Content-Type', 'application/json');
        }
        $idusuario = 1;
        if($dado = $sth2->fetch(PDO::FETCH_OBJ))
        {
            $idusuario = (int) $dado->CODIGO + 1;
        }

        if($idusuario == null)
        {
            $idusuario = 1;
        }

        $sth2 = $pdo->prepare("INSERT INTO usuario (id_usuario, token_usuario, email, nome) VALUES (:idusuario, :idtoken, :email, :nome)");
        try
        {
            $sth2->bindValue("idusuario", $idusuario);
            $sth2->bindValue("idtoken", $params["idtoken"]);
            $sth2->bindValue("email", $params["email"]);
            $sth2->bindValue("nome", $params["nome"]);
            $sth2->execute();
        }
        catch(PDOException $e)
        {
            $resultado->retorno = "ERRO";
            $response->getBody()->write($e->getMessage());
            return $response->withHeader('Content-Type', 'application/json');
        }
        $resultado->dados = new stdClass();
        $resultado->dados->id_usuario = $idusuario;
    }

    $resultado->retorno = 'OK';
    $response->getBody()->write(json_encode($resultado));
    return $response->withHeader('Content-Type', 'application/json');
});

class usuario{
    function getUserId($db, $idtoken)
    {
        $sth = $db->prepare("SELECT id_usuario FROM usuario WHERE token_usuario = :idtoken");
        try
        {
            $sth->bindValue("idtoken", $idtoken);
            $sth->execute();
        }
        catch(PDOException $e)
        {
            $resultado->retorno = "ERRO";
            $response->getBody()->write($e->getMessage());
            return $response->withHeader('Content-Type', 'application/json');
        }
        if($dados = $sth->fetch(PDO::FETCH_OBJ))
        {
            $idusuario = $dados->id_usuario;
        }

        return $idusuario;
    }
}