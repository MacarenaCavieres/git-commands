import { ToastContainer } from "react-toastify";
import AddCommandView from "./components/AddCommandView";
import GitCommandsView from "./components/GitCommandsView";
import { useGitCommandStore } from "./store/store";

function App() {
    const isAddCommandOpen = useGitCommandStore((state) => state.isAddCommandOpen);
    const activeIdUpdate = useGitCommandStore((state) => state.activeIdUpdate);
    return (
        <>
            <main>{isAddCommandOpen || activeIdUpdate ? <AddCommandView /> : <GitCommandsView />}</main>

            <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
        </>
    );
}

export default App;
