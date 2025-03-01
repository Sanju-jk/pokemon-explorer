import { useRouter } from "next/router";

export default function PokemonDetail({ pokemon }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <button 
        onClick={() => router.push("/")} 
        className="self-start px-4 py-2 mb-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
      >
        ← Back
      </button>
      
      <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
      <img 
        src={pokemon.sprites.front_default} 
        alt={pokemon.name} 
        className="w-40 h-40 mt-4 bg-gray-800 p-4 rounded-full shadow-lg"
      />

      <div className="bg-gray-800 p-6 mt-6 shadow-lg rounded-lg w-full max-w-md">
        <p className="text-lg"><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
        <p className="text-lg"><strong>Type:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
        
        <div className="mt-4">
          <p className="text-lg font-semibold">Stats:</p>
          <ul className="space-y-1">
            {pokemon.stats.map((s) => (
              <li key={s.stat.name} className="flex justify-between bg-gray-700 p-2 rounded">
                <span className="capitalize">{s.stat.name}</span>
                <span>{s.base_stat}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-lg mt-4"><strong>Moves:</strong> {pokemon.moves.slice(0, 5).map(m => m.move.name).join(", ")}</p>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
  const pokemon = await res.json();
  return { props: { pokemon } };
}
