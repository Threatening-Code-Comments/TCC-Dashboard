import React, { Component, createContext } from "react";

import axios from "axios";
import cheerio from "cheerio";
import { intToColor } from "../Tools";

export const IconContext = createContext({ icons: null });

class IconProvider extends Component {
  state = {
    icons: null,
  };

  componentDidMount = async () => {
    const iconRequest = await axios.get(
      "https://raw.githubusercontent.com/maltaisn/icondialoglib/master/iconpacks/iconpack-default/src/main/res/xml/iconpack_default_icons.xml"
    );

    const $ = cheerio.load(iconRequest.data);
    let icons = {};

    $("icon").each((index, icon) => {
      icons["id-" + icon.attribs.id] = {
        id: icon.attribs.id,
        path: icon.attribs.path,
        name: icon.name,
      };
    });

    this.setState({ icons: icons });
  };

  render() {
    const state = this.state;

    return (
      <IconContext.Provider value={state}>
        {this.props.children}
      </IconContext.Provider>
    );
  }
}

export const getIconSVG = (index, width, height, color, icons) => {
  const defaultPathSize = 20.0;
  const scaleX = (width * 0.85) / defaultPathSize;
  const scaleY = (height * 0.85) / defaultPathSize;

  const icon = icons["id-" + index];
  if (color)
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path
          d={icon.path}
          style={{
            transform: `scale(${scaleX}, ${scaleY})`,
            fill: intToColor(color),
          }}
        ></path>
      </svg>
    );
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path
        d={icon.path}
        style={{ transform: `scale(${scaleX}, ${scaleY})` }}
      ></path>
    </svg>
  );
};

export default IconProvider;
