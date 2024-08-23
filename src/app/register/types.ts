import { z } from "zod";

export const RegisterSchema = z.object({
    name: z.string().min(1, 'Por favor, digite seu nome'),
    surname : z.string().min(1, 'Por favor, digite seu sobrenome'),
    email: z.string().email().min(1, 'Por favor, digite seu e-mail'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirmPassword: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

export interface AuthUserDTO {
    email: string;
    password: string;
}