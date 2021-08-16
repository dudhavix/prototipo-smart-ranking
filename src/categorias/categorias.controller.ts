import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-catrgoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { CategoriaInterface } from './interfaces/categoria.interface';

@Controller('api/categorias')
export class CategoriasController {

    constructor(private readonly categoriaService: CategoriasService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(@Body() criarCategoriaDto: CriarCategoriaDto): Promise<CategoriaInterface> {
        return await this.categoriaService.criarCategoria(criarCategoriaDto);
    }

    @Get()
    async consultarCategorias(): Promise<CategoriaInterface[]> {
        return await this.categoriaService.consultarCatergorias();
    }

    @Get(':categoria')
    async consultarCategoria(@Param('categoria') categoria: string): Promise<CategoriaInterface> {
        return await this.categoriaService.consultarCatergoria(categoria);
    }

    @Put(':categoria')
    @UsePipes(ValidationPipe)
    async atualizarCategoria(@Body() atualizarCategoriaDto: AtualizarCategoriaDto, @Param('categoria') categoria: string): Promise<void> {
        await this.categoriaService.atualizarCategoria(categoria, atualizarCategoriaDto);
    }

    @Post(':categoria/jogadores/:idJogador')
    async atribuirCategoriaJogador(@Param() params: string[]): Promise<void> {
        return await this.categoriaService.atribuirCategoriaJogador(params);
    }
}
