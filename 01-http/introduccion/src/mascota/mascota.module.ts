import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MascotaEntity} from './mascota.entity';

@Module({
    controllers: [],
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    MascotaEntity
                ],
                'default' // Nombre cadena de conexión
            )
    ],
    providers: []
})
export class MascotaModule {

}
