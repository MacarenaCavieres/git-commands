import { useForm } from "react-hook-form";
import type { DraftCommand } from "../types/types";
import ErrorsMessage from "./ErrorsMessage";
import { useGitCommandStore } from "../store/store";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function AddCommandView() {
    const [isContinuing, setIsContinuing] = useState(false);

    const closeAddView = useGitCommandStore((state) => state.closeAddView);
    const addCommand = useGitCommandStore((state) => state.addCommand);
    const activeIdUpdate = useGitCommandStore((state) => state.activeIdUpdate);
    const commandFounded = useGitCommandStore((state) => state.commandFounded);
    const updateCommand = useGitCommandStore((state) => state.updateCommand);

    const initialValues: DraftCommand = {
        alias: "",
        command: "",
        description: "",
    };

    const {
        register,
        reset,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<DraftCommand>({ defaultValues: initialValues });

    const handleAddCommand = (formData: DraftCommand) => {
        if (activeIdUpdate) {
            updateCommand(formData);
            reset();
            toast.warning("Comando editado");
            closeAddView();
        } else {
            addCommand(formData);
            setValue("alias", "");
            setValue("command", "");
            setValue("description", "");
            toast.success("Comando agregado");
            if (!isContinuing) {
                closeAddView();
            }
        }
    };

    useEffect(() => {
        if (activeIdUpdate) {
            setValue("alias", commandFounded.alias);
            setValue("command", commandFounded.command);
            setValue("description", commandFounded.description);
        }
    }, [activeIdUpdate]);
    return (
        <div className="flex flex-col mx-auto max-w-3xl">
            <div className="flex justify-end">
                <button
                    className="border border-[#7149b1] rounded-xl font-semibold p-4 uppercase cursor-pointer text-[#723EC3] bg-transparent shadow-[0_0_15px_rgba(114,62,195,0.5),inset_0_0_15px_rgba(114,62,195,0.5)] 
                hover:shadow-[0_0_30px_rgba(114,62,195,0.8),inset_0_0_20px_rgba(114,62,195,0.6)] transition-shadow duration-300 w-3/12 mt-10"
                    type="button"
                    onClick={closeAddView}
                >
                    Cerrar vista
                </button>
            </div>
            <h2
                className="text-center font-semibold text-[#723EC3] transition-all duration-300"
                style={{
                    fontSize: "2.5rem",
                    textShadow:
                        "0 0 6px #723EC3, 0 0 20px #723EC3, 0 0 45px rgba(114,62,195,0.8), 0 0 70px rgba(114,62,195,0.6)",
                }}
            >
                {activeIdUpdate ? "Actualizar comando" : "Agregar comando"}
            </h2>
            <form className="flex flex-col space-y-6" onSubmit={handleSubmit(handleAddCommand)}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="alias" className="font-semibold">
                        Alias (Opcional)
                    </label>
                    <input
                        type="text"
                        placeholder="Ingrese el alias del comando"
                        id="alias"
                        className="border rounded-xl p-4 placeholder-[#607B8F]"
                        {...register("alias")}
                    />
                    {errors.alias && <ErrorsMessage>{errors.alias.message}</ErrorsMessage>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="command" className="font-semibold">
                        Comando de git
                    </label>
                    <input
                        type="text"
                        placeholder="Ingrese el comando de git"
                        id="command"
                        className="border rounded-xl p-4 placeholder-[#607B8F]"
                        {...register("command", {
                            required: "El comando de git es obligatorio",
                        })}
                    />
                    {errors.command && <ErrorsMessage>{errors.command.message}</ErrorsMessage>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="font-semibold">
                        Descripción
                    </label>
                    <textarea
                        rows={10}
                        placeholder="Ingrese una descipción del comando"
                        id="description"
                        className="border rounded-xl p-4 placeholder-[#607B8F]"
                        {...register("description", {
                            required: "La descripción del comando es obligatoria",
                        })}
                    />
                    {errors.description && <ErrorsMessage>{errors.description.message}</ErrorsMessage>}
                </div>
                {!activeIdUpdate && (
                    <div className="flex gap-2">
                        <input
                            type="checkbox"
                            id="isContinuing"
                            className="border rounded-xl p-4 placeholder-[#607B8F]"
                            onChange={() => setIsContinuing(!isContinuing)}
                        />
                        <label htmlFor="isContinuing" className="font-semibold">
                            Quiero crear otro comando
                        </label>
                    </div>
                )}
                <div className="flex justify-end">
                    <button
                        className="border border-[#7149b1] rounded-xl font-semibold p-4 uppercase cursor-pointer text-[#723EC3] bg-transparent shadow-[0_0_15px_rgba(114,62,195,0.5),inset_0_0_15px_rgba(114,62,195,0.5)] 
                hover:shadow-[0_0_30px_rgba(114,62,195,0.8),inset_0_0_20px_rgba(114,62,195,0.6)] transition-shadow duration-300 w-3/12 mt-10"
                        type="submit"
                    >
                        {activeIdUpdate ? "Actualizar" : "Agregar"}
                    </button>
                </div>
            </form>
        </div>
    );
}
export default AddCommandView;
