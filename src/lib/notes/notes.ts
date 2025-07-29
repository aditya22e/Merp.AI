export interface Note {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

const mockNotes: Note[] = [];

export async function createNote(userId: string, content: string): Promise<Note> {
  if (!userId) throw new Error('User ID is required');
  if (!content) throw new Error('Content is required');
  const note: Note = {
    id: Math.random().toString(36).slice(2),
    userId,
    content,
    createdAt: new Date().toISOString(),
  };
  mockNotes.push(note);
  return note;
}

export async function getNotes(userId: string): Promise<Note[]> {
  if (!userId) throw new Error('User ID is required');
  return mockNotes.filter((note) => note.userId === userId);
}