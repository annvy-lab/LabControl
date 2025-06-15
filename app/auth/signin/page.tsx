"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { login } from "@/services/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(email, senha);

      if (data?.acessToken) {
        localStorage.setItem("token", data.acessToken);
        toast.success("Login realizado com sucesso!");
        router.push("/admin/dashboard");
      } else {
        toast.error("Erro inesperado no login.");
      }
    } catch (err: any) {
      toast.error("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden p-0 border-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="bg-muted relative hidden md:block h-full w-full">
                <img
                  src="/background-banner-login.svg"
                  alt="banner login"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <img
                    src="/figura-login.svg"
                    alt="figura banner login"
                    className="mb-8 max-h-[40%] object-contain"
                  />
                  <div className="w-full max-w-md px-12 mt-[-5px]">
                    <h2 className="text-3xl font-semibold text-card mb-3 text-left tracking-widest">
                      Reserve seu<br />
                      laboratório!
                    </h2>
                    <p className="text-base font-light text-accent/90 text-left">
                      Maximize a utilização dos seus laboratórios com agendamento inteligente e rastreável.
                    </p>
                  </div>
                </div>
              </div>
              <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                <div className="flex flex-col py-8 gap-5">
                  <div className="flex flex-col items-center text-center gap-2 mb-3">
                    <img src="/logo-facema-pequena.svg" alt="logo simples facema" />
                    <h1 className="text-4xl font-semibold text-sidebar">LabControl</h1>
                  </div>
                  <div className="grid gap-3">
                    <Input
                      className="border-sidebar border-[1.5px] rounded-3xl"
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Input
                      className="border-sidebar border-[1.5px] rounded-3xl"
                      id="senha"
                      type="password"
                      required
                      placeholder="Senha"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <Button
                      type="submit"
                      className="w-full bg-sidebar rounded-3xl"
                      disabled={loading}
                    >
                      {loading ? "Entrando..." : "Login"}
                    </Button>
                    <a
                      href="#"
                      className="ml-auto text-sm text-secondary-foreground opacity-90 underline-offset-2 hover:underline"
                    >
                      Esqueceu sua senha?
                    </a>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
