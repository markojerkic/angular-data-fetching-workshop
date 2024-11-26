import { Hono } from 'hono';

const app = new Hono();

app.get('/pokemon', async (c) => {
  const offset = c.req.query('offset');

  const pokemon: {
    count: number;
    next?: string;
    previous?: string;
    results: { name: string; url: string }[];
  } = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset ?? 0}`,
  ).then((res) => res.json());

  return c.json(pokemon);
});

export default app;
