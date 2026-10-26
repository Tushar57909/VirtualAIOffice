// N8N Backend Service Layer

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL;

export interface N8NTaskPayload {
  task: string;
}

export const runAgentTask = async (task: string): Promise<string> => {
  if (!task.trim()) {
    throw new Error('Task cannot be empty.');
  }

  if (!N8N_WEBHOOK_URL) {
    throw new Error('Missing VITE_N8N_WEBHOOK_URL environment variable.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 150000); // 150s timeout

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    let data;
    try {
      data = await response.json();
    } catch (e) {
      // Not JSON
    }

    if (!response.ok) {
      if (data && data.success === false && data.error) {
        throw new Error(data.error);
      }
      throw new Error(`AI Office couldn't complete the task. (HTTP ${response.status})`);
    }
    
    if (data && data.success === false) {
      throw new Error(data.error || 'Unable to process the request.');
    }
    
    if (!data || !data.response) {
      throw new Error('Received empty response from the AI Office.');
    }

    return data.response;
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Your AI team is taking longer than expected. Please try again.');
    }
    throw error;
  }
};
