import {BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Query} from '@nestjs/common';
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
            const errores: ValidationError[] = await validate(mascotaValida)
            if (errores.length > 0) {
                console.error('Errores: ', errores);
                throw new BadRequestException('Error validando');
            } else {
                const mensajeCorrecto = {
                    mensaje: 'Se creo correctamente'
                }
                return mensajeCorrecto;
            }
        } catch (e) {
            console.error('Error', e);
            throw new BadRequestException('Error validando');
        }
    }


}






