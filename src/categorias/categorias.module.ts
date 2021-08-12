import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [CategoriasController,],
    providers: [CategoriasService,],
})
export class CategoriasModule { }
