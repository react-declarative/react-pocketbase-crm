import getRouteItem from "../../utils/getRouteItem";
import { set } from "lodash";

const map_builder = () => {
    const translateMap = new Map<string, Set<string>>();

    if (process.env.CC_NODE_ENV === "development") {
        window.Translate.use((t) => {
            const item = getRouteItem();
            if (!item) {
                return null;
            }
            const translateSet = translateMap.get(item.path) || new Set<string>();
            translateSet.add(t)
            translateMap.set(item.path, translateSet);
            return null;
        });
        (window as any).getTranslateMap = () => {
            const result = Object.fromEntries(translateMap.entries());
            for (const key of Object.keys(result)) {
                set(result, key, [...result[key]]);
            }
            return JSON.stringify(result, null, 2);
        };
    }
}

document.addEventListener("DOMContentLoaded", map_builder);
