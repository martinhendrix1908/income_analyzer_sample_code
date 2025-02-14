// Define types for the createImage function
export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });

// Function to convert degrees to radians
function getRadianAngle(degreeValue: number): number {
    return (degreeValue * Math.PI) / 180;
}

// Define the interface for pixelCrop
export interface PixelCrop {
    width: number;
    height: number;
    x: number;
    y: number;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {string} imageSrc - Image source URL
 * @param {PixelCrop} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 * @returns {Promise<string>} - Returns a promise that resolves to the cropped image URL
 */
export async function getCroppedImg(imageSrc: string, pixelCrop: PixelCrop, rotation: number = 0): Promise<string> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('2D context not available');
    }

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // Set canvas dimensions to allow for a safe area for rotation
    canvas.width = safeArea;
    canvas.height = safeArea;

    // Translate and rotate canvas context
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // Draw rotated image and store data
    ctx.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // Set canvas to final crop size
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Paste rotated image with correct offsets for crop
    ctx.putImageData(
        data,
        Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
        Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    // Return cropped image as a blob URL
    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            if (file) {
                resolve(URL.createObjectURL(file));
            }
        }, 'image/png');
    });
}

/**
 * Rotates an image by the specified degrees
 * @param {string} imageSrc - Image source URL
 * @param {number} rotation - Rotation in degrees
 * @returns {Promise<string>} - Returns a promise that resolves to the rotated image URL
 */
export async function getRotatedImage(imageSrc: string, rotation: number = 0): Promise<string> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('2D context not available');
    }

    const orientationChanged =
        rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270;

    if (orientationChanged) {
        canvas.width = image.height;
        canvas.height = image.width;
    } else {
        canvas.width = image.width;
        canvas.height = image.height;
    }

    // Translate and rotate the canvas context
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);

    // Return rotated image as a blob URL
    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            if (file) {
                resolve(URL.createObjectURL(file));
            }
        }, 'image/png');
    });
}


