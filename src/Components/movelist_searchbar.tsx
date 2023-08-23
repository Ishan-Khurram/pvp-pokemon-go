import React, { useState } from 'react';
import pokemon_info from 'data/pokemon_info.json'
import fast_moves from 'data/fast_moves.json'
import charged_moves from 'data/charged_moves.json'

interface quickMoves {
    pokemon: string;
    move: string;
    move_kind: string;
    type: string;
    stab_bonus: number;
    damage: number;
    energy_gain: number; 
    turns: number;
    damage_per_turn: number;
    energy_per_turn:number;
    archetype: string;

}


interface chargedMoves {
    pokemon: string;
    move: string;
    move_kind: string;
    type: string;
    stab_bonus: number;
    damage: number;
    energy:number;
    effect: string;
    archetype: string;

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


const PokemonSearchBar: React.FC = () => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
        setSelectedPokemon(null);
    };

    const handleSelectPokemon = (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
    };

    const matchingPokemon = pokemon_info.filter(pokemon =>
        pokemon.speciesName.toLowerCase().includes(searchInput.toLowerCase())
    );

    const getEnergyGainForMove = (moveName: string): number => {
        const moveInfo = fast_moves.find((move) => move.move === moveName);
        return moveInfo ? moveInfo.energy_gain : 0;
    };

    const getEnergyNeededForMove = (moveName: string): number => {
        const moveInfo = charged_moves.find((move) => move.move === moveName);
        return moveInfo ? moveInfo.energy : 0;
    };


    return (
        <div>
            <input
                type="text"
                placeholder="Search for a Pokémon"
                onChange={handleChange}
                value={searchInput}
            />
            <select onChange={(e) => handleSelectPokemon(JSON.parse(e.target.value))}>
                <option>Select a Pokémon</option>
                {matchingPokemon.map(pokemon => (
                    <option key={pokemon.speciesId} value={JSON.stringify(pokemon)}>
                        {pokemon.speciesName}
                    </option>
                ))}
            </select>

            {selectedPokemon && (
                <div>
                    <h2>{selectedPokemon.speciesName}</h2>
                    <p>Typing: {selectedPokemon.types.map(capitalizeFirstLetter).join(', ')}</p>
                    <p>Fast Attacks: {selectedPokemon.fastMoves.map(capitalizeFirstLetter).join(', ')}</p>
                    <p>Charged Attacks: {selectedPokemon.chargedMoves.map(capitalizeFirstLetter).join(', ')}</p>
                    <h3>Fast Moves:</h3>
                    <ul>
                        {selectedPokemon.fastMoves.map((fastMoveName, index) => (
                            <li key={index}>
                                {capitalizeFirstLetter(fastMoveName)} (Energy Gain: {getEnergyGainForMove(fastMoveName)})
                            </li>
                        ))}
                    </ul>

                    <h3>Charged Moves:</h3>
                    <ul>
                        {selectedPokemon.chargedMoves.map((chargedMoveName, index) => (
                            <li key={index}>
                                {capitalizeFirstLetter(chargedMoveName)} (Energy Needed: {getEnergyNeededForMove(chargedMoveName)})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


export default PokemonSearchBar;
    