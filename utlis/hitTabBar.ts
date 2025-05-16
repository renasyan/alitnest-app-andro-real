// hooks/useHideTabBar.ts
import { useNavigation } from "expo-router";
import { useEffect } from "react";

export const useHideTabBar = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({
      tabBarStyle: { display: "none" },
    });

    return () => {
      parent?.setOptions({
        tabBarStyle: { display: "flex" },
      });
    };
  }, []);
};
