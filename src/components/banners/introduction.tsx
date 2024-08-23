import React from "react";
import FinanceIcon from "@/assets/images/financeIcon";

const IntroductionBanner: React.FC = () => {
  return (
    <section className="relative flex h-32 items-end bg-old-rose-700 lg:col-span-5 lg:h-full xl:col-span-6">
      <div className="lg:relative lg:block lg:p-12">
        <h2 className="mt-6 flex items-center text-2xl font-bold text-old-rose-50 sm:text-3xl md:text-4xl">
          <FinanceIcon />
          <span className="ml-2">Old Rose - Gestão financeira</span>
        </h2>
        <p className="mt-4 leading-relaxed text-old-rose-50">
          Acompanhe suas finanças de forma simples e eficiente. Controle seus
          gastos e receitas de forma fácil e rápida.
        </p>
      </div>
    </section>
  );
};

export default IntroductionBanner;
