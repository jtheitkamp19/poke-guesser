import { Type } from "./type.model";

export interface Pokemon {
    number: number,
    name: string,
    generation: number,
    height: number,
    weight: number,
    hp: number,
    attack: number,
    defense: number,
    spatk: number,
    spdef: number,
    speed: number,
    familyid: number,
    evonum: number,
    color: string,
    types: Type[]
}