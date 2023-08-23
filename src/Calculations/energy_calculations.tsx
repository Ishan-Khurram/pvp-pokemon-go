import React, { useState } from 'react';
import fast_moves_data from 'data/fast_moves.json'
import charged_moves_data from 'data/charged_moves.json'

interface FastMoves {
    pokemon:string;
    move: string;
    type: string;
    damage: number;
    energy_gain: number;
    turns: number;
    damage_per_turn: number | string;
    energy_per_turn: number | string;
    archetype: string;

}

interface ChargedMoves {
    pokemon: string;
    move: string;
    type: string;
    damage: number;
    energy: number;
    effect: string;
    archetype: string;

}

const fastmoves: FastMoves[] = fast_moves_data;
const chargedmoves: ChargedMoves[] = charged_moves_data;

export { fastmoves, chargedmoves };