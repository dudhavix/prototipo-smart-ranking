import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadorInterface } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<JogadorInterface>) { }

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<JogadorInterface> {
        const { email } = criarJogadorDto;

        const jogadoreEncontrado = await this.jogadorModel.findOne({ email }).exec();

        if (jogadoreEncontrado) {
            return await this.jogadorModel.findOneAndUpdate({ email }, { $set: criarJogadorDto }).exec()
        } else {
            const jogadorCriado = new this.jogadorModel(criarJogadorDto);
            return await jogadorCriado.save();
        }
    }

    async consultarJogadores(email?: string): Promise<JogadorInterface | JogadorInterface[]> {
        
        if (email) {
            const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

            if (!jogadorEncontrado) {
                throw new NotFoundException("Jogador não encontrado");
            }

            return jogadorEncontrado;
        } else {
            return await this.jogadorModel.find().exec();
        }
    }

    async removerJogador(_id: string): Promise<void>{
        await this.jogadorModel.remove({_id})
    }

}