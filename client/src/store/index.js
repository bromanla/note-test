import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    notes: []
  },
  getters: {
    allNotes(state) {
      return state.notes
    }
  },
  mutations: {
    updateNotes(state, notes) {
      state.notes = notes
    }
  },
  actions: {
    async fetchNotes(ctx) {
      const { data } = await axios.get('/api/notes')
      ctx.commit('updateNotes', data)
    },
    async fetchNoteById(ctx, id) {
      const { data } = await axios.get(`/api/notes/${id}`)
      return data
    },
    async deleteRecord(ctx, id) {
      await axios.delete(`/api/notes/${id}`)

      const notes = ctx.getters.allNotes.filter((el) => el.id !== id);
      ctx.commit('updateNotes', notes)
    },
    async createNote(ctx, text) {
      const { data } = await axios.post(`/api/notes/`, { text })

      const notes = [data, ...ctx.getters.allNotes]
      ctx.commit('updateNotes', notes)
    },
    async patchNoteById(ctx, { id, text }) {
      const { data } = await axios.patch(`/api/notes/${id}`, { text })

      const notes = ctx.getters.allNotes.map((el) => el.id === id ? data : el);
      ctx.commit('updateNotes', notes)
    }
  }
})
