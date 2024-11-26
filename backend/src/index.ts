import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use(cors());

const favourite: string | null = null;

type PokemonResult = {
  count: number;
  next?: string;
  previous?: string;
  results: { name: string; url: string }[];
};

app
  .get('/pokemon', async (c) => {
    const offset = c.req.query('offset');

    const pokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset ?? 0}`,
    )
      .then((res) => res.json())
      .then((res: PokemonResult) => {
        return {
          ...res,
          results: res.results.map((pokemon) => ({
            ...pokemon,
            isFavourite: pokemon.name === favourite,
          })),
        };
      });

    return c.json(pokemon);
  })
  .get('/pokemon/:id', async (c) => {
    const pokemon: Record<string, unknown> = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${c.req.param('id')}`,
    )
      .then((res) => res.json())
      .then((res) => {
        return {
          ...res,
          isFavourite: res.name === favourite,
        };
      });

    return c.json(pokemon);
  });

app.get('/user', async (c) => {
  return c.json({ user: 'Marko Jerkić', favourite });
});

export default app;
