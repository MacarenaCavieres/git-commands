import { useState } from "react";
import { useGitCommandStore } from "../store/store";
import type { Command } from "../types/types";
import ConfirmModal from "./ConfirmModal";
import { Copy, GripVertical } from "lucide-react";
import { DragDropContext, Draggable, Droppable, type DropResult } from "@hello-pangea/dnd";
import Filter from "./Filter";

function GitCommandsView() {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const showAddView = useGitCommandStore((state) => state.showAddView);
    const gitCommands = useGitCommandStore((state) => state.gitCommands);
    const setActiveId = useGitCommandStore((state) => state.setActiveId);
    const findById = useGitCommandStore((state) => state.findById);
    const setCommandToDelete = useGitCommandStore((state) => state.setCommandToDelete);
    const openConfirmModal = useGitCommandStore((state) => state.openConfirmModal);
    const isConfirmModalOpen = useGitCommandStore((state) => state.isConfirmModalOpen);
    const setGitCommands = useGitCommandStore((state) => state.setGitCommands);
    const gitCommandsFiltered = useGitCommandStore((state) => state.gitCommandsFiltered);
    const isFiltering = useGitCommandStore((state) => state.isFiltering);

    const handleEdit = (id: Command["id"]) => {
        setActiveId(id);
        findById(id);
    };

    const handleRemove = (id: Command["id"]) => {
        openConfirmModal();
        setCommandToDelete(id);
    };

    const handleCopy = (text: string, key: string) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopiedId(key);

        setTimeout(() => {
            setCopiedId(null);
        }, 1500);
    };

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const items = [...gitCommands];
        const sourceId = result.draggableId;
        const sourceIndex = items.findIndex((item) => String(item.id) === sourceId);
        if (sourceIndex === -1) return;
        const [movedItem] = items.splice(sourceIndex, 1);

        items.splice(result.destination.index, 0, movedItem);

        setGitCommands(items);
    };
    return (
        <div className="flex flex-col justify-center items-center">
            <h1>Comandos de GIT</h1>
            <button
                className="border border-[#FFDA62] rounded-xl font-semibold p-4 uppercase cursor-pointer text-[#FFDA62] bg-transparent 
                shadow-[0_0_15px_rgba(255,218,98,0.3),inset_0_0_15px_rgba(255,218,98,0.2)] hover:shadow-[0_0_35px_rgba(255,218,98,0.9),inset_0_0_20px_rgba(255,218,98,0.6)] 
                transition-all duration-300 hover:text-white"
                type="button"
                onClick={showAddView}
                style={{ textShadow: "0 0 4px rgba(255,218,98,0.3)" }}
            >
                Crear comando
            </button>

            {isConfirmModalOpen && <ConfirmModal />}

            <Filter />

            <div className="overflow-x-auto p-4 mt-20">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <table className="w-full border-collapse text-left text-white mb-10">
                        <thead>
                            <tr
                                className="border-b-2 border-[#FFCF95]"
                                style={{ filter: "drop-shadow(0 0 8px rgba(255, 207, 149, 0.5))" }}
                            >
                                <th className="p-4 w-[5%]"></th>
                                <th
                                    className="p-4 font-semibold uppercase tracking-wider text-[#FFCF95] w-[15%]"
                                    style={{ textShadow: "0 0 6px rgba(255, 207, 149, 0.4)" }}
                                >
                                    Alias
                                </th>
                                <th
                                    className="p-4 font-semibold uppercase tracking-wider text-[#FFCF95] w-[30%]"
                                    style={{ textShadow: "0 0 6px rgba(255, 207, 149, 0.4)" }}
                                >
                                    Comando
                                </th>
                                <th
                                    className="p-4 font-semibold uppercase tracking-wider text-[#FFCF95] w-[35%]"
                                    style={{ textShadow: "0 0 6px rgba(255, 207, 149, 0.4)" }}
                                >
                                    Descripción
                                </th>
                                <th
                                    className="p-4 font-semibold uppercase tracking-wider text-[#FFCF95] w-[15%]"
                                    style={{ textShadow: "0 0 6px rgba(255, 207, 149, 0.4)" }}
                                >
                                    Acción
                                </th>
                            </tr>
                        </thead>

                        <Droppable droppableId="git-commands-body">
                            {(provided) => {
                                const currentCommands = isFiltering ? gitCommandsFiltered : gitCommands;
                                return (
                                    <tbody {...provided.droppableProps} ref={provided.innerRef}>
                                        {currentCommands.length > 0 &&
                                            currentCommands.map((command, index) => {
                                                const aliasKey = `${command.id}-alias`;
                                                const commandKey = `${command.id}-command`;

                                                return (
                                                    <Draggable
                                                        key={command.id}
                                                        draggableId={String(command.id)}
                                                        index={index}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <tr
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className={`border-b border-[#FFCF95]/20 hover:border-[#FFCF95] transition-all duration-300 group ${
                                                                    snapshot.isDragging
                                                                        ? "bg-[#FFCF95]/10 shadow-[0_0_20px_rgba(255,207,149,0.2)]"
                                                                        : ""
                                                                }`}
                                                            >
                                                                <td
                                                                    className="p-4 align-middle text-gray-500 hover:text-[#FFCF95] transition-colors cursor-grab active:cursor-grabbing"
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <GripVertical size={18} />
                                                                </td>

                                                                <td
                                                                    className="p-4 align-middle font-mono text-[#FFCF95] group-hover:text-white transition-colors break-all group/cell"
                                                                    style={{
                                                                        textShadow: "0 0 6px rgba(255, 207, 149, 0.5)",
                                                                    }}
                                                                >
                                                                    <div
                                                                        onClick={() =>
                                                                            command.alias &&
                                                                            handleCopy(command.alias, aliasKey)
                                                                        }
                                                                        className={`flex items-center justify-between gap-2 select-none ${command.alias ? "cursor-pointer" : ""}`}
                                                                    >
                                                                        <span>{command.alias || "—"}</span>
                                                                        {command.alias && (
                                                                            <div className="relative flex items-center">
                                                                                {copiedId === aliasKey && (
                                                                                    <span
                                                                                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-black font-bold 
                                                                                bg-[#FFCF95] rounded-md shadow-[0_0_10px_rgba(255,207,149,0.8)] animate-bounce whitespace-nowrap z-10"
                                                                                    >
                                                                                        ¡Copiado!
                                                                                    </span>
                                                                                )}
                                                                                <div className="text-[#FFCF95] group-hover/cell:text-white opacity-0 group-hover/cell:opacity-100 transition-all duration-200">
                                                                                    <Copy
                                                                                        size={14}
                                                                                        className="drop-shadow-[0_0_3px_rgba(255,207,149,0.6)]"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </td>

                                                                <td
                                                                    className="p-4 align-middle font-mono text-[#FFCF95] group-hover:text-white transition-colors break-all group/cell"
                                                                    style={{
                                                                        textShadow: "0 0 6px rgba(255, 207, 149, 0.5)",
                                                                    }}
                                                                >
                                                                    <div
                                                                        onClick={() =>
                                                                            handleCopy(command.command, commandKey)
                                                                        }
                                                                        className="flex items-center justify-between gap-2 cursor-pointer select-none"
                                                                    >
                                                                        <span>{command.command}</span>
                                                                        <div className="relative flex items-center">
                                                                            {copiedId === commandKey && (
                                                                                <span
                                                                                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-black font-bold bg-[#FFCF95] rounded-md 
                                                                            shadow-[0_0_10px_rgba(255,207,149,0.8)] animate-bounce whitespace-nowrap z-10"
                                                                                >
                                                                                    ¡Copiado!
                                                                                </span>
                                                                            )}
                                                                            <div className="text-[#FFCF95] group-hover/cell:text-white opacity-0 group-hover/cell:opacity-100 transition-all duration-200">
                                                                                <Copy
                                                                                    size={14}
                                                                                    className="drop-shadow-[0_0_3px_rgba(255,207,149,0.6)]"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td className="p-4 align-middle text-gray-300 group-hover:text-gray-100 transition-colors max-w-xs md:max-w-md whitespace-normal wrap-break-word">
                                                                    {command.description}
                                                                </td>

                                                                <td className="p-4 align-middle">
                                                                    <div className="flex items-center gap-2">
                                                                        <button
                                                                            className="border border-[#FBF5A7]/40 hover:border-[#FBF5A7] text-gray-400 hover:text-[#FBF5A7] px-3 py-1.5 rounded-xl text-sm font-medium 
                                                                        cursor-pointer transition-all duration-300 hover:shadow-[0_0_12px_rgba(251,245,167,0.4)]"
                                                                            style={{
                                                                                textShadow:
                                                                                    "0 0 4px rgba(251,245,167,0)",
                                                                            }}
                                                                            type="button"
                                                                            onClick={() => handleEdit(command.id)}
                                                                        >
                                                                            Editar
                                                                        </button>
                                                                        <button
                                                                            className="border border-[#FF0052]/40 hover:border-[#FF0052] text-gray-400 hover:text-red-500 px-3 py-1.5 rounded-xl text-sm font-medium 
                                                                        cursor-pointer transition-all duration-300 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                                                                            type="button"
                                                                            onClick={() => handleRemove(command.id)}
                                                                        >
                                                                            Eliminar
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                        {provided.placeholder}
                                    </tbody>
                                );
                            }}
                        </Droppable>
                    </table>
                </DragDropContext>
            </div>
        </div>
    );
}
export default GitCommandsView;
