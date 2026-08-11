import { Expose } from "class-transformer";

export class SectionDto {
    @Expose()
    id!: string;
    @Expose()
    name!: string;
    @Expose()
    description!: string;
    @Expose()
    completed!: boolean;
}