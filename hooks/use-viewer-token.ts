import {  toast } from "sonner";
import { useEffect, useState } from "react";
import {JwtPayload, jwtDecode} from "jwt-decode";
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewToken = await createViewerToken(hostIdentity);
                setToken(viewToken)
                const decodedToken = jwtDecode(viewToken) as JwtPayload & {
                    name?: string
                }
                const name = decodedToken?.name;
                const identity = decodedToken.jti;
                if (identity) {
                    setIdentity(identity);
                }
                if (name) {
                    setName(name);
                }
            } catch {
                toast.error("Something went wrong");
            }
        }
        createToken();
    }, [hostIdentity]);

    return {
        token, name, identity
    };
};