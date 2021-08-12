import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class JogadoresValidacaoParametrosPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if(!value){
            throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser informado`);
        }
        return value;
    }
}
