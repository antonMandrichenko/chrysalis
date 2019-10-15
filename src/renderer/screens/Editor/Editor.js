// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Fade from "@material-ui/core/Fade";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import LayersClearIcon from "@material-ui/icons/LayersClear";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LockIcon from "@material-ui/icons/Lock";
import MenuItem from "@material-ui/core/MenuItem";
import PaletteIcon from "@material-ui/icons/Palette";
import Portal from "@material-ui/core/Portal";
import Select from "@material-ui/core/Select";
import Slide from "@material-ui/core/Slide";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

import { withSnackbar } from "notistack";

import Focus from "@chrysalis-api/focus";
import Keymap, { KeymapDB } from "@chrysalis-api/keymap";

import ColorPalette from "../../components/ColorPalette";
import KeySelector from "./KeySelector";
import SaveChangesButton from "../../components/SaveChangesButton";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import i18n from "../../i18n";
import settings from "electron-settings";
import ImportExportDialog from "./ImportExportDialog";
import { CopyFromDialog } from "./CopyFromDialog";
import MacrosDialog from "../../components/macros";

const styles = theme => ({
  tbg: {
    marginRight: theme.spacing.unit * 4
  },
  layerSelectItem: {
    display: "inline-flex"
  },
  grow: {
    flexGrow: 1
  },
  editor: {
    margin: theme.spacing.unit * 3,
    marginBottom: 150,
    textAlign: "center"
  },
  moreMenu: {
    marginTop: theme.spacing.unit * 4
  },
  layerItem: {
    paddingLeft: theme.spacing.unit * 4
  },
  layerSelect: {
    marginRight: theme.spacing.unit * 4
  },
  tabWrapper: {
    flexDirection: "row",
    "& svg": {
      position: "relative",
      top: -theme.spacing.unit / 2
    }
  },
  tabLabelContainer: {
    width: "auto",
    padding: `6px ${theme.spacing.unit}px`
  },
  disabledLayer: {
    opacity: 0.5,
    filter: "saturate(25%)"
  }
});

class Editor extends React.Component {
  state = {
    mockData: {},
    currentLayer: 0,
    currentKeyIndex: -1,
    currentLedIndex: -1,
    modified: false,
    saving: false,
    keymap: {
      custom: [],
      default: [],
      onlyCustom: false
    },
    palette: [],
    colorMap: [],
    mode: "layout",
    clearConfirmationOpen: false,
    copyFromOpen: false,
    importExportDialogOpen: false,
    isMultiSelected: false,
    isColorButtonSelected: false,
    currentLanguageLayout: "",
    macrosNames: []
  };
  keymapDB = new KeymapDB();
  /**
   * Bottom menu never hide and automatically select a key at launch and have this shown in the bottom menu
   */
  bottomMenuNeverHide = () => {
    this.setState(state => ({
      currentKeyIndex: state.currentKeyIndex !== -1 ? state.currentKeyIndex : 0,
      currentLedIndex: state.currentLedIndex !== -1 ? state.currentLedIndex : 0,
      selectedPaletteColor: null,
      isColorButtonSelected: false
    }));
  };

  /**
   * Saves data in demo mode in local storage
   */
  saveDataInLS() {
    const { device } = this.props;
    localStorage.setItem(
      `keymap_${device.comName}_${device.device.info.product}`,
      JSON.stringify(this.state.keymap)
    );
    localStorage.setItem(
      `colormap_${device.comName}_${device.device.info.product}`,
      JSON.stringify(this.state.colorMap)
    );
    localStorage.setItem(
      `palette_${device.comName}_${device.device.info.product}`,
      JSON.stringify(this.state.palette)
    );
  }

