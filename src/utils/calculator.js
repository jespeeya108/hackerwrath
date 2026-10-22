export const calculationConfig = { precision: 2, label: 'Provisional prototype model' }

export function calculateWeightedGpa(rows) {
  const valid = rows.filter((row) => Number(row.credits) > 0 && row.gradePoint !== '')
  if (!valid.length) return { value: null, credits: 0, error: 'Enter a grade point for at least one credited subject.' }
  if (valid.some((row) => Number(row.gradePoint) < 0 || Number(row.gradePoint) > 10)) return { value: null, credits: 0, error: 'Grade points must be between 0 and 10 for this demo model.' }
  const credits = valid.reduce((sum, row) => sum + Number(row.credits), 0)
  const points = valid.reduce((sum, row) => sum + Number(row.credits) * Number(row.gradePoint), 0)
  return { value: (points / credits).toFixed(calculationConfig.precision), credits, error: null }
}
