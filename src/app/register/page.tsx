"use client";

import React, { useCallback } from "react";
import { ZodError } from "zod";
import { RegisterSchema, AuthUserDTO } from "./types";
import { useRegisterStore } from "@/app/stores/register";
import ButtonSubmit from "@/components/buttons/submit";
import LabeledInputText from "@/components/fields/labeledText";
import IntroductionBanner from "@/components/banners/introduction";

const Register: React.FC = () => {
  const {
    email,
    password,
    confirmPassword,
    name,
    lastName,
    error,
    setEmail,
    setPassword,
    setConfirmPassword,
    setName,
    setLastName,
    setError,
    register,
  } = useRegisterStore((state) => ({
    email: state.email,
    password: state.password,
    confirmPassword: state.confirmPassword,
    name: state.name,
    lastName: state.lastName,
    error: state.error,
    setEmail: state.setEmail,
    setPassword: state.setPassword,
    setConfirmPassword: state.setConfirmPassword,
    setName: state.setName,
    setLastName: state.setLastName,
    setError: state.setError,
    register: state.register,
  }));

  const validateFormData = useCallback((data: AuthUserDTO) => {
    RegisterSchema.parse(data);
  }, []);

  const handleRegisterError = useCallback(
    (error: any) => {
      let errorMessage = "An error occurred, please try again later";
      if (error instanceof ZodError) {
        errorMessage = error.issues.map((issue) => issue.message).join(", ");
      }
      setError(errorMessage);
    },
    [setError],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = {
        email: email || "",
        name: name || "",
        surname: lastName || "",
        password: password || "",
        confirmPassword: confirmPassword || "",
      };

      try {
        validateFormData(data);
        register();
      } catch (error) {
        handleRegisterError(error);
      }
    },
    [
      email,
      name,
      lastName,
      password,
      confirmPassword,
      validateFormData,
      register,
      handleRegisterError,
    ],
  );

  return (
    <section className="bg-old-rose-100">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <IntroductionBanner />
        <main className="flex animate-fade items-center justify-center px-8 py-8 animate-duration-[2000ms] sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <form
              onSubmit={handleSubmit}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <LabeledInputText
                type="text"
                labelText="Nome"
                required={true}
                spanSize={3}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                value={name}
              />

              <LabeledInputText
                type="text"
                labelText="Sobrenome"
                required={true}
                spanSize={3}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLastName(e.target.value)
                }
                value={lastName}
              />

              <LabeledInputText
                type="email"
                labelText="Email"
                required={true}
                spanSize={6}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                value={email}
              />

              <LabeledInputText
                type="password"
                labelText="Senha"
                required={true}
                spanSize={3}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                value={password}
              />

              <LabeledInputText
                type="password"
                labelText="Confirmação de Senha"
                required={true}
                spanSize={3}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                value={confirmPassword}
              />

              {error && (
                <p className="col-span-6 text-sm text-old-rose-500">{error}</p>
              )}

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <ButtonSubmit type="submit" labelText="Cadastrar" />
                <p className="mt-4 text-sm text-old-rose-500 sm:mt-0">
                  Já possui uma conta?{" "}
                  <a
                    href="/login"
                    className="font-semibold leading-6 text-old-rose-600 hover:text-old-rose-500"
                  >
                    Logar-se
                  </a>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Register;
