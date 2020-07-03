import {BadRequestException, Controller, Delete, Get, Header, HttpCode, Param, Post} from '@nestjs/common';

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


}
