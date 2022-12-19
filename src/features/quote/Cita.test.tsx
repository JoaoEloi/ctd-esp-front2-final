import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Cita from "./Cita";

const server = setupServer(
  rest.get("https://thesimpsonsquoteapi.glitch.me/quotes", (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          {
            cita: "Hi, Super Nintendo Chalmers!",
            personagem: "Ralph Wiggum",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Cita", () => {
  describe("when we don`t have a cita", () => {
    it("Nenhuma citação encontrada", async () => {
      render(
        <Provider store={store}>
          <Cita />
        </Provider>
      );

      expect(
        await screen.findByText("Nenhuma citação encontrada")
      ).toBeInTheDocument();
    });

    it("Look for the button of cita aleatoria", async () => {
      render(
        <Provider store={store}>
          <Cita />
        </Provider>
      );
      expect(
        await screen.findByText("Obtener cita aleatoria")
      ).toBeInTheDocument();
    });

    it("Search for quotes from Homer", () => {
      server.use(
        rest.post(
          "https://thesimpsonsquoteapi.glitch.me/quotes?character=homersimpson",
          (req, res, ctx) => {
            return res(
              ctx.json({
                results: [
                  {
                    personagem: "Homer Simpson",
                  },
                ],
              })
            );
          }
        )
      );
    });
  });
});
