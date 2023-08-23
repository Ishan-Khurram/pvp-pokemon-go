import React, { useState } from 'react';
import pokemon_info from 'data/pokemon_info.json';
import { fastmoves, chargedmoves } from 'Calculations/energy_calculations';


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

    const getEnergyGainedForFastMove = (moveName: string): number => {
        const moveInfo = fastmoves.find(move => move.move === moveName);
        return moveInfo ? moveInfo.energy_gain : 0;
    };

    const getEnergyNeededForChargedMove = (moveName: string): number => {
        const moveInfo = chargedmoves.find(move => move.move === moveName);
        return moveInfo ? moveInfo.energy : 0;
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
                    <p>Charged Attacks: {selectedPokemon.chargedMoves.map(capitalizeFirstLetter).join(', ')}</p>

                    {/* Add more details here */}
                </div>
            )}
        </div>
    );
};

export default SearchBar;