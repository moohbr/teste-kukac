import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email().min(1, 'Por favor, digite seu e-mail'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

export interface AuthUserDTO {
    email: string;
    password: string;
}