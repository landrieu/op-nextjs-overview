import fs from 'fs';
import sharp from 'sharp';

const ENCODED_IMAGE_SIZE = 80;

// function to encode file data to base64 encoded string
export async function encodeToBase64(file: string) {
    // read binary data
    const bitmap = fs.readFileSync(`./public/img/${file}`, { encoding: 'base64' });

    return bitmap;
}

/**
 * Encode the image to Base 64 and downsize it
 * @param file 
 * @returns 
 */
export async function encodeAndResize(file: string) {
    //const encodedImg = fs.readFileSync(`./public/img/${file}`, { encoding: 'base64' });

    const imgBuffer = await sharp(`./public/img/${file}`).resize({
        width: ENCODED_IMAGE_SIZE,
        height: ENCODED_IMAGE_SIZE
    }).toBuffer();

    let encodedResizedImg = imgBuffer.toString('base64');
    //  console.log(encodedResizedImg.length, encodedImg.length);

    return encodedResizedImg;
}