import { create } from "zustand";
import type { Command, DraftCommand, FilterType } from "../types/types";
import { v4 as uuidv4 } from "uuid";
import { devtools, persist } from "zustand/middleware";

type GitCommandState = {
    gitCommands: Command[];
    gitCommandsFiltered: Command[];
    isAddCommandOpen: boolean;
    isConfirmModalOpen: boolean;
    isFiltering: boolean;
    activeIdUpdate: Command["id"];
    commandFounded: Command;
    commandForDelete: Command["id"];
    addCommand: (data: DraftCommand) => void;
    setActiveId: (id: Command["id"]) => void;
    findById: (id: Command["id"]) => void;
    updateCommand: (data: DraftCommand) => void;
    setCommandToDelete: (id: Command["id"]) => void;
    deleteCommand: (id: Command["id"]) => void;
    showAddView: () => void;
    closeAddView: () => void;
    openConfirmModal: () => void;
    closeConfirmModal: () => void;
    setGitCommands: (newCommands: Command[]) => void;
    search: (filter: FilterType) => void;
    setNotFiltering: () => void;
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
                gitCommandsFiltered: [],
                isAddCommandOpen: false,
                isConfirmModalOpen: false,
                isFiltering: false,
                activeIdUpdate: "",
                commandFounded: {} as Command,
                commandForDelete: "",
                filter: {} as FilterType,
                addCommand: (data) => {
                    const newCommand = createGitCommand(data);
                    set((state) => ({
                        gitCommands: [...state.gitCommands, newCommand],
                    }));
                },
                setActiveId: (id) => {
                    set(() => ({
                        activeIdUpdate: id,
                    }));
                },
                findById: (id) => {
                    set((state) => ({
                        commandFounded: state.gitCommands.filter((c) => c.id === id)[0],
                    }));
                },
                updateCommand: (data) => {
                    set((state) => ({
                        gitCommands: state.gitCommands.map((c) =>
                            c.id === state.activeIdUpdate ? { id: state.activeIdUpdate, ...data } : c,
                        ),
                        activeIdUpdate: "",
                    }));
                },
                setCommandToDelete: (id) => {
                    set(() => ({
                        commandForDelete: id,
                    }));
                },
                deleteCommand: (id) => {
                    set((state) => ({
                        gitCommands: state.gitCommands.filter((c) => c.id !== id),
                        isConfirmModalOpen: false,
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
                        activeIdUpdate: "",
                        commandFounded: {} as Command,
                    }));
                },
                openConfirmModal: () => {
                    set(() => ({
                        isConfirmModalOpen: true,
                    }));
                },
                closeConfirmModal: () => {
                    set(() => ({
                        isConfirmModalOpen: false,
                        commandForDelete: "",
                        commandFounded: {} as Command,
                    }));
                },
                setGitCommands: (newCommands: Command[]) => {
                    set(() => ({
                        gitCommands: newCommands,
                    }));
                },
                search: (newFilter: FilterType) => {
                    set((state) => ({
                        isFiltering: true,
                        gitCommandsFiltered: state.gitCommands.filter((c) => {
                            const isAliasIncludeed = c.alias?.includes(newFilter.filter) ? true : false;
                            const isCommandIncluded = c.command?.includes(newFilter.filter) ? true : false;
                            const isDescriptionIncluded = c.description?.includes(newFilter.filter) ? true : false;
                            return isAliasIncludeed || isCommandIncluded || isDescriptionIncluded;
                        }),
                    }));
                },
                setNotFiltering: () => {
                    set(() => ({
                        isFiltering: false,
                    }));
                },
            }),
            {
                name: "command-storage",
            },
        ),
    ),
);
