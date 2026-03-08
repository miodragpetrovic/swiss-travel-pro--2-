import React from "react";
import { Heart } from "lucide-react";
import { cn } from "./cn";
import { readLocalStorage, writeLocalStorage } from "../utils/storage";

const KEY = "stp_favorites_v1";

export function useFavorites(): { isFav: (id: string) => boolean; toggle: (id: string) => void; all: string[] } {
  const [favorites, setFavorites] = React.useState<string[]>(() => readLocalStorage<string[]>(KEY, []));

  React.useEffect(() => {
    writeLocalStorage(KEY, favorites);
  }, [favorites]);

  const isFav = React.useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggle = React.useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  return { isFav, toggle, all: favorites };
}

export function FavoriteButton({
  active,
  onToggle,
  className,
}: {
  active: boolean;
  onToggle: () => void;
  className?: string;
}): JSX.Element {
  return (
    <button
      type="button"
      aria-label="Toggle favorite"
      onClick={(e) => {
        e.preventDefault();
        onToggle();
      }}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 ring-1 ring-slate-200 backdrop-blur transition hover:bg-white",
        className,
      )}
    >
      <Heart className={cn("h-5 w-5", active ? "fill-rose-600 text-rose-600" : "text-slate-700")} />
    </button>
  );
}
