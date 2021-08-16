import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-catrgoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { CategoriaInterface } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {

    constructor(@InjectModel('Categoria')   private readonly categoriaModel: Model<CategoriaInterface>, 
                                            private readonly jogadoresService: JogadoresService
    ) { }

    async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<CategoriaInterface> {
        const { categoria } = criarCategoriaDto;

        const categoriaExiste = await this.categoriaModel.findOne({ categoria }).exec();

        if (categoriaExiste) {
            throw new BadRequestException(`Categoria ${categoria} ja cadastrada`);
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto);
        return await categoriaCriada.save();
    }

    async consultarCatergorias(): Promise<CategoriaInterface[]> {
        return await this.categoriaModel.find().populate('jogadores').exec();
    }

    async consultarCatergoria(categoria: string): Promise<CategoriaInterface> {
        const categoriaExiste = await this.categoriaModel.findOne({ categoria }).populate('jogadores');
        if(!categoriaExiste){
            throw new NotFoundException("Categoria não encontrada");
        }
        return categoriaExiste
    }

    async atualizarCategoria(categoria: string, atualizarCategoriaDto: AtualizarCategoriaDto): Promise<void>{
        const categoriaExiste = await this.categoriaModel.findOne({categoria})

        if(!categoriaExiste){
            throw new NotFoundException("Categoria não encontrada");
        }

        await this.categoriaModel.findOneAndUpdate({categoria}, {$set: atualizarCategoriaDto})
    }

    async atribuirCategoriaJogador(params: string[]): Promise<void>{
        const categoria = params['categoria']
        const idJogador = params['idJogador']

        const categoriaExiste = await this.categoriaModel.findOne({categoria})
        if(!categoriaExiste){
            throw new NotFoundException("Categoria não encontrada");
        }

        await this.jogadoresService.consultarJogadorPeloId(idJogador)
        
        const jogadorCategoriaExiste = await this.categoriaModel.find({categoria}).where('jogadores').in(idJogador)
        if(jogadorCategoriaExiste.length > 0){
            throw new BadRequestException("Jogador ja cadastrado nessa categoria");
        }

        categoriaExiste.jogadores.push(idJogador)
        await this.categoriaModel.findOneAndUpdate({categoria}, {$set: categoriaExiste})
    }
}
