import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};
function ErrorsMessage({ children }: Props) {
    return <div className="text-center my-2 text-red-800 font-bold uppercase text-sm">{children}</div>;
}
export default ErrorsMessage;
