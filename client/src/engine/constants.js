export const miniMapScale = 8;

export const screenWidth = 320;
export const screenHeight = 200;

export const stripWidth = 2;
export const fov = 60 * Math.PI / 180;

export const numRays = Math.ceil(screenWidth / stripWidth);
export const fovHalf = fov / 2;

export const viewDist = (screenWidth/2) / Math.tan((fov / 2));

export const twoPI = Math.PI * 2;

export const numTextures = 4;
