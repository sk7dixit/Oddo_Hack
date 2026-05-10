// TODO: Implement checklist service logic

export const checklistService = {
  getChecklist: async (tripId: string) => {
    // TODO: query DB for checklist items of trip
  },
  addItem: async (tripId: string, item: string) => {
    // TODO: insert checklist item into DB
  },
  toggleItem: async (tripId: string, itemId: string) => {
    // TODO: toggle checklist item checked state
  },
  deleteItem: async (tripId: string, itemId: string) => {
    // TODO: delete checklist item from DB
  },
};
