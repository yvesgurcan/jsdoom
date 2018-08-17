const assetsPath = 'client/assets';

export const wolfPath = `${assetsPath}/wolf`;
export const ext = '.png';
export const decorationPath = `${assetsPath}/decorations`;

export const screenWidth = 320;
export const screenHeight = 200;
export const miniMapScale = 10;

export const fov = (60 * Math.PI) / 180;
export const viewDist = (screenWidth / 2) / Math.tan((fov / 2));