  /**
   * Changes data to the required form in the form of arrays
   */
  _chunk(a, chunkSize) {
    var R = [];

    for (var i = 0; i < a.length; i += chunkSize)
      R.push(a.slice(i, i + chunkSize));

    return R;
  }

  
  scanKeyboard = async lang => {
    let focus = new Focus();
    try {
      /**
       * Create property language to the object 'options', to call KeymapDB in Keymap and modify languagu layout
       */
      if (lang) {
        let deviceLeng = { ...focus.device, language: true };
        focus.commands.keymap = new Keymap(deviceLeng);
        this.keymapDB = focus.commands.keymap.db;
      }

      let defLayer = await focus.command("settings.defaultLayer");
      defLayer = parseInt(defLayer) || 0;

      let keymap = await focus.command("keymap");

      let empty = true;
      for (let layer of keymap.custom) {
        for (let i of layer) {
          if (i.keyCode != 65535) {
            empty = false;
            break;
          }
        }

        if (empty && !keymap.onlyCustom && keymap.custom.length > 0) {
          console.log("Custom keymap is empty, copying defaults");
          for (let i = 0; i < keymap.default.length; i++) {
            keymap.custom[i] = keymap.default[i].slice();
          }
          keymap.onlyCustom = true;
          await focus.command("keymap", keymap);
        }

        let colormap = await focus.command("colormap");

        this.setState({
          defaultLayer: defLayer,
          keymap: keymap,
          showDefaults: !keymap.onlyCustom,
          palette: colormap.palette,
          colorMap: colormap.colorMap
        });
      }
      this.bottomMenuNeverHide();
    } catch (e) {
      this.props.enqueueSnackbar(e, { variant: "error" });
      this.props.onDisconnect();
    }
  };

  getCurrentKey() {
    if (this.state.currentKeyIndex < 0) return -1;

    let layer = parseInt(this.state.currentLayer),
      keyIndex = parseInt(this.state.currentKeyIndex);

    if (keyIndex >= 80) return 0;

    if (this.state.keymap.onlyCustom) {
      if (layer < 0) {
        layer += this.state.keymap.default.length;
        return this.state.keymap.default[layer][keyIndex].keyCode;
      }

      return this.state.keymap.custom[layer][keyIndex].keyCode;
    } else {
      const offset = this.state.keymap.default.length;
      if (layer < this.state.keymap.default.length)
        return this.state.keymap.default[layer][keyIndex].keyCode;

      return this.state.keymap.custom[layer - offset][keyIndex].keyCode;
    }
  }

  onKeyChange = keyCode => {
    // Keys can only change on the custom layers

    let layer = this.state.currentLayer,
      keyIndex = this.state.currentKeyIndex;

    if (keyIndex === -1) {
      return;
    }

    this.setState(state => {
      let keymap = state.keymap.custom.slice();
      const l = state.keymap.onlyCustom
        ? layer
        : layer - state.keymap.default.length;
      keymap[l][keyIndex] = this.keymapDB.parse(keyCode);
      return {
        keymap: {
          default: state.keymap.default,
          onlyCustom: state.keymap.onlyCustom,
          custom: keymap
        },
        modified: true
      };
    });
    this.props.startContext();
  };

  /**
   * Verificate that colors in keyboard button and in color palette is equal
   * @param {number} colorIndex Number of palette index
   * @param {number} currentLayer Number of current layer
   * @param {number} currentLedIndex Number of current selected keyboard button
   */

  onVerificationColor = (colorIndex, currentLayer, currentLedIndex) => {
    const { colorMap } = this.state;
    const currentIndexKeyButton = colorMap[currentLayer][currentLedIndex];
    return currentIndexKeyButton === colorIndex;
  };

  /**
   * Change state if click control or shift button
   * @param {number} layer Number of current layer
   * @param {number} ledIndex Number of current selected keyboard button
   */
  onCtrlShiftPress = (layer, ledIndex) => {
    this.setState({
      selectedPaletteColor: this.state.colorMap[layer][ledIndex],
      isMultiSelected: true,
      isColorButtonSelected: true
    });
  };

  /**
   * Change state if color buton selected
   * @param {number} layer Number of layer in attribute of keyboard button
   * @param {number} currentLayer Number of current layer from state
   * @param {number} ledIndex Number of current selected keyboard button
   */
  onButtonKeyboardColorChange = (currentLayer, layer, ledIndex) => {
    const { selectedPaletteColor, modified } = this.state;
    const isEqualColor = this.onVerificationColor(
      selectedPaletteColor,
      currentLayer,
      ledIndex
    );
    if (!modified && isEqualColor) {
      return;
    } else {
      this.setState(state => {
        let colormap = state.colorMap.slice();
        colormap[currentLayer][ledIndex] = this.state.selectedPaletteColor;
        this.props.startContext();
        return {
          selectedPaletteColor: this.state.colorMap[layer][ledIndex],
          colorMap: colormap,
          modified: true
        };
      });
    }
  };

