import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HttpJuegoModule} from './http/http-juego.module';
import {UsuarioModule} from './usuario/usuario.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        // Aqui otros modulos
        HttpJuegoModule,
        UsuarioModule,
        TypeOrmModule
            .forRoot({
                name: 'default', // nombre conexión
                type: 'mysql', // mysql postgres
                host: 'localhost', // ip
                port: 3306, // puerto
                username: 'root', // usuario
                password: 'root', // password
                database: 'test', //  Base de Datos
                entities: [  // TODAS LAS ENTIDADES

                ],
                synchronize: true, // Actualiza el esquema de la base de datos
                dropSchema: false, // Eliminar Datos y el Esquema de base de datos
            }),
    ],
    controllers: [
        // Controladores APP MODULE
        AppController
    ],
    providers: [
        // Servicios APP MODULE
        AppService
    ],
})
export class AppModule {
}
