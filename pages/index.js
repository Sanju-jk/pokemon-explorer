import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
      const data = await res.json();
      setPokemons(data.results);
    }
    fetchData();
  }, []);

  // Extracting Pokémon ID from URL
  const getPokemonId = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2]; // Pokémon ID is second last in URL
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pokemon Explorer</h1>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border rounded w-full md:w-1/3 bg-gray-800 text-white placeholder-gray-400"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {pokemons
          .filter((p) => p.name.includes(search))
          .map((pokemon) => {
            const id = getPokemonId(pokemon.url); // Extract ID from URL
            return (
              <Link key={id} href={`/pokemon/${id}`}>
                <div className="bg-gray-800 p-4 shadow-lg rounded-lg cursor-pointer transform transition-all hover:scale-105 hover:bg-gray-700">
                  <img 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
                    alt={pokemon.name} 
                    className="mx-auto"
                  />
                  <p className="text-center capitalize font-semibold">{pokemon.name}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
