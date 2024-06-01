export class ColorGenerator {
  private white = "#FFF";
  private black = "#000";
  constructor(private readonly color: string) {
    this.color = color;
  }

  get primary() {
    return this.color;
  }

  lightenColor(darknessPercentage: number, transparencyPercentage = 0) {
    return this.blendColors(
      this.white,
      darknessPercentage * 0.01,
      transparencyPercentage * 0.01
    );
  }

  darkenColor(darknessPercentage: number, transparencyPercentage = 0) {
    return this.blendColors(
      this.black,
      darknessPercentage * 0.01,
      transparencyPercentage * 0.01
    );
  }

  private blendColors(
    secondColor: string,
    secondColorAlpha: number,
    opacity: number
  ) {
    const rgbColor1 = this.hex2rgb(
      this.color.includes("rgb") ? this.rgb2hex(this.color) : this.color
    )
      .match(/\d+/g)
      ?.map(Number);
    const rgbColor2 = this.hex2rgb(
      secondColor.includes("rgb") ? this.rgb2hex(secondColor) : secondColor
    )
      .match(/\d+/g)
      ?.map(Number);

    if (!rgbColor1 || !rgbColor2) {
      return this.color;
    }

    const rgbBlendedColor = [
      (1 - secondColorAlpha) * rgbColor1[0] + secondColorAlpha * rgbColor2[0],
      (1 - secondColorAlpha) * rgbColor1[1] + secondColorAlpha * rgbColor2[1],
      (1 - secondColorAlpha) * rgbColor1[2] + secondColorAlpha * rgbColor2[2],
    ];

    return (
      "#" +
      rgbBlendedColor.map(this.intToHex).join("") +
      (opacity ? Math.floor(opacity * 255).toString(16) : "")
    );
  }

  private intToHex(value: number) {
    const hex = Math.round(value).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  private hex2rgb(color: string) {
    if (color.length == 4)
      color = color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
    return `rgb(${color.match(/\w\w/g)?.map((c) => +`0x${c}`)})`;
  }
  private rgb2hex(color: string) {
    return (
      "#" +
      color
        .match(/\d+/g)
        ?.map((x) => (+x).toString(16).padStart(2, "0"))
        .join("")
    );
  }
}
