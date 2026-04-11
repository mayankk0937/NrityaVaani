export const FEEDBACK_TRANSLATIONS: Record<string, string> = {
  // Common / General
  "Show your hand to the camera to begin.": "Shuru karne ke liye apna hath camera ke samne laiye.",
  "Adjust your hand position or check the lighting.": "Apne hath ki position badaliye ya roshni check kijiye.",
  "Adjust your hand position to match the reference image.": "Apne hath ko reference image ke hisab se set kijiye.",
  "Awaiting Match": "Match ka intezar hai",
  "Excellent Form": "Bahut badhiya form",
  "Keep Adjusting": "Adjust karte rahiye",
  "None": "Koi nahi",
  "Perfect": "Bilkul sahi",
  "Good attempt. Keep holding the": "Acha prayas hai. Isi tarah rakhein",

  // Specific Actions
  "Straighten your Index finger.": "Apni Index finger ko seedha kijiye.",
  "Straighten your Middle finger.": "Apni Middle finger ko seedha kijiye.",
  "Straighten your Ring finger.": "Apni Ring finger ko seedha kijiye.",
  "Straighten your Pinky finger.": "Apni Pinky finger ko seedha kijiye.",
  "Straighten all fingers.": "Saari unglio ko seedha kijiye.",
  "Bend your Index finger.": "Apni Index finger ko modiye.",
  "Bend your Middle finger.": "Apni Middle finger ko modiye.",
  "Bend your Ring finger.": "Apni Ring finger ko modiye.",
  "Bend your Pinky finger.": "Apni Pinky finger ko modiye.",
  "Bend your Index finger into a hook.": "Apni Index finger ko hook ki tarah modiye.",
  "Bend your Ring finger more.": "Apni Ring finger ko aur modiye.",
  "Bend your Ring finger fully.": "Apni Ring finger ko pura modiye.",
  "Bend your Pinky finger fully.": "Apni Pinky finger ko pura modiye.",
  "Bring all fingers closer together.": "Saari unglio ko paas laiye.",
  "Bring your fingers closer together.": "Apni unglio ko paas laiye.",
  "Keep Index finger straight.": "Index finger ko seedha rakhein.",
  "Keep Middle finger straight.": "Middle finger ko seedha rakhein.",
  "Keep Pinky finger straight.": "Pinky finger ko seedha rakhein.",
  "Keep all fingers straight": "Saari unglio ko seedha rakhein.",
  "Middle finger should be vertical.": "Middle finger seedhi honi chahiye.",
  "Ring finger should be vertical.": "Ring finger seedhi honi chahiye.",
  "Pinky finger should be vertical.": "Pinky finger seedhi honi chahiye.",
  "Spread Index and Middle fingers wider.": "Index aur Middle finger ko aur failaiye.",
  "Spread all fingers outward.": "Saari unglio ko bahar ki taraf failaiye.",
  "Touch Thumb tip to Ring finger tip.": "Angoothe ko Ring finger se touch kijiye.",
  "Touch your thumb to your ring finger.": "Angoothe ko Ring finger se touch kijiye.",
  "Curve your Index finger back.": "Apni Index finger ko piche ki taraf modiye.",
  "Curve your Middle finger back.": "Apni Middle finger ko piche ki taraf modiye.",
  "Index finger should be hooked.": "Index finger hook ki tarah honi chahiye.",
  "Ring finger should be hooked.": "Ring finger hook ki tarah honi chahiye.",
  "Middle finger must be straight.": "Middle finger seedhi honi chahiye.",
  "Pinky must be straight.": "Pinky finger seedhi honi chahiye.",
  "Index finger must be straight.": "Index finger seedhi honi chahiye.",
  // Mudra specific
  "Excellent Pataka form.": "Bahut badhiya Pataka form.",
  "Good Tripataka form.": "Bahut badhiya Tripataka form.",
  "Great Ardhapataka.": "Bahut badhiya Ardhapataka mudra.",
  "Perfect Kartarimukha v-shape.": "Bilkul sahi Kartarimukha v-shape.",
  "Beautiful Peacock pose.": "Bahut sundar Mayura pose.",
  "Arala mudra detected.": "Arala mudra dikh rahi hai.",
  "Excellent Shukatunda.": "Bahut badhiya Shukatunda.",
  "Beautiful Alapadma lotus.": "Bahut sundar Alapadma lotus.",
  // Misc
  "Keep practicing the form.": "Abhyas karte rahiye.",
};

export const MUDRA_NAME_TRANSLATIONS: Record<string, string> = {
  "Pataka": "Pataka",
  "Tripataka": "Tripataka",
  "Ardhapataka": "Ardhapataka",
  "Kartarimukha": "Kartarimukha",
  "Mayura": "Mayura",
  "Arala": "Arala",
  "Shukatunda": "Shukatunda",
  "Alapadma": "Alapadma",
};

export function translateFeedback(text: string, lang: 'en' | 'hi'): string {
  if (lang === 'en') return text;
  
  // Try to find direct match
  if (FEEDBACK_TRANSLATIONS[text]) return FEEDBACK_TRANSLATIONS[text];
  
  // Handle dynamic strings like "Detected X instead. Try to form Y."
  let translated = text;
  
  // Replace Mudra names
  Object.keys(MUDRA_NAME_TRANSLATIONS).forEach(name => {
    const regex = new RegExp(name, 'g');
    if (lang === 'hi') {
      // In Hindi mode, we might want to keep the name same or phonetically Hindi
      // But user said "English me rehne do" for finger names, mudra names are already Sanskrit/Hindi
    }
  });

  if (text.includes("Detected") && text.includes("instead")) {
    const parts = text.split(" ");
    const detected = parts[1];
    const target = parts[parts.length - 1].replace(".", "");
    return `Mujhe ${detected} dikh rahi hai, lekin hum ${target} ki practice kar rahe hain.`;
  }

  if (text.includes("Perfect") && text.includes("detected")) {
    const name = text.split(" ")[1];
    return `Bahut badhiya! Sahi ${name} mudra sahi hai.`;
  }

  return text;
}
