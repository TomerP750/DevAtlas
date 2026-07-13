import { useForm } from "react-hook-form";
import type { UpdatePasswordDto } from "../models/UpdatePasswordDto";


export function UpdatePasswordForm() {

    const { register, handleSubmit, formState: { errors }, } = useForm<UpdatePasswordDto>();


    return (
        <section>

        </section>
    )
}