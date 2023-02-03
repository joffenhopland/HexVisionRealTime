export interface DrawableObject {
    name: string;
    confidence: number;
    x: number;
    y: number;
    width: number,
    height: number;
    elapsed_time?: number;
}


export const feedWidth = 800
export const feedHeight = 450