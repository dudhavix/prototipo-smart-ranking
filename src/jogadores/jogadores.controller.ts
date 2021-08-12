import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from "./dtos/criar-jogador.dto";
import { JogadorInterface } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService:JogadoresService){}

    @Post()
    async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
        await this.jogadoresService.criarAtualizarJogador(criarJogadorDto)
    }

    @Get()
    async consultarJogadores(@Query('email') email:string):Promise<JogadorInterface | JogadorInterface[]>{
        if(email){
            return this.jogadoresService.consultarJogadores(email)
        }else{
            return this.jogadoresService.consultarJogadores();
        }
    }

    @Delete()
    async removerJogador(@Query('id') id:string):Promise<void>{
        this.jogadoresService.removerJogador(id)
    }

}
