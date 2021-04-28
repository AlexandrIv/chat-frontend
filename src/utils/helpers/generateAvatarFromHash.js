import tinycolor from 'tinycolor2';

const getCorrectIndex = number => {
  return number > 255 ? 255 : number < 0 ? 0 : number;
}

const generateAvatarFromHash = (hash) => {
  const [r, g, b] = hash
      .substr(3, 6)
      .split('')
      .map(char => getCorrectIndex(char.charCodeAt(0)));
  const color = tinycolor({ r, g, b }).lighten(10).saturate(10).toHexString();
  const colorLighten = tinycolor({ r, g, b }).lighten(30).saturate(30).toHexString();
  return {color: color, colorLighten: colorLighten};
};

export default generateAvatarFromHash;