  onKeySelect = event => {
    const {
      selectedPaletteColor,
      currentLayer,
      isMultiSelected,
      isColorButtonSelected,
      currentKeyIndex
    } = this.state;
    const currentTarget = event.currentTarget;
    let layer = parseInt(currentTarget.getAttribute("data-layer")),
      keyIndex = parseInt(currentTarget.getAttribute("data-key-index")),
      ledIndex = parseInt(currentTarget.getAttribute("data-led-index"));

    if (keyIndex == currentKeyIndex) {
      if (event.ctrlKey || (event.shiftKey && !isColorButtonSelected)) {
        this.onCtrlShiftPress(layer, ledIndex);
        return;
      } else {
        this.setState({
          currentKeyIndex: -1,
          currentLedIndex: -1,
          selectedPaletteColor: null,
          isMultiSelected: false,
          isColorButtonSelected: false
        });
        return;
      }
    }

    this.setState(state => {
      if (
        state.colorMap.length > 0 &&
        layer >= 0 &&
        layer < state.colorMap.length
      ) {
        return {
          currentLayer: layer,
          currentKeyIndex: keyIndex,
          currentLedIndex: ledIndex
        };
      } else {
        return {
          currentLayer: layer,
          currentKeyIndex: keyIndex
        };
      }
    });

    if (event.ctrlKey || event.shiftKey) {
      this.onCtrlShiftPress(layer, ledIndex);
      return;
    } else {
      if (
        selectedPaletteColor !== null &&
        isMultiSelected &&
        isColorButtonSelected
      ) {
        this.onButtonKeyboardColorChange(currentLayer, layer, ledIndex);
      }
      if (isColorButtonSelected && !isMultiSelected) {
        this.setState(
          () => {
            return {
              isMultiSelected: true
            };
          },
          () => {
            this.onButtonKeyboardColorChange(currentLayer, layer, ledIndex);
          }
        );
      }
    }
  };

  selectLayer = event => {
    if (event.target.value === undefined) return;
    this.setState({
      currentLayer: event.target.value
    });
    this.bottomMenuNeverHide();
  };

  onApply = async () => {
    const { isDemo } = this.props;
    this.setState({ saving: true });
    let focus = new Focus();
    if (isDemo) {
      this.saveDataInLS();
    } else {
      await focus.command("keymap", this.state.keymap);
      await focus.command("colormap", this.state.palette, this.state.colorMap);
    }
    this.setState({
      modified: false,
      saving: false,
      isMultiSelected: false,
      selectedPaletteColor: null,
      isColorButtonSelected: false
    });
    console.log("Changes saved.");
    this.props.cancelContext();
  };

