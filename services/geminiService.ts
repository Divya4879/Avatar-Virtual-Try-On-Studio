
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import type { AvatarStyle, Measurements, ClothingDetails } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = (base64Data: string) => {
    const match = base64Data.match(/^data:(image\/[a-zA-Z]+);base64,(.*)$/);
    if (!match) {
        throw new Error("Invalid base64 string for image");
    }
    const mimeType = match[1];
    const data = match[2];
    return {
        inlineData: {
            data,
            mimeType,
        },
    };
};

export const generateAvatar = async (base64Image: string, style: AvatarStyle): Promise<string> => {
    let prompt;
    if (style === 'Hyperrealistic') {
        prompt = `Based on the person in this image, create a full-body, photorealistic image of them as if for a professional photoshoot. They should be facing forward with a neutral expression and pose. Place them on a simple, plain light gray background. The final output must be only the image, with no alterations to their appearance other than standardizing the pose and background.`
    } else {
        prompt = `Based on the person in this image, create a full-body ${style} avatar. The avatar should be facing forward with a neutral expression and pose. Place the avatar on a simple, plain light gray background. The final output must be only the image.`;
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: {
            parts: [
                fileToGenerativePart(base64Image),
                { text: prompt },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            const mimeType = part.inlineData.mimeType;
            const base64Data = part.inlineData.data;
            return `data:${mimeType};base64,${base64Data}`;
        }
    }

    throw new Error("AI did not return an image. Please try again.");
};

export const performTryOn = async (
    base64AvatarImage: string,
    base64ClothingImages: string[],
    clothingDetails: ClothingDetails,
    measurements: Measurements
): Promise<string> => {
    const measurementText = `Height: ${measurements.height || 'not provided'} cm, Weight: ${measurements.weight || 'not provided'} kg, Chest: ${measurements.chest || 'not provided'} cm, Waist: ${measurements.waist || 'not provided'} cm, Hips: ${measurements.hips || 'not provided'} cm.`;
    
    const prompt = `You are a globally renowned digital tailor and hyperrealistic fashion artist. Your work is indistinguishable from reality. Your mission is to create a photorealistic virtual try-on image with an obsessive attention to detail.

**Input Images:**
1.  The first image provided is the user's full-body avatar (or photorealistic model).
2.  The subsequent images (up to 4) are of a single clothing item. Use all provided clothing images to understand its complete 3D structure, texture, and design.

**User and Clothing Data:**
-   **User Measurements:** ${measurementText}
-   **Clothing Type:** ${clothingDetails.itemType}
-   **Clothing Material:** ${clothingDetails.material}
-   **Intended Fit:** ${clothingDetails.fit}
-   **Additional Description:** ${clothingDetails.description}

**Your Instructions:**
1.  **Holistic Garment Analysis:** Analyze all provided clothing images. If you have a front and back view, construct a complete 3D understanding of the garment. Use detail shots to accurately render textures and patterns.
2.  **Hyperrealistic Simulation (Do NOT just paste):** Your primary task is to create a result that is a ditto copy of how the clothing would look if the person were truly wearing it.
    -   **Fit & Measurements:** Critically use the **User Measurements** and the **Intended Fit** ('${clothingDetails.fit}'). A 'Slim' fit on the provided measurements must look form-fitting. A 'Loose' fit should have ample room and natural-looking folds.
    -   **Fabric Physics & Realism:** This is paramount. The **Material** ('${clothingDetails.material}') is key. Simulate its properties with extreme accuracy. Consider its weight, texture, and sheen. How does light interact with it? How does it fold, crease, and hang? A silk shirt will hang differently than a denim jacket. Show this through photorealistic highlights, shadows, and wrinkle patterns. The result must be indistinguishable from a real photograph.
    -   **Preserve Identity:** The avatar's proportions, pose, style, and face must remain identical. The background must also remain unchanged from the original avatar image—a simple, plain light gray.
3. **Critical Thinking Process (Internal Monologue):** Before generating the final image, first, think step-by-step. 1. Analyze the avatar's body shape from the measurements. 2. Analyze the garment's 3D shape from all images. 3. Mentally drape the garment onto the avatar. How does the '${clothingDetails.material}' fabric hang and fold? Where would shadows naturally fall? Where would there be tension or slack based on the '${clothingDetails.fit}' fit? 4. Now, based on that detailed mental model, render the final, photorealistic image.
4.  **Output:** Your final output must be **only the resulting image** of the avatar wearing the clothing. Do not include any text, explanations, or borders.`;
    
    const clothingImageParts = base64ClothingImages.map(fileToGenerativePart);

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: {
            parts: [
                fileToGenerativePart(base64AvatarImage),
                ...clothingImageParts,
                { text: prompt },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
            const mimeType = part.inlineData.mimeType;
            const base64Data = part.inlineData.data;
            return `data:${mimeType};base64,${base64Data}`;
        }
    }
    
    throw new Error("AI did not return an image. Please try again.");
};
