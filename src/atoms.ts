import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Socket, io } from "socket.io-client";
import { PlannedDie, ReceivedRoll, Roll, SavedRoll } from "./common/types";

const WS_URI = import.meta.env.VITE_WS_URI;
if (!WS_URI) {
  throw new Error("Missing Websocket URI, please add VITE_WS_URI to environment variables.");
}

// Socket Atom (Singleton)
const socketInstance = io(WS_URI, { forceNew: true });
export const socketAtom = atom<Socket>(socketInstance);

// Persisted State Atoms
export const myNameAtom = atomWithStorage<string>("name", "Anon");
export const savedRollsAtom = atomWithStorage<SavedRoll[]>("savedRolls", []);

// Game State Atoms
export const inGameAtom = atom<string>(""); // Current game ID
export const rollsAtom = atom<Roll[]>([]); // Current dice roll results shown
export const modAtom = atom<number>(0); // Current modifier applied to rolls
export const plannedDiceAtom = atom<PlannedDie[]>([]); // Dice selected for the next roll
export const nameAtom = atom<string>(""); // Name associated with the last displayed roll
export const myModAtom = atom<number>(0); // User's personal modifier (if needed separately)
export const latestRollAtom = atom<ReceivedRoll | null>(null); // the most recent, and currently visible roll
