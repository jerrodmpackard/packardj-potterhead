import { IPotterHead } from "@/interfaces/Interfaces";

export const getPotterData = async () => {
    const promise = await fetch('https://potterhead-api.vercel.app/api/characters');
    const data = await promise.json();
    return data;
}

export const saveToLocalStorage = (wizard: IPotterHead) => {
    let favorites = getLocalStorage();

    if (!favorites.some(fav => fav.name === wizard.name)) {
        favorites.push(wizard);
    }

    localStorage.setItem("Favorites", JSON.stringify(favorites));
}

export const getLocalStorage = (): IPotterHead[] => {
    let localStorageData = localStorage.getItem("Favorites");

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

export const removeFromLocalStorage = (wizard: IPotterHead) => {
    let favorites: IPotterHead[] = getLocalStorage();

    favorites = favorites.filter(fav => fav.name !== wizard.name)

    localStorage.setItem("Favorites", JSON.stringify(favorites));
}