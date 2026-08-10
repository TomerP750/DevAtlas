import { Injectable } from '@nestjs/common';
import { Section } from './section.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SectionService {

    constructor(
        @InjectRepository(Section) private sectionRepository: Repository<Section>,
    ) {}


}
