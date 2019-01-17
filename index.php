<?php
require_once "controlador/template.php";
require_once "controlador/usuarios.php";

require_once "modelo/usuarios.php";

// Invoca el controlador de Template y lo carga
$template = new TemplateController();
$template -> template();