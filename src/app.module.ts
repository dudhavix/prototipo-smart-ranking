import { JogadoresModule } from './jogadores/jogadores.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "dotenv";
config()

@Module({
    imports: [MongooseModule.forRoot(process.env.DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }), JogadoresModule,],
    controllers: [],
    providers: [],
})

export class AppModule { }