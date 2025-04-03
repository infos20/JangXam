
export interface Prediction {
  id: string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  output: string[] | null;
  error: string | null;
}

export interface ImageGenerationParams {
  prompt: string;
  negative_prompt?: string;
  width?: number;
  height?: number;
  num_outputs?: number;
  guidance_scale?: number;
}

const REPLICATE_API_URL = 'https://api.replicate.com/v1/predictions';

export const generateImage = async (
  apiKey: string, 
  params: ImageGenerationParams
): Promise<Prediction> => {
  if (!apiKey) {
    throw new Error('API key is required');
  }

  // Use Stability AI's SDXL model by default
  const model = "stability-ai/sdxl";
  
  const response = await fetch(REPLICATE_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: "af1a68a271597604546c09c64aabcd7782c114a63539a4a8d14d1eeda5630c33",
      input: {
        prompt: params.prompt,
        negative_prompt: params.negative_prompt || '',
        width: params.width || 1024,
        height: params.height || 1024,
        num_outputs: params.num_outputs || 1,
        guidance_scale: params.guidance_scale || 7.5,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to generate image');
  }

  return await response.json();
};

export const getPrediction = async (apiKey: string, id: string): Promise<Prediction> => {
  if (!apiKey) {
    throw new Error('API key is required');
  }

  const response = await fetch(`${REPLICATE_API_URL}/${id}`, {
    headers: {
      'Authorization': `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to get prediction');
  }

  return await response.json();
};
