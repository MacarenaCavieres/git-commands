import { useEffect } from "react";
import { useGitCommandStore } from "../store/store";

function ConfirmModal() {
    const findById = useGitCommandStore((state) => state.findById);
    const commandForDelete = useGitCommandStore((state) => state.commandForDelete);
    const commandFounded = useGitCommandStore((state) => state.commandFounded);
    const closeConfirmModal = useGitCommandStore((state) => state.closeConfirmModal);
    const deleteCommand = useGitCommandStore((state) => state.deleteCommand);

    useEffect(() => {
        findById(commandForDelete);
    }, [commandForDelete]);
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300">
            <div
                className="w-full max-w-md border border-[#FF0052] bg-black/90 p-6 rounded-2xl text-center text-white
                shadow-[0_0_25px_rgba(255,0,82,0.3),inset_0_0_15px_rgba(255,0,82,0.2)]
                animate-[zoomIn_0.2s_ease-out]"
            >
                <h3
                    className="text-2xl font-bold text-[#FF0052] mb-3 uppercase tracking-wider"
                    style={{ textShadow: "0 0 8px rgba(255,0,82,0.6)" }}
                >
                    ¿Eliminar Comando?
                </h3>
                <p className="text-gray-300 mb-6 text-sm md:text-base">
                    Esta acción no se puede deshacer. El comando será removido de forma permanente de tu lista. Siempre
                    puedes volver a crearlo.
                </p>
                <table className="w-full border-collapse text-left text-white">
                    <thead>
                        <tr
                            className="border-b-2 border-[#FFCF95]"
                            style={{ filter: "drop-shadow(0 0 8px rgba(255, 207, 149, 0.5))" }}
                        >
                            <th
                                className="p-4 font-semibold uppercase tracking-wider text-[#FFCF95]"
                                style={{ textShadow: "0 0 6px rgba(255, 207, 149, 0.4)" }}
                            >
                                Alias
                            </th>
                            <th
                                className="p-4 font-semibold uppercase tracking-wider text-[#FFCF95]"
                                style={{ textShadow: "0 0 6px rgba(255, 207, 149, 0.4)" }}
                            >
                                Comando
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-[#FFCF95]/20 hover:border-[#FFCF95] transition-all duration-300 group">
                            <td
                                className="p-4 font-mono text-[#FFCF95] group-hover:text-white transition-colors"
                                style={{ textShadow: "0 0 6px rgba(255, 207, 149, 0.5)" }}
                            >
                                {commandFounded.alias ? commandFounded.alias : "-"}
                            </td>
                            <td
                                className="p-4 font-mono text-[#FFCF95] group-hover:text-white transition-colors"
                                style={{ textShadow: "0 0 6px rgba(255, 207, 149, 0.5)" }}
                            >
                                {commandFounded.command}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex gap-4 justify-center mt-6">
                    <button
                        className="border border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white px-4 py-2 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
                        type="button"
                        onClick={() => deleteCommand(commandFounded.id)}
                    >
                        Eliminar
                    </button>
                    <button
                        className="border border-[#FF0052] bg-[#FF0052]/10 hover:bg-[#FF0052] text-[#FF0052] hover:text-white px-5 py-2 rounded-xl text-sm font-medium cursor-pointer 
                        transition-all duration-300 shadow-[0_0_10px_rgba(255,0,82,0.2)] hover:shadow-[0_0_20px_rgba(255,0,82,0.6)]"
                        type="button"
                        onClick={closeConfirmModal}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
export default ConfirmModal;
