import React from "react";
import MenuItem from "@material-ui/core/MenuItem";

function LanguageItem(props) {
  const { language, onClose, languageSelect } = props;
  const onItemClick = () => {
    localStorage.setItem("language", `${language}`);
    languageSelect(language);
    onClose();
  };
  return <MenuItem onClick={onItemClick}>{language}</MenuItem>;
}

export default LanguageItem;
