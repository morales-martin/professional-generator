import styles from "../styles/ThemeChooser.module.css";
import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

function ThemeChooser() {
  const [selectedValue, setSelectedValue] = React.useState("brown");

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);

    switch (event.target.value) {
      case "brown":
        document.documentElement.style.setProperty("--primary", "#DDA15E");
        document.documentElement.style.setProperty("--secondary", "#FEFAE0");
        document.documentElement.style.setProperty("--ternary", "#BC6C25");

        document.documentElement.style.setProperty(
          "--primary-rgb",
          "221, 161, 94"
        );
        document.documentElement.style.setProperty(
          "--secondary-rgb",
          "254, 250, 224"
        );
        document.documentElement.style.setProperty(
          "--ternary-rgb",
          "188, 108, 37"
        );
        break;
      case "green":
        document.documentElement.style.setProperty("--primary", "#588157");
        document.documentElement.style.setProperty("--secondary", "#DAD7CD");
        document.documentElement.style.setProperty("--ternary", "#3A5A40");

        document.documentElement.style.setProperty(
          "--primary-rgb",
          "88, 129, 87"
        );
        document.documentElement.style.setProperty(
          "--secondary-rgb",
          "218, 215, 205"
        );
        document.documentElement.style.setProperty(
          "--ternary-rgb",
          "58, 90, 64"
        );
        break;
      case "silver":
        document.documentElement.style.setProperty("--primary", "#ADB5BD");
        document.documentElement.style.setProperty("--secondary", "#F8F9FA");
        document.documentElement.style.setProperty("--ternary", "#495057");

        document.documentElement.style.setProperty(
          "--primary-rgb",
          "173, 181, 189"
        );
        document.documentElement.style.setProperty(
          "--secondary-rgb",
          "248, 249, 250"
        );
        document.documentElement.style.setProperty(
          "--ternary-rgb",
          "73, 80, 87"
        );
        break;
      case "purple":
        document.documentElement.style.setProperty("--primary", "#9A8C98");
        document.documentElement.style.setProperty("--secondary", "#F2E9E4");
        document.documentElement.style.setProperty("--ternary", "#4A4E69");

        document.documentElement.style.setProperty(
          "--primary-rgb",
          "154, 140, 152"
        );
        document.documentElement.style.setProperty(
          "--secondary-rgb",
          "242, 233, 228"
        );
        document.documentElement.style.setProperty(
          "--ternary-rgb",
          "74, 78, 105"
        );
        break;
      default:
        break;
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={`themeContainer ${styles.container}`}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          style={{
            backgroundColor: "var(--secondary)",
            borderRadius: "10px",
          }}
        >
          <Radio
            checked={selectedValue === "brown"}
            onChange={handleChange}
            value="brown"
            name="radio-buttons"
            style={{
              color: "#DDA15E",
            }}
            inputProps={{ "aria-label": "Brown" }}
          />
          <Radio
            checked={selectedValue === "green"}
            onChange={handleChange}
            value="green"
            name="radio-buttons"
            style={{
              color: "#588157",
            }}
            inputProps={{ "aria-label": "Green" }}
          />
          <Radio
            checked={selectedValue === "silver"}
            onChange={handleChange}
            value="silver"
            name="radio-buttons"
            style={{
              color: "#ADB5BD",
            }}
            inputProps={{ "aria-label": "Silver" }}
          />
          <Radio
            checked={selectedValue === "purple"}
            onChange={handleChange}
            value="purple"
            name="radio-buttons"
            style={{
              color: "#9A8C98",
            }}
            inputProps={{ "aria-label": "Purple" }}
          />
        </RadioGroup>
      </div>
    </div>
  );
}

export default ThemeChooser;
