import { ToastContainer } from "react-toastify";
import AddCommandView from "./components/AddCommandView";
import GitCommandsView from "./components/GitCommandsView";
import { useGitCommandStore } from "./store";

function App() {
    const isAddCommandOpen = useGitCommandStore((state) => state.isAddCommandOpen);
    return (
        <>
            <main>{!isAddCommandOpen ? <GitCommandsView /> : <AddCommandView />}</main>

            <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
        </>
    );
}

export default App;
