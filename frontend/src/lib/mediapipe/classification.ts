export interface Point {
  x: number;
  y: number;
  z: number;
}

export function calculateDistance(p1: Point, p2: Point): number {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) + 
    Math.pow(p1.y - p2.y, 2) + 
    Math.pow(p1.z - p2.z, 2)
  );
}

/**
 * Calculates how much a finger is extended.
 * Returns a value from 0 (fully bent) to 1 (fully straight).
 */
export function getFingerExtensionScore(landmarks: Point[], fingerIndices: number[]): number {
  const [mcpIdx, pipIdx, dipIdx, tipIdx] = fingerIndices;
  const mcp = landmarks[mcpIdx];
  const pip = landmarks[pipIdx];
  const dip = landmarks[dipIdx];
  const tip = landmarks[tipIdx];

  const distMcpTip = calculateDistance(mcp, tip);
  const distSegments = 
    calculateDistance(mcp, pip) + 
    calculateDistance(pip, dip) + 
    calculateDistance(dip, tip);

  return Math.min(1.0, distMcpTip / distSegments);
}

export function classifyMudra(landmarks: Point[], handedness: string) {
  const indexIdx = [5, 6, 7, 8];
  const middleIdx = [9, 10, 11, 12];
  const ringIdx = [13, 14, 15, 16];
  const pinkyIdx = [17, 18, 19, 20];

  const sIdx = getFingerExtensionScore(landmarks, indexIdx);
  const sMid = getFingerExtensionScore(landmarks, middleIdx);
  const sRng = getFingerExtensionScore(landmarks, ringIdx);
  const sPky = getFingerExtensionScore(landmarks, pinkyIdx);

  const thumbTip = landmarks[4];
  const ringTip = landmarks[16];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const pinkyTip = landmarks[20];

  const distThumbRing = calculateDistance(thumbTip, ringTip);
  const distIdxMid = calculateDistance(indexTip, middleTip);
  const distMidRng = calculateDistance(middleTip, ringTip);

  const isExt = (s: number) => s > 0.85;
  const isBent = (s: number) => s < 0.65;

  let bestMudra = null;
  let maxConfidence = 0;

  // 1. Pataka: All 4 straight & together
  if (isExt(sIdx) && isExt(sMid) && isExt(sRng) && isExt(sPky)) {
    const togetherness = 1 - (distIdxMid + distMidRng) * 2;
    const confidence = (sIdx + sMid + sRng + sPky) / 4 * Math.max(0, togetherness);
    if (confidence > maxConfidence) {
      maxConfidence = confidence;
      bestMudra = { name: "Pataka", confidence, feedback: "Excellent. Keep the fingers strictly together." };
    }
  }

  // 2. Tripataka: Pataka + Ring bent
  if (isExt(sIdx) && isExt(sMid) && isBent(sRng) && isExt(sPky)) {
    const confidence = (sIdx + sMid + (1 - sRng) + sPky) / 4;
    if (confidence > maxConfidence) {
      maxConfidence = confidence;
      bestMudra = { name: "Tripataka", confidence, feedback: "Good. Ring finger must be distinctly bent." };
    }
  }

  // 3. Ardhapataka: Index, Middle straight, others bent
  if (isExt(sIdx) && isExt(sMid) && isBent(sRng) && isBent(sPky)) {
    const confidence = (sIdx + sMid + (1 - sRng) + (1 - sPky)) / 4;
    if (confidence > maxConfidence) {
      maxConfidence = confidence;
      bestMudra = { name: "Ardhapataka", confidence, feedback: "Keep index and middle fingers vertical." };
    }
  }

  // 4. Kartarimukha: Index, Middle spread V
  if (isExt(sIdx) && isExt(sMid) && isBent(sRng) && isBent(sPky) && distIdxMid > 0.08) {
    const confidence = (sIdx + sMid + (1 - sRng) + (1 - sPky)) / 4;
    if (confidence > maxConfidence) {
      maxConfidence = confidence;
      bestMudra = { name: "Kartarimukha", confidence, feedback: "Great V-shape. Keep fingers fully extended." };
    }
  }

  // 5. Mayura: Ring touching Thumb
  if (distThumbRing < 0.05 && isExt(sIdx) && isExt(sMid) && isExt(sPky)) {
    const confidence = (1 - distThumbRing * 10) * ((sIdx + sMid + sPky) / 3);
    if (confidence > maxConfidence) {
      maxConfidence = confidence;
      bestMudra = { name: "Mayura", confidence, feedback: "Peacock pose. Spread other fingers slightly." };
    }
  }

  // 6. Arala: Index bent
  if (isBent(sIdx) && isExt(sMid) && isExt(sRng) && isExt(sPky)) {
    const confidence = ((1 - sIdx) + sMid + sRng + sPky) / 4;
    if (confidence > maxConfidence) {
      maxConfidence = confidence;
      bestMudra = { name: "Arala", confidence, feedback: "Ensure the other three fingers are straight." };
    }
  }

  // 7. Shukatunda: Index/Ring bent
  if (isBent(sIdx) && isExt(sMid) && isBent(sRng) && isExt(sPky)) {
    const confidence = ((1 - sIdx) + sMid + (1 - sRng) + sPky) / 4;
    if (confidence > maxConfidence) {
      maxConfidence = confidence;
      bestMudra = { name: "Shukatunda", confidence, feedback: "Hook the index finger clearly." };
    }
  }

  // 8. Alapadma: All spread & curved
  if (isBent(sIdx) && isBent(sMid) && isBent(sRng) && isBent(sPky)) {
    if (distIdxMid > 0.04 && distMidRng > 0.04) {
      const confidence = ((1 - sIdx) + (1 - sMid) + (1 - sRng) + (1 - sPky)) / 4;
      if (confidence > maxConfidence) {
        maxConfidence = confidence;
        bestMudra = { name: "Alapadma", confidence, feedback: "Beautiful lotus. Rotate the palm outward." };
      }
    }
  }

  if (maxConfidence > 0.5) {
    return bestMudra;
  }

  return { name: "No Mudra Detected", confidence: maxConfidence || 0, feedback: "Adjust your hand position or check the lighting." };
}

