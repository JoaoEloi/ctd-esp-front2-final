import { useEffect } from "react";
import { obterNoticias } from "./fakeRest";

export const UpperCase = () => {
  useEffect(() => {
    const obterInformacoes = async () => {
      const resposta = await obterNoticias();

      const data = resposta.map((n) => {
        const titulo = n.titulo
          .split(" ")
          .map((str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
          })
          .join(" ");

        const hora = new Date();
        const minutosDecorrido = Math.floor(
          (hora.getTime() - n.date.getTime()) / 60000
        );

        return {
          id: n.id,
          titulo,
          description: n.description,
          date: `Faz ${minutosDecorrido} minutos`,
          premium: n.premium,
          image: n.image,
          descriptionCurto: n.description.substring(0, 100),
        };
      });
    };
  });
};
