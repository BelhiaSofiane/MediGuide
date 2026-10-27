export function createSessionScope() {
  let userId = null;
  let version = 0;

  return {
    begin(nextUserId) {
      if (nextUserId !== userId) {
        userId = nextUserId;
        version += 1;
      }
      return { userId, version };
    },
    current() {
      return { userId, version };
    },
    isCurrent(ticket) {
      return ticket.userId === userId && ticket.version === version;
    },
  };
}