/** 
 * Returns the confidence score for a specific mudra regardless of whether it is the 'best' match.
 * Useful for Practice Mode where we want to see progress towards a specific goal.
 */
export function getSpecificMudraScore(landmarks: Point[], targetMudra: string, handedness: string): any {
  const indexIdx = [5, 6, 7, 8];
  const middleIdx = [9, 10, 11, 12];
  const ringIdx = [13, 14, 15, 16];
  const pinkyIdx = [17, 18, 19, 20];

  const sIdx = getFingerExtensionScore(landmarks, indexIdx);
  const sMid = getFingerExtensionScore(landmarks, middleIdx);
  const sRng = getFingerExtensionScore(landmarks, ringIdx);
  const sPky = getFingerExtensionScore(landmarks, pinkyIdx);

  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  const middleTip = landmarks[12];
  const ringTip = landmarks[16];
  const pinkyTip = landmarks[20];

  const distThumbRing = calculateDistance(thumbTip, ringTip);
  const distIdxMid = calculateDistance(indexTip, middleTip);
  const distMidRng = calculateDistance(middleTip, ringTip);

  const isExt = (s: number) => s > 0.85;
  const isBent = (s: number) => s < 0.65;

  switch (targetMudra.toLowerCase()) {
    case 'pataka': {
      const togetherScore = 1 - (distIdxMid + distMidRng) * 1.5;
      let feedback = "Excellent Pataka form.";
      if (togetherScore < 0.7) feedback = "Bring all fingers closer together.";
      else if (!isExt(sIdx)) feedback = "Straighten your Index finger.";
      else if (!isExt(sMid)) feedback = "Straighten your Middle finger.";
      else if (!isExt(sRng)) feedback = "Straighten your Ring finger.";
      else if (!isExt(sPky)) feedback = "Straighten your Pinky finger.";
      
      return { 
        name: "Pataka", 
        confidence: ((sIdx + sMid + sRng + sPky) / 4) * Math.max(0.1, togetherScore),
        feedback 
      };
    }
    
    case 'tripataka': {
      let feedback = "Good Tripataka form.";
      if (!isExt(sIdx)) feedback = "Keep Index finger straight.";
      else if (!isExt(sMid)) feedback = "Keep Middle finger straight.";
      else if (!isBent(sRng)) feedback = "Bend your Ring finger more.";
      else if (!isExt(sPky)) feedback = "Keep Pinky finger straight.";
      
      return { 
        name: "Tripataka", 
        confidence: (sIdx + sMid + (1 - sRng) + sPky) / 4,
        feedback 
      };
    }

    case 'ardhapataka': {
      let feedback = "Great Ardhapataka.";
      if (!isExt(sIdx)) feedback = "Straighten your Index finger.";
      else if (!isExt(sMid)) feedback = "Straighten your Middle finger.";
      else if (sRng > 0.5) feedback = "Bend your Ring finger fully.";
      else if (sPky > 0.5) feedback = "Bend your Pinky finger fully.";
      
      return { 
        name: "Ardhapataka", 
        confidence: (sIdx + sMid + (1 - sRng) + (1 - sPky)) / 4,
        feedback 
      };
    }

    case 'kartarimukha': {
      let feedback = "Perfect Kartarimukha v-shape.";
      if (distIdxMid < 0.08) feedback = "Spread Index and Middle fingers wider.";
      else if (!isExt(sIdx)) feedback = "Straighten your Index finger.";
      else if (!isExt(sMid)) feedback = "Straighten your Middle finger.";
      else if (sRng > 0.5) feedback = "Ring finger should be bent.";
      
      return { 
        name: "Kartarimukha", 
        confidence: ((sIdx + sMid + (1 - sRng) + (1 - sPky)) / 4) * (distIdxMid > 0.08 ? 1 : 0.6),
        feedback 
      };
    }

    case 'mayura': {
      let feedback = "Beautiful Peacock pose.";
      if (distThumbRing > 0.06) feedback = "Touch Thumb tip to Ring finger tip.";
      else if (!isExt(sIdx)) feedback = "Index finger must be straight.";
      else if (!isExt(sMid)) feedback = "Middle finger must be straight.";
      else if (!isExt(sPky)) feedback = "Pinky finger must be straight.";
      
      return { 
        name: "Mayura", 
        confidence: (1 - distThumbRing * 10) * ((sIdx + sMid + sPky) / 3),
        feedback 
      };
    }

    case 'arala': {
      let feedback = "Arala mudra detected.";
      if (sIdx > 0.6) feedback = "Bend your Index finger into a hook.";
      else if (!isExt(sMid)) feedback = "Middle finger should be vertical.";
      else if (!isExt(sRng)) feedback = "Ring finger should be vertical.";
      else if (!isExt(sPky)) feedback = "Pinky finger should be vertical.";
      
      return { 
        name: "Arala", 
        confidence: ((1 - sIdx) + sMid + sRng + sPky) / 4,
        feedback 
      };
    }

    case 'shukatunda': {
      let feedback = "Excellent Shukatunda.";
      if (sIdx > 0.6) feedback = "Index finger should be hooked.";
      else if (sRng > 0.6) feedback = "Ring finger should be hooked.";
      else if (!isExt(sMid)) feedback = "Middle finger must be straight.";
      else if (!isExt(sPky)) feedback = "Pinky must be straight.";
      
      return { 
        name: "Shukatunda", 
        confidence: ((1 - sIdx) + sMid + (1 - sRng) + sPky) / 4,
        feedback 
      };
    }

    case 'alapadma': {
      let feedback = "Beautiful Alapadma lotus.";
      const isSpread = distIdxMid > 0.04 && distMidRng > 0.04;
      if (!isSpread) feedback = "Spread all fingers outward.";
      else if (sIdx > 0.6) feedback = "Curve your Index finger back.";
      else if (sMid > 0.6) feedback = "Curve your Middle finger back.";
      
      return { 
        name: "Alapadma", 
        confidence: ((1 - sIdx) + (1 - sMid) + (1 - sRng) + (1 - sPky)) / 4,
        feedback 
      };
    }

    default:
      return { name: targetMudra, confidence: 0, feedback: "Keep practicing the form." };
  }
}
