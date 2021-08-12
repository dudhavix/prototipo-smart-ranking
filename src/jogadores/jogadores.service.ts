import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadorInterface } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<JogadorInterface>) { }

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<JogadorInterface> {
        const { email } = criarJogadorDto;

        const jogadoreEncontrado = await this.jogadorExiste(null , email)

        if (jogadoreEncontrado) {
            throw new BadRequestException(`O email ${email} ja foi utilizado`);
        } else {
            const jogadorCriado = new this.jogadorModel(criarJogadorDto);
            return await jogadorCriado.save();
        }
    }

    async atualizarJogador(_id: string, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {
        const jogadoreEncontrado = await this.jogadorExiste(_id, null)

        if (jogadoreEncontrado) {
            await this.jogadorModel.findOneAndUpdate({ _id }, { $set: atualizarJogadorDto }).exec()
        } else {
            throw new NotFoundException("Jogador não encontrado");
        }
    }

    async consultarJogadores(): Promise<JogadorInterface[]> {
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadorPeloId(_id: string): Promise<JogadorInterface> {
        const jogadorExiste = await this.jogadorModel.findOne({ _id }).exec();
        
        if (!jogadorExiste) {
            throw new NotFoundException("Jogador não encontrado");
        }

        return jogadorExiste;
    }

    async removerJogador(_id: string): Promise<any> {
        const jogadorExiste = await this.jogadorExiste(_id, null)
        if(!jogadorExiste){
            throw new NotFoundException("Jogador não encontrado");
        }
        await this.jogadorModel.deleteOne({ _id })
    }

    private async jogadorExiste(_id?: string, email?: string): Promise<Boolean>{
        
        const jogadorExiste = email ? await this.jogadorModel.findOne({ email }).exec() : await this.jogadorModel.findOne({ _id }).exec();
        
        if(jogadorExiste){
            return true;
        }else{
            return false;
        }
    }

}