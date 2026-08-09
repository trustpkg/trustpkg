"use client";

import MoonIcon from "@/assets/moon.svg";
import SunIcon from "@/assets/sun.svg";
import Hidden from "@/components/Hidden";
import { themeDefinitions } from "@/theme/generated/themes.generated.const";
import type { CurrentTheme } from "@/theme/generated/themes.generated.types";
import { ThemeContext } from "@/theme/providers/ThemeProvider";
import { SVGComponent } from "@/types/svg";
import { Menu } from "@ark-ui/react";
import React from "react";
import styles from "./ChooseTheme.module.scss";
import { IconButton } from "@/components/Button";

const ThemeIcons: Record<CurrentTheme, SVGComponent> = {
  light: SunIcon,
  dark: MoonIcon,
};

export function ChooseTheme() {
  const context = React.useContext(ThemeContext);

  if (!context) {
    return null;
  }

  const CurrentThemeIcon = ThemeIcons[context.theme];

  return (
    <>
      <Menu.Root
        closeOnSelect
        onSelect={(value) => context.setTheme(value.value as CurrentTheme)}
      >
        <Menu.Trigger className={styles.chooseThemeTrigger} asChild>
          <Menu.Indicator className={styles.chooseThemeTrigger_indicator}>
            <IconButton.AsButton
              label={`Change theme`}
              aria-description={`Current theme: ${context.theme}`}
            >
              <CurrentThemeIcon className={styles.chooseThemeTrigger_icon} />
            </IconButton.AsButton>
          </Menu.Indicator>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content className={styles.chooseThemeContent}>
            <Menu.Arrow>
              <Menu.ArrowTip />
            </Menu.Arrow>

            {themeDefinitions.map((definition) => {
              const Icon = ThemeIcons[definition.theme as CurrentTheme];

              return (
                <Menu.Item
                  key={definition.theme}
                  value={definition.theme}
                  className={styles.chooseThemeContent_item}
                >
                  <Icon className={styles.chooseThemeContent_icon} />
                  <Hidden>{definition.theme}</Hidden>
                </Menu.Item>
              );
            })}
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </>
  );
}
