<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE");
header("Access-Control-Allow-Headers:Origin,X-Requested-With,Content-Type,Accept,Authorization");

$app->get('/jogo', function (Request $request, Response $response) {
    $resultado = new stdClass();

    $pdo = $this->get('PDO');

    $sth = $pdo->prepare("SELECT * FROM jogo");
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
    $resultado->dados = array();
    while($dados = $sth->fetch(PDO::FETCH_OBJ))
    {
        $resultado->dados[] = $dados;
    }

    $resultado->retorno = 'OK';
    $response->getBody()->write(json_encode($resultado));
    return $response->withHeader('Content-Type', 'application/json');
});