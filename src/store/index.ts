import { create } from "zustand";

import {
    DebateStateType, useErrorState
} from "./debate";

export const useStore = create<DebateStateType>()((...a) => ({
    ...useErrorState(...a),

}));