  async componentDidMount() {
    const { isDemo } = this.props;
    if (isDemo) {
      const data = await fetch("demoData/demoData.json");
      this.setState({ mockData: await data.json() });
    }
    onChangeLanguageLayout = () => {
      this.setState({
        currentLanguageLayout: settings.get("keyboard.language") || "english"
      });
    };
  
    this.scanKeyboard().then(() => {
      const { keymap } = this.state;
      const defLayer =
        this.state.defaultLayer >= 126 ? 0 : this.state.defaultLayer;
      let initialLayer = 0;

      if (!settings.get("keymap.showDefaults")) {
        if (defLayer < keymap.default.length) {
          initialLayer = keymap.onlyCustom ? 0 : keymap.default.length;
        }
      }

      this.setState({ currentLayer: initialLayer });
    });
    if (isDemo) this.saveDataInLS();
    this.onChangeLanguageLayout();
  }

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.inContext && !nextProps.inContext) {
      this.scanKeyboard();
      this.setState({ modified: false });
    }
  };

  copyFromDialog = () => {
    this.setState({ copyFromOpen: true });
  };
  cancelCopyFrom = () => {
    this.setState({ copyFromOpen: false });
  };
  copyFromLayer = layer => {
    this.setState(state => {
      let newKeymap, newColormap;

      if (state.keymap.onlyCustom) {
        newKeymap =
          layer < 0
            ? state.keymap.default.slice()
            : state.keymap.custom.slice();
        newKeymap[state.currentLayer] =
          layer < 0
            ? state.keymap.default[layer + state.keymap.default.length].slice()
            : state.keymap.custom[layer].slice();
      } else {
        newKeymap =
          layer < state.keymap.default.length
            ? state.keymap.default.slice()
            : state.keymap.custom.slice();
        newKeymap[state.currentLayer] =
          layer < state.keymap.default.length
            ? state.keymap.default[layer].slice()
            : state.keymap.custom[layer - state.keymap.default.length].slice();
      }
      newColormap = state.colorMap.slice();
      if (newColormap.length > 0)
        newColormap[state.currentLayer] = state.colorMap[
          layer >= 0 ? layer : state.currentLayer
        ].slice();

      this.props.startContext();
      return {
        colorMap: newColormap,
        keymap: {
          default: state.keymap.default,
          onlyCustom: state.keymap.onlyCustom,
          custom: newKeymap
        },
        copyFromOpen: false,
        modified: true
      };
    });
  };

  clearLayer = () => {
    this.setState(state => {
      let newKeymap = state.keymap.custom.slice();
      const idx = state.keymap.onlyCustom
        ? state.currentLayer
        : state.currentLayer - state.keymap.default.length;
      newKeymap[idx] = Array(newKeymap[0].length)
        .fill()
        .map(() => ({ keyCode: 0xffff }));

      let newColormap = state.colorMap.slice();
      if (newColormap.length > 0) {
        newColormap[idx] = Array(newColormap[0].length)
          .fill()
          .map(() => 15);
      }
      this.props.startContext();
      return {
        keymap: {
          default: state.keymap.default,
          onlyCustom: state.keymap.onlyCustom,
          custom: newKeymap
        },
        colorMap: newColormap,
        modified: true,
        clearConfirmationOpen: false
      };
    });
  };

  confirmClear = () => {
    this.setState({ clearConfirmationOpen: true });
  };
  cancelClear = () => {
    this.setState({ clearConfirmationOpen: false });
  };

  setMode = (mode, isUnderglow) => {
    this.setState({ mode: mode });
    this.bottomMenuNeverHide();
  };

  onColorSelect = colorIndex => {
    const {
      currentLayer,
      currentLedIndex,
      colorMap,
      selectedPaletteColor
    } = this.state;

    const isEqualColor = this.onVerificationColor(
      colorIndex,
      currentLayer,
      currentLedIndex
    );

    if (colorIndex == this.state.selectedPaletteColor) colorIndex = -1;
    if (colorIndex == -1) {
      this.setState({ selectedPaletteColor: selectedPaletteColor });
      return;
    }

    if (currentLayer < 0 || currentLayer >= colorMap.length) return;

    if (!isEqualColor) {
      this.setState(state => {
        let colormap = state.colorMap.slice();
        colormap[currentLayer][currentLedIndex] = colorIndex;
        return {
          isMultiSelected: true,
          colorMap: colormap,
          selectedPaletteColor: colorIndex,
          modified: true
        };
      });
      this.props.startContext();
    } else {
      this.setState({
        selectedPaletteColor: colorIndex
      });
    }
  };

  onColorPick = (colorIndex, r, g, b) => {
    let newPalette = this.state.palette.slice();
    newPalette[colorIndex] = {
      r: r,
      g: g,
      b: b,
      rgb: `rgb(${r}, ${g}, ${b})`
    };
    this.setState({
      palette: newPalette,
      modified: true
    });
    this.props.startContext();
  };

  importExportDialog = () => {
    this.setState({ importExportDialogOpen: true });
  };
  cancelImport = () => {
    this.setState({ importExportDialogOpen: false });
  };
  importLayer = data => {
    if (data.palette.length > 0) this.setState({ palette: data.palette });
    if (data.keymap.length > 0 && data.colormap.length > 0) {
      const { currentLayer } = this.state;
      if (this.state.keymap.onlyCustom) {
        if (currentLayer >= 0) {
          this.setState(state => {
            let newKeymap = this.state.keymap.custom.slice();
            newKeymap[currentLayer] = data.keymap.slice();
            let newColormap = this.state.colorMap.slice();
            newColormap[currentLayer] = data.colormap.slice();
            console.log(currentLayer, newKeymap);
            return {
              keymap: {
                default: state.keymap.default,
                custom: newKeymap,
                onlyCustom: state.keymap.onlyCustom
              },
              colorMap: newColormap
            };
          });
        }
      } else {
        if (currentLayer >= this.state.keymap.default.length) {
          this.setState(state => {
            const defLength = this.state.keymap.default.length;
            let newKeymap = this.state.keymap.custom.slice();
            newKeymap[currentLayer - defLength] = data.keymap;
            let newColormap = this.state.colorMap.slice();
            newColormap[currentLayer - defLength] = data.colormap.slice();
            return {
              keymap: {
                default: state.keymap.default,
                custom: newKeymap,
                onlyCustom: state.keymap.onlyCustom
              },
              colorMap: newColormap
            };
          });
        }
      }
    }
    this.setState({ modified: true });
    this.props.startContext();
    this.toCloseImportExportDialog();
  };

  /**
   * Close ImportExportDialog component
   */
  toCloseImportExportDialog = () => {
    this.setState({ importExportDialogOpen: false });
  };

  /**
   * Changes color of all keyboard underglows
   */
  toChangeAllUnderglowsColor = colorIndex => {
    const { currentLayer } = this.state;
    const beginForChange = 69;
    const endForChange = 131;
    this.setState(state => {
      let colormap = state.colorMap.slice();
      colormap[currentLayer] = colormap[currentLayer].fill(
        colorIndex,
        beginForChange,
        endForChange
      );
      return {
        colorMap: colormap,
        modified: true
      };
    });
    this.props.startContext();
    this.toCloseImportExportDialog();
  };

  /**
   * Close ImportExportDialog component
   */
  toCloseImportExportDialog = () => {
    this.setState({ importExportDialogOpen: false });
  };

  setMacrosNames = names => {
    this.setState({ macrosNames: names });
    console.log(names);
  };

  render() {
    const { classes } = this.props;
    const { keymap, palette, isColorButtonSelected } = this.state;

    let focus = new Focus();
    const Layer = focus.device.components.keymap;
    const showDefaults = settings.get("keymap.showDefaults");

    let currentLayer = this.state.currentLayer;

    if (!showDefaults) {
      if (currentLayer < keymap.default.length && !keymap.onlyCustom) {
        currentLayer = 0;
      }
    }

    let layerData, isReadOnly;
    if (keymap.onlyCustom) {
      isReadOnly = currentLayer < 0;
      layerData = isReadOnly
        ? keymap.default[currentLayer + keymap.default.length]
        : keymap.custom[currentLayer];
    } else {
      isReadOnly = currentLayer < keymap.default.length;
      layerData = isReadOnly
        ? keymap.default[currentLayer]
        : keymap.custom[currentLayer - keymap.default.length];
    }

    const layer = (
      <Fade in appear key={currentLayer}>
        <div className={classes.editor}>
          <Layer
            className={classNames("layer", isReadOnly && classes.disabledLayer)}
            readOnly={isReadOnly}
            index={currentLayer}
            keymap={layerData}
            onKeySelect={this.onKeySelect}
            selectedKey={this.state.currentKeyIndex}
            palette={this.state.palette}
            colormap={
              keymap.onlyCustom
                ? this.state.colorMap[currentLayer]
                : this.state.colorMap[currentLayer - keymap.default.length]
            }
            theme={this.props.theme}
            setMode={this.setMode}
          />
        </div>
      </Fade>
    );

    const copyCustomItems = this.state.keymap.custom.map((_, index) => {
      const idx = index + (keymap.onlyCustom ? 0 : keymap.default.length);
      const label = i18n.formatString(i18n.components.layer, idx);

      return {
        index: idx,
        label: label
      };
    });
    const copyDefaultItems =
      showDefaults &&
      keymap.default.map((_, index) => {
        const idx = index - (keymap.onlyCustom ? keymap.default.length : 0),
          label = i18n.formatString(i18n.components.layer, idx);

        return {
          index: idx,
          label: label
        };
      });
    const copyFromLayerOptions = (copyDefaultItems || []).concat(
      copyCustomItems
    );

    const defaultLayerMenu =
      showDefaults &&
      keymap.default.map((_, index) => {
        const idx = index - (keymap.onlyCustom ? keymap.default.length : 0),
          menuKey = "layer-menu-" + idx.toString();
        return (
          <MenuItem value={idx} key={menuKey}>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText
              inset
              primary={i18n.formatString(i18n.components.layer, idx)}
            />
          </MenuItem>
        );
      });

    const customLayerMenu = keymap.custom.map((_, index) => {
      const idx = index + (keymap.onlyCustom ? 0 : keymap.default.length),
        menuKey = "layer-menu-" + idx.toString();
      return (
        <MenuItem value={idx} key={menuKey}>
          <ListItemText
            inset
            primary={i18n.formatString(i18n.components.layer, idx)}
          />
        </MenuItem>
      );
    });

    const layerMenu = (defaultLayerMenu || []).concat(customLayerMenu);
    const { mode } = this.state;

    return (
      <React.Fragment>
        <Portal container={this.props.titleElement}>
          {i18n.app.menu.editor}
        </Portal>
        <Portal container={this.props.appBarElement}>
          <Toolbar>
            <ToggleButtonGroup
              value={mode}
              exclusive
              className={classes.tbg}
              onChange={(_, mode) => {
                this.setMode(mode);
              }}
            >
              <ToggleButton
                value="layout"
                disabled={this.state.currentKeyIndex >= 80 || mode == "layout"}
              >
                <Tooltip title={i18n.editor.layoutMode}>
                  <KeyboardIcon />
                </Tooltip>
              </ToggleButton>
              {palette.length && (
                <ToggleButton value="colormap" disabled={mode == "colormap"}>
                  <Tooltip title={i18n.editor.colormapMode}>
                    <PaletteIcon />
                  </Tooltip>
                </ToggleButton>
              )}
            </ToggleButtonGroup>
            <MacrosDialog
              macrosNamesArr={this.state.macrosNames}
              setMacrosNames={this.setMacrosNames}
              currentLanguageLayout={this.state.currentLanguageLayout}
            />
            <div className={classes.grow} />
            <FormControl className={classes.layerSelect}>
              <Select
                value={currentLayer}
                classes={{ selectMenu: classes.layerSelectItem }}
                autoWidth
                onClick={this.selectLayer}
              >
                {layerMenu}
              </Select>
            </FormControl>
            <div>
              <Tooltip disableFocusListener title={i18n.editor.importExport}>
                <IconButton onClick={this.importExportDialog}>
                  <ImportExportIcon />
                </IconButton>
              </Tooltip>
              <Tooltip disableFocusListener title={i18n.editor.copyFrom}>
                <IconButton disabled={isReadOnly} onClick={this.copyFromDialog}>
                  <FileCopyIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={i18n.editor.clearLayer}>
                <IconButton disabled={isReadOnly} onClick={this.confirmClear}>
                  <LayersClearIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </Portal>
        {this.state.keymap.custom.length == 0 &&
          this.state.keymap.default.length == 0 && (
            <LinearProgress variant="query" />
          )}
        {layer}
        <Slide in={this.getCurrentKey() != -1} direction="up" unmountOnExit>
          {(mode == "layout" && (
            <KeySelector
              disabled={isReadOnly}
              onKeySelect={this.onKeyChange}
              currentKeyCode={this.getCurrentKey()}
              scanKeyboard={this.scanKeyboard}
              currentLanguageLayout={this.state.currentLanguageLayout}
              onChangeLanguageLayout={this.onChangeLanguageLayout}
              macrosNames={this.state.macrosNames}
            />
          )) ||
            (mode == "colormap" && (
              <ColorPalette
                disabled={
                  isReadOnly || currentLayer > this.state.colorMap.length
                }
                onColorSelect={this.onColorSelect}
                colorButtonIsSelected={this.state.colorButtonIsSelected}
                palette={this.state.palette}
                onColorPick={this.onColorPick}
                selected={this.state.selectedPaletteColor}
                isColorButtonSelected={isColorButtonSelected}
                onColorButtonSelect={this.onColorButtonSelect}
                theme={this.props.theme}
                toChangeAllUnderglowsColor={this.toChangeAllUnderglowsColor}
              />
            ))}
        </Slide>
        <SaveChangesButton
          floating
          onClick={this.onApply}
          disabled={!this.state.modified}
        >
          {i18n.components.save.saveChanges}
        </SaveChangesButton>
        <ConfirmationDialog
          title={i18n.editor.clearLayerQuestion}
          open={this.state.clearConfirmationOpen}
          onConfirm={this.clearLayer}
          onCancel={this.cancelClear}
        >
          {i18n.editor.clearLayerPrompt}
        </ConfirmationDialog>
        <CopyFromDialog
          open={this.state.copyFromOpen}
          onCopy={this.copyFromLayer}
          onCancel={this.cancelCopyFrom}
          layers={copyFromLayerOptions}
          currentLayer={currentLayer}
        />
        <ImportExportDialog
          open={this.state.importExportDialogOpen}
          keymap={layerData}
          palette={this.state.palette}
          colormap={this.state.colorMap[this.state.currentLayer]}
          isReadOnly={isReadOnly}
          onConfirm={this.importLayer}
          onCancel={this.cancelImport}
          toCloseImportExportDialog={this.toCloseImportExportDialog}
        />
      </React.Fragment>
    );
  }
}

Editor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withSnackbar(withStyles(styles, { withTheme: true })(Editor));
