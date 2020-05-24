<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

header('Access-Control-Allow-Origin:*');
header("Access-Control-Allow-Methods:GET,PUT,POST,DELETE");
header("Access-Control-Allow-Headers:Origin,X-Requested-With,Content-Type,Accept,Authorization");

$app->get('/venda', function (Request $request, Response $response) {
    $resultado = new stdClass();
    $params = $request->getQueryParams();

    $pdo = $this->get('PDO');

    $sth = $pdo->prepare("SELECT * FROM venda WHERE jogo_idjogo = :idjogo");
    try
    {
        $sth->bindValue("idjogo", $params['idjogo']);
        $sth->execute();
    }
    catch(PDOException $e)
    {
        $resultado->retorno = "ERRO";
        $resultado->dados = $e->getMessage();
        $response->getBody()->write(json_encode($resultado));
        return $response->withHeader('Content-Type', 'application/json');
    }
    $resultado->totalRows = $sth->rowCount();
    $resultado->dados = array();
    while($dados = $sth->fetch(PDO::FETCH_OBJ))
    {
        $resultado->dados[] = $dados;
    }

    $resultado->retorno = 'OK';
    $response->getBody()->write(json_encode($resultado));
    return $response->withHeader('Content-Type', 'application/json');
});