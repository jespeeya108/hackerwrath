export async function createMessage(message) {
  await new Promise((resolve) => setTimeout(resolve, 350))
  return { ...message, id: `local-${Date.now()}`, savedLocally: true }
}
