  <?php
    require_once "conexion.php";

    class GestorUsuariosModel
    {
        
        /*==============================
            SELECT USUARIO POR IDENTIFICADOR
        ==============================*/
        static public function seleccionarUsuariosModel($datosModel)
        {
            $stmt = Conexion::conectar()->prepare("SELECT id, primer_nombre, foto, lvl1, lvl1_score, lvl2, lvl2_score, lvl3, lvl3_score FROM usuario WHERE identificador = :identificador");

            $stmt->bindParam(":identificador", $datosModel['identificador'], PDO::PARAM_INT);

            $stmt->execute();

            return $stmt->fetch();

            $stmt->close();


        }

        /*==============================
            GUARDA EL USUARIO 
        ==============================*/
        static public function guardarUsuariosModel($datosModel)
        {
            $stmt = Conexion::conectar()->prepare("INSERT INTO usuario (identificador, primer_nombre, foto, lvl1) VALUES (:identificador, :primer_nombre, :foto, :lvl1)");

            $stmt->bindParam(":identificador", $datosModel['identificador'], PDO::PARAM_INT);
            $stmt->bindParam(":primer_nombre", $datosModel['primer_nombre'], PDO::PARAM_STR);
            $stmt->bindParam(":foto", $datosModel['foto'], PDO::PARAM_STR);
            $stmt->bindParam(":lvl1", $datosModel['lvl1'], PDO::PARAM_BOOL);

            if ($stmt->execute()) {
                // return true;
                return "true";
            }
            return false;

            $stmt->close();
        }
        
        /*==============================
            GUARDA PUNTUACION 
        ==============================*/
        static public function guardarPuntuacionModel($datosModel, $tabla)
        {
            $numero_nivel = $datosModel['numero_nivel'];
            $puntuacion_nivel = $datosModel['puntuacion_nivel'];

            $stmt = Conexion::conectar()->prepare("UPDATE " . $tabla . " SET " . $numero_nivel . " = :nivel, " . $puntuacion_nivel . " = :puntuacion WHERE id = :id");

            $stmt->bindParam(":nivel", $datosModel['nivel'], PDO::PARAM_BOOL);
            $stmt->bindParam(":puntuacion", $datosModel['puntuacion'], PDO::PARAM_INT);
            $stmt->bindParam(":id", $datosModel['id'], PDO::PARAM_INT);

            if ($stmt->execute()) {
                return "true";
            }
            return false;

            $stmt->close();
        }

        /*==============================
            SELECCIONAR PUNTUACION 
        ==============================*/
        static public function seleccionarPuntuacionModel($datosModel, $tabla)
        {
            $stmt = Conexion::conectar()->prepare("SELECT lvl1, lvl1_score, lvl2, lvl2_score, lvl3, lvl3_score FROM " . $tabla . " WHERE id = :id");
            $stmt->bindParam(":id", $datosModel['id'], PDO::PARAM_INT);

            $stmt->execute();
            return $stmt->fetch();

            $stmt->close();
        }

        /*==============================
            SELECT RANKING USUARIOS POR PUNTUACION 
        ==============================*/
        static public function puntuacionNivelModel($datos)
        {
            $stmt = Conexion::conectar()->prepare("SELECT primer_nombre,foto,$datos FROM usuario ORDER BY $datos DESC LIMIT 3");

            if ($stmt->execute()) {
                return $stmt->fetchAll();
                $stmt->close();
            } else {
                $stmt->close();
                return false;
            }
        }
    }