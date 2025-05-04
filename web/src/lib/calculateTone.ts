export const calculateTonePercentages = (
  x: number,
  y: number,
  sliderRef: React.RefObject<HTMLDivElement | null>
) => {
  if (!sliderRef.current) return;

  const slider = sliderRef.current;
  const rect = slider.getBoundingClientRect();

  // Normalize position to values between 0 and 1
  const normalizedX = x / rect.width;
  const normalizedY = y / rect.height;

  const professionalPos = { x: 0.5, y: 0 }; // top center
  const creativePos = { x: 1, y: 0.5 }; // right middle
  const formalPos = { x: 0, y: 0.5 }; // left middle
  const casualPos = { x: 0.5, y: 1 }; // bottom center

  const professionalDist =
    1 /
    (Math.pow(normalizedX - professionalPos.x, 2) +
      Math.pow(normalizedY - professionalPos.y, 2) +
      0.01);
  const creativeDist =
    1 /
    (Math.pow(normalizedX - creativePos.x, 2) +
      Math.pow(normalizedY - creativePos.y, 2) +
      0.01);
  const formalDist =
    1 /
    (Math.pow(normalizedX - formalPos.x, 2) +
      Math.pow(normalizedY - formalPos.y, 2) +
      0.01);
  const casualDist =
    1 /
    (Math.pow(normalizedX - casualPos.x, 2) +
      Math.pow(normalizedY - casualPos.y, 2) +
      0.01);

  // Sum of all weights
  const totalDist = professionalDist + creativeDist + formalDist + casualDist;

  // Calculate percentages (0-100)
  const professional = Math.round((professionalDist / totalDist) * 100);
  const creative = Math.round((creativeDist / totalDist) * 100);
  const formal = Math.round((formalDist / totalDist) * 100);
  const casual = Math.round((casualDist / totalDist) * 100);

  // Ensure total is exactly 100%
  const total = professional + creative + formal + casual;
  const adjustment = 100 - total;

  // Adjust values to sum is 100%
  const adjustedValues = {
    professional,
    creative,
    formal,
    casual,
  };

  // Apply adjustment to the largest value
  const max = Math.max(professional, creative, formal, casual);
  if (max === professional) adjustedValues.professional += adjustment;
  else if (max === creative) adjustedValues.creative += adjustment;
  else if (max === formal) adjustedValues.formal += adjustment;
  else adjustedValues.casual += adjustment;

  return adjustedValues;
};
