import { create } from "zustand";
import type { Command, DraftCommand } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { devtools, persist } from "zustand/middleware";

type GitCommandState = {
    gitCommands: Command[];
    isAddCommandOpen: boolean;
    addCommand: (data: DraftCommand) => void;
    showAddView: () => void;
    closeAddView: () => void;
};

const createGitCommand = (gitCommand: DraftCommand) => {
    return {
        ...gitCommand,
        id: uuidv4(),
    };
};

export const useGitCommandStore = create<GitCommandState>()(
    devtools(
        persist(
            (set) => ({
                gitCommands: [],
                isAddCommandOpen: false,
                addCommand: (data) => {
                    const newCommand = createGitCommand(data);
                    set((state) => ({
                        gitCommands: [...state.gitCommands, newCommand],
                    }));
                },
                showAddView: () => {
                    set(() => ({
                        isAddCommandOpen: true,
                    }));
                },
                closeAddView: () => {
                    set(() => ({
                        isAddCommandOpen: false,
                    }));
                },
            }),
            {
                name: "command-storage",
            },
        ),
    ),
);
