import { useForm } from "react-hook-form";
import type { FilterType } from "../types/types";
import ErrorsMessage from "./ErrorsMessage";
import { useGitCommandStore } from "../store/store";

function Filter() {
    const initialValues: FilterType = { filter: "" };

    const isFiltering = useGitCommandStore((state) => state.isFiltering);
    const setFilter = useGitCommandStore((state) => state.setFilter);
    const setNotFiltering = useGitCommandStore((state) => state.setNotFiltering);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });

    const handleSearch = (formData: FilterType) => {
        setFilter(formData);
        reset();
    };
    return (
        <div className="mt-20 w-full">
            <form className="flex gap-5 max-w-4xl w-full mx-auto items-start" onSubmit={handleSubmit(handleSearch)}>
                <div className="flex flex-col flex-1">
                    <input
                        type="text"
                        placeholder="Ingrese una palabra o descripción"
                        id="filter"
                        className="border rounded-xl p-4 placeholder-[#607B8F] w-full"
                        {...register("filter", {
                            required: "Ingrese algo que buscar",
                        })}
                    />
                    {errors.filter && <ErrorsMessage>{errors.filter.message}</ErrorsMessage>}
                </div>

                <button
                    className="border border-[#FF6A1C] rounded-xl font-semibold p-4 uppercase cursor-pointer text-[#FF6A1C] bg-transparent 
                        shadow-[0_0_15px_rgba(255,106,28,0.3),inset_0_0_15px_rgba(255,106,28,0.2)] 
                        hover:shadow-[0_0_35px_rgba(255,106,28,0.9),inset_0_0_20px_rgba(255,106,28,0.6)] 
                        transition-all duration-300 hover:text-white shrink-0"
                    type="submit"
                    style={{ textShadow: "0 0 4px rgba(255,106,28,0.3)" }}
                >
                    Buscar
                </button>
                {isFiltering && (
                    <button
                        className="border border-[#FF6A1C] rounded-xl font-semibold p-4 uppercase cursor-pointer text-[#FF6A1C] bg-transparent 
                        shadow-[0_0_15px_rgba(255,106,28,0.3),inset_0_0_15px_rgba(255,106,28,0.2)] 
                        hover:shadow-[0_0_35px_rgba(255,106,28,0.9),inset_0_0_20px_rgba(255,106,28,0.6)] 
                        transition-all duration-300 hover:text-white shrink-0"
                        type="button"
                        style={{ textShadow: "0 0 4px rgba(255,106,28,0.3)" }}
                        onClick={setNotFiltering}
                    >
                        Ver todo
                    </button>
                )}
            </form>
        </div>
    );
}
export default Filter;
