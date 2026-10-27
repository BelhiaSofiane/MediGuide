export function createDemoCheckup(symptoms, userId, insert) {
  if (!userId) throw new Error('A signed-in user is required.');
  if (symptoms.length < 1 || symptoms.length > 10 || symptoms.some((symptom) => !symptom.trim() || symptom.length > 100)) {
    throw new Error('Enter between 1 and 10 symptoms, each no more than 100 characters.');
  }
  return insert({
    user_id: userId,
    symptoms,
    possible_conditions: [],
    severity: 'Demo',
    recommendation: 'Simulated record only. This is not medical advice.',
    is_simulated: true,
  });
}
