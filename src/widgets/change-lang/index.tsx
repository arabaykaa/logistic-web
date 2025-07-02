import { useState } from "react";
import Menu, { MenuItem } from "rc-menu";
import Trigger from "rc-trigger";
import { useTranslation } from "react-i18next";
import { CustomChangeLanguage } from "@/i18n";
import "rc-menu/assets/index.css";
import "rc-trigger/assets/index.css";

const languages = ["ru", "kg", "en"];

const activeLangStyles: React.CSSProperties = {
    background: "rgb(37, 171, 108)",
    color: "#ffffff",
    borderRadius: "0.2rem",
};

export const LanguageChanger = () => {
    const { t, i18n: { language } } = useTranslation();
    const [menuVisible, setMenuVisible] = useState(false);
    const [icon, setIcon] = useState(language);

    const handleSelect = ({ key }: { key: string }) => {
        setIcon(key);
        CustomChangeLanguage(key);
        setMenuVisible(false);
    };

    const menu = (
        <Menu
            mode="vertical"
            onSelect={handleSelect}
            selectedKeys={[language]}
            style={{ padding: "0.5rem 0.2rem", color: "#010101" }}
        >
            {languages.map((item) => (
                <MenuItem key={item} style={{ display: "flex", justifyContent: "center", padding: "0.2rem", ...(language === item ? activeLangStyles : {}) }}>
                    {t(`lang.${item}`)}
                </MenuItem>
            ))
            }
        </Menu >
    );

    return (
        <Trigger
            popup={menu}
            action={["click"]}
            popupVisible={menuVisible}
            onPopupVisibleChange={setMenuVisible}
            popupAlign={{
                points: ["tl", "bl"],
                offset: [0, 6],
                overflow: {
                    adjustX: true,
                    adjustY: true,
                },
            }}
            popupStyle={{
                background: "white",
                border: "1px solid #ddd",
                cursor: "pointer",
                borderRadius: "0.5rem",
                minWidth: "100px",
            }}
        >
            <button
                style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    padding: 0,
                }}
            >
                <img src={`/${icon}.webp`} alt="langIcon" width={28} />
            </button>
        </Trigger>
    );
};
