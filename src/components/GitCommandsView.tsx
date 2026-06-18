import { useGitCommandStore } from "../store";

function GitCommandsView() {
    const showAddView = useGitCommandStore((state) => state.showAddView);
    const gitCommands = useGitCommandStore((state) => state.gitCommands);
    return (
        <div className="flex flex-col justify-center items-center">
            <h1>Comandos de GIT</h1>
            <button
                className="border border-[#7149b1] rounded-xl font-semibold p-4 uppercase cursor-pointer text-[#723EC3] bg-transparent shadow-[0_0_15px_rgba(114,62,195,0.5),inset_0_0_15px_rgba(114,62,195,0.5)] 
                hover:shadow-[0_0_30px_rgba(114,62,195,0.8),inset_0_0_20px_rgba(114,62,195,0.6)] transition-shadow duration-300"
                type="button"
                onClick={showAddView}
            >
                Crear comando
            </button>

            <div className="overflow-x-auto p-4 mt-20">
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
                            <th
                                className="p-4 font-semibold uppercase tracking-wider text-[#FFCF95]"
                                style={{ textShadow: "0 0 6px rgba(255, 207, 149, 0.4)" }}
                            >
                                Descripción
                            </th>
                            <th
                                className="p-4 font-semibold uppercase tracking-wider text-[#FFCF95]"
                                style={{ textShadow: "0 0 6px rgba(255, 207, 149, 0.4)" }}
                            >
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {gitCommands.length &&
                            gitCommands.map((command) => (
                                <>
                                    <tr className="border-b border-[#FFCF95]/20 hover:border-[#FFCF95] transition-all duration-300 group">
                                        <td
                                            className="p-4 font-mono text-[#FFCF95] group-hover:text-white transition-colors"
                                            style={{ textShadow: "0 0 6px rgba(255, 207, 149, 0.5)" }}
                                        >
                                            {command.alias}
                                        </td>
                                        <td
                                            className="p-4 font-mono text-[#FFCF95] group-hover:text-white transition-colors"
                                            style={{ textShadow: "0 0 6px rgba(255, 207, 149, 0.5)" }}
                                        >
                                            {command.command}
                                        </td>
                                        <td className="p-4 text-gray-300 group-hover:text-gray-100 transition-colors max-w-xs md:max-w-md whitespace-normal wrap-break-word">
                                            {command.description}
                                        </td>
                                        <td className="p-4 flex gap-2">
                                            <button
                                                className="border border-[#FBF5A7]/40 hover:border-[#FBF5A7] text-gray-400 hover:text-[#FBF5A7] px-3 py-1.5 rounded-xl text-sm font-medium cursor-pointer 
                                                transition-all duration-300 hover:shadow-[0_0_12px_rgba(251,245,167,0.4)]"
                                                style={{ textShadow: "0 0 4px rgba(251,245,167,0)" }}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="border border-[#FF0052]/40 hover:border-[#FF0052] text-gray-400 hover:text-red-500 px-3 py-1.5 rounded-xl text-sm font-medium cursor-pointer 
                                            transition-all duration-300 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default GitCommandsView;
