"use client";

import React, { useCallback } from "react";
import { ZodError } from "zod";
import { AuthUserDTO, LoginSchema } from "./types";
import { useAuthStore } from "@/app/stores/login";
import LabeledInputText from "@/components/fields/labeledText";
import IntroductionBanner from "@/components/banners/introduction";
import Loading from "@/components/modals/loading";
import ErroNotification from "@/components/modals/errorNotification";
import PasswordInput from "@/components/fields/passordInput";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Login() {
  const {
    email,
    password,
    error,
    loading,
    login,
    setEmail,
    setPassword,
    setError,
    setLoading,
  } = useAuthStore((state) => ({
    email: state.email,
    password: state.password,
    error: state.error,
    loading: state.loading,
    login: state.login,
    setEmail: state.setEmail,
    setPassword: state.setPassword,
    setError: state.setError,
    setLoading: state.setLoading,
  }));

  const validateFormData = useCallback(
    (data: AuthUserDTO) => {
      try {
        LoginSchema.parse(data);
        return true;
      } catch (err) {
        if (err instanceof ZodError) {
          setError(err.issues.map((issue) => issue.message).join(", "));
        }
        return false;
      }
    },
    [setError],
  );

  const handleLoginError = useCallback(
    (error: any) => {
      let errorMessage =
        error.message ?? "An error occurred, please try again later";
      if (error instanceof ZodError) {
        errorMessage = error.issues.map((issue) => issue.message).join(", ");
      } else if (error.message === "Network Error") {
        errorMessage = "Network error";
      }
      setError(errorMessage);
    },
    [setError],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = { email: email || "", password: password || "" };
      if (validateFormData(data)) {
        try {
          setLoading(true);
          login();
          if (useAuthStore.getState().isLoggedIn) {
            await sleep(2000);
            window.location.href = "/dashboard";
          } else {
            throw new Error(error);
          }
        } catch (error) {
          handleLoginError(error);
        } finally {
          setLoading(false);
        }
      } else {
        handleLoginError(new Error("Invalid data"));
      }
    },
    [
      email,
      password,
      validateFormData,
      setLoading,
      login,
      handleLoginError,
      error,
    ],
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-old-rose-100">
      {!loading && !useAuthStore.getState().isLoggedIn ? (
        <div className="flex lg:grid lg:min-h-screen lg:grid-cols-12">
          <IntroductionBanner />
          {error ? <ErroNotification description={error} /> : null}
          <main className="flex animate-fade items-center justify-center p-8 animate-duration-[2000ms] lg:col-span-7 lg:p-16 xl:col-span-6">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <LabeledInputText
                  type="email"
                  id="email"
                  labelText="Email"
                  required={true}
                  spanSize={6}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  value={email}
                  autoComplete="email"
                />
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-old-rose-600 px-3 py-1.5 text-sm font-semibold leading-6 text-old-rose-50 shadow-sm shadow-old-rose-950 hover:bg-old-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-old-rose-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
              <p className="mt-10 text-center text-sm text-old-rose-500">
                Não tem conta?{" "}
                <a
                  href="/register"
                  className="font-semibold leading-6 text-old-rose-600 hover:text-old-rose-500"
                >
                  Registre-se
                </a>
              </p>
            </div>
          </main>
        </div>
      ) : (
        <Loading isLoading={loading} />
      )}
    </div>
  );
}

export default Login;
