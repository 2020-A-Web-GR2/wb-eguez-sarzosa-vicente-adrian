// usuario.entity.ts
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('epn_usuario') // nombre tabla usuario
export class UsuarioEntity{
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number;

    @Column({
        name: 'nombre',
        type: 'varchar',
        nullable: true
    })
    nombre?: string

    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true
    })
    apellido?: string

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true
    })
    cedula: string


}
