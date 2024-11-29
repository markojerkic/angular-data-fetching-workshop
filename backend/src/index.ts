import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { writeFile, readFile } from 'node:fs/promises';

const app = new Hono();
app.use(cors());

async function setFavouritePokemon(pokemon: string): Promise<void> {
  return writeFile('favourite.json', JSON.stringify({ favourite: pokemon }));
}
async function getFavouritePokemon(): Promise<string> {
  try {
    const data = await readFile('favourite.json', 'utf-8');
    return JSON.parse(data).favourite;
  } catch (e) {
    console.error('Error reading favourite.json', e);
    return '';
  }
}

type PokemonResult = {
  count: number;
  next?: string;
  previous?: string;
  results: { name: string; url: string }[];
};

app
  .get('/pokemon', async (c) => {
    const favourite = await getFavouritePokemon();
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
    const favourite = await getFavouritePokemon();
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
  })
  .get('/user', async (c) => {
    const favourite = await getFavouritePokemon();
    return c.json({
      user: 'Marko Jerkić',
      favourite: favourite,
    });
  })
  .post('/favourite', async (c) => {
    const body: { favourite: string } = await c.req.json();
    await setFavouritePokemon(body.favourite);

    return c.json({ message: 'Pokemon set as favourite' });
  });

export default app;
