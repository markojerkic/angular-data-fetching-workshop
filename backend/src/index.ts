import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();
app.use(cors());

async function getFavouritePokemon(): Promise<string | undefined> {
  return Bun.file('favourite.json')
    .text()
    .then((file) => JSON.parse(file).favourite);
}

async function setFavouritePokemon(name: string): Promise<void> {
  await Bun.write('favourite.json', JSON.stringify({ favourite: name }));
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
