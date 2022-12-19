import { useState } from "react";
import { NomesSimpsons, INFO_SIMPSONS } from "./constants";
import styles from "./styles.module.css";
import {
  Wrapper,
  BioImage,
  BioNome,
  BioDescription,
  ContainerBotoes,
  Button,
} from "./styled";

const Bio = () => {
  const [bioActive, setBioActive] = useState(INFO_SIMPSONS[NomesSimpsons.BART]);

  const onClick: (nome: NomesSimpsons) => void = (nome) =>
    setBioActive(INFO_SIMPSONS[nome]);

  const criarBotoes = () => {
    return Object.keys(INFO_SIMPSONS).map((nome: string) => (
      <Button
        key={nome as string}
        onClick={() => onClick(nome as NomesSimpsons)}
        className={
          bioActive.id === nome
            ? styles.botaoBioActive
            : styles.botaoBioInactive
        }
      >
        {nome}
      </Button>
    ));
  };

  return (
    <Wrapper>
      <ContainerBotoes>{criarBotoes()}</ContainerBotoes>
      <div>
        <div>
          <BioImage
            src={bioActive.image}
            alt={bioActive.nome}
            className={styles.bioImage}
          />
        </div>

        <div>
          <BioNome>{bioActive.nome}</BioNome>
          <BioDescription>{bioActive.description}</BioDescription>
        </div>
      </div>
    </Wrapper>
  );
};

export default Bio;
