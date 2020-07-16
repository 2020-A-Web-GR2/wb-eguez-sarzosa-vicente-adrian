import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Header,
    HttpCode,
    Param,
    Post,
    Query,
    Req,
    Res,
    Headers
} from '@nestjs/common';
import {MascotaCreateDto} from './dto/mascota.create-dto';
import {validate, ValidationError} from 'class-validator';

// http://localhost:3001/juegos-http
// @Controller('juegos-http')
@Controller('juegos-http')
export class HttpJuegoController {

    @Get('hola')
    @HttpCode(201)
    holaGet() {
        throw new BadRequestException('No envia nada');
        // return 'Hola GET! :)';
    }

    @Post('hola')
    //@HttpCode(202)
    @HttpCode(202)
    holaPost() {
        return 'Hola POST! :)';
    }

    @Delete('hola')
    @HttpCode(204)
//  @Header('Cache-control', 'none')
    @Header('Cache-control', 'none')
    @Header('EPN', 'probando las cosas')
    holaDelete() {
        return 'Hola DELETE! :)';
    }

    // http://localhost:3001/juegos-http/parametros-ruta/XX/gestion/YY
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta
    ) {
        console.log('Parametros', parametrosRuta);
        // Validen que es un numero
        isNaN(parametrosRuta.edad) // 'ABC' true
        isNaN(parametrosRuta.altura) //  1234 false
        // throw new BadRequestException('No son numeros')
        const edad = Number(parametrosRuta.edad);
        const altura = Number(parametrosRuta.altura);
        return edad + altura;
    }

    @Get('parametros-consulta')
    parametrosConsulta(
        @Query() parametrosDeConsulta
    ) {
        console.log(parametrosDeConsulta.nombre);
        console.log(parametrosDeConsulta.apellido);
        const tieneNombreYApellido = parametrosDeConsulta.nombre != undefined && parametrosDeConsulta.apellido != undefined;
        console.log('parametrosDeConsulta', parametrosDeConsulta);
        if (tieneNombreYApellido) {
            return parametrosDeConsulta.nombre + ' ' + parametrosDeConsulta.apellido;
        } else {
            return '= )';
        }
    }

    @Post('parametros-cuerpo')
    @HttpCode(200)
    async parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ) {
        // Promesas
        const mascotaValida = new MascotaCreateDto();
        mascotaValida.casada = parametrosDeCuerpo.casada;
        mascotaValida.edad = parametrosDeCuerpo.edad;
        mascotaValida.ligada = parametrosDeCuerpo.ligada;
        mascotaValida.nombre = parametrosDeCuerpo.nombre;
        mascotaValida.peso = parametrosDeCuerpo.peso;
        try {
            const errores: ValidationError[] = await validate(mascotaValida);
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                throw new BadRequestException('Error validando');
            } else {
                const mensajeCorrecto = {
                    mensaje: 'Se creo correctamente'
                };
                return mensajeCorrecto;
            }
        } catch (e) {
            console.error('Error', e);
            throw new BadRequestException('Error validando');
        }
    }

    @Get('guardarCookieInsegura')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req() req, //  request - PETICION
        @Res() res // response - RESPUESTA
    ) {
        res.cookie(
            'galletaInsegura', // nombre
            'Tengo hambre', // valor
        );
        const mensaje = {
            mensaje: 'ok'
        };
        // return mensaje; // NO SE PUEDE USAR RETURN CUANDO SE USA @Res() OJO !!!
        res.send(mensaje); // METODO EXPRESSJS
    }

    @Get('guardarCookieSegura')
    guardarCookieSegura(
        @Query() parametrosConsulta,
        @Req() req, //  request - PETICION
        @Res() res // response - RESPUESTA
    ) {
        res.cookie(
            'galletaSegura', // nombre
            'Web :3', // valor
            {
                secure: true
            }
        );
        const mensaje = {
            mensaje: 'ok'
        };
        // return mensaje; // NO SE PUEDE USAR RETURN CUANDO SE USA @Res() OJO !!!
        res.send(mensaje); // METODO EXPRESSJS
    }

    @Get('mostrarCookies')
    mostrarCookies(
        @Req() req
    ) {
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies
        };
        return mensaje;
    }

    @Get('guardarCookieFirmada')
    public guardarCookieFirmada(
        @Res() res,
        @Headers() headers // peticion - request
    ) {
        // ENCRIPCION DE LA POLIBURGUER CON EL ALGORITMO Q YO QUIERO
        console.log('Headers', headers);

        res.header('Cabecera','Dinamica'); // respuesta - response

        res.cookie('firmada', 'poliburguer', {signed: true});
        res.cookie('firmada1', 'poliburguer1', {signed: true});
        res.cookie('firmada2', 'poliburguer2', {signed: true});
        res.cookie('firmada3', 'poliburguer3', {signed: true});
        res.cookie('firmada4', 'poliburguer4', {signed: true});




        const mensaje = {
            mensaje: 'ok'
        };
        res.send(mensaje);
    }

    // 1 Guardar Cookie Insegura
    // 2 Guardar Cookie Segura
    // 3 Mostrar Cookies

}







