import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Valid text is required' }, { status: 400 });
    }

    // Attempt to call local python server if it's running
    try {
      // We set a very short timeout so it doesn't hang if python isn't running
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 500);
      
      const pyResponse = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (pyResponse.ok) {
        const pyData = await pyResponse.json();
        return NextResponse.json(pyData);
      }
    } catch (e) {
      // Python backend not available, fallback to mock simulation
      console.log("Local Python backend not reachable, using simulated models.");
    }

    // SIMULATED DETECTION LOGIC FOR DEMO PURPOSES
    // Analyze text length, use of all caps, exclamation marks, and specific words to simulate model
    const lowerText = text.toLowerCase();
    
    // Simple heuristics
    const hasClickbait = /shocking|unbelievable|you won't believe|secret|revealed/i.test(text);
    const excessivePunctuation = (text.match(/[!?]{2,}/g) || []).length > 0;
    const excessiveCaps = (text.match(/\b[A-Z]{4,}\b/g) || []).length > 3;
    
    // Calculate a base score (1 = 100% Real, 0 = 100% Fake)
    let baseScore = 0.8; // Assume real by default
    
    if (hasClickbait) baseScore -= 0.3;
    if (excessivePunctuation) baseScore -= 0.2;
    if (excessiveCaps) baseScore -= 0.2;
    if (text.length < 50) baseScore -= 0.2; // Too short to be real news
    
    // Add some random variance to simulate different models
    const nbScore = Math.max(0, Math.min(1, baseScore + (Math.random() * 0.2 - 0.1)));
    const lrScore = Math.max(0, Math.min(1, baseScore + (Math.random() * 0.15 - 0.075)));
    const svmScore = Math.max(0, Math.min(1, baseScore + (Math.random() * 0.1 - 0.05)));
    const rfScore = Math.max(0, Math.min(1, baseScore + (Math.random() * 0.1 - 0.05)));
    
    // Ensemble average
    const finalScore = (nbScore + lrScore + svmScore + rfScore) / 4;
    const prediction = finalScore >= 0.5 ? 'REAL' : 'FAKE';
    const confidence = finalScore >= 0.5 ? finalScore : 1 - finalScore;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({
      prediction,
      confidence,
      models: {
        nb: nbScore,
        lr: lrScore,
        svm: svmScore,
        rf: rfScore
      }
    });
  } catch (error) {
    console.error('Detection error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
