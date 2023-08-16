import React, { useState } from 'react';
import pokemon_info from 'data/pokemon_info.json';
import fast_moves from 'data/fast_moves.json'
import charged_moves from 'data/charged_moves.json'
import { calculateTurnsForEnergyMatch } from 'Calculations/energy_calculations'

// Define all types for moves
interface Move {
    pokemon: string;
    move: string;
    move_kind: string;
    type: string;
    stab_bonus: number;
    damage: number;
    energy_gain: number;
    turns: number;
    damage_per_turn: number;
    energy_per_turn: number;
    archetype: string;
    notes: string;
}

// Define the type for a single Pokémon
interface Pokemon {
    dex: number;
    speciesName: string;
    speciesId: string;
    baseStats: {
        atk: number;
        def: number;
        hp: number;
    };
    types: string[];
    fastMoves: string[];
    chargedMoves: string[];
    tags?: string[]; // Make 'tags' optional
    defaultIVs: {
        cp500: number[];
        cp1500: number[];
        cp2500: number[];
        // ... other properties
    };
}

function capitalizeFirstLetter (str:string):string{
    return str.toLowerCase().replace(/^.|\s\S/g, (match) => match.toUpperCase());
}


const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        setSelectedPokemon(null);
    };

    const filteredPokemon: Pokemon[] = pokemon_info.filter((pokemon) => {
        return pokemon.speciesId.includes(searchInput);
    });

    const handleSelectPokemon = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
    };

    return (
        <div>
            <input
                type="search"
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput}
            />

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPokemon.map((pokemon) => (
                        <tr key={pokemon.speciesId} onClick={() => handleSelectPokemon(pokemon)}>
                            <td>{pokemon.speciesName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedPokemon && (
                <div>
                    <h2>{selectedPokemon.speciesName}</h2>
                    <p>Typing: {selectedPokemon.types.map(capitalizeFirstLetter).join(', ')}</p>
                    <p>Fast Attacks: {selectedPokemon.fastMoves.map(capitalizeFirstLetter).join(', ')}</p>
                    <p>Fast Attacks Energy Gained Per Turn: {selectedPokemon.energy_per_turn.map(capitalizeFirstLetter).join(', ')}</p>
                    <p>Charged Attacks: {selectedPokemon.chargedMoves.map(capitalizeFirstLetter).join(', ')}</p>
                    <p>Charged Attacks Total Energy Cost: {selectedPokemon.fastMoves.map(capitalizeFirstLetter).join(', ')}</p>
                    {/* Add more details here */}
                </div>
            )}
        </div>
    );
};

export default SearchBar;