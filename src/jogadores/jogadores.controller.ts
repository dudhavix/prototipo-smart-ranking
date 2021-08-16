import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { JogadorInterface } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe';

@Controller('api/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService:JogadoresService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
        await this.jogadoresService.criarJogador(criarJogadorDto)
    }

    @Put(':_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(@Body() atualizarJogadorDto: AtualizarJogadorDto, @Param('_id', ValidacaoParametrosPipe) _id:string) {
        await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto)
    }

    @Get()
    async consultarJogadores():Promise<JogadorInterface[]>{
        return this.jogadoresService.consultarJogadores();
    }

    @Get(':_id')
    async consultarJogadorPeloId(@Param('_id', ValidacaoParametrosPipe) _id:string):Promise<JogadorInterface>{
        return this.jogadoresService.consultarJogadorPeloId(_id);
    }
    

    @Delete(':_id')
    async removerJogador(@Param('_id', ValidacaoParametrosPipe) _id:string):Promise<any>{
        return this.jogadoresService.removerJogador(_id)
    }

}
