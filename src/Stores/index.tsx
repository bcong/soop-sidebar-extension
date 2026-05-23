import React, { createContext, useContext } from "react";
import { SettingsStore } from "./SettingsStore";
import { SidebarStore } from "./SidebarStore";

export class RootStore {
    settingsStore: SettingsStore;
    sidebarStore: SidebarStore;

    constructor() {
        this.settingsStore = new SettingsStore();
        this.sidebarStore = new SidebarStore(this.settingsStore);
    }
}

export const StoreContext = createContext<RootStore>(null!);

export const useRootStore = (): RootStore => useContext(StoreContext);

export const useSettingsStore = (): SettingsStore => useContext(StoreContext).settingsStore;

export const useSidebarStore = (): SidebarStore => useContext(StoreContext).sidebarStore;

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [store] = React.useState(() => new RootStore());
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
