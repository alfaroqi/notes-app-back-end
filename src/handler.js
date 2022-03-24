const { nanoid } = require('nanoid');
const notes = require('./notes');

// add note
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };
  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  //   success: true,
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Caatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  //   if failed
  const response = h.response({
    status: 'fail',
    message: 'Caatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// get all notes
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// get note by id
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((note) => note.id === id)[0];
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Caatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// update note
const editNoteHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// delete note
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal menghapus catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteHandler,
  deleteNoteByIdHandler,
};
